// ── Electron Environment Detection & Safe API Access ──
// Prevents crashes when the app is opened in a regular browser (no preload.js).

export const isElectron: boolean =
  typeof window !== 'undefined' &&
  typeof (window as any).electronAPI !== 'undefined';

/**
 * Returns `window.electronAPI` if running inside Electron,
 * otherwise returns a Proxy that silently no-ops every call.
 */
export function getElectronAPI(): any {
  if (isElectron) return (window as any).electronAPI;

  // In the browser, return a recursive Proxy that returns async no-ops.
  // Any call like `getElectronAPI().ptyStart()` will resolve to undefined
  // instead of throwing a TypeError.
  const handler: ProxyHandler<object> = {
    get(_target, _prop) {
      // Return a function that returns a resolved promise
      return (..._args: any[]) => Promise.resolve(undefined);
    },
  };
  return new Proxy({}, handler);
}
