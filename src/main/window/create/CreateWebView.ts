import { BrowserWindow, BrowserView, dialog, shell, nativeImage } from 'electron'
import { addWin, delWin, onMounted, showChange, focusChange } from './win.map'
import { WinKey } from '@common/enums/window'
import { printInfo, winURL, appIcon, trayIcon, preloadPath } from '~/config/index'
import { mainDevExecFn, mainProExecFn, getMainEnv } from '~/tools/index'
import axios from 'axios'

/**
 * 描述   创建窗口(不可重复)
 * 提供基础预置配置及回收和错误监听
 * 销毁后可重新创建 始终保持同一窗口只有一个
 * @date 2022-03-08
 * @param {any} key:WinKey
 * @param {any} options:Electron.BrowserWindowConstructorOptions={}
 * @returns {any}
 */
export class CreateWebView {
  win: BrowserWindow
  view: BrowserView
  winKey: WinKey
  isViewReady: boolean

  constructor(key: WinKey, options: Electron.BrowserWindowConstructorOptions = {}) {
    this.winKey = key

    const { webPreferences: preferences, ...option } = options

    this.win = new BrowserWindow({
      frame: false,
      useContentSize: true,
      paintWhenInitiallyHidden: false,
      ...option,
      webPreferences: {
        preload: preloadPath,
        // 预加载选项
        ...preferences,
        // 允许跨域
        webSecurity: false,
        // 在macos中启用橡皮动画
        scrollBounce: process.platform === 'darwin'
      }
    })

    this.win.setMenuBarVisibility(false)

    getMainEnv(env => this.win.setIcon(env.NODE_ENV ? appIcon : trayIcon))

    addWin(this.winKey, this.win.id)

    this.view = new BrowserView({
      webPreferences: {
        preload: preloadPath,
        // 允许跨域
        webSecurity: false,
        // 在macos中启用橡皮动画
        scrollBounce: process.platform === 'darwin'
      }
    })

    this.win.setBrowserView(this.view)

    this.view.setAutoResize({
      width: true,
      height: true,
      horizontal: true,
      vertical: true
    })
    this.view.setBounds({ x: 0, y: 0, width: 960, height: 600 })

    this.win.setTitle(this.view.webContents.getTitle())

    this.webContents.on('did-finish-load', () => {
      this.win.setTitle(this.view.webContents.getTitle())
    })

    this.webContents.on('did-navigate-in-page', (e, url) => {
      setTimeout(() => {
        this.win.setTitle(this.view.webContents.getTitle())
      }, 100)
    })

    this.webContents.on('page-favicon-updated', async (event, [faviconURL]) => {
      const res = await axios.get(faviconURL, { responseType: 'arraybuffer' })

      const icon = nativeImage.createFromBuffer(Buffer.from(res.data), {
        width: 128,
        height: 128
      })

      this.win.setIcon(icon)
    })

    this.onClosed()
    this.unresponsive()
    this.preloadError()
    this.handleStatus()
  }

  get webContents() {
    return this.view.webContents
  }

  loadURL(url) {
    this.view.webContents.loadURL(url)
    return this
  }

  setSize(width, height, isResizable = false) {
    ;[width, height] = [parseInt(width), parseInt(height)]
    this.win.setSize(width, height)
    this.win.setMinimumSize(width, height)
    this.win.setResizable(isResizable)
    this.view.setBounds({ x: 0, y: 0, width, height })
    return this
  }

  hideTaskbar() {
    this.win.setSkipTaskbar(true)
    return this
  }

  alwaysOnTop() {
    this.win.setAlwaysOnTop(true)
    return this
  }

  // 阻止窗口销毁使窗口隐藏
  unClose() {
    this.win.on('close', event => {
      event.preventDefault()
      this.win.hide()
    })
    return this
  }

  listen(eventName, callback) {
    this.win.on(eventName, callback)
    return this
  }

  // 外链打开url
  openExternal() {
    this.webContents.setWindowOpenHandler(event => {
      shell.openExternal(event.url)
      return { action: 'deny' }
    })
    return this
  }

  // 窗口异常
  private unresponsive() {
    // 网页变得未响应时触发
    this.win.on('unresponsive', () => {
      printInfo('error', `网页未响应`)

      dialog
        .showMessageBox(this.win, {
          type: 'warning',
          title: '警告',
          buttons: ['重载', '退出'],
          message: '图形化进程失去响应，是否等待其恢复？',
          noLink: true
        })
        .then(res => {
          if (res.response === 0) this.win.reload()
          else this.win.close()
        })
    })
  }

  // 当预加载脚本preloadPath抛出一个未处理的异常错误时触发。
  private preloadError() {
    this.win.webContents.on('preload-error', (event, preloadPath, err) => {
      printInfo('error', `预加载脚本抛出一个未处理的异常错误 event `, event)
      printInfo('error', `预加载脚本抛出一个未处理的异常错误 preloadPath `, preloadPath)
      printInfo('error', `预加载脚本抛出一个未处理的异常错误 err `, err)
    })
  }

  private handleStatus() {
    this.win.on('show', () => showChange(this.winKey, true))

    this.win.on('hide', () => showChange(this.winKey, false))

    this.win.on('focus', () => focusChange(this.winKey, true))

    this.win.on('blur', () => focusChange(this.winKey, false))

    this.win.on('minimize', () => {
      focusChange(this.winKey, false)
      showChange(this.winKey, false)
    })

    this.win.on('restore', () => {
      focusChange(this.winKey, true)
      showChange(this.winKey, true)
    })
  }

  private onClosed() {
    this.win.on('closed', () => {
      delWin(this.winKey)
      this.win = null
      printInfo('info', `${this.winKey} 窗口已关闭`)
    })
  }
}
