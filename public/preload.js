const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$ipc', {
  send: (...args) => ipcRenderer.send(...args),
  sendSync: (...args) => ipcRenderer.sendSync(...args),
  invoke: (...args) => ipcRenderer.invoke(...args),
  on: (...args) => ipcRenderer.on(...args),
  once: (channel, listener) => ipcRenderer.once(channel, listener),
  removeAllListeners: channel => ipcRenderer.removeAllListeners(channel)
})
