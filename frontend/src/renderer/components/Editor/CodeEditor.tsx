import Editor, { DiffEditor } from '@monaco-editor/react'
import { useAppStore } from '../../store/useAppStore'
import { CheckCircle, XCircle } from 'lucide-react'
import { sendMcpEvent } from '../../store/mcpClient'
import { registerStratumProviders } from '../../../utils/monacoProviders'

// ── MicroPython keyword & module database for IntelliSense ──
const MICROPYTHON_KEYWORDS = [
  'print', 'import', 'from', 'def', 'class', 'return', 'if', 'elif', 'else',
  'for', 'while', 'break', 'continue', 'pass', 'try', 'except', 'finally',
  'raise', 'with', 'as', 'yield', 'lambda', 'global', 'nonlocal', 'assert',
  'del', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is',
]

const MICROPYTHON_BUILTINS = [
  { label: 'print()', insert: 'print($1)', detail: 'Print to console' },
  { label: 'len()', insert: 'len($1)', detail: 'Return length of object' },
  { label: 'range()', insert: 'range($1)', detail: 'Generate a range of numbers' },
  { label: 'int()', insert: 'int($1)', detail: 'Convert to integer' },
  { label: 'str()', insert: 'str($1)', detail: 'Convert to string' },
  { label: 'list()', insert: 'list($1)', detail: 'Convert to list' },
  { label: 'dict()', insert: 'dict($1)', detail: 'Create a dictionary' },
  { label: 'tuple()', insert: 'tuple($1)', detail: 'Create a tuple' },
  { label: 'set()', insert: 'set($1)', detail: 'Create a set' },
  { label: 'type()', insert: 'type($1)', detail: 'Return type of object' },
  { label: 'isinstance()', insert: 'isinstance($1, $2)', detail: 'Check instance type' },
  { label: 'enumerate()', insert: 'enumerate($1)', detail: 'Enumerate with index' },
  { label: 'zip()', insert: 'zip($1, $2)', detail: 'Zip iterables together' },
  { label: 'map()', insert: 'map($1, $2)', detail: 'Map function to iterable' },
  { label: 'filter()', insert: 'filter($1, $2)', detail: 'Filter iterable' },
  { label: 'sorted()', insert: 'sorted($1)', detail: 'Return sorted list' },
  { label: 'abs()', insert: 'abs($1)', detail: 'Return absolute value' },
  { label: 'max()', insert: 'max($1)', detail: 'Return maximum value' },
  { label: 'min()', insert: 'min($1)', detail: 'Return minimum value' },
  { label: 'sum()', insert: 'sum($1)', detail: 'Return sum of iterable' },
  { label: 'input()', insert: 'input($1)', detail: 'Read user input' },
  { label: 'open()', insert: 'open($1, $2)', detail: 'Open a file' },
  { label: 'bytearray()', insert: 'bytearray($1)', detail: 'Create mutable byte array' },
  { label: 'bytes()', insert: 'bytes($1)', detail: 'Create immutable bytes' },
  { label: 'hasattr()', insert: 'hasattr($1, $2)', detail: 'Check if attribute exists' },
  { label: 'getattr()', insert: 'getattr($1, $2)', detail: 'Get attribute value' },
  { label: 'setattr()', insert: 'setattr($1, $2, $3)', detail: 'Set attribute value' },
]

