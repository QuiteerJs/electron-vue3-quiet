import { WinKey } from '@enums/window'
import { ipcMain, BrowserWindow, dialog, nativeImage, app, MessageChannelMain } from 'electron'
import { winMap, getWin, winRead } from '~/window/create/win.map'
import { CreateWindow } from '~/window/create/CreateWindow'
import { ipcBus as winBus } from './bucket/window'

import { libPath } from '~/config'
import { Library } from 'ffi-napi'
import { join } from 'path'
import { ipcBus as sqlBus } from './bucket/sql'
import { ipcBus as printBus } from './bucket/print'
import { ipcBus as downloadBus } from './bucket/download'
import { printInfo } from '~/config'

const busCallback = (ipcBus, event, type, args) => {
  const performFunc = ipcBus.get(type)
  if (performFunc instanceof Function) {
    return performFunc(event, args)
  }
}

export function handlesInit() {
  // 页面准备完毕
  ipcMain.handle('dom-mounted', event => {
    const id = BrowserWindow.fromWebContents(event.sender)?.id
    id && winRead(id)
  })

  // 窗口操作
  ipcMain.handle('window-option', (event, type, args) => busCallback(winBus, event, type, args))

  ipcMain.handle('main-open', (event, state: Component.CardState) => {
    const win = new CreateWindow(state.key, { frame: true })
    win.loadURL(state.path).setTitle(state.title).setSize(660, 480, true).show().unClose()
  })

  // 获取当前窗口状态
  ipcMain.handle('get-win-status', event => {
    const win = BrowserWindow.fromWebContents(event.sender)
    for (const v of winMap.values()) {
      if (v.id === win?.id) {
        return v
      }
    }
  })

  // 数据库操作
  ipcMain.handle('sql-option', (event, type, args) => busCallback(sqlBus, event, type, args))

  // 打印
  ipcMain.handle('print-option', (event, type, args) => busCallback(printBus, event, type, args))

  // 下载
  ipcMain.handle('download-option', (event, type, args) => busCallback(downloadBus, event, type, args))

  ipcMain.handle('back-img', async event => {
    const nativeImage = await getWin(WinKey.MAIN).capturePage()
    return nativeImage.toDataURL()
  })

  ipcMain.handle('ffi-add', async (event, a = 0, b = 0) => {
    let dllName = ''
    if (process.platform === 'win32' && ['x64', 'ia32'].includes(process.arch)) {
      dllName = `dll_test_${process.platform}_${process.arch}.dll`
    } else if (process.platform === 'darwin' && process.arch === 'arm64') {
      dllName = 'libdll_test_darwin_arm64.dylib'
    }
    if (dllName) {
      const lib = Library(join(libPath, dllName), {
        add: ['int', ['int', 'int']]
      })
      // add (a: number, b: number) => (a + b)
      return lib.add(a, b)
    }
  })
}
