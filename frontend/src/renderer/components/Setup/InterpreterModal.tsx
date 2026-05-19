import { useState } from 'react'
import { X, Cpu, ChevronRight } from 'lucide-react'
import { useAppStore, ALL_INTERPRETERS, Interpreter } from '../../store/useAppStore'

// ── Board Groups — each physical board + all its supported interpreters ──
const BOARD_GROUPS = [
  { name: 'Raspberry Pi Pico',   chip: 'RP2040',        ids: ['pico-mp', 'pico-cp'] },
  { name: 'Raspberry Pi Pico W', chip: 'RP2040+CYW43',  ids: ['picow-mp', 'picow-cp'] },
  { name: 'ESP32',               chip: 'ESP32',          ids: ['esp32-mp', 'esp32-ino'] },
  { name: 'ESP32-S3',            chip: 'ESP32-S3',       ids: ['esp32s3-mp'] },
  { name: 'ESP8266 / NodeMCU',   chip: 'ESP8266',        ids: ['esp8266-mp', 'esp8266-ino'] },
  { name: 'Arduino Uno',         chip: 'ATmega328P',     ids: ['uno-ino'] },
  { name: 'Arduino Nano',        chip: 'ATmega328P',     ids: ['nano-ino'] },
  { name: 'Arduino Mega 2560',   chip: 'ATmega2560',     ids: ['mega-ino'] },
  { name: 'Arduino Micro',       chip: 'ATmega32U4',     ids: ['micro-ino'] },
  { name: 'Arduino Pro Mini',    chip: 'ATmega328P',     ids: ['promini-ino'] },
  { name: 'STM32 (Blue Pill)',   chip: 'STM32F103',      ids: ['stm32-ino'] },
  { name: 'RP2040 (Arduino)',    chip: 'RP2040',         ids: ['rp2040-ino'] },
]

const FILTER_OPTIONS = ['All', 'Raspberry Pi', 'ESP', 'Arduino', 'Other']

// Resolve an interpreter ID to its full Interpreter object
function getInterp(id: string): Interpreter | undefined {
  return ALL_INTERPRETERS.find(i => i.id === id)
}

export default function InterpreterModal() {
  const { setInterpreterModalOpen, interpreter, setInterpreter, showNotification } = useAppStore()
  const [selected, setSelected] = useState<Interpreter | null>(interpreter)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  // Filter board groups based on search + filter tab
  const filteredGroups = BOARD_GROUPS.filter((group) => {
    const matchSearch =
      !search ||
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.chip.toLowerCase().includes(search.toLowerCase()) ||
      group.ids.some(id => {
        const interp = getInterp(id)
        return interp?.langDisplay.toLowerCase().includes(search.toLowerCase())
      })
    if (!matchSearch) return false
    if (filter === 'All') return true
    if (filter === 'Raspberry Pi') return group.chip.startsWith('RP')
    if (filter === 'ESP') return group.chip.startsWith('ESP')
    if (filter === 'Arduino') return group.chip.startsWith('ATmega') || group.chip.startsWith('STM32')
    if (filter === 'Other') {
      return !group.chip.startsWith('RP') && !group.chip.startsWith('ESP') &&
             !group.chip.startsWith('ATmega') && !group.chip.startsWith('STM32')
    }
    return true
  })

  function confirm() {
    setInterpreter(selected)
    setInterpreterModalOpen(false)
    if (selected) {
      showNotification(`Interpreter set: ${selected.label} (${selected.langDisplay})`, 'success')
    }
  }

  function selectLang(id: string) {
    const interp = getInterp(id)
    if (interp) setSelected(interp)
  }

  // Language pill color
  function langColor(lang: string): string {
    if (lang === 'micropython') return '#2ecc71'
    if (lang === 'circuitpython') return '#9b59b6'
    return '#3498db'
  }

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: 620, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header">
          <span>Select Interpreter</span>
          <button className="icon-btn" onClick={() => setInterpreterModalOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
            Select your board, then choose the language/runtime. This sets syntax highlighting, upload toolchain, and device protocol.
          </p>

          {/* Search */}
          <input
            className="form-input"
            placeholder="Search boards or languages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: 10 }}
            autoFocus
          />

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '3px 10px',
                  border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border-light)'}`,
                  background: filter === f ? 'var(--accent-dim)' : 'transparent',
                  color: filter === f ? 'var(--accent)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: 12,
                  borderRadius: 'var(--radius)',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Board Group Cards */}
          <div style={{ flex: 1, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            {filteredGroups.length === 0 && (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                No boards match your search
              </div>
            )}
            {filteredGroups.map((group) => {
              const interpreters = group.ids.map(getInterp).filter(Boolean) as Interpreter[]
              const isActiveGroup = interpreters.some(i => selected?.id === i.id)

              return (
                <div
                  key={group.name}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    background: isActiveGroup ? 'var(--accent-dim)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  {/* Board header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 14px',
                    gap: 10,
                  }}>
                    <Cpu size={16} style={{ color: isActiveGroup ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 600,
                        color: isActiveGroup ? 'var(--accent)' : 'var(--text-primary)',
                      }}>
                        {group.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                        Chip: {group.chip}
                      </div>
                    </div>

                    {/* Language pills */}
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
                      {interpreters.map((interp) => {
                        const isActive = selected?.id === interp.id
                        const pillBg = isActive ? langColor(interp.language) : 'transparent'
                        const pillBorder = langColor(interp.language)
                        const pillColor = isActive ? '#fff' : langColor(interp.language)

                        return (
                          <button
                            key={interp.id}
                            onClick={() => selectLang(interp.id)}
                            title={interp.description}
                            style={{
                              padding: '3px 10px',
                              fontSize: 11,
                              fontWeight: isActive ? 600 : 400,
                              border: `1.5px solid ${pillBorder}`,
                              borderRadius: 12,
                              background: pillBg,
                              color: pillColor,
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {interp.langDisplay}
                          </button>
                        )
                      })}
                    </div>

                    {isActiveGroup && <ChevronRight size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Selected info */}
          {selected && (
            <div style={{
              marginTop: 12, padding: '8px 12px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              fontSize: 12, borderRadius: 'var(--radius)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: langColor(selected.language), flexShrink: 0,
              }} />
              <span style={{ color: 'var(--text-muted)' }}>Selected: </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                {selected.label}
              </span>
              <span style={{ color: 'var(--text-muted)' }}> — {selected.langDisplay} on {selected.chip}</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => { setInterpreter(null); setInterpreterModalOpen(false) }}
          >
            Clear Selection
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" onClick={() => setInterpreterModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={confirm}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}