import { join } from 'path'
import { WinKey } from '@enums/window'
import { BrowserWindow, ipcMain } from 'electron'

import { getFonts } from 'font-list'
import { Library } from 'ffi-napi'
import { ipcBus as printBus } from '../bucket/print'
import { ipcBus as downloadBus } from '../bucket/download'
import { ipcBus as sqlBus } from '../bucket/sql'
import { libPath } from '~/config'
import { getWin, winMap } from '~/window/create/win.map'

const busCallback = (
  ipcBus: Map<string, (event: Electron.IpcMainInvokeEvent, options: any) => any>,
  event: Electron.IpcMainInvokeEvent,
  type: string,
  args: any[],
) => {
  const performFunc = ipcBus.get(type)
  if (performFunc instanceof Function)
    return performFunc(event, args)
}

export function initHandleIpc() {
  // 获取当前窗口状态
  ipcMain.handle('get-win-status', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    for (const v of winMap.values()) {
      if (v.id === win?.id)
        return v
    }
  })

  // 打印
  ipcMain.handle('print-option', (event, type, args) => busCallback(printBus, event, type, args))

  // 下载
  ipcMain.handle('download-option', (event, type, args) => busCallback(downloadBus, event, type, args))

  // sql
  ipcMain.handle('sql-option', (event, type, args) => busCallback(sqlBus, event, type, args))

  ipcMain.handle('back-img', async () => {
    const nativeImage = await getWin(WinKey.MAIN)?.capturePage()
    return nativeImage?.toDataURL()
  })

  ipcMain.handle('ffi-add', async (event, a = 0, b = 0) => {
    let dllName = ''
    if (process.platform === 'win32' && ['x64', 'ia32'].includes(process.arch))
      dllName = `dll_test_${process.platform}_${process.arch}.dll`
    else if (process.platform === 'darwin' && process.arch === 'arm64')
      dllName = 'libdll_test_darwin_arm64.dylib'

    if (dllName) {
      const lib = Library(join(libPath, dllName), {
        add: ['int', ['int', 'int']],
      })
      // add (a: number, b: number) => (a + b)
      return lib.add(a, b)
    }
  })

  ipcMain.handle('getFonts', async () => {
    return await getFonts().catch(() => [])
  })
}
