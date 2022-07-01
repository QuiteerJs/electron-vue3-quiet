import type { ConfigEnv, PluginOption } from 'vite'
import path from 'path'
import child_process from 'child_process'
import chalk from 'chalk'
import { config as getEnv } from 'dotenv'
import { rollup, OutputOptions } from 'rollup'
import getConfig from './rollup.config'

const logo = '  rollup-build  '
const doneLog = chalk.bgGreen.white(logo) + ' '
const errorLog = chalk.bgRed.white(logo) + ' '
const okayLog = chalk.bgBlue.white(logo) + ' '
const timeKey = `\n${okayLog}本次用时为`

export function build(viteEnv: ImportMetaEnv): PluginOption {
  return {
    name: 'electron-build',
    enforce: 'post',
    async closeBundle() {
      console.log(`\n${doneLog}主进程代码开始构建`)
      console.time(timeKey)
      // 启动环境变量
      const { parsed: env } = getEnv({ path: path.resolve(process.cwd(), '.env.production') })
      const config = getConfig(env)

      const rollupBuild = await rollup(config)

      const output = await rollupBuild.write(config.output as OutputOptions).catch(error => {
        console.error(`\n${errorLog + error}\n`)
        process.exit(1)
      })

      console.log(`\n${doneLog}主进程代码构建完毕`)
      console.timeEnd(timeKey)
      console.log('\n')
    }
  }
}
