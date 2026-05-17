// Stratum Studio Custom Monaco IntelliSense Providers

export function registerStratumProviders(monaco: any) {
  // Prevent multiple registrations
  if ((window as any).__stratumProvidersRegistered) return;
  (window as any).__stratumProvidersRegistered = true;

  monaco.languages.registerCompletionItemProvider('python', {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [
        // Machine Module
        {
          label: 'Pin',
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: 'Pin',
          detail: 'machine.Pin - Hardware I/O pin',
          documentation: 'Access the hardware I/O pins.',
          additionalTextEdits: [
            {
              range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 },
              text: 'from machine import Pin\n'
            }
          ]
        },
        {
          label: 'PWM',
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: 'PWM',
          detail: 'machine.PWM - Pulse Width Modulation',
          additionalTextEdits: [{ range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 }, text: 'from machine import PWM\n' }]
        },
        {
          label: 'ADC',
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: 'ADC',
          detail: 'machine.ADC - Analog to Digital Converter',
          additionalTextEdits: [{ range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 }, text: 'from machine import ADC\n' }]
        },
        {
          label: 'I2C',
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: 'I2C',
          detail: 'machine.I2C - Inter-Integrated Circuit bus',
          additionalTextEdits: [{ range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 }, text: 'from machine import I2C\n' }]
        },
        {
          label: 'SPI',
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: 'SPI',
          detail: 'machine.SPI - Serial Peripheral Interface bus',
          additionalTextEdits: [{ range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 }, text: 'from machine import SPI\n' }]
        },
        {
          label: 'Timer',
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: 'Timer',
          detail: 'machine.Timer - Hardware timer',
          additionalTextEdits: [{ range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 }, text: 'from machine import Timer\n' }]
        },
        // Common Modules
        {
          label: 'machine',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: 'import machine',
          detail: 'Hardware-related functions',
        },
        {
          label: 'network',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: 'import network',
          detail: 'Network functionality',
        },
        {
          label: 'utime',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: 'import utime',
          detail: 'Time related functions',
        },
        {
          label: 'uasyncio',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: 'import uasyncio',
          detail: 'Asynchronous I/O scheduler',
        },
        {
          label: 'neopixel',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: 'import neopixel',
          detail: 'Control of WS2812/NeoPixel LEDs',
        },
        // Snippets
        {
          label: 'def async',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'async def ${1:name}(${2:args}):\n\t${3:pass}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'Async function definition',
        },
        {
          label: 'await sleep',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'await uasyncio.sleep(${1:0})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'Yield control to the scheduler',
        }
      ];

      return {
        suggestions: suggestions.map(s => ({ ...s, range }))
      };
    }
  });
}
