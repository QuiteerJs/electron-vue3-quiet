import type { ConfigEnv, PluginOption } from 'vite'
import vue from './vue'
import jsx from './jsx'
import autoImport from './auto-import'
import windicss from './windicss'
import visualizer from './visualizer'
import lint from './lint'

/**
 * vite插件
 * @param configEnv - 环境
 * @param srcPath - src路径
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(configEnv: ConfigEnv, srcPath: string): (PluginOption | PluginOption[])[] {
  const plugins = [vue, jsx, ...autoImport(srcPath), windicss, lint]

  if (configEnv.command === 'build')
    plugins.push(visualizer)

  return plugins
}
