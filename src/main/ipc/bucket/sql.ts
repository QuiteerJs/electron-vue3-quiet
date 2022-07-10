import { searchAll, addSingle } from '~/typeorm/manager'

export const ipcBus = new Map<string, (event: Electron.IpcMainInvokeEvent, options: any) => any>()

ipcBus.set('user-search-all', event => searchAll())

ipcBus.set('user-add-single', async (event, data: Sql.User) => addSingle(data))
