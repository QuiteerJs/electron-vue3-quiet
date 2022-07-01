import { BrowserWindow } from 'electron'
import { Downloader } from '~/tools'

export const ipcBus = new Map<string, (event: Electron.IpcMainInvokeEvent, options: unknown) => unknown>()

ipcBus.set('file', async (event, options: Download.DownloadOptions) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  const download = new Downloader(win, options)
  const details: Download.DownloadDetails = await download.start()

  return { ...details }
})
