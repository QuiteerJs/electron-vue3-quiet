import type { ConfigEnv, PluginOption } from 'vite'
import { build } from './build'
import { dev } from './dev'

export function electronEngine(configEnv: ConfigEnv, viteEnv: ImportMetaEnv): PluginOption {
  if (configEnv.command === 'serve') return dev(viteEnv)

  return build(viteEnv)
}
