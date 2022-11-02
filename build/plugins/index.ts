import type { ConfigEnv, PluginOption } from 'vite'
import autoImport from './auto-import'
import windicss from './windicss'
import visualizer from './visualizer'
import macros from './macros'

/**
 * vite插件
 * @param configEnv - 环境
 * @param srcPath - src路径
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(configEnv: ConfigEnv, srcPath: string): (PluginOption | PluginOption[])[] {
  const plugins = [macros, ...autoImport(srcPath), windicss]

  if (configEnv.command === 'build')
    plugins.push(visualizer)

  return plugins
}
