import { BrowserWindow } from 'electron'
import { Downloader } from '~/tools'

export const ipcBus = new Map<string, (event: Electron.IpcMainInvokeEvent, options: any) => any>()

ipcBus.set('file', async (event, options: Download.DownloadOptions) => {
  const win = BrowserWindow.fromWebContents(event.sender)

  if (!win) return

  const download = new Downloader(win, options)
  const details: Download.DownloadDetails = await download.start()

  return { ...details }
})
