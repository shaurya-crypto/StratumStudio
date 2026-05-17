/// <reference types="vite/client" />

interface Window {
  updater: {
    onAvailable: (cb: (info: any) => void) => void;
    onProgress:  (cb: (p: any) => void) => void;
    onDownloaded:(cb: () => void) => void;
    onError:     (cb: (e: string) => void) => void;
    download: () => void;
    install:  () => void;
  };
}
