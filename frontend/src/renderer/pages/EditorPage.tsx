import { useCallback, useRef, useEffect, useState } from 'react'
import { Files, Cpu, Settings, Bot, ChevronDown, ChevronUp, GitBranch, AlertTriangle, Circle } from 'lucide-react'
import { useAppStore, isFileMatchingInterpreter, getFileGuardMessage } from '../store/useAppStore'
import { subscribeToMcp } from '../store/mcpClient'
import MenuBar from '../components/MenuBar/MenuBar'
import FileExplorer from '../components/Sidebar/FileExplorer'
import DevicePanel from '../components/Sidebar/DevicePanel'
import EditorTabs from '../components/Editor/EditorTabs'
import CodeEditor from '../components/Editor/CodeEditor'
import AIPanel from '../components/AI/AIPanel'
import TerminalPanel from '../components/Terminal/TerminalPanel'
import SettingsPanel from '../components/Settings/SettingsPanel'
import InterpreterModal from '../components/Setup/InterpreterModal'
import DeviceBusyOverlay from '../components/DeviceBusyOverlay'
import ErrorOverlay from '../components/ErrorOverlay'
import FirmwareInstallerModal from '../components/MenuBar/FirmwareInstallerModal'
export default function EditorPage() {
  const {
    sidebarView, setSidebarView, sidebarWidth, setSidebarWidth,
    aiPanelOpen, aiPanelWidth, setAiPanelWidth,
    terminalOpen, setTerminalOpen, terminalHeight, setTerminalHeight,
    isConnected, selectedPort,
    tabs, activeTabId,
    settingsOpen, setSettingsOpen,
    interpreterModalOpen,
    theme,
    notification, clearNotification,
    newUntitledTab, saveTab,
    promptConfig, resolvePrompt,
    isDeviceBusy, busyReason,
    firmwareModalOpen,
    interpreter,
    activeBaudRate,
    arduinoCliInstalled,
    installArduinoCli,
    mpremoteInstalled,
    installMpremote
  } = useAppStore()

  // Internal Prompt State
  const [promptValue, setPromptValue] = useState('')
  useEffect(() => {
    if (promptConfig) {
      setPromptValue(promptConfig.defaultValue || '')
    }
  }, [promptConfig])

  const activeTab = tabs.find(t => t.id === activeTabId)
  const isDirty = activeTab ? activeTab.content !== activeTab.savedContent : false

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Bind MCP Live Anomaly Detectors
  useEffect(() => {
    subscribeToMcp('anomaly_detected', (anomalyMsg) => {
      useAppStore.getState().showNotification(`Hardware Alert: ${anomalyMsg}`, 'error')
      // Auto-open AI panel to explain it
      const store = useAppStore.getState()
      if (!store.aiPanelOpen) store.toggleAiPanel()
    })
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'n') { e.preventDefault(); newUntitledTab() }
        if (e.key === 's' && !e.shiftKey) { e.preventDefault(); if (activeTabId) { saveTab(activeTabId) } }
        if (e.key === 'b') { e.preventDefault(); setSidebarView(sidebarView ? null : 'explorer') }
        if (e.key === '`') { e.preventDefault(); setTerminalOpen(!terminalOpen) }
        if (e.key === 'a' && e.shiftKey) { e.preventDefault(); useAppStore.getState().toggleAiPanel() }
        if (e.key === ',') { e.preventDefault(); setSettingsOpen(true) }
      }
      if (e.key === 'F5') {
        e.preventDefault()
        const s = useAppStore.getState()
        const currentTab = s.tabs.find(t => t.id === s.activeTabId)
        if (!currentTab) { s.showNotification('No file open.', 'warning'); return }
        if (!isFileMatchingInterpreter(currentTab.name, s.interpreter?.language)) {
          s.showNotification(getFileGuardMessage(s.interpreter?.language), 'warning')
          return
        }
        if (s.interpreter?.language === 'arduino') {
          // F5 = Compile for Arduino — handled by BoardToolbar click
          // Just trigger the compile button event
          const compileBtn = document.querySelector('[title="Compile Sketch (F5)"]') as HTMLButtonElement
          if (compileBtn) compileBtn.click()
        } else {
          s.runExecution()
        }
      }
      if (e.key === 'F7') {
        e.preventDefault()
        const s = useAppStore.getState()
        const currentTab = s.tabs.find(t => t.id === s.activeTabId)
        if (!currentTab) { s.showNotification('No file open.', 'warning'); return }
        if (!isFileMatchingInterpreter(currentTab.name, s.interpreter?.language)) {
          s.showNotification(getFileGuardMessage(s.interpreter?.language), 'warning')
          return
        }
        if (s.interpreter?.language === 'arduino') {
          const uploadBtn = document.querySelector('[title="Upload Sketch (F7)"]') as HTMLButtonElement
          if (uploadBtn) uploadBtn.click()
        } else {
          const uploadBtn = document.querySelector('[title="Upload / Save (F7)"]') as HTMLButtonElement
          if (uploadBtn) uploadBtn.click()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeTabId, terminalOpen, sidebarView, isConnected, activeTab])

  // Sidebar resize
  const sidebarDragging = useRef(false)
  const onSidebarResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    sidebarDragging.current = true
    const startX = e.clientX
    const startW = sidebarWidth
    const onMove = (ev: MouseEvent) => {
      if (!sidebarDragging.current) return
      setSidebarWidth(startW + ev.clientX - startX)
    }
    const onUp = () => {
      sidebarDragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [sidebarWidth])

  // AI panel resize
  const aiDragging = useRef(false)
  const onAiResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    aiDragging.current = true
    const startX = e.clientX
    const startW = aiPanelWidth
    const onMove = (ev: MouseEvent) => {
      if (!aiDragging.current) return
      setAiPanelWidth(startW - (ev.clientX - startX))
    }
    const onUp = () => {
      aiDragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [aiPanelWidth])

  // Terminal resize
  const termDragging = useRef(false)
  const onTermResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    termDragging.current = true
    const startY = e.clientY
    const startH = terminalHeight
    const onMove = (ev: MouseEvent) => {
      if (!termDragging.current) return
      setTerminalHeight(startH - (ev.clientY - startY))
    }
    const onUp = () => {
      termDragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [terminalHeight])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* ── Menu bar ── */}
      <MenuBar />

      {/* ── Main layout ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Activity bar ── */}
        <div className="activity-bar">
          {[
            { id: 'explorer', icon: <Files size={22} />, title: 'Explorer (Ctrl+B)' },
            { id: 'device',   icon: <Cpu size={22} />,   title: 'Device & Port' },
          ].map(({ id, icon, title }) => (
            <button
              key={id}
              className={`activity-btn ${sidebarView === id ? 'active' : ''}`}
              title={title}
              onClick={() => setSidebarView(sidebarView === id ? null : id as any)}
            >
              {icon}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          <button
            className={`activity-btn ${aiPanelOpen ? 'active' : ''}`}
            title="AI Assistant (Ctrl+Shift+A)"
            onClick={() => useAppStore.getState().toggleAiPanel()}
            style={{ marginBottom: 0 }}
          >
            <Bot size={22} />
          </button>

          <button
            className="activity-btn"
            title="Settings (Ctrl+,)"
            onClick={() => setSettingsOpen(true)}
            style={{ marginBottom: 4 }}
          >
            <Settings size={20} />
          </button>
        </div>

        {/* ── Sidebar ── */}
        {sidebarView && (
          <>
            <div
              className="sidebar"
              style={{ width: sidebarWidth }}
            >
              {sidebarView === 'explorer' && <FileExplorer />}
              {sidebarView === 'device'   && <DevicePanel />}
            </div>
            <div className="resize-x" onMouseDown={onSidebarResize} />
          </>
        )}

        {/* ── Editor + Terminal column ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

          {/* Tab bar */}
          <EditorTabs />

          {/* Editor */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <CodeEditor />
          </div>

          {/* Terminal resize handle */}
          {terminalOpen && (
            <div className="resize-y" onMouseDown={onTermResize} />
          )}

          {/* Terminal */}
          <div style={{
            flexShrink: 0,
            height: terminalOpen ? terminalHeight : 0,
            borderTop: terminalOpen ? '1px solid var(--border)' : 'none',
            overflow: 'hidden',
            background: 'var(--bg-base)',
          }}>
            {terminalOpen && <TerminalPanel />}
          </div>
        </div>

        {/* AI panel resize */}
        {aiPanelOpen && <div className="resize-x" onMouseDown={onAiResize} />}

        {/* AI panel */}
        {aiPanelOpen && (
          <div style={{ width: aiPanelWidth, flexShrink: 0, overflow: 'hidden' }}>
            <AIPanel />
          </div>
        )}
      </div>

      {/* ── Status bar ── */}
      <div className="statusbar">
        {/* Left */}
        <div className="statusbar-item" style={{ color: 'var(--primary)', fontWeight: 600 }}>
          <Cpu size={12} />
          <span>Board: {interpreter?.label ?? 'None'}</span>
        </div>

        <div className="statusbar-item">
          <span>Chip: {interpreter?.chip ?? '—'}</span>
        </div>

        <div className="statusbar-item">
          <span>Lang: {interpreter?.langDisplay ?? '—'}</span>
        </div>

        <div className="statusbar-item">
          <Circle size={7} fill={isConnected ? 'var(--green)' : 'var(--text-dim)'} stroke="none" />
          <span>Port: {isConnected ? selectedPort ?? 'Connected' : 'Not Connected'}</span>
        </div>

        <div className="statusbar-item">
          <span>Baud: {interpreter?.language !== 'arduino' ? 115200 : activeBaudRate}</span>
        </div>

        {interpreter?.language !== 'arduino' ? (
          <div 
            className="statusbar-item" 
            style={{ 
              cursor: mpremoteInstalled ? 'default' : 'pointer',
              background: mpremoteInstalled ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
              color: mpremoteInstalled ? 'var(--text-primary)' : 'var(--red)'
            }}
            onClick={() => {
              if (!mpremoteInstalled) {
                installMpremote();
              }
            }}
            title={mpremoteInstalled ? "mpremote Toolchain Installed" : "Click to Install mpremote Toolchain"}
          >
            <span>
              Toolchain: {mpremoteInstalled ? '✅ mpremote' : '⚠️ mpremote missing — Click to install'}
            </span>
          </div>
        ) : (
          <div 
            className="statusbar-item" 
            style={{ 
              cursor: arduinoCliInstalled ? 'default' : 'pointer',
              background: arduinoCliInstalled ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
              color: arduinoCliInstalled ? 'var(--text-primary)' : 'var(--red)'
            }}
            onClick={() => {
              if (!arduinoCliInstalled) {
                installArduinoCli();
              }
            }}
            title={arduinoCliInstalled ? "Arduino Toolchain Installed" : "Click to Install Arduino Toolchain"}
          >
            <span>
              Toolchain: {arduinoCliInstalled ? '✅ arduino-cli' : '⚠️ arduino-cli missing — Click to install'}
            </span>
          </div>
        )}

        {isDeviceBusy && (
          <div className="statusbar-item" style={{ background: 'var(--yellow-dim)', color: 'var(--yellow)' }} title="Device Busy">
            <AlertTriangle size={11} />
            <span>BUSY: {busyReason}</span>
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Right */}
        {activeTab && (
          <>
            <div className="statusbar-item">
              <span>{activeTab.language.toUpperCase()}</span>
            </div>
            <div className="statusbar-item">
              <GitBranch size={11} />
              <span>main</span>
            </div>
            {isDirty && (
              <div className="statusbar-item" title="Unsaved changes">
                <span>Modified</span>
              </div>
            )}
          </>
        )}

        <div
          className="statusbar-item"
          onClick={() => setTerminalOpen(!terminalOpen)}
          title="Toggle Terminal (Ctrl+`)"
        >
          {terminalOpen ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          <span>Terminal</span>
        </div>
      </div>

      {/* ── Overlays ── */}
      <DeviceBusyOverlay />
      <ErrorOverlay />
      {firmwareModalOpen && <FirmwareInstallerModal />}
      {settingsOpen && <SettingsPanel />}
      {interpreterModalOpen && <InterpreterModal />}

      {/* ── Notification ── */}
      {notification && (
        <div
          className="notification anim-fade"
          style={{
            borderLeftColor:
              notification.type === 'success' ? 'var(--green)' :
              notification.type === 'error'   ? 'var(--red)'   :
              notification.type === 'warning' ? 'var(--yellow)' :
              'var(--accent)',
          }}
          onClick={clearNotification}
        >
          {notification.msg}
        </div>
      )}

      {/* ── Prompt Modal ── */}
      {promptConfig && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="anim-scale-in" style={{ background: 'var(--bg-surface)', padding: 24, borderRadius: 'var(--radius-lg)', width: 320, border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: 14 }}>{promptConfig.msg}</h3>
            <input 
              autoFocus
              value={promptValue} 
              onChange={e => setPromptValue(e.target.value)} 
              style={{ width: '100%', padding: 8, boxSizing: 'border-box', marginBottom: 15, background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 4 }}
              onKeyDown={e => {
                if (e.key === 'Enter') resolvePrompt(promptValue)
                if (e.key === 'Escape') resolvePrompt(null)
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button 
                 onClick={() => resolvePrompt(null)} 
                 style={{ padding: '6px 12px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                 onClick={() => resolvePrompt(promptValue)} 
                 style={{ padding: '6px 12px', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 500 }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}