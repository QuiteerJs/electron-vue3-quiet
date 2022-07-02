import { contextBridge, ipcRenderer } from 'electron'
import { foo } from './test'

contextBridge.exposeInMainWorld('$ipc', {
  invoke: (...args: Parameters<typeof Electron.ipcRenderer['invoke']>) => ipcRenderer.invoke(...args),
  on: (...args: Parameters<typeof Electron.ipcRenderer['on']>) => ipcRenderer.on(...args),
  once: (...args: Parameters<typeof Electron.ipcRenderer['once']>) => ipcRenderer.once(...args),
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel)
})

console.log('a :>> ', foo)
