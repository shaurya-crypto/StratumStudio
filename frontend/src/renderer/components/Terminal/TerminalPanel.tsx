import { useRef, useEffect, useState } from 'react'
import { Trash2, Zap, Copy, Radio, SquareTerminal, FileOutput, Plus, X } from 'lucide-react'
import { Terminal } from 'xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import 'xterm/css/xterm.css'
import { useAppStore } from '../../store/useAppStore'
import { isElectron } from '../../utils/electron'

type TerminalTabId = string

const TERMINAL_TABS = [
  { id: 'output',   label: 'Output',         icon: <FileOutput size={13} /> },
  { id: 'terminal', label: 'Local Shell',    icon: <SquareTerminal size={13} /> },

]

export default function TerminalPanel() {
  const { terminals, activeTerminalId, clearTerminal, isConnected, toggleAiPanel, addTerminal } = useAppStore()
  const activeTerminal = terminals.find((t) => t.id === activeTerminalId)

  const [activeTab, setActiveTab] = useState<TerminalTabId>(terminals[0]?.id || 'term-1')

  const serialRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  const serialTerm = useRef<Terminal | null>(null)
  const outputTerm = useRef<Terminal | null>(null)
  const shellTerm = useRef<Terminal | null>(null)

  const serialFit = useRef<FitAddon | null>(null)
  const outputFit = useRef<FitAddon | null>(null)
  const shellFit = useRef<FitAddon | null>(null)

  const outputLinesCount = useRef(0)

  // Initialization: Shell
  useEffect(() => {
    if (!shellTerm.current && shellRef.current) {
      const term = new Terminal({
        theme: { background: '#0A0D14', foreground: '#E2E8F0', cursor: '#6366F1' },
        fontFamily: 'var(--font-code)', fontSize: 13, cursorBlink: true,
      })
      const fit = new FitAddon()
      term.loadAddon(fit)
      const webLinks = new WebLinksAddon((_event, uri) => {
        if (isElectron) (window as any).electronAPI.openExternal(uri);
        else window.open(uri, '_blank');
      });
      term.loadAddon(webLinks)
      term.open(shellRef.current)
      shellTerm.current = term
      shellFit.current = fit

      if (!isElectron) {
        term.writeln('\x1b[33m[Shell not available in browser mode]\x1b[0m')
        return
      }
      
      // Start node-pty
      ;(window as any).electronAPI.ptyStart().then(() => {
        fit.fit()
        ;(window as any).electronAPI.ptyResize(term.cols, term.rows)
      })

      const onDataDisposable = term.onData((data) => {
        ;(window as any).electronAPI.ptyInput(data)
      })

      const removeListener = (window as any).electronAPI.onPtyOutput((data: string) => {
        term.write(data)
      })

      return () => {
        onDataDisposable.dispose()
        removeListener?.()
        term.dispose()
        shellTerm.current = null
      }
    }
  }, [])

  // Initialization: Serial
  useEffect(() => {
    if (!serialTerm.current && serialRef.current) {
      const term = new Terminal({
        theme: { background: '#0A0D14', foreground: '#34D399', cursor: '#34D399' },
        fontFamily: 'var(--font-code)', fontSize: 13, cursorBlink: true,
      })
      const fit = new FitAddon()
      term.loadAddon(fit)
      const webLinks = new WebLinksAddon((_event, uri) => {
        if (isElectron) (window as any).electronAPI.openExternal(uri);
        else window.open(uri, '_blank');
      });
      term.loadAddon(webLinks)
      term.open(serialRef.current)
      serialTerm.current = term
      serialFit.current = fit

      if (!isElectron) {
        term.writeln('\x1b[33m[Serial monitor requires Electron desktop app]\x1b[0m')
        return
      }

      const onDataDisposable = term.onData((data) => {
        ;(window as any).electronAPI.sendTerminalInput(data)
      })

      const removeListener = (window as any).electronAPI.onTerminalOutput((data: string) => {
        term.write(data)
      })

      return () => {
        onDataDisposable.dispose()
        removeListener?.()
        term.dispose()
        serialTerm.current = null
      }
    }
  }, [])
  
  // Initialization: Output
  useEffect(() => {
    if (!outputTerm.current && outputRef.current) {
      const term = new Terminal({
        theme: { background: '#0A0D14', foreground: '#A78BFA', cursor: 'transparent' },
        fontFamily: 'var(--font-code)', fontSize: 13, disableStdin: true,
      })
      const fit = new FitAddon()
      term.loadAddon(fit)
      const webLinks = new WebLinksAddon((_event, uri) => {
        if (isElectron) (window as any).electronAPI.openExternal(uri);
        else window.open(uri, '_blank');
      });
      term.loadAddon(webLinks)
      term.open(outputRef.current)
      term.writeln('\x1b[35m[Stratum Studio IDE System Output]\x1b[0m')
      outputTerm.current = term
      outputFit.current = fit

      return () => {
        term.dispose()
        outputTerm.current = null
      }
    }
  }, [])

  // Sync IDE system macro messages to Serial and Output tabs
  useEffect(() => {
    if (activeTerminal && outputTerm.current) {
      if (activeTerminal.lines.length === 0) {
        outputLinesCount.current = 0
        outputTerm.current.clear()
      } else if (activeTerminal.lines.length > outputLinesCount.current) {
        for (let i = outputLinesCount.current; i < activeTerminal.lines.length; i++) {
          const l = activeTerminal.lines[i]
          outputTerm.current.writeln(l)
          if (l.startsWith('>') || l.startsWith('❌') || l.startsWith('⚠') || l.includes('Error:')) {
             // Let the user see IDE macros in the Serial stream slightly grayed
             serialTerm.current?.writeln(`\x1b[90m${l}\x1b[0m`)
          }
        }
        outputLinesCount.current = activeTerminal.lines.length
      }
    }
  }, [activeTerminal?.lines])

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (activeTab === 'terminal' && shellFit.current && shellTerm.current) {
        shellFit.current.fit()
        if (isElectron) {
          ;(window as any).electronAPI.ptyResize(shellTerm.current.cols, shellTerm.current.rows)
        }
      }
      if (terminals.some(t => t.id === activeTab) && serialFit.current) serialFit.current.fit()
      if (activeTab === 'output' && outputFit.current) outputFit.current.fit()
    }
    window.addEventListener('resize', handleResize)
    setTimeout(handleResize, 20)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeTab])

  const copyCurrentTerminal = () => {
    let term: Terminal | null = null
    if (terminals.some(t => t.id === activeTab)) term = serialTerm.current
    if (activeTab === 'terminal') term = shellTerm.current
    if (activeTab === 'output') term = outputTerm.current

    if (term && term.hasSelection()) {
      navigator.clipboard.writeText(term.getSelection())
      useAppStore.getState().showNotification('Selection copied to clipboard', 'success')
    } else {
      useAppStore.getState().showNotification('Select text in terminal to copy', 'info')
    }
  }

  const askAIToFix = () => {
    let term: Terminal | null = null
    if (terminals.some(t => t.id === activeTab)) term = serialTerm.current
    if (activeTab === 'terminal') term = shellTerm.current
    if (activeTab === 'output') term = outputTerm.current

    const text = term?.hasSelection() ? term.getSelection() : activeTerminal?.lines.slice(-30).join('\n')
    
    if (text) {
      if (!useAppStore.getState().aiPanelOpen) toggleAiPanel()
      useAppStore.getState().setPendingAiPrompt(`Please help me fix or explain this terminal output:\n\n\`\`\`\n${text}\n\`\`\``)
    } else {
      useAppStore.getState().showNotification('Select text in terminal to ask AI', 'info')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)',
        flexShrink: 0, height: 36, gap: 2, padding: '4px 4px 0',
      }}>
        <div style={{ display: 'flex', flex: 1, gap: 2, overflowX: 'auto', WebkitAppRegion: 'no-drag' } as any}>
          {terminals.map((tab) => (
            <button
              key={tab.id}
              className={`terminal-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.id); useAppStore.getState().setActiveTerminal(tab.id); }}
              style={{ position: 'relative' }}
            >
              <Radio size={13} />
              <span>{tab.name}</span>
              {terminals.length > 1 && (
                <span 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    useAppStore.getState().closeTerminal(tab.id); 
                    if (activeTab === tab.id) {
                      const newActive = terminals[0].id === tab.id ? terminals[1].id : terminals[0].id;
                      setActiveTab(newActive); 
                    }
                  }} 
                  style={{ marginLeft: 6, display: 'flex', alignItems: 'center', opacity: 0.5 }}
                >
                  <X size={11} />
                </span>
              )}
            </button>
          ))}

          {TERMINAL_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`terminal-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ position: 'relative' }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
          {/* + button to spawn new terminal instance */}
          <button
            className="icon-btn"
            title="New Terminal"
            onClick={() => { addTerminal(); }}
            style={{ width: 24, height: 24, margin: '2px 0', flexShrink: 0 }}
          >
            <Plus size={13} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', gap: 2, flexShrink: 0 }}>
          <button className="icon-btn" title="Ask AI About Selection" onClick={askAIToFix} style={{ width: 24, height: 24, color: 'var(--accent)' }}>
            <Zap size={13} />
          </button>
          <button className="icon-btn" title="Copy Selection" onClick={copyCurrentTerminal} style={{ width: 24, height: 24 }}>
            <Copy size={13} />
          </button>
          <button className="icon-btn" title="Clear Terminal"
            onClick={() => {
              if (terminals.some(t => t.id === activeTab) && serialTerm.current) { serialTerm.current.clear(); clearTerminal(activeTerminalId) }
              if (activeTab === 'output' && outputTerm.current) { outputTerm.current.clear(); clearTerminal(activeTerminalId) }
              if (activeTab === 'terminal' && shellTerm.current) shellTerm.current.clear()
            }}
            style={{ width: 24, height: 24 }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Terminals Container */}
      <div style={{ flex: 1, position: 'relative', padding: '8px 4px 4px', overflow: 'hidden' }}>
        <div ref={serialRef} style={{ width: '100%', height: '100%', display: terminals.some(t => t.id === activeTab) ? 'block' : 'none', overflow: 'hidden' }} />
        <div ref={outputRef} style={{ width: '100%', height: '100%', display: activeTab === 'output' ? 'block' : 'none', overflow: 'hidden' }} />
        <div ref={shellRef} style={{ width: '100%', height: '100%', display: activeTab === 'terminal' ? 'block' : 'none', overflow: 'hidden' }} />
      </div>

      {/* Disconnected notice for serial */}
      {!isConnected && terminals.some(t => t.id === activeTab) && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '8px 12px', fontSize: 12, color: 'var(--text-dim)',
          background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)',
          flexShrink: 0, gap: 8,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--text-dim)', display: 'inline-block',
          }} />
          Hardware disconnected — connect a device to activate the REPL
        </div>
      )}
    </div>
  )
}