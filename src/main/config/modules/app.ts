import { app, dialog, session, powerSaveBlocker, BrowserWindow } from 'electron'
import { addWin, hasWin, delWin, getWin, onMounted } from '~/window/create/win.map'
import { WinKey } from '@enums/window'
import { mainDevExecFn, mainProExecFn, getMainEnv } from '~/tools/index'
import { printInfo } from './log'

class CreateApp {
  private static _instance: CreateApp | null = null
  private readyList: any[] = []
  constructor() {
    this.init()
    this.anomalyHandle()
  }

  static getInstance() {
    if (!this._instance) {
      return (this._instance = new CreateApp())
    } else {
      return this._instance
    }
  }

  use(callback: () => void) {
    app.whenReady().then(callback)
    this.readyList.push(callback)
    return this
  }

  installDevtools() {
    app.whenReady().then(() => {
      mainDevExecFn(() => {
        const { VUEJS3_DEVTOOLS } = require('electron-devtools-vendor')
        session.defaultSession.loadExtension(VUEJS3_DEVTOOLS, {
          allowFileAccess: true
        })
      })
    })
  }

  private init() {
    getMainEnv(env => {
      app.setName(env.NODE_ENV ? 'dev-electron-vue3-quiet' : 'electron-vue3-quiet')
    })

    // console.log('app.requestSingleInstanceLock(): ', app.requestSingleInstanceLock())

    if (app.requestSingleInstanceLock()) {
      app.on('second-instance', (event, commandLine, workingDirectory) => {
        hasWin(WinKey.MAIN) && getWin(WinKey.MAIN)?.show()
      })
    } else {
      mainProExecFn(app.quit)
    }

    app.on('activate', () => {
      const allWin = BrowserWindow.getAllWindows()
      if (allWin.length) {
        allWin.map(win => win.show())
      } else {
        this.readyList.forEach(fn => fn())
      }
    })

    app.whenReady().then(() => {
      // 保活
      const id = powerSaveBlocker.start('prevent-display-sleep')
      setTimeout(() => {
        powerSaveBlocker.stop(id)
      }, 60000)
    })

    // 由于9.x版本问题，需要加入该配置关闭跨域问题
    app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

    app.on('window-all-closed', () => {
      // 所有平台均为所有窗口关闭就退出软件
      app.quit()
    })

    app.on('browser-window-created', () => {
      // 在创建新的 browserWindow 时发出。
      // console.log('window-created')
      // printInfo('info', 'window-created')
    })
  }

  private anomalyHandle() {
    /**
     * 子进程意外消失时触发。 这种情况通常因为进程崩溃或被杀死。 子进程不包括渲染器进程。
     * @returns {void}
     * @author zmr (umbrella22)
     * @date 2020-11-27
     */
    app.on('child-process-gone', (event, details) => {
      const message = {
        title: '',
        buttons: [],
        message: ''
      }
      switch (details.type) {
        case 'GPU':
          switch (details.reason) {
            case 'crashed':
              message.title = '警告'
              message.message = '硬件加速进程已崩溃，是否关闭硬件加速并重启？'
              break
            case 'killed':
              message.title = '警告'
              message.message = '硬件加速进程被意外终止，是否关闭硬件加速并重启？'
              break
            default:
              break
          }
          break

        default:
          break
      }
      dialog
        .showMessageBox(null as any, {
          type: 'warning',
          title: message.title,
          buttons: message.buttons,
          message: message.message,
          noLink: true
        })
        .then(res => {
          // 当显卡出现崩溃现象时使用该设置禁用显卡加速模式。
          if (res.response === 0) {
            if (details.type === 'GPU') app.disableHardwareAcceleration()
            app.relaunch({
              args: process.argv.slice(1).concat(['--relaunch'])
            })
            app.exit(0)
          } else {
            app.exit(0)
          }
        })
    })

    /**
     * 描述   渲染器进程意外消失时触发。 这种情况通常因为进程崩溃或被杀死。
     * @date 2022-03-10
     * @param {any} 'render-process-gone'
     * @param {any} (event
     * @param {any} webContents
     * @param {any} details
     * @returns {any}
     */
    app.on('render-process-gone', (event, webContents, details) => {
      switch (details.reason) {
        case 'killed':
          // 进程发送一个SIGTERM，否则是被外部杀死的。
          break
        case 'crashed':
          // 进程崩溃
          break
        case 'oom':
          // 进程内存不足
          break
        case 'launch-failed':
          // 进程从未成功启动
          break
        case 'integrity-failure':
          // 窗口代码完整性检查失败
          break
        default:
          break
      }
    })
  }
}

export const App = CreateApp.getInstance()
