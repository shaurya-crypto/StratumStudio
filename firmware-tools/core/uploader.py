#!/usr/bin/env python3
"""
Electro CODE - Unified uploader for MicroPython / CircuitPython / Arduino
Supports: flash and run modes across multiple board types.
"""

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
import time
import serial

# Ensure stdout/stderr handle UTF-8 on Windows
if sys.platform == "win32":
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8')


# ─────────────────────────────────────────────
#  Exit codes (so Electron can handle them cleanly)
# ─────────────────────────────────────────────
EXIT_OK            = 0
EXIT_UPLOAD_FAILED = 1
EXIT_PORT_BUSY     = 2
EXIT_PORT_MISSING  = 3
EXIT_FILE_MISSING  = 4
EXIT_TIMEOUT       = 5
EXIT_TOOL_MISSING  = 6
EXIT_UNKNOWN       = 9


# ─────────────────────────────────────────────
#  Hardware Helper: Wait for Port
# ─────────────────────────────────────────────
def wait_for_port(port: str, timeout: float = 3.0) -> bool:
    """
    Attempt to open the port multiple times. 
    Returns True if port becomes available, False otherwise.
    """
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            # Try to open port to see if it's free
            s = serial.Serial(port, 115200, timeout=1)
            s.close()
            return True
        except (serial.SerialException, OSError) as e:
            if "Access is denied" in str(e) or "PermissionError" in str(e):
                time.sleep(0.3) # Wait and retry
                continue
            # If it's a "Device not found", it might be really gone
            return False
    return False


# ─────────────────────────────────────────────
#  Output helpers  (stdout = progress / result,
#                   stderr = errors)
# ─────────────────────────────────────────────
def info(msg: str) -> None:
    """Progress / status message — read by Electron."""
    print(f"INFO: {msg}", flush=True)

def ok(msg: str) -> None:
    """Final success message — Electron looks for 'OK:' prefix."""
    print(f"OK: {msg}", flush=True)

def die(msg: str, code: int = EXIT_UPLOAD_FAILED) -> None:
    """Print a clean error to stderr and exit with a specific code."""
    print(f"ERROR: {msg}", file=sys.stderr, flush=True)
    sys.exit(code)


# ─────────────────────────────────────────────
#  Pre-flight validation
# ─────────────────────────────────────────────
def validate_inputs(port: str, file_path: str) -> None:
    """Validate port and file exist before doing anything."""
    if not file_path or not os.path.isfile(file_path):
        die(f"Source file not found: '{file_path}'", EXIT_FILE_MISSING)

    if not file_path.endswith(('.py', '.ino', '.c', '.cpp')):
        # Warn but don't block — user might have an unusual extension
        info(f"Warning: Unexpected file extension for '{os.path.basename(file_path)}'")

    if not port:
        die("No port specified. Connect a device and select a port.", EXIT_PORT_MISSING)


def check_tool(tool_module: str, friendly_name: str) -> None:
    """Verify a Python-module CLI tool is importable/installed."""
    result = subprocess.run(
        [sys.executable, '-m', tool_module, '--version'],
        capture_output=True, text=True
    )
    if result.returncode != 0 and 'No module named' in (result.stderr or ''):
        die(
            f"Required tool '{friendly_name}' is not installed.\n"
            f"  Fix: pip install {friendly_name.lower()}",
            EXIT_TOOL_MISSING
        )


# ─────────────────────────────────────────────
#  Subprocess wrapper
# ─────────────────────────────────────────────
def run(cmd: list, timeout: int = 30) -> tuple[bool, str]:
    """
    Run a subprocess and return (success, combined_output).
    Never raises — all errors are returned as (False, message).
    """
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout
        )
        combined = (result.stdout + result.stderr).strip()
        return result.returncode == 0, combined

    except subprocess.TimeoutExpired:
        return False, f"Command timed out after {timeout}s: {' '.join(cmd)}"
    except FileNotFoundError:
        return False, f"Executable not found: '{cmd[0]}'"
    except PermissionError:
        return False, f"Permission denied running: '{cmd[0]}'"
    except Exception as exc:
        return False, f"Unexpected error: {exc}"


