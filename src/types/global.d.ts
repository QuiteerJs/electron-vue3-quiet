interface Window {
  $ipc: {
    send: (channel: string, ...args: any) => void
    sendSync: (channel: string, ...args: any) => void
    on: <T>(channel: string, listener: (event: Electron.IpcRendererEvent, data?: T) => void) => void
    once: <T>(channel: string, listener: (event: Electron.IpcRendererEvent, data?: T) => void) => void
    invoke: <T, V>(channel: string, type?: string, args?: T) => Promise<V>
    removeAllListeners: (channel: string) => Electron.IpcRenderer
  }
  $loadingBar: import('naive-ui').LoadingBarProviderInst
  $dialog: import('naive-ui').DialogProviderInst
  $message: import('naive-ui').MessageProviderInst
  $notification: import('naive-ui').NotificationProviderInst
}

declare module '*.json'
