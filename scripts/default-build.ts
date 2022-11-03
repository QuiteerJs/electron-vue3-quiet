import { $, path } from 'zx'
import { config as getEnv } from 'dotenv'
import type { OutputOptions } from 'rollup'
import { rollup } from 'rollup'
import { build } from 'electron-builder'
import getRollupConfig from './rollup.config'
import getBuilderConfig from './builder.config'
import { colorLog, runnerLog } from './patternLog'

const defaultBuildCli = async () => {
  const allLog = colorLog('build')
  console.time(allLog.timeKey('命令行执行'))

  await runnerLog(() => $`rimraf dist && rimraf out`, {
    name: 'rimraf',
    info: '清除 dist & out 目录 成功',
    timeKey: '清除'
  })

  await runnerLog(() => $`vue-tsc --noEmit --skipLibCheck`, {
    name: 'vue-tsc',
    info: '完成ts类型检查',
    timeKey: 'ts类型检查'
  })

  await runnerLog(() => $`vite build --config scripts/vite.config.ts`, {
    name: 'vite',
    info: '完成渲染进程代码构建',
    timeKey: '构建'
  })

  // 启动环境变量
  const { parsed: globalEnv } = getEnv({ path: path.resolve(process.cwd(), '.env') })
  const { parsed: env } = getEnv({ path: path.resolve(process.cwd(), '.env.production') })
  const rollupConfig = getRollupConfig({ ...globalEnv, ...env } as NodeJS.ProcessEnv)
  const rollupBuild = await rollup(rollupConfig)

  await runnerLog(() => rollupBuild.write(rollupConfig.output as OutputOptions), {
    name: 'rollup',
    info: '完成主进程代码构建',
    timeKey: '构建'
  })

  const builderConfig = getBuilderConfig(true)
  await runnerLog(() => build(builderConfig), {
    name: 'electron-build',
    info: '输出可执行程序成功',
    timeKey: '安装包'
  })

  console.timeEnd(allLog.timeKey('命令行执行'))
}

defaultBuildCli()
