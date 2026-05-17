import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import {
  ArrowUp, X, Trash2, Copy, Check, Bot, Plus, Paperclip,
  Terminal as TerminalIcon, FileText, ChevronDown, ChevronRight,
  FolderTree, FileCode, Sparkles, CheckCircle2, XCircle,
  Clock, MessageSquare, Key, ExternalLink, Settings, Play,
  Shield, ShieldAlert, Package
} from 'lucide-react'
import { useAppStore, AIMessage, FileNode, AIProvider } from '../../store/useAppStore'
import { currentSessionId } from '../../store/mcpClient'
import { isElectron } from '../../utils/electron'

// ── Provider & Model Configuration ──

interface ProviderConfig {
  id: AIProvider
  name: string
  models: { id: string; label: string; isPro: boolean; isFast?: boolean; note?: string }[]
  keyUrl: string
  keyUrlLabel: string
}

const PROVIDERS: ProviderConfig[] = [
  // ─── OpenAI ───────────────────────────────────────────────
  {
    id: 'openai',
    name: 'OpenAI',
    models: [
      { id: 'auto',          label: 'Auto (Smart Routing)',  isPro: false },
      { id: 'gpt-4.1',       label: 'GPT-4.1',              isPro: true,  note: 'Latest flagship' },
      { id: 'gpt-4o',        label: 'GPT-4o',               isPro: true,  note: 'Fast multimodal' },
      { id: 'o3',            label: 'o3',                    isPro: true,  note: 'Best reasoning' },
      { id: 'o4-mini',       label: 'o4-mini',               isPro: false, note: 'Fast reasoning' },
      { id: 'gpt-4.1-mini',  label: 'GPT-4.1 Mini',         isPro: false, isFast: true, note: 'Balanced' },
      { id: 'gpt-4.1-nano',  label: 'GPT-4.1 Nano',         isPro: false, isFast: true, note: 'Cheapest' },
    ],
    keyUrl: 'https://platform.openai.com/api-keys',
    keyUrlLabel: 'OpenAI Dashboard',
  },

  // ─── Anthropic ────────────────────────────────────────────
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    models: [
      { id: 'auto',                              label: 'Auto (Smart Routing)',  isPro: false },
      { id: 'claude-sonnet-4-5-20251001',         label: 'Claude Sonnet 4.5',    isPro: false, note: 'Best balanced' },
      { id: 'claude-3-7-sonnet-20250219',         label: 'Claude 3.7 Sonnet',    isPro: true,  note: 'Extended thinking' },
      { id: 'claude-haiku-4-5-20251001',          label: 'Claude Haiku 4.5',     isPro: false, isFast: true, note: 'Fastest' },
      { id: 'claude-3-5-sonnet-20241022',         label: 'Claude 3.5 Sonnet',    isPro: false },
    ],
    keyUrl: 'https://console.anthropic.com/settings/keys',
    keyUrlLabel: 'Anthropic Console',
  },

  // ─── Google Gemini ────────────────────────────────────────
  {
    id: 'gemini',
    name: 'Google Gemini',
    models: [
      { id: 'auto',                       label: 'Auto (Smart Routing)',        isPro: false },
      // ── Gemini 2.5 ──
      { id: 'gemini-2.5-pro',             label: 'Gemini 2.5 Pro',              isPro: true,  note: 'Best Google model' },
      { id: 'gemini-2.5-flash',           label: 'Gemini 2.5 Flash',            isPro: false, note: 'Fast with thinking' },
      { id: 'gemini-2.5-flash-lite',      label: 'Gemini 2.5 Flash Lite',       isPro: false, isFast: true, note: 'Cheapest Gemini' },
      // ── Gemini 2.0 ──
      { id: 'gemini-2.0-flash',           label: 'Gemini 2.0 Flash',            isPro: false, isFast: true },
      { id: 'gemini-2.0-flash-lite',      label: 'Gemini 2.0 Flash Lite',       isPro: false, isFast: true },
      // ── Gemini 1.5 ──
      { id: 'gemini-1.5-pro',             label: 'Gemini 1.5 Pro',              isPro: true },
      { id: 'gemini-1.5-flash',           label: 'Gemini 1.5 Flash',            isPro: false, isFast: true },
      { id: 'gemini-1.5-flash-8b',        label: 'Gemini 1.5 Flash 8B',         isPro: false, isFast: true, note: 'Ultra-cheap' },
    ],
    keyUrl: 'https://aistudio.google.com/apikey',
    keyUrlLabel: 'Google AI Studio',
  },

  // ─── Groq ─────────────────────────────────────────────────
  {
    id: 'groq',
    name: 'Groq (Ultra-Fast)',
    models: [
      { id: 'auto',                                              label: 'Auto (Smart Routing)',  isPro: false },
      { id: 'meta-llama/llama-4-scout-17b-16e-instruct',         label: 'Llama 4 Scout 17B',     isPro: false, isFast: true, note: 'MoE' },
      { id: 'llama-3.3-70b-versatile',                           label: 'Llama 3.3 70B',         isPro: true,  note: 'Best open' },
      { id: 'llama-3.1-8b-instant',                              label: 'Llama 3.1 8B',          isPro: false, isFast: true },
      { id: 'deepseek-r1-distill-llama-70b',                     label: 'DeepSeek R1 70B',       isPro: true,  note: 'Reasoning' },
      { id: 'qwen-2.5-coder-32b-instruct',                      label: 'Qwen 2.5 Coder 32B',   isPro: false, note: 'Best for code' },
    ],
    keyUrl: 'https://console.groq.com/keys',
    keyUrlLabel: 'Groq Console',
  },

  // ─── OpenRouter ───────────────────────────────────────────
  {
    id: 'openrouter',
    name: 'OpenRouter',
    models: [
      { id: 'auto',                                    label: 'Auto (Smart Routing)',  isPro: false },
      { id: 'anthropic/claude-sonnet-4-5',              label: 'Claude Sonnet 4.5',    isPro: false },
      { id: 'google/gemini-2.5-pro',                    label: 'Gemini 2.5 Pro',       isPro: true },
      { id: 'openai/o3',                                label: 'OpenAI o3',            isPro: true,  note: 'Reasoning' },
      { id: 'deepseek/deepseek-r1',                     label: 'DeepSeek R1',          isPro: true,  note: 'Open reasoning' },
      { id: 'deepseek/deepseek-chat-v3-0324',           label: 'DeepSeek V3',          isPro: false },
      { id: 'qwen/qwen-2.5-coder-32b-instruct',        label: 'Qwen 2.5 Coder 32B',  isPro: false, note: 'Code' },
      { id: 'meta-llama/llama-4-maverick',              label: 'Llama 4 Maverick',     isPro: false, isFast: true },
    ],
    keyUrl: 'https://openrouter.ai/keys',
    keyUrlLabel: 'OpenRouter',
  },

  // ─── Mistral AI ───────────────────────────────────────────
  {
    id: 'mistral',
    name: 'Mistral AI',
    models: [
      { id: 'auto',                    label: 'Auto (Smart Routing)',  isPro: false },
      { id: 'mistral-large-latest',    label: 'Mistral Large',        isPro: true,  note: 'Top quality' },
      { id: 'codestral-latest',        label: 'Codestral',            isPro: false, note: 'Best for code' },
      { id: 'mistral-small-latest',    label: 'Mistral Small',        isPro: false, isFast: true },
    ],
    keyUrl: 'https://console.mistral.ai/api-keys',
    keyUrlLabel: 'Mistral Console',
  },

  // ─── DeepSeek ─────────────────────────────────────────────
  {
    id: 'deepseek',
    name: 'DeepSeek',
    models: [
      { id: 'auto',               label: 'Auto (Smart Routing)',  isPro: false },
      { id: 'deepseek-reasoner',  label: 'DeepSeek R1',           isPro: true,  note: 'Best reasoning (cheap)' },
      { id: 'deepseek-chat',      label: 'DeepSeek V3',           isPro: false, note: 'GPT-4o tier, 10× cheaper' },
    ],
    keyUrl: 'https://platform.deepseek.com/api_keys',
    keyUrlLabel: 'DeepSeek Platform',
  },

  // ─── Ollama (Local) ───────────────────────────────────────
  {
    id: 'ollama',
    name: 'Ollama (Local)',
    models: [
      { id: 'auto',                   label: 'Auto (Smart Routing)',    isPro: false },
      // ── Code-optimised ──
      { id: 'qwen2.5-coder:7b',       label: 'Qwen 2.5 Coder 7B',      isPro: false, isFast: true, note: 'Best local code model' },
      { id: 'qwen2.5-coder:32b',      label: 'Qwen 2.5 Coder 32B',     isPro: true,  note: 'Needs 24 GB VRAM' },
      { id: 'codellama:13b',          label: 'Code Llama 13B',          isPro: false },
      { id: 'codellama:34b',          label: 'Code Llama 34B',          isPro: true  },
      { id: 'deepseek-coder-v2',      label: 'DeepSeek Coder V2',       isPro: false },
      // ── General ──
      { id: 'llama3.2:3b',            label: 'Llama 3.2 3B',            isPro: false, isFast: true, note: 'Lightest / fastest' },
      { id: 'llama3.2',               label: 'Llama 3.2 8B',            isPro: false, isFast: true },
      { id: 'llama3.1:70b',           label: 'Llama 3.1 70B',           isPro: true,  note: 'Needs 48 GB RAM' },
      { id: 'mistral',                label: 'Mistral 7B',              isPro: false },
      { id: 'mistral-nemo',           label: 'Mistral Nemo 12B',        isPro: false },
      { id: 'phi4',                   label: 'Phi-4 14B (Microsoft)',    isPro: false },
      { id: 'phi3:mini',              label: 'Phi-3 Mini 3.8B',         isPro: false, isFast: true },
      { id: 'gemma3:12b',             label: 'Gemma 3 12B (Google)',    isPro: false },
      { id: 'gemma3:27b',             label: 'Gemma 3 27B (Google)',    isPro: true  },
      { id: 'qwen2.5:14b',            label: 'Qwen 2.5 14B',            isPro: false },
    ],
    keyUrl: 'https://ollama.com/download',
    keyUrlLabel: 'Download Ollama',
  },
]