def run_streaming(cmd: list) -> int:
    """
    Run a subprocess with output streamed directly to the terminal.
    Returns the exit code.
    """
    try:
        return subprocess.call(cmd)
    except FileNotFoundError:
        die(f"Executable not found: '{cmd[0]}'", EXIT_TOOL_MISSING)
    except Exception as exc:
        die(f"Failed to launch process: {exc}")


# ─────────────────────────────────────────────
#  Error parser
# ─────────────────────────────────────────────
def parse_upload_error(port: str, output: str) -> None:
    """
    Map raw tool output to a clean, actionable error message and exit.
    Checks most-specific patterns first.
    """
    out_lower = output.lower()

    if "access is denied" in out_lower or "permission denied" in out_lower:
        die(
            f"Port '{port}' is in use by another program (e.g. Thonny, Arduino IDE, PuTTY).\n"
            f"  Fix: Close the other program, then try again.",
            EXIT_PORT_BUSY
        )

    if any(p in out_lower for p in ("no such file", "device not found", "could not open port", "no port")):
        die(
            f"Device not found on port '{port}'.\n"
            f"  Fix: Check the USB cable, reconnect the device, and verify the port.",
            EXIT_PORT_MISSING
        )

    if "timed out" in out_lower or "timeout" in out_lower:
        die(
            f"Connection to '{port}' timed out.\n"
            f"  Fix: The device may be busy or in an infinite loop. Try pressing RESET.",
            EXIT_TIMEOUT
        )

    if "no module named" in out_lower:
        tool = output.split("No module named")[-1].strip().strip("'\"")
        die(
            f"Required Python module '{tool}' is not installed.\n"
            f"  Fix: pip install {tool}",
            EXIT_TOOL_MISSING
        )

    if "invalid syntax" in out_lower or "syntaxerror" in out_lower:
        die(
            f"Syntax error in your code. Fix the error and try uploading again.\n"
            f"  Detail: {_last_line(output)}",
            EXIT_UPLOAD_FAILED
        )

    if "memory" in out_lower or "memoryerror" in out_lower:
        die(
            f"Device ran out of memory during upload.\n"
            f"  Fix: Free space on the device or reduce code size.",
            EXIT_UPLOAD_FAILED
        )

    # Generic fallback — show the last meaningful line from the tool
    detail = _last_line(output)
    die(f"Upload failed: {detail}", EXIT_UPLOAD_FAILED)


def _last_line(text: str) -> str:
    """Return the last non-empty line of a string."""
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    return lines[-1] if lines else "(no output from tool)"


# ─────────────────────────────────────────────
#  MicroPython uploader
# ─────────────────────────────────────────────
def upload_micropython(port: str, file_path: str, board_id: str,
                       device_name: str | None = None, mode: str = 'flash') -> None:

    # ⏳ Robustness Check: Ensure the port is free, wait if not (Windows contention)
    if not wait_for_port(port):
        die(f"Could not open {port}. Device might be busy or in use by another session.", EXIT_PORT_BUSY)

    target_name = device_name or 'main.py'
    base = os.path.basename(file_path)

    if mode == 'run':
        info(f"Running '{base}' on device (not saved to flash) ...")
        cmd = [sys.executable, '-m', 'mpremote', 'connect', port, 'run', file_path]
        ret = run_streaming(cmd)
        sys.exit(ret)

    # ── Flash mode ──
    info(f"Uploading '{base}' -> '{target_name}' via mpremote ...")
    ok_flag, out = run([
        sys.executable, '-m', 'mpremote',
        'connect', port,
        'cp', file_path, f':{target_name}',
        'reset'
    ])

    if not ok_flag:
        info("mpremote failed, trying ampy fallback ...")
        ok_flag, out = run([
            sys.executable, '-m', 'ampy.cli',
            '--port', port, '--delay', '1',
            'put', file_path, target_name
        ])
        if ok_flag:
            # ampy doesn't reset automatically
            run([sys.executable, '-m', 'mpremote', 'connect', port, 'reset'])

    if not ok_flag:
        parse_upload_error(port, out)

    ok(f"Uploaded '{target_name}' and reset device")


