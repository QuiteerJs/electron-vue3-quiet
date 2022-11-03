import { Menu, Tray, app } from 'electron'
import { WinKey } from '@enums/window'
import { hideIcon, trayIcon } from './paths'
import { getWin, hasWin } from '~/window/create/win.map'

class TrayInit {
  private static instance: TrayInit | null = null
  tray: Tray
  blink: NodeJS.Timeout | null = null

  static getInstance() {
    if (this.instance)
      return this.instance

    return (this.instance = new TrayInit())
  }

  constructor() {
    this.tray = new Tray(trayIcon)

    this.init()
  }

  private init() {
    this.tray.on('click', () => {
      if (!hasWin(WinKey.MAIN))
        return

      if (getWin(WinKey.MAIN)?.isVisible())
        getWin(WinKey.MAIN)?.hide()
      else
        getWin(WinKey.MAIN)?.show()
    })

    let empty = false
    this.tray.on('right-click', () => {
      const menuConfig = Menu.buildFromTemplate([
        {
          label: empty ? '停止闪烁' : '开始闪烁',
          click: () => {
            empty = !empty
            if (this.blink) {
              clearInterval(this.blink)
              this.tray.setImage(trayIcon)
            }

            if (!empty)
              return

            let flag = false
            this.blink = setInterval(() => {
              this.tray.setImage(flag ? hideIcon : trayIcon)
              flag = !flag
            }, 600)
          }
        },
        {
          label: '重启',
          click: () => {
            app.relaunch({
              args: process.argv.slice(1).concat(['--relaunch'])
            })
            app.exit(0)
          }
        },
        {
          label: '退出',
          click: () => {
            app.exit(0)
          }
        }
      ])
      this.tray.popUpContextMenu(menuConfig)
    })
  }
}

export const trayInit = () => TrayInit.getInstance()