function getProviderById(id: string): ProviderConfig {
  return PROVIDERS.find(p => p.id === id) || PROVIDERS[0]
}

const SUGGESTIONS = [
  'Blink built-in LED every 500ms',
  'Read DHT22 temperature and humidity',
  'Connect to WiFi and make HTTP request',
  'Servo motor control with PWM signal',
  'I2C OLED display initialization',
  'Button interrupt with debounce',
]

// ── Helpers ──

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 4,
        padding: '2px 6px', fontSize: 11, borderRadius: 'var(--radius-sm)',
      }}
    >
      {copied ? <Check size={11} style={{ color: 'var(--green)' }} /> : <Copy size={11} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const { setAiSuggestion, activeTabId, showNotification } = useAppStore()

  function insertToEditor() {
    if (!activeTabId) {
      showNotification('Open a file first to insert code', 'warning')
      return
    }
    setAiSuggestion({ code, language: lang, prompt: '' })
  }

  return (
    <div style={{
      margin: '8px 0',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      background: 'var(--bg-surface)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 10px',
        background: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-code)' }}>
          {lang}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={insertToEditor}
            style={{
              padding: '2px 8px',
              background: 'var(--accent-dim)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: 'var(--accent)',
              cursor: 'pointer', fontSize: 11,
              borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <FileCode size={11} />
            Insert
          </button>
          <CopyButton text={code} />
        </div>
      </div>
      <pre style={{
        padding: '10px 12px', margin: 0,
        fontSize: 12, lineHeight: '18px',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-code)',
        overflowX: 'auto', whiteSpace: 'pre',
        background: 'var(--bg-base)',
      }}>
        {code}
      </pre>
    </div>
  )
}

// ── AI Action Accordion ──
function ActionAccordion({ icon, label, detail, isPulsing }: {
  icon: React.ReactNode; label: string; detail?: string; isPulsing?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="agent-accordion">
      <button
        className={`agent-accordion-header ${expanded ? 'expanded' : ''}`}
        onClick={() => !isPulsing && setExpanded(!expanded)}
      >
        <span style={{ display: 'flex', alignItems: 'center', color: isPulsing ? 'var(--accent)' : 'inherit' }}>
          {icon}
        </span>
        <span style={isPulsing ? { color: 'var(--accent)' } : undefined}>{label}</span>
        {isPulsing && (
          <span style={{ display: 'flex', gap: 3, marginLeft: 4 }}>
            {[0, 0.2, 0.4].map((d, i) => (
              <span key={i} style={{
                width: 4, height: 4, borderRadius: '50%',
                background: 'var(--accent)',
                animation: `pulse 1.4s ease-in-out infinite ${d}s`,
              }} />
            ))}
          </span>
        )}
        {!isPulsing && (
          <span className="accordion-chevron">
            {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </span>
        )}
      </button>
      {expanded && detail && (
        <div className="agent-accordion-body">{detail}</div>
      )}
    </div>
  )
}

// ── Flatten file tree for @ mentions ──
function flattenFileTree(nodes: FileNode[], prefix = ''): string[] {
  const result: string[] = []
  for (const node of nodes) {
    const fullPath = prefix ? `${prefix}/${node.name}` : node.name
    if (node.type === 'file') result.push(fullPath)
    if (node.children) result.push(...flattenFileTree(node.children, fullPath))
  }
  return result
}

// ── Message Renderer ──
function MessageBlock({ msg }: { msg: AIMessage }) {
  const parts = msg.content.split(/(```[\w]*\n[\s\S]*?```)/g)
  return (
    <div className={`ai-message ${msg.role}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {msg.role === 'assistant' && (
          <div style={{
            width: 22, height: 22, borderRadius: 'var(--radius-sm)',
            background: 'var(--accent-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Bot size={13} style={{ color: 'var(--accent)' }} />
          </div>
        )}
        <span style={{
          fontSize: 11, fontWeight: 600,
          color: msg.role === 'user' ? 'var(--text-muted)' : 'var(--accent)',
          letterSpacing: '0.04em',
        }}>
          {msg.role === 'user' ? 'You' : 'Stratum Agent'}
        </span>
      </div>
      {parts.map((part, i) => {
        const codeMatch = part.match(/^```([\w]*)\n([\s\S]*?)```$/)
        if (codeMatch) return <CodeBlock key={i} lang={codeMatch[1] || 'python'} code={codeMatch[2].trimEnd()} />
        if (!part.trim()) return null
        return (
          <div key={i} style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
            {part}
          </div>
        )
      })}
    </div>
  )
}

// ── Dynamic Thinking Indicator ──
function ThinkingIndicator({ referencedFiles }: { referencedFiles: string[] }) {
  return (
    <div style={{ padding: '12px 16px', animation: 'fadeSlideUp 0.2s ease-out' }}>
      {referencedFiles.length > 0 && (
        <ActionAccordion
          icon={<FolderTree size={13} />}
          label="Reading project context"
          detail={`Analyzing: ${referencedFiles.join(', ')}`}
        />
      )}
      {referencedFiles.map((f) => (
        <ActionAccordion
          key={f}
          icon={<FileCode size={13} />}
          label={`Read ${f}`}
          detail={`Injecting ${f} into context...`}
        />
      ))}
      <ActionAccordion icon={<Bot size={13} />} label="Thinking" isPulsing />
    </div>
  )
}

// ── Chat History Sidebar ──
function ChatHistorySidebar({
  conversations, currentId, onSwitch, onClose,
}: {
  conversations: { id: string; title: string; messages: AIMessage[]; timestamp: number }[]
  currentId: string | null
  onSwitch: (id: string) => void
  onClose: () => void
}) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, bottom: 0, width: 240,
      background: 'var(--bg-elevated)', borderRight: '1px solid var(--border)',
      zIndex: 100, display: 'flex', flexDirection: 'column',
      animation: 'slideRight 0.15s ease-out',
    }}>
      <div style={{
        padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)', flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Chat History</span>
        <button className="icon-btn" onClick={onClose}><X size={13} /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
        {conversations.map((c) => (
          <button
            key={c.id} onClick={() => { onSwitch(c.id); onClose() }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px',
              background: c.id === currentId ? 'var(--accent-dim)' : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              color: c.id === currentId ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: 12, borderRadius: 'var(--radius-sm)',
              margin: '0 4px', width: 'calc(100% - 8px)',
              transition: 'background 0.1s ease',
            }}
          >
            <MessageSquare size={12} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function generateChatTitle(firstPrompt: string): string {
  const words = firstPrompt.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/)
  return words.length <= 4 ? words.join(' ') : words.slice(0, 4).join(' ')
}

// ═══════════════════════════════════════════════════════════
// ── API KEY SETUP MODAL ──
// ═══════════════════════════════════════════════════════════
function APIKeyModal({ onClose }: { onClose: () => void }) {
  const { apiConfig, completeSetup, showNotification, updateAPIConfig } = useAppStore()
  const [provider, setProvider] = useState<AIProvider>(apiConfig?.provider ?? 'gemini')
  const [apiKey, setApiKey] = useState(apiConfig?.apiKey ?? '')
  const [model, setModel] = useState(apiConfig?.model ?? 'auto')
  const [baseUrl, setBaseUrl] = useState(apiConfig?.baseUrl ?? 'http://localhost:11434')

  const providerConfig = getProviderById(provider)
  const isOllama = provider === 'ollama'

  const handleSave = () => {
    if (!isOllama && !apiKey.trim()) {
      showNotification('Please enter an API key', 'warning')
      return
    }
    const config = {
      provider,
      apiKey: apiKey.trim(),
      model,
      baseUrl: isOllama ? baseUrl : undefined,
    }
    if (apiConfig) updateAPIConfig(config)
    else completeSetup(config)
    showNotification('API settings saved securely', 'success')
    onClose()
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.15s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)',
        width: 420, maxWidth: '90vw', padding: '24px',
        animation: 'scaleIn 0.15s ease-out',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius)',
            background: 'var(--accent-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Key size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Connect AI Provider</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Key encrypted locally via safeStorage</div>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={14} /></button>
        </div>

        {/* Provider */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
            AI Provider
          </label>
          <select
            className="form-select"
            value={provider}
            onChange={(e) => { setProvider(e.target.value as AIProvider); setModel('auto') }}
            style={{ width: '100%' }}
          >
            {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        {/* API Key */}
        {!isOllama && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              API Key
            </label>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'var(--bg-input)', border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius)', padding: '6px 10px',
            }}>
              <Key size={14} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
              <input
                type="password"
                placeholder={`Enter ${providerConfig.name} API key`}
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 12 }}
                autoFocus
              />
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Don't have one?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (isElectron) (window as any).electronAPI.openExternal(providerConfig.keyUrl)
                    else window.open(providerConfig.keyUrl, '_blank')
                  }}
                  style={{ color: 'var(--accent)', textDecoration: 'none' }}
                >
                  Get it from {providerConfig.keyUrlLabel} <ExternalLink size={10} style={{ verticalAlign: 'middle' }} />
                </a>
              </span>
            </div>
          </div>
        )}

        {/* Ollama Base URL */}
        {isOllama && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Ollama Base URL
            </label>
            <input
              className="form-input"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="http://localhost:11434"
              style={{ width: '100%' }}
            />
          </div>
        )}

        {/* Model */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
            Model
          </label>
          <select
            className="form-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ width: '100%' }}
          >
            {providerConfig.models.map(m => (
              <option key={m.id} value={m.id}>
                {m.label}
                {m.isPro ? ' ⚡' : m.isFast ? ' ⚡ Fast' : ''}
                {m.note ? ` — ${m.note}` : ''}
              </option>
            ))}
          </select>
          {model === 'auto' && (
            <div style={{ marginTop: 4, fontSize: 11, color: 'var(--text-dim)' }}>
              Stratum Studio will automatically pick the best model for each task
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: '8px 14px', fontSize: 12, fontWeight: 500,
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text-primary)', borderRadius: 'var(--radius)', cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1, padding: '8px 14px', fontSize: 12, fontWeight: 600,
              background: 'var(--accent)', border: 'none',
              color: '#fff', borderRadius: 'var(--radius)', cursor: 'pointer',
              transition: 'opacity 0.15s ease',
              opacity: (isOllama || apiKey.trim()) ? 1 : 0.5,
            }}
          >
            Save & Connect
          </button>
        </div>
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════════
// ── ACTION RESPONSE PARSER ──
// ══════════════════════════════════════════════════════════════
function extractActions(text: string) {
  const actions: any[] = [];
  let workingText = text;

  // Step 1: Unwrap action tags that the LLM wrapped inside markdown code fences
  // Supports incomplete code fences at the end of the text
  workingText = workingText.replace(
    /```[\w]*\s*\n?\s*(<action[\s\S]*?(?:<\/action>|\/>|$))(?:\s*\n?\s*```)?/gi,
    '$1'
  );

  // Step 2: Extract all <action ...>content</action> and <action ... /> tags
  const actionRegex = /<action\s+([^>]*?)(?:\/>|>([\s\S]*?)(?:<\/action>|$))/gi;

  let match;
  while ((match = actionRegex.exec(workingText)) !== null) {
    const attrString = match[1];
    if (!attrString) continue;

    const content = match[2]?.trim() || '';

    const typeMatch = attrString.match(/type=["']([^"']+)["']/i);
    const targetMatch = attrString.match(/target=["']([^"']+)["']/i);
    const pathMatch = attrString.match(/path=["']([^"']+)["']/i);

    if (!typeMatch) continue;

    actions.push({
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: typeMatch[1],
      target: targetMatch?.[1],
      path: pathMatch?.[1],
      content,
      status: 'pending'
    });
  }

  // Step 3: Strip matched action tags from display text
  let strippedText = workingText.replace(/<action\s+[^>]*?(?:\/>|>[\s\S]*?(?:<\/action>|$))/gi, '');

  // Step 4: Clean orphaned empty code blocks and excessive blank lines
  strippedText = strippedText.replace(/```[\w]*\s*\n?\s*```/g, '');
  strippedText = strippedText.replace(/\n{3,}/g, '\n\n').trim();

  console.log(`[StratumStudio:Parser] Found ${actions.length} actions:`, actions.map(a => `${a.type}:${a.path}`));
  return { strippedText, actions };
}

// ══════════════════════════════════════════════════════════════
// ── ACTION BLOCK COMPONENT ──
// ══════════════════════════════════════════════════════════════
function ActionBlock({ action }: { action: any }) {
  const { 
    updateAiAction, removeAiAction, openedFolderPath, isElectron,
    selectedPort, interpreter, ptyInput,
    aiActionSetting, setAiSuggestion,
    installLibrary
  } = useAppStore()
  const [diskContent, setDiskContent] = useState('');

  useEffect(() => {
    // Auto-execute if policy is 'automatic', status is 'pending', for 'write' or 'install' actions
    if (aiActionSetting === 'automatic' && action.status === 'pending' && (action.type === 'write' || action.type === 'install')) {
      executeAction();
    }
  }, [aiActionSetting, action.status, action.type]);

  useEffect(() => {
    // If it's a 'write' action, check if it exists so we can diff it
    if (action.type === 'write' && action.path && !!(window as any).electronAPI) {
      let fullPath = action.path;
      if (openedFolderPath && !fullPath.includes(':\\') && !fullPath.startsWith('/')) {
        fullPath = `${openedFolderPath}/${fullPath}`;
      }
      (window as any).electronAPI.fsExists({ filePath: fullPath })
        .then((res: any) => {
          if (res.exists) {
            return (window as any).electronAPI.fsReadFile({ filePath: fullPath })
          }
          return null;
        })
        .then((file: any) => {
          if (file && file.content) {
            setDiskContent(file.content);
          }
        })
        .catch(() => {})
    }
  }, [action.path, openedFolderPath, action.type]);

  const executeAction = async () => {
    updateAiAction(action.id, { status: 'executing' });
    try {
      if (!isElectron) throw new Error("Hardware unavailable in browser mode.");
      
      let res;
      let fullPath = action.path;
      if (openedFolderPath && !fullPath.includes(':\\') && !fullPath.startsWith('/')) {
        fullPath = `${openedFolderPath}/${fullPath}`;
      }
      console.log(`[StratumStudio:Action] Executing ${action.type} → "${fullPath || action.path}"`, { content: action.content?.substring(0, 100) })
      
      if (action.type === 'write') {
        if (action.target === 'hardware') {
          if (!selectedPort) throw new Error("No device connected. Select a port first.");
          res = await (window as any).electronAPI.writeFile({ port: selectedPort, filePath: action.path, content: action.content });
        } else {
          res = await (window as any).electronAPI.fsWriteFile({ filePath: fullPath, content: action.content });
        }
      } else if (action.type === 'install') {
        await installLibrary(action.path);
        res = { success: true };
      } else if (action.type === 'delete') {
        if (action.target === 'hardware') {
          if (!selectedPort) throw new Error("No device connected. Select a port first.");
          res = await (window as any).electronAPI.deleteFile({ port: selectedPort, filePath: action.path });
        } else {
          res = await (window as any).electronAPI.fsDeleteSafe({ filePath: fullPath });
        }
      } else if (action.type === 'run' && action.target === 'local') {
         // Local execution on PC - send to PTY
         if (!openedFolderPath) throw new Error("No folder opened. Open a folder to run local scripts.");
         const cmd = action.path.endsWith('.py') ? `python "${fullPath}"\r` : `node "${fullPath}"\r`;
         await ptyInput(cmd);
         res = { success: true }; 
      } else if (action.type === 'run' && action.target === 'hardware') {
         // Hardware execution - Flash or Run live
         if (!selectedPort) throw new Error("No device connected. Select a port first.");
         if (!interpreter) throw new Error("No board selected. Set an interpreter first.");

         res = await (window as any).electronAPI.flash({
           code: action.content || "",
           port: selectedPort,
           language: interpreter.language,
           boardId: interpreter.id,
           mode: 'run' // AI 'run' actions usually mean 'Run Live'
         });
      }

      console.log(`[StratumStudio:Action] Result for ${action.type}:`, res)

      if (res && res.success) {
        updateAiAction(action.id, { status: 'success' });
        
        // Refresh the file tree and currently open tab if it was updated
        if (action.type === 'write' || action.type === 'delete' || action.type === 'install') {
          const store = useAppStore.getState();
          if (action.target === 'hardware') store.fetchDeviceFiles();
          else store.refreshLocalFolder();
          
          if (action.type === 'write') {
            const openTab = store.tabs.find(t => t.name === action.path || t.filePath === action.path || (fullPath && t.filePath === fullPath));
            if (openTab) {
               let freshContent = action.content || '';
               try {
                 if (action.target === 'hardware') {
                   const deviceRead = await (window as any).electronAPI.readFile({ port: selectedPort, filePath: action.path });
                   if (deviceRead?.success && deviceRead.content !== undefined) freshContent = deviceRead.content;
                 } else {
                   const localRead = await (window as any).electronAPI.fsReadFile({ filePath: fullPath });
                   if (localRead?.content !== undefined) freshContent = localRead.content;
                   else if (typeof localRead === 'string') freshContent = localRead;
                 }
               } catch(e) { console.warn('[StratumStudio:LiveSync] Live read failed, falling back to action.content', e) }
               store.updateContent(openTab.id, freshContent);
            }
          }
        }

        setTimeout(() => removeAiAction(action.id), 3000); 
      } else {
         throw new Error(res?.error || res?.message || "Execution failed");
      }
    } catch (e: any) {
      console.error(`[StratumStudio:Action] FAILED ${action.type} → ${action.path}:`, e)
      updateAiAction(action.id, { status: 'error', errorMessage: e.message });
    }
  }

  const rejectAction = () => {
    removeAiAction(action.id);
  }

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      margin: '8px 12px',
      background: 'var(--bg-surface)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '8px 12px',
        background: 'var(--bg-elevated)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {action.type === 'write' ? <FileCode size={14} color="var(--accent)" /> :
           action.type === 'delete' ? <Trash2 size={14} color="var(--red)" /> :
           action.type === 'install' ? <Package size={14} color="var(--accent)" /> :
           <Play size={14} color="var(--green)" />}
          
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
            {action.type === 'write' ? 'Write File' : 
             action.type === 'delete' ? 'Delete File' : 
             action.type === 'install' ? 'Install Library' : 'Execute'} 
          </span>
          {action.path && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
              {action.path}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
           {(action.type === 'write' && diskContent) && (
             <button 
               className="btn btn-secondary" 
               style={{ padding: '4px 8px', fontSize: 11 }}
               onClick={() => {
                 setAiSuggestion({
                   code: action.content,
                   language: action.path?.endsWith('.py') ? 'python' : 'javascript',
                   prompt: 'Review Action Diff'
                 });
                 // Make sure the file is open in a tab to view the diff
                 const store = useAppStore.getState();
                 const existingTab = store.tabs.find(t => t.name === action.path || t.filePath === action.path);
                 if (!existingTab) {
                    store.openTab({
                      id: action.path,
                      name: action.path.split('/').pop() || action.path,
                      content: diskContent,
                      language: action.path?.endsWith('.py') ? 'python' : 'javascript',
                      filePath: action.path
                    });
                    // openTab automatically sets it as active
                 } else {
                    store.setActiveTab(existingTab.id);
                 }
               }}
             >
               Review Diff
             </button>
           )}
           <button 
             className="btn btn-danger-outline" 
             style={{ padding: '4px 8px', fontSize: 11 }}
             onClick={rejectAction}
           >
             Reject
           </button>
           <button 
             className="btn btn-primary" 
             style={{ 
               padding: '4px 10px', fontSize: 11, 
               background: action.status === 'success' ? 'var(--green)' : action.status === 'error' ? 'var(--red)' : 'var(--accent)', 
               border: 'none',
               minWidth: 70
             }}
             onClick={executeAction}
             disabled={action.status === 'executing' || action.status === 'success'}
           >
             {action.status === 'executing' ? 'Working...' : 
              action.status === 'success' ? 'Done' : 
              action.status === 'error' ? 'Retry' : 'Execute'}
           </button>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// ── MAIN COMPONENT ──
// ══════════════════════════════════════════════════════════════
export default function AIPanel() {
  const {
    apiKey, apiConfig,
    conversations, currentConversationId,
    addAiMessage, clearAiMessages, newChat, switchChat,
    aiLoading, setAiLoading,
    toggleAiPanel,
    tabs, activeTabId,
    fileTree, openedFolderPath,
    aiSuggestion, acceptSuggestion, declineSuggestion,
    pendingAiPrompt, setPendingAiPrompt,
    apiKeyModalOpen, setApiKeyModalOpen,
    showNotification,
    aiActionSetting, setAiActionSetting, aiActions, clearAiActions
  } = useAppStore()

  const hasApiKey = !!(apiKey || apiConfig?.apiKey || apiConfig?.provider === 'ollama')
  const currentChat = conversations.find(c => c.id === currentConversationId)
  const aiMessages = currentChat ? currentChat.messages : []

  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [suggestionIdx, setSuggestionIdx] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [lastReferencedFiles, setLastReferencedFiles] = useState<string[]>([])

  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const currentProvider = getProviderById(apiConfig?.provider ?? 'openai')
  const currentModel = currentProvider.models.find(m => m.id === (apiConfig?.model ?? 'auto')) || currentProvider.models[0]

  const allFiles = useMemo(() => {
    const files = flattenFileTree(fileTree)
    tabs.forEach(t => { if (!files.includes(t.name)) files.push(t.name) })
    files.push('terminal')
    return files
  }, [fileTree, tabs])

  const canCreateNewChat = useMemo(() => {
    if (!currentChat) return true
    return currentChat.messages.length > 0
  }, [currentChat])

  useEffect(() => {
    const lastWord = input.split(/\s/).pop() || ''
    if (lastWord.startsWith('@')) {
      const query = lastWord.slice(1).toLowerCase()
      const filtered = allFiles.filter(f => f.toLowerCase().includes(query))
      setSuggestions(filtered.slice(0, 12))
      setSuggestionIdx(0)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [input, allFiles])

  // Handle cross-component pending AI prompts (e.g. from Terminal)
  useEffect(() => {
    if (pendingAiPrompt && !aiLoading && hasApiKey) {
      const prompt = pendingAiPrompt
      setPendingAiPrompt(null)
      send(prompt)
    } else if (pendingAiPrompt && !hasApiKey) {
      setApiKeyModalOpen(true)
    }
  }, [pendingAiPrompt, aiLoading, hasApiKey])

  const insertSuggestion = useCallback((name: string) => {
    const words = input.split(/\s/)
    words.pop()
    const newVal = words.join(' ') + (words.length > 0 ? ' ' : '') + '@' + name + ' '
    setInput(newVal)
    setShowSuggestions(false)
    setTimeout(() => textareaRef.current?.focus(), 10)
  }, [input])

  const triggerAttach = useCallback(() => {
    setSuggestions(allFiles.slice(0, 12))
    setSuggestionIdx(0)
    setShowSuggestions(true)
    textareaRef.current?.focus()
  }, [allFiles])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessages, aiLoading])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'  // Force reflow to recalculate shrink
    const newHeight = Math.max(36, Math.min(el.scrollHeight, 200))
    el.style.height = newHeight + 'px'
  }, [input])

  async function resolveFileContents(prompt: string): Promise<string> {
    const mentionRegex = /@([a-zA-Z0-9._\-\/\\:]+)/g
    const matches = [...prompt.matchAll(mentionRegex)]
    const references: string[] = []
    const resolved: string[] = []

    // Helper functions for path resolution
    const isAbsolutePath = (p: string) => /^[a-zA-Z]:/.test(p) || p.startsWith('/') || p.startsWith('\\');
    const getDirname = (p: string) => {
      const lastSlash = Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\'));
      return lastSlash === -1 ? '' : p.substring(0, lastSlash);
    };
    const joinPaths = (base: string, rel: string) => {
      if (!base) return rel;
      const baseSlash = base.endsWith('/') || base.endsWith('\\');
      const relSlash = rel.startsWith('/') || rel.startsWith('\\');
      if (baseSlash && relSlash) return base + rel.substring(1);
      if (!baseSlash && !relSlash) return base + '/' + rel;
      return base + rel;
    };

    const activeTab = tabs.find(t => t.id === activeTabId);
    const activeFile = activeTab?.filePath;

    for (const match of matches) {
      const mentionName = match[1]
      if (mentionName === 'terminal' || references.includes(mentionName)) continue
      references.push(mentionName)

      // 1. Check if it's already an open tab (either matching the filename or file path ends with mentionName)
      const tab = tabs.find(t => t.name === mentionName || t.filePath?.endsWith(mentionName))
      if (tab) { resolved.push(`[File: ${mentionName}]\n${tab.content}`); continue }

      if (isElectron) {
        // Collect candidate paths
        const pathsToTry: string[] = [];

        if (isAbsolutePath(mentionName)) {
          pathsToTry.push(mentionName);
        } else {
          // Relative to active tab folder
          if (activeFile) {
            const activeDir = getDirname(activeFile);
            pathsToTry.push(joinPaths(activeDir, mentionName));
            pathsToTry.push(joinPaths(getDirname(activeDir), mentionName));
          }
          // Relative to workspace
          if (openedFolderPath) {
            pathsToTry.push(joinPaths(openedFolderPath, mentionName));
            pathsToTry.push(joinPaths(getDirname(openedFolderPath), mentionName));
          }
        }

        for (const fullPath of pathsToTry) {
          try {
            // Check if it's a directory by reading deep
            const result = await (window as any).electronAPI.fsReadDeep({ folderPath: fullPath })
            if (Array.isArray(result) && result.length > 0) {
              resolved.push(`[Directory: ${mentionName}]\n` + result.map(file => `#### FILE: ${file.path}\n\`\`\`\n${file.content}\n\`\`\``).join('\n\n'))
              break;
            }

            // Check if it's a single file
            const singleFileResult = await (window as any).electronAPI.fsReadFile({ filePath: fullPath })
            if (singleFileResult !== null && (singleFileResult?.content || typeof singleFileResult === 'string')) {
              const contentString = typeof singleFileResult === 'string' ? singleFileResult : singleFileResult.content;
              resolved.push(`[File: ${mentionName}]\n${contentString}`)
              break;
            }
          } catch {
            // continue trying other paths
          }
        }
      }
    }

    setLastReferencedFiles(references)
    return resolved.length > 0
      ? prompt + '\n\n--- ATTACHED FILE/FOLDER CONTENTS ---\n' + resolved.join('\n\n')
      : prompt
  }

  async function send(overrideText?: string) {
    const text = (overrideText ?? input).trim()
    if (!text || aiLoading) return
    if (!hasApiKey) { setApiKeyModalOpen(true); return }

    setInput('')

    if (currentChat && currentChat.messages.length === 0) {
      const store = useAppStore.getState()
      const title = generateChatTitle(text)
      const updated = store.conversations.map(c =>
        c.id === currentConversationId ? { ...c, title } : c
      )
      useAppStore.setState({ conversations: updated })
    }

    addAiMessage({ role: 'user', content: text })
    setAiLoading(true)

    const enrichedPrompt = await resolveFileContents(text)
    const workspacePath = useAppStore.getState().openedFolderPath

    try {
      const response = await (window as any).electronAPI.generateCode({
        userPrompt: enrichedPrompt,
        sessionId: currentSessionId,
        workspacePath,
        mode: 'code',
      })

      if (response?.error) {
        const errMsg = response.error.message || 'AI Generation failed'
        if (response.error.type === 'INVALID_KEY') throw new Error(`Invalid API Key — check Settings > AI & API. ${errMsg}`)
        else if (response.error.type === 'RATE_LIMIT') throw new Error(`Rate limit exceeded — your API quota may be exhausted. ${errMsg}`)
        else if (response.error.type === 'TIMEOUT') throw new Error(`Request timed out — try a simpler prompt or switch models. ${errMsg}`)
        throw new Error(errMsg)
      }

      if (!response?.success || !response?.response_text)
        throw new Error('Invalid response from AI service — check if MCP server is running')

      const data = response.response_text
      console.log('[StratumStudio:AI] Raw response_text:', data)

      let responseContent = '';
      if (typeof data === 'string') responseContent = data;
      else if (data.type === 'chat') responseContent = data.payload || 'Done.';
      else if (data.type === 'code_update') {
        const explanation = data.explanation || 'Here are the code changes:'
        responseContent = explanation; // AI actions parsing replaces the code update logic
      } else responseContent = data.payload || data.response_text || 'Completed.';

      console.log('[StratumStudio:AI] Extracted responseContent length:', responseContent.length)

      // Parse and extract <action> tags natively bypassing the previous AI rules
      const { strippedText, actions } = extractActions(responseContent);

      console.log('[StratumStudio:AI] Parsed actions:', actions.length, actions.map(a => `${a.type}:${a.path}`))

      addAiMessage({ role: 'assistant', content: strippedText || 'Executed actions.' })

      // Dispatch Actions to the unified store
      const storeState = useAppStore.getState();
      actions.forEach(action => {
        storeState.addAiAction(action);
      });

    } catch (err: any) {
      const errorMessage = err.message || 'Could not reach AI service.'
      addAiMessage({ role: 'assistant', content: `❌ **Error:** ${errorMessage}` })
      showNotification(errorMessage, 'error')
    } finally {
      setAiLoading(false)
      setLastReferencedFiles([])
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSuggestionIdx(p => (p + 1) % suggestions.length) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSuggestionIdx(p => (p - 1 + suggestions.length) % suggestions.length) }
      else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); insertSuggestion(suggestions[suggestionIdx]) }
      else if (e.key === 'Escape') { e.preventDefault(); setShowSuggestions(false) }
      return
    }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  function handleInputFocus() {
    if (!hasApiKey) setApiKeyModalOpen(true)
  }

  function handleModelChange(modelId: string) {
    const store = useAppStore.getState()
    if (store.apiConfig) store.updateAPIConfig({ ...store.apiConfig, model: modelId })
    setModelDropdownOpen(false)
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden',
      borderLeft: '1px solid var(--border)', background: 'var(--bg-base)',
      position: 'relative',
    }}>
      {apiKeyModalOpen && <APIKeyModal onClose={() => setApiKeyModalOpen(false)} />}

      {showHistory && (
        <ChatHistorySidebar
          conversations={conversations}
          currentId={currentConversationId}
          onSwitch={switchChat}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Header */}
      <div className="panel-header" style={{ padding: '0 12px', gap: 10 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--accent-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Bot size={15} style={{ color: 'var(--accent)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>Stratum Agent</div>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.2 }}>Your AI hardware engineer</div>
        </div>
        <button className="icon-btn" onClick={() => setApiKeyModalOpen(true)} title="API Settings"><Settings size={13} /></button>
        <button className="icon-btn" onClick={() => setShowHistory(!showHistory)} title="Chat History"><Clock size={13} /></button>
        <button
          className="icon-btn" onClick={newChat} title="New Chat"
          disabled={!canCreateNewChat}
          style={!canCreateNewChat ? { opacity: 0.3, cursor: 'not-allowed' } : {}}
        >
          <Plus size={14} />
        </button>
        {aiMessages.length > 0 && (
          <button className="icon-btn" onClick={clearAiMessages} title="Clear conversation"><Trash2 size={13} /></button>
        )}
        <button className="icon-btn" onClick={toggleAiPanel} title="Close panel"><X size={13} /></button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {!hasApiKey ? (
          <div style={{ padding: '30px 20px', textAlign: 'center' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius)', background: 'var(--accent-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            }}>
              <Key size={24} style={{ color: 'var(--accent)' }} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Connect an AI Provider</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18, lineHeight: 1.6 }}>
              To use the AI assistant, connect your API key.<br />
              Your key is stored securely via OS-level encryption.
            </div>
            <button
              onClick={() => setApiKeyModalOpen(true)}
              style={{
                padding: '8px 18px', fontSize: 12, fontWeight: 600,
                background: 'var(--accent)', border: 'none', color: '#fff',
                borderRadius: 'var(--radius)', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              <Key size={13} /> Set Up API Key
            </button>
          </div>
        ) : aiMessages.length === 0 && (
          <div style={{ padding: '20px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 'var(--radius)', background: 'var(--accent-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={20} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>How can I help?</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Describe what you want to build for your device.</div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>
              Suggestions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s} onClick={() => send(s)}
                  style={{
                    textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none',
                    borderLeft: '2px solid var(--border)',
                    color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderLeftColor = 'var(--accent)'; el.style.color = 'var(--text-primary)'; el.style.background = 'var(--bg-hover)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderLeftColor = 'var(--border)'; el.style.color = 'var(--text-muted)'; el.style.background = 'none'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {aiMessages.map((msg) => <MessageBlock key={msg.id} msg={msg} />)}
        
        {/* ACTION QUEUE RENDERING */}
        {aiActions.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0 16px', marginBottom: 4 
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Action Queue
              </div>
              <button 
                onClick={clearAiActions}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 10, fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                Clear All
              </button>
            </div>
            {aiActions.map(action => <ActionBlock key={action.id} action={action} />)}
          </div>
        )}

        {aiLoading && <ThinkingIndicator referencedFiles={lastReferencedFiles} />}

        {aiSuggestion && (
          <div style={{ padding: '8px 16px', display: 'flex', gap: 6, animation: 'fadeSlideUp 0.2s ease-out' }}>
            <button className="btn btn-success" style={{ padding: '4px 12px', fontSize: 11, flex: 1, justifyContent: 'center' }} onClick={acceptSuggestion}>
              <CheckCircle2 size={12} /> Accept All
            </button>
            <button className="btn btn-danger-outline" style={{ padding: '4px 12px', fontSize: 11, flex: 1, justifyContent: 'center' }} onClick={declineSuggestion}>
              <XCircle size={12} /> Decline All
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{ padding: '10px 10px 8px', borderTop: '1px solid var(--border)', background: 'var(--bg-elevated)', position: 'relative' }}>
        {/* @ mention autocomplete */}
        {showSuggestions && (
          <div style={{
            position: 'absolute', bottom: '100%', left: 10, right: 10,
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)',
            zIndex: 100, maxHeight: 300, overflowY: 'auto',
            animation: 'slideDown 0.15s ease-out',
          }}>
            {suggestions.map((s, i) => (
              <div
                key={s} onClick={() => insertSuggestion(s)}
                style={{
                  padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 12, cursor: 'pointer',
                  background: i === suggestionIdx ? 'var(--accent-dim)' : 'transparent',
                  color: i === suggestionIdx ? 'var(--accent)' : 'var(--text-primary)',
                  borderLeft: i === suggestionIdx ? '2px solid var(--accent)' : '2px solid transparent',
                }}
              >
                {s === 'terminal' ? <TerminalIcon size={13} /> : <FileText size={13} />}
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Input box */}
        <div
          style={{
            border: '1px solid var(--border-light)', background: 'var(--bg-input)',
            display: 'flex', alignItems: 'flex-end', gap: 4,
            padding: '6px 8px', borderRadius: 'var(--radius)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-glow)'
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              e.currentTarget.style.borderColor = 'var(--border-light)'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          <button onClick={triggerAttach} title="Attach files (@)" style={{
            width: 28, height: 28, border: 'none', background: 'none',
            color: 'var(--text-dim)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            borderRadius: 'var(--radius-sm)',
          }}>
            <Paperclip size={15} />
          </button>
          <textarea
            ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey} onFocus={handleInputFocus}
            placeholder={!hasApiKey ? 'Click to set up AI provider...' : 'Ask Stratum for help... (Type @ to mention files)'}
            rows={1}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none', resize: 'none',
              color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: 13,
              lineHeight: '20px', maxHeight: 200, overflowY: 'auto',
              opacity: !hasApiKey ? 0.4 : 1,
            }}
          />
          <button
            onClick={() => send()} disabled={!input.trim() || aiLoading || !hasApiKey}
            style={{
              width: 28, height: 28, border: 'none',
              background: (input.trim() && hasApiKey) ? 'var(--accent)' : 'var(--bg-surface)',
              color: (input.trim() && hasApiKey) ? 'white' : 'var(--text-dim)',
              cursor: (input.trim() && hasApiKey && !aiLoading) ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, borderRadius: 'var(--radius-sm)', transition: 'all 0.15s ease',
            }}
          >
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Footer: model selector and policy */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, padding: '0 2px' }}>
          
          <button
             onClick={() => setAiActionSetting(aiActionSetting === 'ask' ? 'automatic' : 'ask')}
             style={{
               display: 'flex', alignItems: 'center', gap: 4,
               background: 'none', border: 'none', fontSize: 10,
               color: aiActionSetting === 'automatic' ? 'var(--red)' : 'var(--green)',
               cursor: 'pointer', opacity: 0.8,
               transition: 'all 0.2s',
             }}
             title="Action Execution Policy"
          >
             {aiActionSetting === 'automatic' ? <ShieldAlert size={11} /> : <Shield size={11} />}
             <span>{aiActionSetting === 'automatic' ? 'Auto-Execute' : 'Ask to Execute'}</span>
          </button>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'none', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '2px 8px',
                cursor: 'pointer', fontSize: 10, color: 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              <Bot size={11} />
              <span>{currentModel?.label ?? 'Auto'}</span>
              {currentModel?.isPro && <span className="model-badge-pro">Pro</span>}
              {currentModel?.isFast && !currentModel?.isPro && (
                <span style={{
                  fontSize: 9, padding: '1px 4px', borderRadius: 3,
                  background: 'rgba(34,197,94,0.15)', color: 'var(--green)',
                  fontWeight: 600, letterSpacing: '0.03em',
                }}>Fast</span>
              )}
              <ChevronDown size={10} />
            </button>
            {modelDropdownOpen && (
              <div style={{
                position: 'absolute', bottom: '100%', right: 0, marginBottom: 4,
                background: 'var(--bg-surface)', border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden', minWidth: 240, maxHeight: 360, overflowY: 'auto',
                zIndex: 200, animation: 'scaleIn 0.12s ease-out',
              }}>
                {/* Group by provider for context */}
                <div style={{ padding: '6px 12px 4px', fontSize: 10, color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>
                  {currentProvider.name}
                </div>
                {currentProvider.models.map((m) => {
                  const isActive = (apiConfig?.model ?? 'auto') === m.id
                  return (
                    <button
                      key={m.id} onClick={() => handleModelChange(m.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        width: '100%', padding: '7px 12px', border: 'none',
                        background: isActive ? 'var(--accent-dim)' : 'transparent',
                        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                        fontSize: 12, cursor: 'pointer', textAlign: 'left',
                        transition: 'background 0.1s ease',
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)' }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                    >
                      <span style={{ flex: 1 }}>{m.label}</span>
                      {m.note && (
                        <span style={{ fontSize: 10, color: 'var(--text-dim)', fontStyle: 'italic' }}>{m.note}</span>
                      )}
                      {m.isPro && <span className="model-badge-pro">Pro</span>}
                      {m.isFast && !m.isPro && (
                        <span style={{
                          fontSize: 9, padding: '1px 4px', borderRadius: 3,
                          background: 'rgba(34,197,94,0.15)', color: 'var(--green)',
                          fontWeight: 600,
                        }}>Fast</span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}