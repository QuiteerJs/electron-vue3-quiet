import { BrowserWindow, Menu, MenuItem } from 'electron'

class GlobalMenuShortcuts {
  private static instance: GlobalMenuShortcuts = null
  menu: Menu

  static getInstance() {
    if (this.instance) return this.instance

    return (this.instance = new GlobalMenuShortcuts())
  }

  constructor() {
    const template = [
      {
        accelerator: 'Escape',
        label: '退出',
        click() {
          BrowserWindow.getAllWindows().map(win => win.isFocused() && win.hide())
        }
      }
    ]

    this.menu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(this.menu)

    this.addItem({
      label: '开发',
      submenu: [
        {
          label: '刷新',
          role: 'reload',
          accelerator: 'Ctrl + R'
        },
        {
          label: '控制台',
          role: 'toggleDevTools',
          accelerator: 'Ctrl + Shift + I'
        }
      ]
    })
  }

  addItem(template) {
    this.menu.append(new MenuItem(template))
    Menu.setApplicationMenu(this.menu)
  }
}

export const globalMenuInit = () => GlobalMenuShortcuts.getInstance()
