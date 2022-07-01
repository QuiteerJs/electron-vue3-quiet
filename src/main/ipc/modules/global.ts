import { ipcMain, BrowserWindow, dialog, nativeImage, app, MessageChannelMain } from 'electron'
import { winMap, getWin, winRead } from '~/window/create/win.map'
import { CreateWindow } from '~/window/create/CreateWindow'
import { ipcBus as winBus } from './bucket/window'

import { printInfo } from '~/config'

const busCallback = (ipcBus, event, type, args) => {
  const performFunc = ipcBus.get(type)
  if (performFunc instanceof Function) {
    performFunc(event, args)
  }
}

export function initGlobalIpc() {
  // 页面准备完毕
  ipcMain.on('dom-mounted', event => winRead(BrowserWindow.fromWebContents(event.sender).id))

  // 窗口操作
  ipcMain.on('window-option', (event, type, args) => busCallback(winBus, event, type, args))

  ipcMain.on('main-open', (event, state: Component.CardState) => {
    const win = new CreateWindow(state.key, { frame: true })
    win.loadURL(state.path).setTitle(state.title).setSize(660, 480, true).show().unClose()
  })
}
