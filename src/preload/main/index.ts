import { contextBridge, ipcRenderer } from 'electron'

type IpcParameters<K extends keyof typeof Electron.ipcRenderer> = Parameters<typeof Electron.ipcRenderer[K]>
type IpcReturnType<K extends keyof typeof Electron.ipcRenderer> = ReturnType<typeof Electron.ipcRenderer[K]>

contextBridge.exposeInMainWorld('$ipc', {
  send: (...args: IpcParameters<'send'>): IpcReturnType<'send'> => ipcRenderer.send(...args),
  sendSync: (...args: IpcParameters<'sendSync'>): IpcReturnType<'sendSync'> => ipcRenderer.sendSync(...args),
  invoke: (...args: IpcParameters<'invoke'>): IpcReturnType<'invoke'> => ipcRenderer.invoke(...args),
  on: (...args: IpcParameters<'on'>): IpcReturnType<'on'> => ipcRenderer.on(...args),
  once: (...args: IpcParameters<'once'>): IpcReturnType<'once'> => ipcRenderer.once(...args),
  removeAllListeners: (...args: IpcParameters<'removeAllListeners'>): IpcReturnType<'removeAllListeners'> =>
    ipcRenderer.removeAllListeners(...args)
})
