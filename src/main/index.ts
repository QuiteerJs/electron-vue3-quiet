import { createLoadingWindow } from './window'
import { handlesInit } from './ipc'
import { App, globalMenuInit, trayInit } from './config'

App.installDevtools()

App.use(trayInit).use(globalMenuInit).use(handlesInit).use(createLoadingWindow)
