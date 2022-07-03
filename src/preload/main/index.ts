import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('$ipc', {
  send: (...args: Parameters<typeof Electron.ipcRenderer['send']>): void => ipcRenderer.send(...args),
  sendSync: (...args: Parameters<typeof Electron.ipcRenderer['send']>) => ipcRenderer.sendSync(...args),
  invoke: (...args: Parameters<typeof Electron.ipcRenderer['invoke']>) => ipcRenderer.invoke(...args),
  on: (...args: Parameters<typeof Electron.ipcRenderer['on']>) => ipcRenderer.on(...args),
  once: (...args: Parameters<typeof Electron.ipcRenderer['once']>) => ipcRenderer.once(...args),
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel)
})