const MICROPYTHON_MODULES = [
  { label: 'machine', detail: 'Hardware access (Pin, PWM, I2C, SPI, ADC, UART, Timer)', items: [
    'Pin', 'PWM', 'I2C', 'SPI', 'ADC', 'UART', 'Timer', 'RTC', 'WDT',
    'freq', 'reset', 'soft_reset', 'unique_id', 'idle', 'lightsleep', 'deepsleep',
  ]},
  { label: 'network', detail: 'Network interfaces (WLAN, LAN)', items: [
    'WLAN', 'LAN', 'AP_IF', 'STA_IF',
  ]},
  { label: 'utime', detail: 'Time functions', items: [
    'sleep', 'sleep_ms', 'sleep_us', 'ticks_ms', 'ticks_us', 'ticks_diff',
    'time', 'localtime', 'mktime',
  ]},
  { label: 'time', detail: 'Time functions (alias)', items: [
    'sleep', 'sleep_ms', 'sleep_us', 'ticks_ms', 'ticks_us', 'ticks_diff',
  ]},
  { label: 'ujson', detail: 'JSON encoder/decoder', items: ['dumps', 'loads'] },
  { label: 'json', detail: 'JSON encoder/decoder (alias)', items: ['dumps', 'loads'] },
  { label: 'usocket', detail: 'Socket interface', items: ['socket', 'getaddrinfo'] },
  { label: 'socket', detail: 'Socket interface (alias)', items: ['socket', 'getaddrinfo'] },
  { label: 'urequests', detail: 'HTTP requests', items: ['get', 'post', 'put', 'delete', 'head', 'patch'] },
  { label: 'os', detail: 'OS-level operations', items: [
    'listdir', 'mkdir', 'rmdir', 'rename', 'remove', 'stat', 'statvfs', 'getcwd', 'chdir',
  ]},
  { label: 'sys', detail: 'System-specific parameters', items: [
    'path', 'argv', 'exit', 'stdin', 'stdout', 'stderr', 'platform', 'implementation', 'version',
  ]},
  { label: 'gc', detail: 'Garbage collector', items: ['collect', 'enable', 'disable', 'mem_alloc', 'mem_free'] },
  { label: 'struct', detail: 'Pack/unpack binary data', items: ['pack', 'unpack', 'calcsize'] },
  { label: 'neopixel', detail: 'NeoPixel LED control', items: ['NeoPixel'] },
  { label: 'dht', detail: 'DHT sensor driver', items: ['DHT11', 'DHT22'] },
  { label: 'onewire', detail: 'OneWire protocol', items: ['OneWire'] },
  { label: 'ds18x20', detail: 'Temperature sensor', items: ['DS18X20'] },
  { label: 'framebuf', detail: 'Frame buffer for displays', items: ['FrameBuffer'] },
  { label: 'micropython', detail: 'MicroPython internals', items: ['mem_info', 'stack_use', 'opt_level', 'const'] },
  { label: 'ure', detail: 'Regex module', items: ['compile', 'match', 'search'] },
  { label: 'ubinascii', detail: 'Binary/ASCII conversion', items: ['hexlify', 'unhexlify', 'b2a_base64', 'a2b_base64'] },
  { label: 'uhashlib', detail: 'Hash algorithms', items: ['sha256', 'sha1', 'md5'] },
  { label: 'uselect', detail: 'I/O multiplexing', items: ['poll', 'select'] },
  { label: 'uasyncio', detail: 'Async I/O', items: ['run', 'sleep', 'sleep_ms', 'create_task', 'gather', 'get_event_loop'] },
  { label: 'asyncio', detail: 'Async I/O (alias)', items: ['run', 'sleep', 'sleep_ms', 'create_task', 'gather'] },
  { label: 'bluetooth', detail: 'BLE interface', items: ['BLE'] },
  { label: 'esp', detail: 'ESP-specific functions', items: ['osdebug', 'flash_size', 'flash_read', 'flash_write'] },
  { label: 'esp32', detail: 'ESP32-specific', items: ['wake_on_ext0', 'wake_on_ext1', 'raw_temperature', 'hall_sensor', 'ULP'] },
]