# ─────────────────────────────────────────────
#  CircuitPython uploader
# ─────────────────────────────────────────────
def upload_circuitpython(port: str, file_path: str,
                         device_name: str | None = None, mode: str = 'flash') -> None:

    target_name = device_name or 'code.py'
    base = os.path.basename(file_path)

    if mode == 'run':
        info(f"Running '{base}' on device (not saved to flash) ...")
        cmd = [sys.executable, '-m', 'mpremote', 'connect', port, 'run', file_path]
        ret = run_streaming(cmd)
        sys.exit(ret)

    # ── Flash mode ──
    info(f"Uploading '{base}' -> '{target_name}' via mpremote ...")
    ok_flag, out = run([
        sys.executable, '-m', 'mpremote',
        'connect', port,
        'cp', file_path, f':{target_name}',
        'reset'
    ])

    if not ok_flag:
        info("mpremote failed, trying ampy fallback ...")
        ok_flag, out = run([
            sys.executable, '-m', 'ampy.cli',
            '--port', port,
            'put', file_path, target_name
        ])

    if not ok_flag:
        parse_upload_error(port, out)

    ok(f"Uploaded '{target_name}' to device")


# ─────────────────────────────────────────────
#  Arduino uploader
# ─────────────────────────────────────────────
def check_and_ensure_arduino_cli() -> str:
    """Ensure arduino-cli is present, installing it if missing."""
    cli_path = shutil.which('arduino-cli')
    if cli_path:
        return cli_path

    # Check common fallback locations (including Stratum Studio's custom install dir)
    home = os.path.expanduser('~')
    fallback_paths = [
        os.path.join(home, 'bin', 'arduino-cli.exe'),
        os.path.join(home, 'AppData', 'Local', 'Programs', 'arduino-cli', 'arduino-cli.exe'),
        os.path.join(home, 'AppData', 'Roaming', 'stratum-studio', 'bin', 'arduino-cli.exe'),
        os.path.join(home, 'AppData', 'Roaming', 'Stratum Studio', 'bin', 'arduino-cli.exe'),
        os.path.join(os.getcwd(), 'bin', 'arduino-cli.exe'),
        os.path.join(os.getcwd(), 'arduino-cli.exe'),
        'bin/arduino-cli.exe',
    ]
    for p in fallback_paths:
        if os.path.exists(p):
            return p

    # If missing, automatically install it
    info("arduino-cli not found. Downloading from GitHub Releases...")
    if sys.platform == "win32":
        # Use PowerShell to download ZIP from GitHub releases
        ps_script = """
$ErrorActionPreference = 'Stop'
$binDir = Join-Path $env:LOCALAPPDATA 'Stratum\\bin'
if (-not (Test-Path $binDir)) { New-Item -ItemType Directory -Path $binDir -Force | Out-Null }
$release = Invoke-RestMethod -Uri 'https://api.github.com/repos/arduino/arduino-cli/releases/latest'
$tag = $release.tag_name
$version = $tag -replace '^v', ''
$url = "https://github.com/arduino/arduino-cli/releases/download/$tag/arduino-cli_${version}_Windows_64bit.zip"
Write-Host "Downloading arduino-cli $tag..."
$zipPath = Join-Path $env:TEMP 'arduino-cli.zip'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing
$extractDir = Join-Path $env:TEMP 'arduino-cli-extract'
if (Test-Path $extractDir) { Remove-Item $extractDir -Recurse -Force }
Expand-Archive -Path $zipPath -DestinationPath $extractDir -Force
Copy-Item (Join-Path $extractDir 'arduino-cli.exe') $binDir -Force
Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
Remove-Item $extractDir -Recurse -Force -ErrorAction SilentlyContinue
$env:PATH = "$binDir;$env:PATH"
Write-Host "Installed to $binDir"
& (Join-Path $binDir 'arduino-cli.exe') core update-index
& (Join-Path $binDir 'arduino-cli.exe') core install arduino:avr
"""
        proc = subprocess.run(
            ["powershell", "-ExecutionPolicy", "Bypass", "-Command", ps_script],
            capture_output=True, text=True
        )
        if proc.stdout:
            info(proc.stdout.strip())
    else:
        proc = subprocess.run(
            "curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh",
            shell=True
        )

    if proc.returncode != 0:
        die("Automatic installation of arduino-cli failed. Please install it manually.", EXIT_TOOL_MISSING)

    info("Installation complete. Checking paths...")
    # Re-check paths after install (including new install location)
    cli_path = shutil.which('arduino-cli')
    if cli_path:
        return cli_path

    local_stratum_path = os.path.join(os.environ.get('LOCALAPPDATA', ''), 'Stratum', 'bin', 'arduino-cli.exe')
    if os.path.exists(local_stratum_path):
        return local_stratum_path

    for p in fallback_paths:
        if os.path.exists(p):
            return p

    # Default to 'arduino-cli' if all else fails
    return 'arduino-cli'


