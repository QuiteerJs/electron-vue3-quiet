import { BrowserWindow } from 'electron'
import { WinKey } from '@common/enums/window'

export const winMap = new Map<WinKey, Wicket.WinStatus>()

export const addWin = (key: WinKey, winId: number) => {
  winMap.set(key, {
    id: winId,
    name: key,
    isCreate: true,
    isRead: false,
    isShow: false,
    isFocus: false
  })
}

export const getWin = (key: WinKey): BrowserWindow => {
  const { id } = winMap.get(key)
  return BrowserWindow.fromId(id)
}

export const delWin = (key: WinKey) => winMap.delete(key)

export const hasWin = (key: WinKey): boolean => winMap.has(key)

export const winRead = (winId: number): Wicket.WinStatus => {
  let state: Wicket.WinStatus

  for (const [key, { id }] of winMap.entries()) {
    if (id === winId) {
      state = winMap.get(key)
    }
  }

  state.isRead = true

  winMap.set(state.name, state)

  return state
}

export const showChange = (key: WinKey, flag: boolean) => {
  const state: Wicket.WinStatus = winMap.get(key)
  state.isShow = flag
  winMap.set(key, state)
}

export const focusChange = (key: WinKey, flag: boolean) => {
  const state: Wicket.WinStatus = winMap.get(key)
  state.isFocus = flag
  winMap.set(key, state)
}

export const onMounted = (key: WinKey, callback) => {
  const status = winMap.get(key)

  if (!status?.isCreate) return
  let id

  id = setInterval(() => {
    if (status.isRead) {
      callback()
      clearInterval(id)
    }
  }, 200)
}
