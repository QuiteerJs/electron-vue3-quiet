import { createLoadingWindow } from './window'
import { initIpc } from './ipc'
import { App, globalMenuInit, trayInit } from './config'
import initTypeorm from '~/typeorm'

App.installDevtools()

App.use(trayInit).use(globalMenuInit).use(initIpc).use(createLoadingWindow)

initTypeorm()
