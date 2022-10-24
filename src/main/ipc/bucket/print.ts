import type { WebContentsPrintOptions } from 'electron'

export const ipcBus = new Map<string, (event: Electron.IpcMainInvokeEvent, options: any) => any>()

ipcBus.set('get-printers', event => event.sender.getPrintersAsync())

ipcBus.set('print', async (event, options: WebContentsPrintOptions) => {
  return new Promise((resolve) => {
    event.sender.print(options, (success: boolean, failureReason: string) => {
      resolve({ success, failureReason })
    })
  })
})
