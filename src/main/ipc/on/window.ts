import { BrowserWindow } from 'electron'

export const ipcBus = new Map<string, (event: Electron.IpcMainEvent, state: any) => void>()

const getWin = (event: Electron.IpcMainEvent) => BrowserWindow.fromWebContents(event.sender)

// 销毁窗口 触发closed事件
ipcBus.set('destroy', event => getWin(event)?.destroy())

// 字面意思
ipcBus.set('show', event => getWin(event)?.show())
ipcBus.set('hide', event => getWin(event)?.hide())
ipcBus.set('focus', event => getWin(event)?.focus())
ipcBus.set('blur', event => getWin(event)?.blur())
ipcBus.set('maximize', event => getWin(event)?.maximize())
ipcBus.set('unmaximize', event => getWin(event)?.unmaximize())
ipcBus.set('minimize', event => getWin(event)?.minimize())
ipcBus.set('restore', event => getWin(event)?.restore())
ipcBus.set('reload', event => getWin(event)?.reload())
// 设置全屏
ipcBus.set('setFullScreen', (event, flag: boolean) => getWin(event)?.setSimpleFullScreen(flag))
ipcBus.set('setTitle', (event, title: string) => getWin(event)?.setTitle(title))
// 任务栏闪烁
ipcBus.set('flashFrame', (event, flag: boolean) => getWin(event)?.flashFrame(flag))