def upload_arduino(port: str, file_path: str, board_id: str, mode: str = 'flash') -> None:
    cli_exe = check_and_ensure_arduino_cli()

    base = os.path.basename(file_path)
    sketch_name = 'electro_sketch'
    tmpdir = tempfile.mkdtemp(prefix='electrocode_')

    try:
        sketch_dir = os.path.join(tmpdir, sketch_name)
        os.makedirs(sketch_dir)
        dest = os.path.join(sketch_dir, sketch_name + '.ino')
        shutil.copy(file_path, dest)

        if mode == 'compile':
            info(f"Compiling '{base}' for board '{board_id}' (Compile Only) ...")
            cmd = [cli_exe, 'compile', '--fqbn', board_id, sketch_dir]
            ok_flag, out = run(cmd, timeout=180)
        elif mode == 'burn_bootloader':
            info(f"Burning bootloader on '{port}' for board '{board_id}' ...")
            cmd = [cli_exe, 'burn-bootloader', '--fqbn', board_id, '-p', port]
            ok_flag, out = run(cmd, timeout=180)
        else:
            info(f"Compiling '{base}' for board '{board_id}' ...")
            cmd_compile = [cli_exe, 'compile', '--fqbn', board_id, sketch_dir]
            ok_flag, out = run(cmd_compile, timeout=180)
            if ok_flag:
                info(f"Uploading sketch to '{port}' ...")
                cmd_upload = [cli_exe, 'upload', '--fqbn', board_id, '-p', port, sketch_dir]
                ok_flag, out = run(cmd_upload, timeout=180)

    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)

    if not ok_flag:
        out_lower = out.lower()

        # ── Port-level errors ──
        if "access is denied" in out_lower or "permission denied" in out_lower:
            die(
                f"Port '{port}' is busy. Close Arduino IDE, serial monitors, or any app using the port.",
                EXIT_PORT_BUSY
            )
        if any(p in out_lower for p in ("no such file", "could not open port", "no port", "port does not exist")):
            die(
                f"Device not found on port '{port}'.\n"
                f"  Fix: Check the USB cable, reconnect the device, and verify the port is correct.",
                EXIT_PORT_MISSING
            )

        # ── Board / Core errors ──
        if "board" in out_lower and "not found" in out_lower:
            # Extract platform from FQBN  e.g. arduino:avr:uno → arduino:avr
            platform = ":".join(board_id.split(":")[:2]) if ":" in board_id else board_id
            die(
                f"Board '{board_id}' is not installed in arduino-cli.\n"
                f"  Fix: Run this command in your terminal:\n"
                f"       arduino-cli core install {platform}",
                EXIT_UPLOAD_FAILED
            )
        if "platform" in out_lower and ("not installed" in out_lower or "not found" in out_lower):
            platform = ":".join(board_id.split(":")[:2]) if ":" in board_id else board_id
            die(
                f"Arduino platform for board '{board_id}' is not installed.\n"
                f"  Fix: arduino-cli core install {platform}",
                EXIT_TOOL_MISSING
            )

        # ── Chip mismatch / wrong board ──
        if "stk500" in out_lower and ("not in sync" in out_lower or "resp=0x00" in out_lower):
            die(
                f"⚠️ Incorrect board or chip connected on '{port}'.\n"
                f"  Selected board FQBN: {board_id}\n"
                f"  The device on this port does not respond to the expected programming protocol.\n"
                f"  Fix: Verify the correct board is selected in the interpreter, or check the USB cable.",
                EXIT_UPLOAD_FAILED
            )
        if "avrdude" in out_lower and "not responding" in out_lower:
            die(
                f"⚠️ AVR programmer not responding on '{port}'.\n"
                f"  Selected board FQBN: {board_id}\n"
                f"  Fix: The connected chip may not match the selected board profile.\n"
                f"       Try a different board or check the physical connection.",
                EXIT_UPLOAD_FAILED
            )
        if "wrong microcontroller" in out_lower or "signature" in out_lower:
            die(
                f"⚠️ Chip signature mismatch detected on '{port}'.\n"
                f"  Selected board FQBN: {board_id}\n"
                f"  The physical chip does not match the expected signature for this board.\n"
                f"  Fix: Select the correct board from the interpreter, or check your hardware.",
                EXIT_UPLOAD_FAILED
            )

        # ── Compilation errors ──
        if "error:" in out_lower and "compil" in out_lower:
            die(
                f"Compilation failed for board '{board_id}':\n{_last_line(out)}\n"
                f"  Fix: Check your code for syntax errors.",
                EXIT_UPLOAD_FAILED
            )
        if "sketch too big" in out_lower or "exceeds" in out_lower:
            die(
                f"Sketch is too large for board '{board_id}'.\n"
                f"  Fix: Reduce code size or use a board with more flash memory.",
                EXIT_UPLOAD_FAILED
            )

        # ── Timeout ──
        if "timed out" in out_lower or "timeout" in out_lower:
            die(
                f"Connection to '{port}' timed out.\n"
                f"  Fix: The device may be busy. Try pressing the RESET button on the board.",
                EXIT_TIMEOUT
            )

        # ── ESP-specific errors ──
        if "a]" in out_lower and "connect" in out_lower:
            die(
                f"ESP board failed to connect on '{port}'.\n"
                f"  Fix: Hold the BOOT button while uploading, then release after 'Connecting...' appears.",
                EXIT_UPLOAD_FAILED
            )

        # ── Generic fallback ──
        die(f"Operation failed:\n{_last_line(out)}", EXIT_UPLOAD_FAILED)

    if mode == 'compile':
        ok(f"Compiled '{base}' successfully")
    elif mode == 'burn_bootloader':
        ok(f"Burned bootloader to {port} successfully")
    else:
        ok(f"Compiled and flashed '{base}' to {port}")


