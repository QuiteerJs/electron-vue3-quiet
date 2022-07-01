import { createLoadingWindow } from './window'
import { initGlobalIpc } from './ipc'
import { App, globalMenuInit, trayInit } from './config'

App.installDevtools()

App.use(trayInit).use(globalMenuInit).use(initGlobalIpc).use(createLoadingWindow)
