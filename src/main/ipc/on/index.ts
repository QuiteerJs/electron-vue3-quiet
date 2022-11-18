import { BrowserWindow, ipcMain } from 'electron'
import { getWin, hasWin, winRead } from '~/window/create/win.map'
import { CreateWindow } from '~/window/create/CreateWindow'

export function initOnIpc() {
  // 页面准备完毕
  ipcMain.on('dom-mounted', (event) => {
    const id = BrowserWindow.fromWebContents(event.sender)?.id
    id && winRead(id)
  })

  ipcMain.on('main-open', (event, state: Component.CardState) => {
    if (hasWin(state.key))
      return getWin(state.key)?.show()

    const win = new CreateWindow(state.key, { frame: true })
    win.loadURL(state.path).setTitle(state.title).setSize(660, 480, true).show().unClose()
  })
}
