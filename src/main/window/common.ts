import { addWin, hasWin, delWin, getWin, onMounted } from './create/win.map'
import { CreateWebView } from './create/CreateWebView'
import { CreateWindow } from './create/CreateWindow'
import { WinKey } from '@enums/window'
import { app, BrowserWindow, BrowserView } from 'electron'

export function createMainWindow() {
  if (hasWin(WinKey.MAIN)) return

  const main = new CreateWindow(WinKey.MAIN)
    .setTitle('主窗口')
    .setSize(768, 560, true)
    .loadURL()
    .hideMenu()
    .openDevTools()
    .show()
    .unClose()

  onMounted(main.winKey, async () => {
    getWin(WinKey.LOADING)?.destroy()
    // const webview = new CreateWebView(WinKey.WEBVIEW, { frame: true })
    //   .setSize(1080, 720, true)
    //   .loadURL('https://www.electronjs.org/zh/docs/latest/api/browser-view')
    // .loadURL('http://nodejs.cn/learn')
    //   .loadURL('https://staging-cn.vuejs.org/')
  })
}

export function createLoadingWindow() {
  const loading = new CreateWindow(WinKey.LOADING, { transparent: true })
    .setTitle('加载页')
    .setSize(480, 500)
    .loadURL('loading')
    .show()

  onMounted(loading.winKey, () => {
    setTimeout(() => {
      createMainWindow()
    }, 2000)
  })
}