function registerMicroPythonProviders(monaco: any) {
  // ── Completion Provider ──
  monaco.languages.registerCompletionItemProvider('python', {
    provideCompletionItems(model: any, position: any) {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }

      const suggestions: any[] = []

      // Keywords
      MICROPYTHON_KEYWORDS.forEach(kw => {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range,
          detail: 'keyword',
        })
      })

      // Built-in functions
      MICROPYTHON_BUILTINS.forEach(fn => {
        suggestions.push({
          label: fn.label,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: fn.insert,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          detail: fn.detail,
        })
      })

      // Modules
      MICROPYTHON_MODULES.forEach(mod => {
        suggestions.push({
          label: mod.label,
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: mod.label,
          range,
          detail: mod.detail,
        })
      })

      // Check if user is typing after a module (e.g., "machine.")
      const lineContent = model.getLineContent(position.lineNumber)
      const textBefore = lineContent.substring(0, position.column - 1)
      const dotMatch = textBefore.match(/(\w+)\.\s*$/)
      if (dotMatch) {
        const modName = dotMatch[1]
        const mod = MICROPYTHON_MODULES.find(m => m.label === modName)
        if (mod) {
          mod.items.forEach(item => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: item,
              range,
              detail: `${modName}.${item}`,
            })
          })
        }
      }

      return { suggestions }
    },
    triggerCharacters: ['.'],
  })

  // ── Inline (Ghost Text) Completion Provider ──
  monaco.languages.registerInlineCompletionsProvider('python', {
    provideInlineCompletions(model: any, position: any) {
      const lineContent = model.getLineContent(position.lineNumber)
      const textBefore = lineContent.substring(0, position.column - 1).trimStart()

      const items: any[] = []

      // Simple pattern-based ghost text
      const ghostSuggestions: [RegExp, string][] = [
        [/^pr$/i, 'int()'],
        [/^imp$/i, 'ort machine'],
        [/^from m$/i, 'achine import Pin'],
        [/^from machine imp$/i, 'ort Pin, PWM'],
        [/^def $/i, 'main():'],
        [/^while T$/i, 'rue:'],
        [/^for i in r$/i, 'ange(10):'],
        [/^if __name__$/i, ' == "__main__":'],
        [/^import net$/i, 'work'],
        [/^import ut$/i, 'ime'],
        [/^import mac$/i, 'hine'],
        [/^wlan = net$/i, 'work.WLAN(network.STA_IF)'],
        [/^led = mac$/i, 'hine.Pin("LED", machine.Pin.OUT)'],
        [/^pin = Pin\($/i, '"LED", Pin.OUT)'],
        [/^import uasyn$/i, 'cio'],
        [/^time\.sle$/i, 'ep(1)'],
        [/^utime\.sle$/i, 'ep_ms(500)'],
      ]

      for (const [pattern, completion] of ghostSuggestions) {
        if (pattern.test(textBefore)) {
          items.push({
            insertText: { snippet: completion },
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            },
          })
          break
        }
      }

      return { items }
    },
    freeInlineCompletions() {},
  })
}

// ── Arduino C++ IntelliSense ──

