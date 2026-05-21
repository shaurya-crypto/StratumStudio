import { app, BrowserWindow, ipcMain, dialog, safeStorage, shell } from "electron";
import { fileURLToPath } from "node:url";
import { autoUpdater } from "electron-updater";
import path from "node:path";
import { exec, execSync, spawn, execFile, ChildProcess } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import http from "node:http";
import https from "node:https";
import pty from "node-pty";
import { SerialPort } from "serialport";


// Auto Updater Configuration
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Events → send to renderer
autoUpdater.on("update-available", (info) => {
  if (win) win.webContents.send("update:available", info);
});
autoUpdater.on("download-progress", (progress) => {
  if (win) win.webContents.send("update:progress", progress);
});
autoUpdater.on("update-downloaded", () => {
  if (win) win.webContents.send("update:downloaded");
});
autoUpdater.on("error", (err) => {
  if (win) win.webContents.send("update:error", err.message);
});

// IPC handlers for auto updater
ipcMain.on("update:download", () => autoUpdater.downloadUpdate());
ipcMain.on("update:install", () => {
  try {
    // Kill all pty processes first
    if (ptyProcess) {
      ptyProcess.kill();
      ptyProcess = null;
    }

    // Destroy all windows cleanly
    BrowserWindow.getAllWindows().forEach((w) => {
      w.destroy();
    });

    // Small delay — let processes die before installer runs
    setTimeout(() => {
      autoUpdater.quitAndInstall(false, true);
    }, 500);
  } catch (e) {
    // Force quit if anything fails
    autoUpdater.quitAndInstall(false, true);
  }
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- VITE & PATH SETUP (Do not touch) ---
process.env.APP_ROOT = path.join(__dirname, "..");
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;
let activeSerialPort: SerialPort | null = null; // Replaces monitorProcess
let ptyProcess: pty.IPty | null = null; // Node-pty instance
let mcpProcess: ChildProcess | null = null; // MCP Server process

// Ensure single instance
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

function getResourcePath(subPath: string): string {
  if (!app.isPackaged) {
    // Development: Use standard relative paths (project root)
    return path.join(process.env.APP_ROOT!, "..", subPath);
  }
  // Production: Use process.resourcesPath for bundled folders
  // All backend resources are nested under _internal/ to keep the install directory clean
  return path.join(process.resourcesPath, "_internal", subPath);
}

function getPythonExe(): string {
  if (process.platform === "win32") {
    // Check Thonny Python as fallback since Windows Appalias can cause 'python' command to fail
    const thonnyPath = path.join(os.homedir(), "AppData", "Local", "Programs", "Thonny", "python.exe");
    if (fs.existsSync(thonnyPath)) {
      return thonnyPath;
    }
    return "python";
  }
  // Linux / macOS fallback
  try {
    execSync("python3 --version", { stdio: "ignore" });
    return "python3";
  } catch {
    return "python";
  }
}

// --- SECURITY HELPERS ---
function encryptValue(value: string): string {
  if (!value) return "";
  try {
    if (safeStorage.isEncryptionAvailable()) {
      const buffer = safeStorage.encryptString(value);
      return `enc:${buffer.toString("base64")}`;
    }
    console.warn("[Security] safeStorage not available. Storing in plain-text.");
    return value;
  } catch (err) {
    console.error("[Security] Encryption failed:", err);
    return value;
  }
}

function decryptValue(value: string): string {
  if (!value || !value.startsWith("enc:")) return value;
  try {
    if (safeStorage.isEncryptionAvailable()) {
      const base64Content = value.substring(4);
      const buffer = Buffer.from(base64Content, "base64");
      return safeStorage.decryptString(buffer);
    }
    return value;
  } catch (err) {
    console.error("[Security] Decryption failed:", err);
    return value;
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false, // Frameless window
    icon: app.isPackaged
      ? path.join(process.resourcesPath, "icon.ico")
      : path.join(process.env.VITE_PUBLIC!, "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Vite plugin-electron compiles preload.ts to .js
      contextIsolation: true, // Security requirement
      nodeIntegration: false,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// --- IPC LISTENERS (The Backend Logic) ---

async function stopMonitorNative(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!activeSerialPort) return resolve(true);

    const port = activeSerialPort;
    activeSerialPort = null;

    if (port.isOpen) {
      port.close((err) => {
        if (err) console.error("[Serial] Error closing port:", err);
        // Give Windows enough time to fully release the COM port handle
        // 800ms is required on many Windows machines for COM handle cleanup
        setTimeout(() => resolve(true), 800);
      });
    } else {
      resolve(true);
    }
  });
}

// Helper: run a device operation with guaranteed port access
// Does NOT auto-restart the monitor — callers must restart it explicitly if needed
async function withPortAccess<T>(_port: string, operation: () => Promise<T>): Promise<T> {
  await stopMonitorNative();
  return await operation();
}

function setupIpcHandlers() {
  // 1. File System - Open Folder Dialog
  ipcMain.handle("dialog:openFolder", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (!canceled) {
      return filePaths[0];
    }
    return null;
  });

  ipcMain.handle("dialog:openFile", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "Code Files", extensions: ["py", "js", "ts", "json", "html", "css", "md", "txt", "c", "cpp", "h", "hpp"] },
        { name: "All Files", extensions: ["*"] }
      ]
    });
    if (!canceled && filePaths.length > 0) {
      try {
        const filePath = filePaths[0];
        const content = fs.readFileSync(filePath, "utf-8");
        return {
          path: filePath,
          name: path.basename(filePath),
          content: content
        };
      } catch (e: any) {
        return { error: e.message };
      }
    }
    return null;
  });

  ipcMain.handle("fs:readDir", async (_, { dirPath }) => {
    try {
      if (!fs.existsSync(dirPath)) return [];
      const stats = fs.statSync(dirPath);
      if (!stats.isDirectory()) return [];

      const children = fs.readdirSync(dirPath).map((child) => {
        const fullPath = path.join(dirPath, child);
        let isDir = false;
        try {
          isDir = fs.statSync(fullPath).isDirectory();
        } catch (e) { }
        return {
          id: fullPath,
          name: child,
          type: isDir ? "folder" : "file",
          filePath: fullPath,
          children: isDir ? [] : undefined, // Empty array signifies an unloaded folder
        };
      });

      // Sort folders first, then files alphabetically
      return children.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === "folder" ? -1 : 1;
      });
    } catch (e) {
      return [];
    }
  });

  ipcMain.handle("fs:readFile", async (_, { filePath }) => {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      return { content };
    } catch (e) {
      return null;
    }
  });

  ipcMain.handle("fs:createFile", async (_, { filePath, content = "" }) => {
    try {
      fs.writeFileSync(filePath, content, "utf-8");
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  ipcMain.handle("fs:createFolder", async (_, { folderPath }) => {
    try {
      fs.mkdirSync(folderPath, { recursive: true });
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  ipcMain.handle("fs:delete", async (_, { filePath }) => {
    try {
      fs.rmSync(filePath, { recursive: true, force: true });
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  ipcMain.handle("fs:deleteSafe", async (_, { filePath }) => {
    try {
      if (!fs.existsSync(filePath)) return { success: true };
      await shell.trashItem(filePath);
      return { success: true };
    } catch (e: any) {
      // Fallback to rmSync if trashItem fails (e.g. on some Linux distros)
      try {
        fs.rmSync(filePath, { recursive: true, force: true });
        return { success: true };
      } catch (innerE: any) {
        return { success: false, message: e.message + " | " + innerE.message };
      }
    }
  });

  ipcMain.handle("fs:exists", async (_, { filePath }) => {
    try {
      return { success: true, exists: fs.existsSync(filePath) };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  ipcMain.handle("fs:writeFile", async (_, { filePath, content }) => {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, content, "utf-8");
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  ipcMain.handle("fs:readDeep", async (_, { folderPath }) => {
    const IGNORED_DIRS = new Set(['node_modules', '.git', '__pycache__', 'venv', '.venv', 'build', 'dist', '.idea', '.vscode']);
    const MAX_FILE_SIZE = 50 * 1024; // 50KB

    const results: { path: string; content: string }[] = [];

    async function walk(dir: string) {
      try {
        const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
        for (const dirent of dirents) {
          if (IGNORED_DIRS.has(dirent.name) || dirent.name.startsWith('.')) continue;

          const fullPath = path.join(dir, dirent.name);
          if (dirent.isDirectory()) {
            await walk(fullPath);
          } else if (dirent.isFile()) {
            const ext = path.extname(dirent.name).toLowerCase();
            const binExts = ['.exe', '.dll', '.png', '.jpg', '.jpeg', '.gif', '.bin', '.uf2', '.zip', '.tar', '.gz', '.pdf', '.mp4', '.mp3'];
            if (binExts.includes(ext)) continue;

            const stats = await fs.promises.stat(fullPath);
            if (stats.size > MAX_FILE_SIZE) continue;

            const content = await fs.promises.readFile(fullPath, 'utf-8');
            results.push({ path: path.relative(folderPath, fullPath), content });
          }
        }
      } catch (e) {
        // Silently skip inaccessible paths
      }
    }

    await walk(folderPath);
    return results;
  });

  ipcMain.handle("fs:rename", async (_, { oldPath, newPath }) => {
    try {
      fs.renameSync(oldPath, newPath);
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  // API Config / settings.json sync
  ipcMain.handle("saveApiSettings", async (_, config) => {
    try {
      const configDir = path.join(app.getPath("userData"), "config");
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }

      const settingsPath = path.join(configDir, "settings.json");

      // Sensitive data handled in production manner
      const secureConfig = {
        ...config,
        apiKey: encryptValue(config.apiKey),
        updatedAt: new Date().toISOString()
      };

      fs.writeFileSync(settingsPath, JSON.stringify(secureConfig, null, 2), "utf-8");
      return { success: true, path: settingsPath };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  ipcMain.handle("loadApiSettings", async () => {
    try {
      const settingsPath = path.join(app.getPath("userData"), "config", "settings.json");
      if (!fs.existsSync(settingsPath)) return null;

      const content = fs.readFileSync(settingsPath, "utf-8");
      const config = JSON.parse(content);

      // Decrypt for UI usage (if UI needs to see it)
      // Note: In strict proxy mode, UI might not even need the real key
      return {
        ...config,
        apiKey: decryptValue(config.apiKey)
      };
    } catch (e) {
      return null;
    }
  });

  // Reset / Wipe stored API settings (for re-testing setup flow)
  ipcMain.handle("resetApiSettings", async () => {
    try {
      const settingsPath = path.join(app.getPath("userData"), "config", "settings.json");
      if (fs.existsSync(settingsPath)) {
        fs.unlinkSync(settingsPath);
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  // Scan real ports
  ipcMain.handle("hardware:listPorts", async () => {
    return new Promise((resolve) => {
      exec(
        `"${getPythonExe()}" -c "import json,serial.tools.list_ports;print(json.dumps([{'path':p.device,'description':p.description or '','manufacturer':p.manufacturer or ''} for p in serial.tools.list_ports.comports()]))"`,
        { timeout: 10000 },
        (err, stdout) => {
          if (err) {
            resolve([]);
            return;
          }
          try {
            const ports = JSON.parse(stdout.trim());
            resolve(ports);
          } catch {
            console.error(
              "[ElectroAI] Could not parse port list. stdout:",
              stdout,
            );
            resolve([]);
          }
        },
      );
    });
  });

  // Check chip is actually connected — just verify the port can be opened (works for ALL chip types)
  ipcMain.handle("hardware:checkChip", async (_, { port }) => {
    // Use stopMonitorNative() to kill the ENTIRE process tree on Windows.
    await stopMonitorNative();

    return new Promise((resolve) => {
      let resolved = false;
      const done = (result: object) => {
        if (!resolved) {
          resolved = true;
          resolve(result);
        }
      };

      // Enhanced check: Open port, send Ctrl-C + newline, read REPL response
      // to fingerprint what's actually on the other end.
      const checkScript = [
        "import serial, sys, time, json",
        "try:",
        `    s = serial.Serial('${port}', 115200, timeout=2)`,
        "    time.sleep(0.3)",
        "    s.write(bytes([13, 10, 3, 3, 13, 10]))",
        "    time.sleep(0.5)",
        "    resp = s.read(s.in_waiting or 1024).decode('utf-8', errors='replace')",
        "    s.close()",
        "    detected = 'unknown'",
        "    if 'MicroPython' in resp or '>>>' in resp:",
        "        detected = 'micropython'",
        "    elif 'CircuitPython' in resp:",
        "        detected = 'circuitpython'",
        "    elif 'Traceback' in resp:",
        "        detected = 'micropython'",
        "    result = {'connected': True, 'detected': detected, 'raw': resp[:200]}",
        "    print(json.dumps(result))",
        "    sys.stdout.flush()",
        "except Exception as e:",
        "    print(json.dumps({'connected': False, 'message': str(e)}))",
        "    sys.stdout.flush()",
        "    sys.exit(1)",
      ].join("\n");

      const ser = spawn(getPythonExe(), ["-c", checkScript]);

      let out = "";
      let errBuf = "";
      ser.stdout.on("data", (d: Buffer) => (out += d.toString()));
      ser.stderr.on("data", (d: Buffer) => (errBuf += d.toString()));

      ser.on("error", (e: Error) => {
        console.error("[StratumStudio] spawn error:", e.message);
        done({
          connected: false,
          message: `Python not found. Install Python and pyserial.`,
        });
      });

      ser.on("close", (code: number | null) => {
        console.log(
          `[StratumStudio] checkChip python exited code=${code}, stdout="${out.trim()}", stderr="${errBuf.trim()}"`,
        );
        try {
          const parsed = JSON.parse(out.trim());
          done(parsed);
        } catch {
          // Fallback: if stdout is 'ok' (old format) still handle it
          if (out.trim() === "ok") {
            done({ connected: true, detected: 'unknown' });
          } else {
            const msg =
              errBuf.trim() ||
              `Could not open ${port}. Check USB cable, drivers, and close other serial tools.`;
            done({ connected: false, message: msg });
          }
        }
      });

      const timer = setTimeout(() => {
        ser.kill();
        // Timeout on a serial port that's open but no REPL = likely Arduino AVR board
        done({
          connected: true,
          detected: 'no_repl',
          message: `Port opened but no REPL detected — likely an Arduino/AVR board.`,
        });
      }, 8000);

      ser.on("close", () => clearTimeout(timer));
    });
  });

  ipcMain.handle("dialog:saveFile", async (_, { content, defaultName }) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: defaultName ?? "untitled.py",
      filters: [
        { name: "Python", extensions: ["py"] },
        { name: "C/C++", extensions: ["c", "cpp", "ino", "h"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });
    if (canceled || !filePath) return { success: false };
    try {
      fs.writeFileSync(filePath, content, "utf-8");
      return { success: true, filePath, path: filePath };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  ipcMain.handle(
    "hardware:flash",
    async (_, { code, port, language, boardId, deviceName, mode }) => {
      // Must cleanly stop monitor and send Ctrl+C to halt running scripts before flash/run!
      await stopMonitorNative();

      // For MicroPython/CircuitPython: send Ctrl+C to break out of any running loop
      // For Arduino: skip this — Arduino boards don't have a Python REPL to interrupt
      const isArduinoLang = language === 'arduino' || language === 'c';
      if (!isArduinoLang) {
        await new Promise((resolve) => {
          const stopScript = [
            "import serial, sys, time",
            "for attempt in range(3):",
            "    try:",
            `        s = serial.Serial('${port}', 115200, timeout=0.5)`,
            "        s.write(bytes([13, 3, 3, 3]))",
            "        time.sleep(0.2)",
            "        s.close()",
            "        break",
            "    except Exception:",
            "        time.sleep(0.3)",
          ].join("\n");
          const ser = spawn(getPythonExe(), ["-c", stopScript]);
          ser.on("close", resolve);
        });
      }

      return new Promise(async (resolve) => {
        // Use correct file extension based on language
        const ext = isArduinoLang ? '.ino' : '.py';
        const tempFilePath = path.join(os.tmpdir(), `stratum_temp${ext}`);
        try {
          fs.writeFileSync(tempFilePath, code, "utf-8");
        } catch {
          resolve({ success: false, message: "Failed to write temp file" });
          return;
        }

        // Wait for Windows to fully release COM port handles before dispatch
        setTimeout(async () => {
          const uploaderPath = getResourcePath(path.join("firmware-tools", "core", "uploader.py"));

          const args = [
            uploaderPath,
            "--port",
            port,
            "--file",
            tempFilePath,
            "--language",
            language,
            "--board-id",
            boardId ?? "arduino:avr:uno",
          ];

          if (deviceName) {
            args.push("--device-name", deviceName);
          }
          if (mode) {
            args.push("--mode", mode);
          }

          if (mode === "run" && isArduinoLang) {
            // Arduino does not support 'run' mode — it requires compile+upload
            resolve({
              success: false,
              message: "Run mode is not supported for Arduino/C++. Use Compile or Upload instead."
            });
          } else if (mode === "run") {
            // Live stream execution - MicroPython/CircuitPython only
            try {
              if (activeSerialPort) await stopMonitorNative();

              activeSerialPort = new SerialPort({ path: port, baudRate: 115200 });
              activeSerialPort.on("data", (data: Buffer) => {
                if (win) win.webContents.send("terminal-output", data.toString("utf8"));
              });
              activeSerialPort.on("error", () => { activeSerialPort = null; });
              activeSerialPort.on("close", () => { activeSerialPort = null; });

              activeSerialPort.on("open", () => {
                // Send Ctrl+C multiple times to interrupt current loop
                activeSerialPort!.write(Buffer.from('\r\x03\x03', 'utf-8'));

                setTimeout(() => {
                  // Enter Raw REPL
                  activeSerialPort!.write(Buffer.from('\x01', 'utf-8'));

                  setTimeout(() => {
                    // Transmit code
                    activeSerialPort!.write(Buffer.from(code, 'utf-8'));

                    setTimeout(() => {
                      // Execute (Exit Raw REPL)
                      activeSerialPort!.write(Buffer.from('\x04', 'utf-8'));
                      resolve({ success: true, message: "Execution started natively" });
                    }, 100);
                  }, 100);
                }, 200);
              });
            } catch (err: any) {
              resolve({ success: false, message: err.message });
            }
          } else {
            // Flash mode: wait for completion, then start monitor automatically
            execFile(
              getPythonExe(),
              args,
              { timeout: 60000 },
              async (error, stdout, stderr) => {
                if (error) {
                  resolve({
                    success: false,
                    message: stderr.trim() || stdout.trim() || error.message,
                  });
                  return;
                }

                // Wait for port to be fully released, then restart monitor
                const monitorBaud = isArduinoLang ? 9600 : 115200;
                await new Promise(r => setTimeout(r, 500));
                try {
                  if (activeSerialPort) await stopMonitorNative();
                  activeSerialPort = new SerialPort({ path: port, baudRate: monitorBaud });
                  activeSerialPort.on("data", (data: Buffer) => {
                    if (win) win.webContents.send("terminal-output", data.toString("utf8"));
                  });
                  activeSerialPort.on("error", () => { activeSerialPort = null; });
                  activeSerialPort.on("close", () => { activeSerialPort = null; });
                } catch (e) {
                  console.error("Could not resume monitor:", e);
                }

                resolve({
                  success: true,
                  message: stdout.trim() || "Upload complete — device running",
                });
              },
            );
          }
        }, 1000);
      });
    },
  );

  // 4. Hardware - Start Live Serial Monitor
  ipcMain.handle(
    "hardware:startMonitor",
    async (_, { port, baudRate = 115200 }) => {
      if (activeSerialPort) {
        return { success: false, message: "Monitor already running" };
      }

      try {
        activeSerialPort = new SerialPort({ path: port, baudRate });

        // Listen for data and pipe explicitly to frontend as "terminal-output"
        activeSerialPort.on("data", (data: Buffer) => {
          if (win) {
            win.webContents.send("terminal-output", data.toString("utf8"));
          }
        });

        activeSerialPort.on("error", (err) => {
          console.error(`[Serial] Monitor Error:`, err.message);
          if (win) win.webContents.send("terminal-output", `\x1b[31m[Port Error: ${err.message}]\x1b[0m\r\n`);
          activeSerialPort = null;
        });

        activeSerialPort.on("close", () => {
          activeSerialPort = null;
          if (win) win.webContents.send("terminal-output", `\x1b[33m[Port Closed]\x1b[0m\r\n`);
        });

        return { success: true };
      } catch (e: any) {
        return { success: false, message: e.message };
      }
    },
  );

  // 5. Hardware - Stop Live Serial Monitor and Execution
  ipcMain.handle("hardware:stopMonitor", async () => {
    await stopMonitorNative();
    return { success: true };
  });

  // 5.5 Hardware - Explicitly Stop Execution on Device
  let isStoppingExecution = false;
  ipcMain.handle("hardware:stopExecution", async (_, { port }) => {
    if (isStoppingExecution) {
      return { success: false, message: "Stop already in progress" };
    }

    isStoppingExecution = true;
    await stopMonitorNative();

    return new Promise((resolve) => {
      const s = new SerialPort({ path: port, baudRate: 115200 }, (err) => {
        if (err) {
          isStoppingExecution = false;
          return resolve({ success: false, message: err.message });
        }

        // Send Ctrl+C multiple times to ensure break
        s.write(Buffer.from('\r\x03\x03\x03', 'utf-8'), (wErr) => {
          if (wErr) console.error("Error writing break:", wErr);

          setTimeout(() => {
            s.close(() => {
              // Now restart standard monitor automatically using our native logic
              try {
                activeSerialPort = new SerialPort({ path: port, baudRate: 115200 });
                activeSerialPort.on("data", (data: Buffer) => {
                  if (win) win.webContents.send("terminal-output", data.toString("utf8"));
                });
                activeSerialPort.on("error", () => { activeSerialPort = null; });
                activeSerialPort.on("close", () => { activeSerialPort = null; });
              } catch (e) {
                console.error("Could not resume monitor automatically:", e);
              }

              isStoppingExecution = false;
              resolve({ success: true });
            });
          }, 400);
        });
      });
    });
  });

  // 6. Hardware - Device File System (List Files)
  ipcMain.handle("hardware:listFiles", async (_event, { port }) => {
    return withPortAccess(port, () => {
      return new Promise((resolve) => {
        const scriptPath = getResourcePath(path.join("firmware-tools", "core", "fs_manager.py"));

        exec(
          `"${getPythonExe()}" "${scriptPath}" --port ${port} --action list`,
          { timeout: 30000 },
          (error, stdout) => {
            if (error) {
              console.error('[ElectroAI] listFiles error:', error.message);
              resolve({ error: "Failed to read device" });
              return;
            }
            try {
              const files = JSON.parse(stdout.trim());
              resolve(files);
            } catch (e) {
              console.error('[ElectroAI] listFiles parse error:', stdout);
              resolve({ error: "Invalid data from device" });
            }
          },
        );
      });
    });
  });

  // 7. Hardware - Device File System (Read File)
  ipcMain.handle("hardware:readFile", async (_event, { port, filePath }) => {
    return withPortAccess(port, () => {
      return new Promise((resolve) => {
        const scriptPath = getResourcePath(path.join("firmware-tools", "core", "fs_manager.py"));

        exec(
          `"${getPythonExe()}" "${scriptPath}" --port ${port} --action read --path "${filePath}"`,
          { timeout: 30000 },
          (error, stdout, stderr) => {
            if (error) {
              console.error("[ElectroAI] readFile error:", error.message);
              resolve({ error: stderr || error.message });
              return;
            }

            try {
              const data = JSON.parse(stdout.trim());
              resolve(data);  // ✅ RETURN FULL OBJECT
            } catch (e) {
              console.error("[ElectroAI] readFile parse error:", stdout);
              resolve({ error: "Invalid response from device" });
            }
          }
        );
      });
    });
  });

  // 7.5 Hardware - Device File System (Write File)
  ipcMain.handle(
    "hardware:writeFile",
    async (_event, { port, filePath, content }) => {
      return withPortAccess(port, () => {
        return new Promise((resolve) => {
          const tempFilePath = path.join(
            os.tmpdir(),
            "electro_write_temp_" + Date.now() + ".py",
          );
          try {
            fs.writeFileSync(tempFilePath, content, "utf-8");
          } catch (e) {
            resolve({ success: false, message: "Temp file error" });
            return;
          }

          const scriptPath = getResourcePath(path.join("firmware-tools", "core", "fs_manager.py"));
          execFile(
            getPythonExe(),
            [
              scriptPath,
              "--port",
              port,
              "--action",
              "write",
              "--path",
              filePath,
              "--localpath",
              tempFilePath,
            ],
            { timeout: 30000 },
            (error, stderr) => {
              // clean up safely
              try {
                fs.unlinkSync(tempFilePath);
              } catch (e) { }

              if (error) {
                console.error('[ElectroAI] writeFile error:', stderr || error.message);
                resolve({ success: false, message: stderr || error.message });
              } else {
                console.log('[ElectroAI] writeFile success:', filePath);
                resolve({ success: true });
              }
            },
          );
        });
      });
    },
  );

  // 7.6 Hardware - Device File System (Delete File)
  ipcMain.handle("hardware:deleteFile", async (_event, { port, filePath }) => {
    return withPortAccess(port, () => {
      return new Promise((resolve) => {
        const scriptPath = getResourcePath(path.join("firmware-tools", "core", "fs_manager.py"));

        exec(
          `"${getPythonExe()}" "${scriptPath}" --port ${port} --action delete --path "${filePath}"`,
          { timeout: 30000 },
          (error, stdout) => {
            if (error) {
              resolve({ success: false, message: "Failed to delete device file" });
              return;
            }
            try {
              const data = JSON.parse(stdout.trim());
              resolve(data);
            } catch (e) {
              resolve({ success: false, message: "Invalid output from device" });
            }
          },
        );
      });
    });
  });

  // 7.7 Hardware - Device File System (Rename File)
  ipcMain.handle("hardware:renameFile", async (_event, { port, oldPath, newPath }) => {
    return withPortAccess(port, () => {
      return new Promise((resolve) => {
        const scriptPath = getResourcePath(path.join("firmware-tools", "core", "fs_manager.py"));

        exec(
          `"${getPythonExe()}" "${scriptPath}" --port ${port} --action rename --path "${oldPath}" --newpath "${newPath}"`,
          { timeout: 30000 },
          (error, stdout) => {
            if (error) {
              resolve({ success: false, message: "Failed to rename device file" });
              return;
            }
            try {
              const data = JSON.parse(stdout.trim());
              resolve(data);
            } catch (e) {
              resolve({ success: false, message: "Invalid output from device" });
            }
          },
        );
      });
    });
  });

  // 8. AI Engine - Generate Code (Proxied through Main)
  ipcMain.handle("ai:generate", async (_, payload) => {
    try {
      // 1. Load and decrypt configuration
      const settingsPath = path.join(app.getPath("userData"), "config", "settings.json");
      if (!fs.existsSync(settingsPath)) {
        throw new Error("API Settings not configured. Go to Tools > Settings.");
      }

      const content = fs.readFileSync(settingsPath, "utf-8");
      const config = JSON.parse(content);
      const decryptedKey = decryptValue(config.apiKey);

      // 2. Forward request to MCP Server which handles context composition
      //    IMPORTANT: Use Node.js native http.request, NOT fetch.
      //    Electron's production build routes `fetch` through Chromium's net
      //    stack, which can silently fail on localhost connections.
      const requestBody = JSON.stringify({
        ...payload,
        apiConfig: {
          ...config,
          apiKey: decryptedKey
        }
      });

      const result: any = await new Promise((resolve, reject) => {
        const req = http.request(
          {
            hostname: "127.0.0.1",
            port: 4000,
            path: "/api/v1/ai/generate",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(requestBody),
            },
          },
          (res: any) => {
            let body = "";
            res.on("data", (chunk: any) => (body += chunk));
            res.on("end", () => {
              try {
                const json = JSON.parse(body);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                  resolve(json);
                } else {
                  reject(new Error(json.error || `MCP Server error: ${res.statusCode}`));
                }
              } catch {
                reject(new Error(`MCP Server returned invalid JSON (status ${res.statusCode})`));
              }
            });
          }
        );

        req.on("error", (err: any) => {
          reject(new Error(`Cannot reach MCP Server: ${err.message}. Is it running?`));
        });

        req.write(requestBody);
        req.end();
      });

      // The result from MCP server is { success: true, data: { ... } }
      return {
        success: true,
        response_text: result.data
      };
    } catch (e: any) {
      console.error("[AiProxy] Generation failed:", e);
      return { success: false, error: { type: "RUNTIME", message: e.message } };
    }
  });

  // 9. Window Controls
  ipcMain.handle("window:minimize", () => {
    win?.minimize();
  });
  ipcMain.handle("window:maximize", () => {
    if (win?.isMaximized()) {
      win.unmaximize();
    } else {
      win?.maximize();
    }
  });
  ipcMain.handle("window:close", () => {
    win?.close();
  });

  // 10. Terminal REPL Input — write to the serial monitor's stdin
  ipcMain.handle("terminal:sendInput", async (_, data: string) => {
    if (activeSerialPort && activeSerialPort.isOpen) {
      try {
        activeSerialPort.write(data);
        return { success: true };
      } catch (e: any) {
        return { success: false, message: e.message };
      }
    }
    return { success: false, message: "No active serial monitor" };
  });

  // 10.5. Local Shell (PTY) Integrations
  ipcMain.handle("pty:start", async (_, workspacePath) => {
    if (ptyProcess) {
      try { ptyProcess.kill(); } catch (e) { }
    }

    const shellCommand = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
    try {
      ptyProcess = pty.spawn(shellCommand, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: workspacePath || os.homedir(),
        env: process.env as any
      });

      ptyProcess.onData((data) => {
        if (win) win.webContents.send("pty:output", data);
      });

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  });

  ipcMain.handle("pty:input", async (_, data: string) => {
    if (ptyProcess) {
      ptyProcess.write(data);
      return { success: true };
    }
    return { success: false, message: "No active shell process" };
  });

  ipcMain.handle("hardware:checkArduinoCli", async () => {
    return new Promise((resolve) => {
      exec("arduino-cli version", (err) => {
        if (!err) {
          resolve(true);
        } else {
          // Also check our custom install location
          const cliExe = path.join(app.getPath('userData'), 'bin', 'arduino-cli.exe');
          if (fs.existsSync(cliExe)) {
            // Add to PATH for this session so all future calls find it
            const binDir = path.join(app.getPath('userData'), 'bin');
            process.env.PATH = `${binDir};${process.env.PATH}`;
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  });

  ipcMain.handle("hardware:installArduinoCli", async () => {
    // Download arduino-cli from GitHub Releases (reliable, no script dependency)
    const binDir = path.join(app.getPath('userData'), 'bin');
    const cliExe = path.join(binDir, 'arduino-cli.exe');

    if (fs.existsSync(cliExe)) {
      console.log("[StratumStudio] arduino-cli already exists at", cliExe);
      return { success: true, message: 'Already installed' };
    }

    return new Promise((resolve) => {
      // Build a robust PowerShell script that:
      // 1. Downloads arduino-cli ZIP from GitHub Releases
      // 2. Kills any lingering arduino-cli processes
      // 3. Clears corrupted staging packages
      // 4. Installs with retry logic
      const psScript = [
        "$ErrorActionPreference = 'Stop'",
        "try {",
        `  $binDir = '${binDir.replace(/\\/g, '\\\\')}'`,
        "  if (-not (Test-Path $binDir)) { New-Item -ItemType Directory -Path $binDir -Force | Out-Null }",
        "  $zipPath = Join-Path $env:TEMP 'arduino-cli.zip'",
        "  $extractDir = Join-Path $env:TEMP 'arduino-cli-extract'",
        "  ",
        "  Write-Host 'Fetching latest arduino-cli version...'",
        "  $release = Invoke-RestMethod -Uri 'https://api.github.com/repos/arduino/arduino-cli/releases/latest'",
        "  $tag = $release.tag_name",
        "  $ver = $tag -replace '^v', ''",
        '  $url = "https://github.com/arduino/arduino-cli/releases/download/$tag/arduino-cli_" + $ver + "_Windows_64bit.zip"',
        '  Write-Host "Downloading arduino-cli $tag from $url"',
        "  ",
        "  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12",
        "  Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing",
        "  ",
        "  Write-Host 'Extracting...'",
        "  if (Test-Path $extractDir) { Remove-Item $extractDir -Recurse -Force }",
        "  Expand-Archive -Path $zipPath -DestinationPath $extractDir -Force",
        "  ",
        "  Copy-Item (Join-Path $extractDir 'arduino-cli.exe') $binDir -Force",
        "  Remove-Item $zipPath -Force -ErrorAction SilentlyContinue",
        "  Remove-Item $extractDir -Recurse -Force -ErrorAction SilentlyContinue",
        "  ",
        '  $env:PATH = "$binDir;$env:PATH"',
        "  $cli = Join-Path $binDir 'arduino-cli.exe'",
        "  ",
        "  # Kill any lingering arduino-cli processes that may lock staging files",
        "  Get-Process -Name 'arduino-cli' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue",
        "  Start-Sleep -Seconds 1",
        "  ",
        "  # Clear corrupted staging packages if they exist",
        "  $stagingDir = Join-Path $env:LOCALAPPDATA 'Arduino15\\staging\\packages'",
        "  if (Test-Path $stagingDir) {",
        "    Write-Host 'Clearing staging packages...'",
        "    Remove-Item (Join-Path $stagingDir '*') -Recurse -Force -ErrorAction SilentlyContinue",
        "  }",
        "  ",
        "  Write-Host 'Running: arduino-cli core update-index'",
        "  & $cli core update-index",
        "  ",
        "  # Install arduino:avr with retry logic for corrupted archive errors",
        "  $maxRetries = 3",
        "  $installed = $false",
        "  for ($i = 1; $i -le $maxRetries; $i++) {",
        "    Write-Host \"Installing arduino:avr core (attempt $i/$maxRetries)...\"",
        "    $out = & $cli core install arduino:avr 2>&1 | Out-String",
        "    Write-Host $out",
        "    if ($LASTEXITCODE -eq 0) { $installed = $true; break }",
        "    if ($out -match 'corrupted') {",
        "      Write-Host 'Corrupted archive detected. Clearing staging and retrying...'",
        "      if (Test-Path $stagingDir) { Remove-Item (Join-Path $stagingDir '*') -Recurse -Force -ErrorAction SilentlyContinue }",
        "      Start-Sleep -Seconds 2",
        "    } else { break }",
        "  }",
        "  if (-not $installed) { Write-Error 'Failed to install arduino:avr core after retries'; exit 1 }",
        "  ",
        "  Write-Host 'arduino-cli installed successfully'",
        "} catch {",
        "  Write-Error $_.Exception.Message",
        "  exit 1",
        "}",
      ].join("\n");

      // Stream output to renderer terminal
      const child = spawn('powershell', ['-ExecutionPolicy', 'Bypass', '-Command', psScript]);

      child.stdout.on('data', (data: Buffer) => {
        const line = data.toString().trim();
        console.log('[arduino-cli install]', line);
        if (win) win.webContents.send('terminal-output', line + '\n');
      });
      child.stderr.on('data', (data: Buffer) => {
        const line = data.toString().trim();
        console.error('[arduino-cli install error]', line);
        if (win) win.webContents.send('terminal-output', '❌ ' + line + '\n');
      });

      child.on('close', (code: number | null) => {
        if (code === 0) {
          // Add to process PATH for this session
          process.env.PATH = `${binDir};${process.env.PATH}`;
          console.log('[StratumStudio] arduino-cli installed to', binDir);
          resolve({ success: true });
        } else {
          resolve({ success: false, message: `Installation failed with exit code ${code}` });
        }
      });

      child.on('error', (e: Error) => {
        resolve({ success: false, message: e.message });
      });
    });
  });

  // ── Helper functions for native package downloads ──
  async function fetchUrlContent(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      client.get(url, (res: any) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          fetchUrlContent(res.headers.location!).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch ${url}, status: ${res.statusCode}`));
          return;
        }
        let body = '';
        res.on('data', (chunk: Buffer) => body += chunk.toString());
        res.on('end', () => resolve(body));
      }).on('error', reject);
    });
  }

  async function downloadFileToPath(url: string, destPath: string): Promise<void> {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return new Promise<void>((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      client.get(url, (res: any) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          downloadFileToPath(res.headers.location!, destPath).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}, status: ${res.statusCode}`));
          return;
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', reject);
    });
  }

  async function installMpyPackageLocally(name: string, libDir: string, version: string = 'latest'): Promise<void> {
    if (name.startsWith('http://') || name.startsWith('https://')) {
      if (name.endsWith('.py') || name.endsWith('.mpy')) {
        const fileName = path.basename(name);
        await downloadFileToPath(name, path.join(libDir, fileName));
        return;
      }
    }

    const index = 'https://micropython.org/pi/v2';
    const packageJsonUrl = `${index}/package/py/${name}/${version}.json`;

    console.log(`[lib:install] Downloading package info from ${packageJsonUrl}`);
    const jsonStr = await fetchUrlContent(packageJsonUrl);
    const pkgInfo = JSON.parse(jsonStr);

    if (pkgInfo.hashes) {
      for (const [filePath, fileHash] of pkgInfo.hashes) {
        const fileUrl = `${index}/file/${fileHash.slice(0, 2)}/${fileHash}`;
        const destPath = path.join(libDir, filePath);
        console.log(`[lib:install] Downloading file ${filePath} from ${fileUrl}`);
        await downloadFileToPath(fileUrl, destPath);
      }
    }

    if (pkgInfo.urls) {
      for (const [filePath, fileUrl] of pkgInfo.urls) {
        const destPath = path.join(libDir, filePath);
        console.log(`[lib:install] Downloading url ${filePath} from ${fileUrl}`);
        await downloadFileToPath(fileUrl, destPath);
      }
    }

    if (pkgInfo.deps) {
      for (const [depName, depVer] of pkgInfo.deps) {
        console.log(`[lib:install] Downloading dependency ${depName}`);
        await installMpyPackageLocally(depName, libDir, depVer || 'latest');
      }
    }
  }

  // ── Toolchain verification IPC handlers ──
  ipcMain.handle("hardware:checkMpremote", async () => {
    return new Promise((resolve) => {
      execFile(getPythonExe(), ['-m', 'mpremote', '--version'], (err) => {
        resolve(!err);
      });
    });
  });

  ipcMain.handle("hardware:installMpremote", async () => {
    return new Promise((resolve) => {
      execFile(getPythonExe(), ['-m', 'pip', 'install', 'mpremote'], (err, stdout, stderr) => {
        if (err) {
          resolve({ success: false, message: stderr.trim() || err.message });
        } else {
          resolve({ success: true, message: stdout.trim() });
        }
      });
    });
  });

  // ── Library Manager IPC handlers ──
  ipcMain.handle("lib:search", async (_, { query, language }) => {
    try {
      if (language === 'arduino') {
        const binDir = path.join(app.getPath('userData'), 'bin');
        const cliExe = fs.existsSync(path.join(binDir, 'arduino-cli.exe'))
          ? path.join(binDir, 'arduino-cli.exe')
          : 'arduino-cli';

        return new Promise((resolve) => {
          execFile(cliExe, ['lib', 'search', query, '--format', 'json'], { timeout: 15000 }, (err, stdout) => {
            if (err) {
              console.error('[lib:search] arduino-cli error:', err.message);
              resolve({ success: false, packages: [], message: err.message });
              return;
            }
            try {
              const data = JSON.parse(stdout);
              const packages = (data.libraries || []).slice(0, 30).map((lib: any) => ({
                name: lib.name,
                author: lib.latest?.author || '',
                description: lib.latest?.sentence || '',
                version: lib.latest?.version || '',
                license: lib.latest?.license || 'Unknown'
              }));
              resolve({ success: true, packages });
            } catch {
              resolve({ success: true, packages: [] });
            }
          });
        });
      } else {
        return new Promise((resolve) => {
          https.get('https://micropython.org/pi/v2/index.json', (res: any) => {
            let body = '';
            res.on('data', (chunk: Buffer) => body += chunk.toString());
            res.on('end', () => {
              try {
                const data = JSON.parse(body);
                const packages = (data.packages || [])
                  .filter((p: any) => p.name.toLowerCase().includes(query.toLowerCase()))
                  .slice(0, 30)
                  .map((p: any) => ({
                    name: p.name,
                    author: p.author || '',
                    description: p.description || '',
                    version: p.version || '',
                    license: p.license || 'MIT'
                  }));
                resolve({ success: true, packages });
              } catch {
                resolve({ success: true, packages: [] });
              }
            });
          }).on('error', (e: any) => {
            resolve({ success: false, packages: [], message: e.message });
          });
        });
      }
    } catch (e: any) {
      return { success: false, packages: [], message: e.message };
    }
  });

  ipcMain.handle("lib:install", async (_, { nameOrUrl, workspacePath, language, port, name }) => {
    const pkgName = nameOrUrl || name;
    if (!pkgName) return { success: false, message: "No package name provided" };

    try {
      if (language === 'arduino') {
        const binDir = path.join(app.getPath('userData'), 'bin');
        const cliExe = fs.existsSync(path.join(binDir, 'arduino-cli.exe'))
          ? path.join(binDir, 'arduino-cli.exe')
          : 'arduino-cli';

        return new Promise((resolve) => {
          execFile(cliExe, ['lib', 'install', pkgName], { timeout: 60000 }, (err, stdout, stderr) => {
            if (err) {
              resolve({ success: false, message: stderr.trim() || err.message });
            } else {
              resolve({ success: true, fileName: pkgName, message: stdout.trim() || `Installed ${pkgName}` });
            }
          });
        });
      } else {
        // MicroPython/CircuitPython: Try mpremote first if available
        let mpremoteInstalled = false;
        try {
          mpremoteInstalled = await new Promise((resolve) => {
            execFile(getPythonExe(), ['-m', 'mpremote', '--version'], (err) => {
              resolve(!err);
            });
          });
        } catch { }

        if (mpremoteInstalled) {
          console.log(`[lib:install] mpremote detected. Using mpremote mip install for ${pkgName}`);
          const targetPort = port || '';
          const args = targetPort
            ? ['-m', 'mpremote', 'connect', targetPort, 'mip', 'install', pkgName]
            : ['-m', 'mpremote', 'mip', 'install', pkgName];

          const mpremoteResult = await new Promise<any>((resolve) => {
            execFile(getPythonExe(), args, { timeout: 60000 }, (err, stdout, stderr) => {
              if (err) {
                resolve({ success: false, message: stderr.trim() || err.message });
              } else {
                resolve({ success: true, fileName: pkgName, message: stdout.trim() || `Installed ${pkgName}` });
              }
            });
          });

          if (mpremoteResult.success) {
            return mpremoteResult;
          }
          console.warn(`[lib:install] mpremote mip install failed: ${mpremoteResult.message}. Falling back to native Node.js downloader...`);
        }

        // Fallback: Native Node.js package downloader (directly to local /lib folder)
        if (!workspacePath) {
          return { success: false, message: "No local workspace open to install package." };
        }
        const libDir = path.join(workspacePath, 'lib');
        await installMpyPackageLocally(pkgName, libDir);
        return { success: true, fileName: pkgName, message: `Successfully installed ${pkgName} natively into local /lib directory.` };
      }
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  ipcMain.handle("pty:resize", async (_, { cols, rows }) => {
    if (ptyProcess) {
      ptyProcess.resize(cols, rows);
      return { success: true };
    }
    return { success: false };
  });

  // 11. Firmware - List mounted volumes (for UF2 bootloader detection)
  ipcMain.handle("firmware:listVolumes", async () => {
    try {
      if (process.platform === "win32") {
        // Use WMIC to list removable drives
        return new Promise((resolve) => {
          exec('wmic logicaldisk where "DriveType=2" get DeviceID,VolumeName /format:csv', (err, stdout) => {
            if (err) { resolve([]); return; }
            const lines = stdout.trim().split('\n').filter(l => l.includes(','));
            // Skip header
            const volumes = lines.slice(1).map(line => {
              const parts = line.trim().split(',');
              // CSV format: Node,DeviceID,VolumeName
              const deviceId = parts[1] || '';
              const name = parts[2] || 'Removable Disk';
              return { path: deviceId + '\\', label: `${name} (${deviceId})` };
            }).filter(v => v.path.length > 1);
            resolve(volumes);
          });
        });
      } else if (process.platform === "darwin") {
        const volDir = '/Volumes';
        if (!fs.existsSync(volDir)) return [];
        const entries = fs.readdirSync(volDir);
        return entries.map(name => ({
          path: path.join(volDir, name),
          label: name,
        }));
      } else {
        // Linux: check /media/<user> and /run/media/<user>
        const user = os.userInfo().username;
        const dirs = [`/media/${user}`, `/run/media/${user}`];
        const volumes: { path: string; label: string }[] = [];
        for (const dir of dirs) {
          if (fs.existsSync(dir)) {
            for (const name of fs.readdirSync(dir)) {
              volumes.push({ path: path.join(dir, name), label: name });
            }
          }
        }
        return volumes;
      }
    } catch {
      return [];
    }
  });

  // 12. Firmware - Install (copy UF2/BIN file to target volume with real progress)
  ipcMain.handle("firmware:install", async (_, { sourcePath, targetVolume }) => {
    try {
      if (!fs.existsSync(sourcePath)) {
        return { success: false, message: "Firmware file not found: " + sourcePath };
      }

      const fileName = path.basename(sourcePath);
      const destPath = path.join(targetVolume, fileName);
      const stat = fs.statSync(sourcePath);
      const totalBytes = stat.size;

      if (totalBytes === 0) {
        return { success: false, message: "Firmware file is empty" };
      }

      // Stream-copy with real progress events
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destPath);
      let copiedBytes = 0;

      readStream.on('data', (chunk: any) => {
        copiedBytes += chunk.length;
        const percent = Math.round((copiedBytes / totalBytes) * 100);
        if (win) {
          win.webContents.send('firmware-progress', {
            percent,
            message: `Copying ${fileName}... ${percent}%`,
          });
        }
      });

      return new Promise((resolve) => {
        writeStream.on('finish', () => {
          if (win) {
            win.webContents.send('firmware-progress', {
              percent: 100,
              message: 'Firmware installed successfully!',
              done: true,
            });
          }
          resolve({ success: true });
        });

        writeStream.on('error', (err) => {
          if (win) {
            win.webContents.send('firmware-progress', {
              percent: 0,
              message: err.message,
              error: err.message,
            });
          }
          resolve({ success: false, message: err.message });
        });

        readStream.on('error', (err) => {
          if (win) {
            win.webContents.send('firmware-progress', {
              percent: 0,
              message: err.message,
              error: err.message,
            });
          }
          resolve({ success: false, message: err.message });
        });

        readStream.pipe(writeStream);
      });
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  // 13. Shell - Open external URL in default browser
  ipcMain.handle("shell:openExternal", async (_, url: string) => {
    try {
      await shell.openExternal(url);
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });

  // 14. Firmware - Download firmware from URL with progress
  ipcMain.handle("firmware:download", async (_, { url, fileName }) => {
    try {
      const cacheDir = path.join(app.getPath("userData"), "firmware-cache");
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      const destPath = path.join(cacheDir, fileName);

      // Check cache — if file already exists and is > 0 bytes, skip download
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
        console.log(`[Firmware] Using cached: ${destPath}`);
        if (win) {
          win.webContents.send("firmware-progress", {
            percent: 100,
            message: "Using cached firmware file...",
          });
        }
        return { success: true, filePath: destPath };
      }

      // Download with progress using native https (works in production)
      return new Promise((resolve) => {
        const doDownload = (downloadUrl: string, redirectCount = 0) => {
          if (redirectCount > 5) {
            resolve({ success: false, message: "Too many redirects" });
            return;
          }

          const httpModule = downloadUrl.startsWith("https") ? https : http;
          httpModule.get(downloadUrl, (res: any) => {
            // Handle redirects (301, 302, 303, 307, 308)
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              const redirectUrl = res.headers.location;
              const redirectModule = redirectUrl.startsWith("https") ? https : http;
              // Use the redirect module for the new URL
              redirectModule.get(redirectUrl, (res2: any) => {
                if (res2.statusCode >= 300 && res2.statusCode < 400 && res2.headers.location) {
                  doDownload(res2.headers.location, redirectCount + 2);
                  return;
                }
                handleResponse(res2);
              }).on("error", (err: any) => {
                resolve({ success: false, message: `Download failed: ${err.message}` });
              });
              return;
            }

            handleResponse(res);
          }).on("error", (err: any) => {
            resolve({ success: false, message: `Download failed: ${err.message}` });
          });
        };

        const handleResponse = (res: any) => {
          if (res.statusCode !== 200) {
            resolve({ success: false, message: `Server returned ${res.statusCode}` });
            return;
          }

          const totalBytes = parseInt(res.headers["content-length"] || "0", 10);
          let downloadedBytes = 0;
          const fileStream = fs.createWriteStream(destPath);

          res.on("data", (chunk: any) => {
            downloadedBytes += chunk.length;
            if (totalBytes > 0) {
              const percent = Math.round((downloadedBytes / totalBytes) * 100);
              if (win) {
                win.webContents.send("firmware-progress", {
                  percent,
                  message: `Downloading ${fileName}... ${(downloadedBytes / 1024 / 1024).toFixed(1)} MB`,
                });
              }
            } else {
              if (win) {
                win.webContents.send("firmware-progress", {
                  percent: -1,
                  message: `Downloading ${fileName}... ${(downloadedBytes / 1024 / 1024).toFixed(1)} MB`,
                });
              }
            }
          });

          res.pipe(fileStream);

          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`[Firmware] Downloaded: ${destPath}`);
            resolve({ success: true, filePath: destPath });
          });

          fileStream.on("error", (err: any) => {
            fs.unlinkSync(destPath); // Clean up partial file
            resolve({ success: false, message: err.message });
          });
        };

        doDownload(url);
      });
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  });
}

function startMcpServer(retryCount = 0) {
  const mcpPath = getResourcePath(path.join("mcp-server", "src", "server.js"));
  const mcpRoot = getResourcePath("mcp-server");

  if (fs.existsSync(mcpPath)) {
    console.log(`[ElectroAI] Starting MCP Server at ${mcpPath}...`);
    // Use the bundled Node.js executable provided by Electron!
    // This allows it to run even if Node.js isn't installed.
    mcpProcess = spawn(process.execPath, [mcpPath], {
      cwd: mcpRoot,
      stdio: "pipe",
      env: {
        ...process.env,
        ELECTRON_RUN_AS_NODE: "1",
        PORT: "4000",
        WS_PORT: "4001",
        // Ensure require() can find node_modules in the bundled mcp-server
        NODE_PATH: path.join(mcpRoot, "node_modules"),
      }
    });

    const mcpLogFile = path.join(app.getPath('userData'), 'mcp_debug.log');
    fs.appendFileSync(mcpLogFile, `\n--- STARTING MCP SERVER at ${new Date().toISOString()} ---\n`);
    fs.appendFileSync(mcpLogFile, `mcpPath: ${mcpPath}\ncwd: ${mcpRoot}\nNODE_PATH: ${path.join(mcpRoot, "node_modules")}\nretry: ${retryCount}\n`);

    mcpProcess.stdout?.on("data", data => {
      console.log(`[MCP] ${data}`);
      fs.appendFileSync(mcpLogFile, `[STDOUT] ${data}`);
    });

    mcpProcess.stderr?.on("data", data => {
      console.error(`[MCP] ${data}`);
      fs.appendFileSync(mcpLogFile, `[STDERR] ${data}`);
    });

    mcpProcess.on("error", (err) => {
      console.error("[ElectroAI] Failed to start MCP Server:", err);
      fs.appendFileSync(mcpLogFile, `[SPAWN ERROR] ${err.message}\n${err.stack}\n`);
    });

    mcpProcess.on("close", (code) => {
      console.log(`[ElectroAI] MCP Server exited with code ${code}`);
      fs.appendFileSync(mcpLogFile, `[EXIT] Code ${code}\n`);
      mcpProcess = null;

      // Auto-restart on crash (max 3 attempts)
      if (code !== 0 && code !== null && retryCount < 3) {
        console.log(`[ElectroAI] MCP crashed — restarting (attempt ${retryCount + 1}/3)...`);
        fs.appendFileSync(mcpLogFile, `[RESTART] Attempt ${retryCount + 1}/3\n`);
        setTimeout(() => startMcpServer(retryCount + 1), 2000);
      }
    });
  } else {
    console.warn(`[ElectroAI] MCP Server not found at ${mcpPath}`);
    const mcpLogFile = path.join(app.getPath('userData'), 'mcp_debug.log');
    fs.appendFileSync(mcpLogFile, `\n[NOT FOUND] ${mcpPath}\nresourcesPath: ${process.resourcesPath}\nisPackaged: ${app.isPackaged}\n`);
  }
}

// --- APP LIFECYCLE ---

function killAllProcesses() {
  if (activeSerialPort) {
    try {
      activeSerialPort.close();
    } catch { }
  }
  if (ptyProcess) {
    try {
      ptyProcess.kill();
    } catch { }
  }
  if (mcpProcess) {
    try {
      if (process.platform === "win32" && mcpProcess.pid) {
        execSync(`taskkill /pid ${mcpProcess.pid} /T /F`, { stdio: "ignore" });
      } else {
        mcpProcess.kill("SIGKILL");
      }
    } catch { }
  }
}

app.on("before-quit", () => {
  killAllProcesses();
});

app.on("window-all-closed", () => {
  killAllProcesses();
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (gotTheLock) {
  app.whenReady().then(() => {
    setupIpcHandlers();
    startMcpServer();
    createWindow();
    setTimeout(() => autoUpdater.checkForUpdates(), 3000);
  });
}