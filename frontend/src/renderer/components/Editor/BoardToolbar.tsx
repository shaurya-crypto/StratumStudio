import { useState } from 'react';
import { Play, Square, Upload, Check, Flame, RefreshCw } from 'lucide-react';
import { useAppStore, FQBN_MAP, isFileMatchingInterpreter, getFileGuardMessage } from '../../store/useAppStore';

export default function BoardToolbar() {
  const {
    interpreter,
    isConnected,
    selectedPort,
    isFlashing,
    runExecution,
    stopExecution,
    tabs,
    activeTabId,
    showNotification,
    addTerminalLine,
    activeTerminalId,
    setTerminalOpen,
    clearTerminal
  } = useAppStore();

  const [isCompiling, setIsCompiling] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const lang = interpreter?.language;
  const isArduino = lang === 'arduino';
  const isPython = lang === 'micropython' || lang === 'circuitpython';

  // ── File guard: block actions if file extension doesn't match interpreter ──
  const checkFileGuard = (): boolean => {
    if (!activeTab) {
      showNotification('No file open. Open or create a file first.', 'warning');
      return false;
    }
    if (!interpreter) {
      showNotification('No interpreter selected. Select one from the Device panel.', 'warning');
      return false;
    }
    if (!isFileMatchingInterpreter(activeTab.name, interpreter.language)) {
      showNotification(getFileGuardMessage(interpreter.language), 'warning');
      return false;
    }
    return true;
  };

  // ── Connection guard ──
  const checkConnection = (): boolean => {
    if (!isConnected || !selectedPort) {
      showNotification('Not connected to a port. Connect a device first.', 'error');
      return false;
    }
    const store = useAppStore.getState();
    const mismatch = store.checkBoardMismatch();
    if (mismatch) {
      store.showErrorOverlay(mismatch);
      return false;
    }
    return true;
  };

  // ── Python handlers ──
  const handlePythonRun = async () => {
    if (!checkFileGuard()) return;
    if (!checkConnection()) return;
    await runExecution();
  };

  const handlePythonStop = async () => {
    await stopExecution();
  };

  const handlePythonUpload = async () => {
    if (!activeTab) return;
    if (!checkConnection()) return;
    const store = useAppStore.getState();
    if (activeTab.source === 'device') {
      await store.saveToDevice();
    } else {
      store.setSavePromptOpen(true);
    }
  };

  // ── Arduino handlers ──
  const getFqbn = (): string => {
    return FQBN_MAP[interpreter?.id ?? ''] ?? 'arduino:avr:uno';
  };

  const handleArduinoCompile = async () => {
    if (!checkFileGuard()) return;
    if (!checkConnection()) return;
    setIsCompiling(true);
    clearTerminal(activeTerminalId);
    setTerminalOpen(true);
    const fqbn = getFqbn();
    addTerminalLine(activeTerminalId, `> Compiling sketch: ${activeTab!.name} [FQBN: ${fqbn}]...`);
    try {
      const response = await (window as any).electronAPI.flash({
        code: activeTab!.content,
        port: selectedPort,
        language: 'arduino',
        boardId: fqbn,
        deviceName: activeTab!.name,
        mode: 'compile'
      });
      if (response.success) {
        addTerminalLine(activeTerminalId, `✨ SUCCESS: ${response.message}`);
        showNotification('Sketch compiled successfully!', 'success');
      } else {
        addTerminalLine(activeTerminalId, `❌ Error compiling sketch:\n${response.message}`);
        showNotification('Sketch compilation failed. See terminal.', 'error');
      }
    } catch (e: any) {
      addTerminalLine(activeTerminalId, `❌ Exception: ${e.message || String(e)}`);
      showNotification('Compilation encountered an unexpected error.', 'error');
    } finally {
      setIsCompiling(false);
      addTerminalLine(activeTerminalId, '');
      addTerminalLine(activeTerminalId, '>>>');
    }
  };

  const handleArduinoUpload = async () => {
    if (!checkFileGuard()) return;
    if (!checkConnection()) return;
    setIsUploading(true);
    clearTerminal(activeTerminalId);
    setTerminalOpen(true);
    const fqbn = getFqbn();
    addTerminalLine(activeTerminalId, `> Uploading sketch: ${activeTab!.name} to ${selectedPort} [FQBN: ${fqbn}]...`);
    try {
      const response = await (window as any).electronAPI.flash({
        code: activeTab!.content,
        port: selectedPort,
        language: 'arduino',
        boardId: fqbn,
        deviceName: activeTab!.name,
        mode: 'flash'
      });
      if (response.success) {
        addTerminalLine(activeTerminalId, `✨ SUCCESS: ${response.message}`);
        showNotification('Sketch uploaded successfully!', 'success');
      } else {
        addTerminalLine(activeTerminalId, `❌ Error uploading sketch:\n${response.message}`);
        showNotification('Upload failed. See terminal for details.', 'error');
      }
    } catch (e: any) {
      addTerminalLine(activeTerminalId, `❌ Exception: ${e.message || String(e)}`);
      showNotification('Upload encountered an unexpected error.', 'error');
    } finally {
      setIsUploading(false);
      addTerminalLine(activeTerminalId, '');
      addTerminalLine(activeTerminalId, '>>>');
    }
  };

  const handleArduinoBurn = async () => {
    if (!checkConnection()) return;
    setIsBurning(true);
    clearTerminal(activeTerminalId);
    setTerminalOpen(true);
    const fqbn = getFqbn();
    addTerminalLine(activeTerminalId, `> Burning bootloader on ${selectedPort} [FQBN: ${fqbn}] (${interpreter?.label ?? 'Arduino'})...`);
    try {
      const response = await (window as any).electronAPI.flash({
        code: activeTab ? activeTab.content : '',
        port: selectedPort,
        language: 'arduino',
        boardId: fqbn,
        deviceName: activeTab ? activeTab.name : 'sketch.ino',
        mode: 'burn_bootloader'
      });
      if (response.success) {
        addTerminalLine(activeTerminalId, `✨ SUCCESS: ${response.message}`);
        showNotification('Bootloader burned successfully!', 'success');
      } else {
        addTerminalLine(activeTerminalId, `❌ Error burning bootloader:\n${response.message}`);
        showNotification('Bootloader burn failed. See terminal.', 'error');
      }
    } catch (e: any) {
      addTerminalLine(activeTerminalId, `❌ Exception: ${e.message || String(e)}`);
      showNotification('Bootloader burn encountered an unexpected error.', 'error');
    } finally {
      setIsBurning(false);
      addTerminalLine(activeTerminalId, '');
      addTerminalLine(activeTerminalId, '>>>');
    }
  };

  // ── Styles ──
  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 500,
    background: 'var(--bg-elevated)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: 'var(--shadow-sm)',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0 8px',
  };

  // ── Render: Python modes (run, stop, upload) ──
  if (isPython || !isArduino) {
    return (
      <div style={containerStyle}>
        <button
          onClick={handlePythonRun}
          disabled={isFlashing}
          title="Run Current File (F5)"
          style={{
            ...btnStyle,
            borderColor: 'var(--primary)',
            color: 'var(--primary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary-glow)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-elevated)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <Play size={14} fill="currentColor" />
          <span>Run</span>
        </button>

        <button
          onClick={handlePythonStop}
          title="Stop Execution"
          style={{
            ...btnStyle,
            borderColor: 'var(--red)',
            color: 'var(--red)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-elevated)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <Square size={14} fill="currentColor" />
          <span>Stop</span>
        </button>

        <button
          onClick={handlePythonUpload}
          title="Upload / Save (F7)"
          style={btnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-hover)';
            e.currentTarget.style.borderColor = 'var(--text-muted)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-elevated)';
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <Upload size={14} />
          <span>Upload</span>
        </button>
      </div>
    );
  }

  // ── Render: Arduino modes (compile, upload, burn_bootloader) ──
  return (
    <div style={containerStyle}>
      <button
        onClick={handleArduinoCompile}
        disabled={isCompiling}
        title="Compile Sketch (F5)"
        style={{
          ...btnStyle,
          borderColor: 'var(--primary)',
          color: 'var(--primary)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--primary-glow)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        {isCompiling ? (
          <RefreshCw size={14} className="spin" />
        ) : (
          <Check size={14} strokeWidth={3} />
        )}
        <span>Compile</span>
      </button>

      <button
        onClick={handleArduinoUpload}
        disabled={isUploading}
        title="Upload Sketch (F7)"
        style={{
          ...btnStyle,
          borderColor: 'var(--accent)',
          color: 'var(--accent)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(52, 211, 153, 0.1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        {isUploading ? (
          <RefreshCw size={14} className="spin" />
        ) : (
          <Upload size={14} />
        )}
        <span>Upload</span>
      </button>

      <button
        onClick={handleArduinoBurn}
        disabled={isBurning}
        title="Burn Bootloader"
        style={{
          ...btnStyle,
          borderColor: '#f59e0b',
          color: '#f59e0b',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        {isBurning ? (
          <RefreshCw size={14} className="spin" />
        ) : (
          <Flame size={14} />
        )}
        <span>Burn Bootloader</span>
      </button>
    </div>
  );
}