# ─────────────────────────────────────────────
#  Entry point
# ─────────────────────────────────────────────
if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Stratum Studio — firmware uploader',
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument('--port',        required=True,  help='Serial port (e.g. COM3 or /dev/ttyUSB0)')
    parser.add_argument('--file',        required=True,  help='Path to source file')
    parser.add_argument('--language',    required=True,
                        choices=['micropython', 'circuitpython', 'arduino', 'c'],
                        help='Target language / runtime')
    parser.add_argument('--board-id',    default='arduino:avr:uno',
                        help='Arduino board FQBN (e.g. arduino:avr:uno)')
    parser.add_argument('--device-name', default=None,
                        help='Destination filename on device (default: main.py / code.py)')
    parser.add_argument('--mode',        default='flash', choices=['flash', 'run', 'compile', 'burn_bootloader'],
                        help='flash = save/upload to device,  run = execute without saving, compile = compile only, burn_bootloader = burn bootloader')
    args = parser.parse_args()

    # ── Validate before touching the device ──
    validate_inputs(args.port, args.file)

    # ── Dispatch ──
    if args.language == 'micropython':
        upload_micropython(args.port, args.file, args.board_id, args.device_name, args.mode)

    elif args.language == 'circuitpython':
        upload_circuitpython(args.port, args.file, args.device_name, args.mode)

    elif args.language in ('arduino', 'c'):
        if args.mode == 'run':
            die("Run mode is not supported for Arduino/C. Use 'flash' or 'compile' instead.", EXIT_UPLOAD_FAILED)
        upload_arduino(args.port, args.file, args.board_id, args.mode)