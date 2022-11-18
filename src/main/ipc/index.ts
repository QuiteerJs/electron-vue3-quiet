import { Ipc } from '@quiteer/electron-ipc'
import { initOnIpc } from './on'
import { initHandleIpc } from './handle'

export const initIpc = () => {
  Ipc.init()
  initOnIpc()
  initHandleIpc()
}