const ARDUINO_FUNCTIONS = [
  { label: 'digitalWrite', insert: 'digitalWrite(${1:pin}, ${2:value});', detail: 'Write HIGH or LOW to a digital pin' },
  { label: 'digitalRead', insert: 'digitalRead(${1:pin})', detail: 'Read value from digital pin' },
  { label: 'analogWrite', insert: 'analogWrite(${1:pin}, ${2:value});', detail: 'Write PWM value (0-255)' },
  { label: 'analogRead', insert: 'analogRead(${1:pin})', detail: 'Read analog value (0-1023)' },
  { label: 'pinMode', insert: 'pinMode(${1:pin}, ${2:mode});', detail: 'Set pin direction (INPUT/OUTPUT)' },
  { label: 'delay', insert: 'delay(${1:ms});', detail: 'Pause execution in milliseconds' },
  { label: 'delayMicroseconds', insert: 'delayMicroseconds(${1:us});', detail: 'Pause execution in microseconds' },
  { label: 'millis', insert: 'millis()', detail: 'Time since program start (ms)' },
  { label: 'micros', insert: 'micros()', detail: 'Time since program start (µs)' },
  { label: 'map', insert: 'map(${1:value}, ${2:fromLow}, ${3:fromHigh}, ${4:toLow}, ${5:toHigh})', detail: 'Re-map a number range' },
  { label: 'constrain', insert: 'constrain(${1:x}, ${2:a}, ${3:b})', detail: 'Constrain value between limits' },
  { label: 'tone', insert: 'tone(${1:pin}, ${2:frequency});', detail: 'Generate square wave' },
  { label: 'noTone', insert: 'noTone(${1:pin});', detail: 'Stop square wave' },
  { label: 'attachInterrupt', insert: 'attachInterrupt(digitalPinToInterrupt(${1:pin}), ${2:ISR}, ${3:mode});', detail: 'Attach hardware interrupt' },
  { label: 'detachInterrupt', insert: 'detachInterrupt(digitalPinToInterrupt(${1:pin}));', detail: 'Detach hardware interrupt' },
  { label: 'shiftOut', insert: 'shiftOut(${1:dataPin}, ${2:clockPin}, ${3:bitOrder}, ${4:value});', detail: 'Shift out a byte of data' },
  { label: 'shiftIn', insert: 'shiftIn(${1:dataPin}, ${2:clockPin}, ${3:bitOrder})', detail: 'Shift in a byte of data' },
  { label: 'pulseIn', insert: 'pulseIn(${1:pin}, ${2:value})', detail: 'Read pulse duration' },
  { label: 'Serial.begin', insert: 'Serial.begin(${1:9600});', detail: 'Start serial communication' },
  { label: 'Serial.println', insert: 'Serial.println(${1:data});', detail: 'Print line to serial monitor' },
  { label: 'Serial.print', insert: 'Serial.print(${1:data});', detail: 'Print to serial monitor (no newline)' },
  { label: 'Serial.available', insert: 'Serial.available()', detail: 'Check if data is available' },
  { label: 'Serial.read', insert: 'Serial.read()', detail: 'Read incoming byte' },
  { label: 'Serial.write', insert: 'Serial.write(${1:data});', detail: 'Write binary data' },
  { label: 'Serial.readString', insert: 'Serial.readString()', detail: 'Read serial as String' },
  { label: 'Wire.begin', insert: 'Wire.begin();', detail: 'Initialize I2C as master' },
  { label: 'Wire.beginTransmission', insert: 'Wire.beginTransmission(${1:address});', detail: 'Begin I2C transmission' },
  { label: 'Wire.endTransmission', insert: 'Wire.endTransmission();', detail: 'End I2C transmission' },
  { label: 'SPI.begin', insert: 'SPI.begin();', detail: 'Initialize SPI bus' },
  { label: 'SPI.transfer', insert: 'SPI.transfer(${1:data})', detail: 'Transfer SPI data' },
]

const ARDUINO_CONSTANTS = [
  'HIGH', 'LOW', 'INPUT', 'OUTPUT', 'INPUT_PULLUP',
  'LED_BUILTIN', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5',
  'RISING', 'FALLING', 'CHANGE',
  'MSBFIRST', 'LSBFIRST',
  'true', 'false',
]

function registerArduinoProviders(monaco: any) {
  monaco.languages.registerCompletionItemProvider('cpp', {
    provideCompletionItems(model: any, position: any) {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }

      const suggestions: any[] = []

      // Arduino functions
      for (const fn of ARDUINO_FUNCTIONS) {
        suggestions.push({
          label: fn.label,
          kind: monaco.languages.CompletionItemKind.Function,
          detail: fn.detail,
          insertText: fn.insert,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        })
      }

      // Arduino constants
      for (const c of ARDUINO_CONSTANTS) {
        suggestions.push({
          label: c,
          kind: monaco.languages.CompletionItemKind.Constant,
          detail: 'Arduino constant',
          insertText: c,
          range,
        })
      }

      // Common includes
      for (const inc of ['Arduino.h', 'Wire.h', 'SPI.h', 'Servo.h', 'EEPROM.h', 'SoftwareSerial.h', 'LiquidCrystal.h']) {
        suggestions.push({
          label: `#include <${inc}>`,
          kind: monaco.languages.CompletionItemKind.Module,
          detail: `Include ${inc}`,
          insertText: `#include <${inc}>`,
          range,
        })
      }

      // setup/loop scaffolding
      suggestions.push({
        label: 'setup',
        kind: monaco.languages.CompletionItemKind.Snippet,
        detail: 'Arduino setup function',
        insertText: 'void setup() {\n  ${1}\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range,
      })
      suggestions.push({
        label: 'loop',
        kind: monaco.languages.CompletionItemKind.Snippet,
        detail: 'Arduino loop function',
        insertText: 'void loop() {\n  ${1}\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range,
      })

      return { suggestions }
    }
  })
}

