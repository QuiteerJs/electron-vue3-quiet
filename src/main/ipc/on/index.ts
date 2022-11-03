import { BrowserWindow, ipcMain } from 'electron'
import { ipcBus as winBus } from './window'
import { getWin, hasWin, winRead } from '~/window/create/win.map'
import { CreateWindow } from '~/window/create/CreateWindow'

const busCallback = (
  ipcBus: Map<string, (event: Electron.IpcMainEvent, options: any) => any>,
  event: Electron.IpcMainEvent,
  type: string,
  args: any[]
) => {
  const performFunc = ipcBus.get(type)
  if (performFunc instanceof Function)
    return performFunc(event, args)
}

export function initOnIpc() {
  // 页面准备完毕
  ipcMain.on('dom-mounted', (event) => {
    const id = BrowserWindow.fromWebContents(event.sender)?.id
    id && winRead(id)
  })

  // 窗口操作
  ipcMain.on('window-option', (event, type, args) => busCallback(winBus, event, type, args))

  ipcMain.on('main-open', (event, state: Component.CardState) => {
    if (hasWin(state.key))
      return getWin(state.key)?.show()

    const win = new CreateWindow(state.key, { frame: true })
    win.loadURL(state.path).setTitle(state.title).setSize(660, 480, true).show().unClose()
  })
}
