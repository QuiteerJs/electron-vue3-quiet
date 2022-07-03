/**
 * 描述   处理不同环境下的文件路径
 * 项目中所有使用到的路劲在此注册后导出
 * 减少挂载全局的操作
 * process.env.__lib = libPath
 * @date 2022-03-04
 * @publicPath 静态资源对应pubilc目录
 * @libPath lib目录打包后在目录下第一级
 * @winURL html路径
 */
import { resolve } from 'path'

const join = (path: string) => resolve(__dirname, path)
const isDev = process.env.NODE_ENV === 'development'

const publicPath = isDev ? join('../public') : __dirname

export const libPath = isDev ? join('../lib') : join('../../../lib')

export const winURL = isDev ? `http://localhost:${process.env.PORT}` : `file://${join('index.html')}`

export const logsPath = isDev ? resolve(publicPath, '../logs') : resolve(publicPath, 'logs')

// icon
export const appIcon = resolve(publicPath, 'icon.ico')
export const hideIcon = resolve(publicPath, 'hide.ico')
export const trayIcon = resolve(publicPath, 'tray.ico')

// preload
export const mainPreload = resolve(__dirname, 'preload/main.js')
