import { initOnIpc } from './on'
import { initHandleIpc } from './handle'

export const initIpc = () => {
  initOnIpc()
  initHandleIpc()
}
