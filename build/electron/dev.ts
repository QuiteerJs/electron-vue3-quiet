import type { PluginOption, UserConfig, ConfigEnv, ResolvedConfig } from 'vite'

import { exec } from 'child_process'
import type { ChildProcess } from 'child_process'
import path from 'path'
import chalk from 'chalk'
import { getPortPromise } from 'portfinder'

let mainProcess: ChildProcess | null

export function dev(viteEnv: ImportMetaEnv): PluginOption {
  return {
    name: 'electron-dev',
    async config(config: UserConfig, env: ConfigEnv) {
      const port = await getPortPromise({
        port: Number(viteEnv.VITE_BASE_PROT)
      })

      return { server: { port } }
    },
    configResolved(resolvedConfig: ResolvedConfig) {
      if (mainProcess) {
        mainProcess.pid && process.kill(mainProcess.pid)
        mainProcess = null
      }

      const execJavascript = path.resolve(__dirname, 'dev-script.ts')
      mainProcess = exec(`npx esno ${execJavascript} ${resolvedConfig.server.port}`)

      if (mainProcess) {
        mainProcess.stdout && mainProcess.stdout.on('data', data => mainLog('green', data))
        mainProcess.stderr && mainProcess.stderr.on('data', data => mainLog('red', data))

        mainProcess.on('close', () => {
          mainLog('blue', ' 服务关闭 ')
          process.exit()
        })
      }
    }
  }
}

function mainLog(color: 'blue' | 'red' | 'green', data: string) {
  const msg = data.toString().trim()
  const chalkLog = (ctx: string) => chalk[color].bold(ctx)
  const start = chalkLog(`┏ 主进程日志 ${new Date().toLocaleTimeString()} ---------------------`)
  const end = chalkLog('┗ --------------------------------------------')

  console.log(`\n\n${start}\n\n${msg}\n\n${end}`)
}
