import { BrowserWindow } from 'electron'
import type { WinKey } from '@enums/window'

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

export const getWin = (key: WinKey): BrowserWindow | null => {
  const status = winMap.get(key)
  if (!status)
    return null
  return BrowserWindow.fromId(status.id)
}

export const delWin = (key: WinKey) => winMap.delete(key)

export const hasWin = (key: WinKey): boolean => winMap.has(key)

export const winRead = (winId: number): Wicket.WinStatus | undefined => {
  let state: Wicket.WinStatus | undefined

  for (const [key, { id }] of winMap.entries()) {
    if (id === winId)
      state = winMap.get(key)
  }

  if (!state)
    return

  state.isRead = true
  winMap.set(state.name, state)

  return state
}

export const showChange = (key: WinKey, flag: boolean) => {
  const state = winMap.get(key)
  if (state) {
    state.isShow = flag
    winMap.set(key, state)
  }
}

export const focusChange = (key: WinKey, flag: boolean) => {
  const state = winMap.get(key)
  if (state) {
    state.isFocus = flag
    winMap.set(key, state)
  }
}

export const onMounted = (key: WinKey, callback: () => void) => {
  const status = winMap.get(key)

  if (!status?.isCreate)
    return
  const id: NodeJS.Timer = setInterval(() => {
    if (status.isRead) {
      callback()
      clearInterval(id)
    }
  }, 200)
}