export default function CodeEditor() {
  const {
    tabs, activeTabId, updateContent, theme,
    aiSuggestion, acceptSuggestion, declineSuggestion,
  } = useAppStore()

  const activeTab = tabs.find((t) => t.id === activeTabId)

  const monacoTheme = theme === 'dark' ? 'stratum-dark' : 'stratum-light'

  function defineThemes(monaco: any) {
    monaco.editor.defineTheme('stratum-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '',              foreground: 'E2E8F0' },
        { token: 'comment',      foreground: '4A6A5A', fontStyle: 'italic' },
        { token: 'keyword',      foreground: '818CF8' },
        { token: 'string',       foreground: 'F0ABA5' },
        { token: 'number',       foreground: 'A5D6B8' },
        { token: 'type',         foreground: '67E8C4' },
        { token: 'function',     foreground: 'FBBF68' },
        { token: 'variable',     foreground: '93C5FD' },
        { token: 'operator',     foreground: 'CBD5E1' },
        { token: 'delimiter',    foreground: 'CBD5E1' },
        { token: 'constant',     foreground: '60A5FA' },
        { token: 'tag',          foreground: '818CF8' },
        { token: 'attribute',    foreground: '93C5FD' },
      ],
      colors: {
        'editor.background':                  '#0F111A',
        'editor.foreground':                  '#E2E8F0',
        'editorLineNumber.foreground':        '#3D4560',
        'editorLineNumber.activeForeground':  '#8892A8',
        'editor.lineHighlightBackground':     '#141820',
        'editor.selectionBackground':         '#2E3558',
        'editor.inactiveSelectionBackground': '#1A1E2E',
        'editorCursor.foreground':            '#818CF8',
        'editorWhitespace.foreground':        '#1E2233',
        'editorIndentGuide.background1':      '#1E2233',
        'editorIndentGuide.activeBackground1':'#2A2F42',
        'editorBracketMatch.background':      'rgba(99,102,241,0.12)',
        'editorBracketMatch.border':          '#6366F1',
        'scrollbar.shadow':                   '#000000',
        'scrollbarSlider.background':         'rgba(99,102,241,0.12)',
        'scrollbarSlider.hoverBackground':    'rgba(99,102,241,0.25)',
        'scrollbarSlider.activeBackground':   'rgba(99,102,241,0.35)',
        'editorWidget.background':            '#141820',
        'editorWidget.border':                '#1E2233',
        'editorSuggestWidget.background':     '#141820',
        'editorSuggestWidget.border':         '#1E2233',
        'editorSuggestWidget.selectedBackground':'#1A1E2E',
        'editorHoverWidget.background':       '#141820',
        'editorHoverWidget.border':           '#1E2233',
        'input.background':                   '#181C28',
        'input.border':                       '#2A2F42',
        'input.foreground':                   '#E2E8F0',
        'focusBorder':                        '#6366F1',
        'minimap.background':                 '#0A0D14',
        'editorGhostText.foreground':         '#4A5568',
      },
    })

    monaco.editor.defineTheme('stratum-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: '',          foreground: '1E293B' },
        { token: 'comment',   foreground: '16A34A', fontStyle: 'italic' },
        { token: 'keyword',   foreground: '4338CA' },
        { token: 'string',    foreground: 'B91C1C' },
        { token: 'number',    foreground: '0D9488' },
        { token: 'type',      foreground: '0891B2' },
        { token: 'function',  foreground: 'B45309' },
        { token: 'variable',  foreground: '1D4ED8' },
      ],
      colors: {
        'editor.background':                  '#F8FAFC',
        'editor.foreground':                  '#1E293B',
        'editorLineNumber.foreground':        '#94A3B8',
        'editor.lineHighlightBackground':     '#F1F5F9',
        'editor.selectionBackground':         '#DBEAFE',
        'editorCursor.foreground':            '#4F46E5',
        'scrollbarSlider.background':         '#CBD5E180',
        'editorWidget.background':            '#F1F5F9',
        'editorSuggestWidget.background':     '#F1F5F9',
        'focusBorder':                        '#4F46E5',
      },
    })

    // Register IntelliSense providers
    registerMicroPythonProviders(monaco)
    registerArduinoProviders(monaco)
    registerStratumProviders(monaco)
  }

  if (!activeTab) {
    return (
      <div className="welcome-screen" style={{ fontSize: 13 }}>
        <div style={{
          marginBottom: 24,
          fontWeight: 700,
          fontSize: 22,
          color: 'var(--text-dim)',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font-display)',
        }}>
          Stratum Studio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          {[
            ['Ctrl+N', 'New File'],
            ['Ctrl+O', 'Open File'],
            ['Ctrl+K Ctrl+O', 'Open Folder'],
          ].map(([key, label]) => (
            <div key={key} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-code)',
                fontSize: 11,
                color: 'var(--text-dim)',
                border: '1px solid var(--border)',
                padding: '2px 8px',
                minWidth: 130,
                borderRadius: 'var(--radius-sm)',
              }}>
                {key}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* AI Suggestion bar */}
      {aiSuggestion && (
        <div className="ai-suggestion-bar">
          <span style={{ flex: 1 }}>
            AI suggestion ready — review the code below
          </span>
          <button
            onClick={acceptSuggestion}
            className="btn btn-success"
            style={{ padding: '3px 12px', fontSize: 12 }}
          >
            <CheckCircle size={13} /> Accept
          </button>
          <button
            onClick={declineSuggestion}
            className="btn btn-danger-outline"
            style={{ padding: '3px 12px', fontSize: 12 }}
          >
            <XCircle size={13} /> Decline
          </button>
        </div>
      )}

      {aiSuggestion ? (
        <DiffEditor
          height="100%"
          language={activeTab.language}
          original={activeTab.content}
          modified={aiSuggestion.code}
          theme={monacoTheme}
          options={{
            readOnly: true,
            fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
            fontSize: 14,
            minimap: { enabled: false },
          }}
        />
      ) : (
        <Editor
          height="100%"
          language={activeTab.language}
          value={activeTab.content}
          onMount={(editor) => {
            editor.onDidChangeCursorPosition((e) => {
               const model = editor.getModel();
               if (!model) return;
               sendMcpEvent('code_sync', {
                 filePath: activeTab.filePath || activeTab.name || 'untitled',
                 content: model.getValue(),
                 cursorLine: e.position.lineNumber,
                 cursorChar: e.position.column,
                 selectedText: editor.getModel()?.getValueInRange(editor.getSelection()!) || ''
               });
            });

            editor.onDidChangeCursorSelection((e) => {
              const model = editor.getModel();
              if (!model) return;
              const selection = e.selection;
              sendMcpEvent('code_sync', {
                filePath: activeTab.filePath || activeTab.name || 'untitled',
                content: model.getValue(),
                cursorLine: selection.positionLineNumber,
                cursorChar: selection.positionColumn,
                selectedText: model.getValueInRange(selection)
              });
            });
          }}
          onChange={(val) => {
            const store = useAppStore.getState()
            if (!store.aiSuggestion) {
              updateContent(activeTab.id, val ?? '')
            }
          }}
          theme={monacoTheme}
          beforeMount={defineThemes}
          options={{
            fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
            fontSize: 14,
            fontLigatures: true,
            lineHeight: 22,
            minimap: { enabled: true, scale: 1, renderCharacters: false },
            scrollBeyondLastLine: false,
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 8, bottom: 8 },
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'off',
            bracketPairColorization: { enabled: true },
            guides: { indentation: true, bracketPairs: true },
            suggest: {
              preview: true,
              showKeywords: true,
              showFunctions: true,
              showModules: true,
              showSnippets: true,
            },
            inlineSuggest: { enabled: true },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            wordBasedSuggestions: "currentDocument",
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'mouseover',
            renderWhitespace: 'none',
            occurrencesHighlight: 'singleFile',
            overviewRulerLanes: 2,
            hideCursorInOverviewRuler: false,
            links: true,
            readOnly: !!aiSuggestion,
            roundedSelection: true,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      )}
    </div>
  )
}