import { createLoadingWindow } from './window'
import { initIpc } from './ipc'
import { App, globalMenuInit, trayInit } from './config'

App.installDevtools()

App.use(trayInit).use(globalMenuInit).use(initIpc).use(createLoadingWindow)
