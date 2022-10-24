import { $, path } from 'zx'
import inquirer from 'inquirer'
import { config as getEnv } from 'dotenv'
import type { OutputOptions } from 'rollup'
import { rollup } from 'rollup'
import { build } from 'electron-builder'
import getRollupConfig from './rollup.config'
import { colorLog, runnerLog } from './patternLog'
import getBuilderConfig from './builder.config'

const inquirerCli = async () => {
  const { isTypecheck } = await inquirer
    .prompt([{ type: 'confirm', name: 'isTypecheck', message: '是否执行ts类型检查?' }])
    .catch((err) => {
      console.log('err: ', err)
      process.exit(1)
    })

  const { isClearness } = await inquirer
    .prompt([{ type: 'confirm', name: 'isClearness', message: '是否执行代码混淆压缩?' }])
    .catch((err) => {
      console.log('err: ', err)
      process.exit(1)
    })

  const { isCreateExe } = await inquirer
    .prompt([{ type: 'confirm', name: 'isCreateExe', message: '是否生成安装包?' }])
    .catch((err) => {
      console.log('err: ', err)
      process.exit(1)
    })

  const { isAsar } = await inquirer
    .prompt([{ type: 'confirm', name: 'isAsar', message: '是否开启asar?' }])
    .catch((err) => {
      console.log('err: ', err)
      process.exit(1)
    })

  const isMac = process.platform === 'darwin'
  const isLiunx = process.platform === 'linux'
  const isWin32 = process.arch === 'ia32'
  const isWin64 = process.arch === 'x64'

  const { pattern } = await inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'pattern',
        message: '请选择构建模式 , 默认为当前操作系统平台 ~',
        pageSize: 10,
        choices: [
          { name: 'win64', value: 'x64', disabled: !(isWin64 || isMac) },
          { name: 'win32', value: 'ia32', disabled: !(isWin64 || isWin32 || isMac) },
          { name: 'mac', value: 'arm64', disabled: !isMac },
          {
            name: 'linux',
            value: 'armv7l',
            disabled: !(isLiunx || isMac),
          },
          {
            name: 'all',
            value: 'universal',
            disabled: !isMac,
          },
        ],
      },
    ])
    .catch((err) => {
      console.log('err: ', err)
      process.exit(1)
    })

  return {
    isTypecheck,
    isClearness: !isClearness,
    isCreateExe,
    isAsar,
    pattern,
  }
}

const optionsBuildCli = async () => {
  await runnerLog(() => $`rimraf dist && rimraf out`, {
    name: 'rimraf',
    info: '清除 dist & out 目录 成功',
    timeKey: '清除',
  })

  const { isTypecheck, isClearness, isCreateExe, isAsar, pattern } = await inquirerCli()
  const allLog = colorLog('build')
  console.time(allLog.timeKey('命令行执行'))

  if (isTypecheck) {
    await runnerLog(() => $`vue-tsc --noEmit --skipLibCheck`, {
      name: 'vue-tsc',
      info: '完成ts类型检查',
      timeKey: 'ts类型检查',
    })
  }

  await runnerLog(() => $`vite build --config scripts/vite.config.ts`, {
    name: 'vite',
    info: '完成渲染进程代码构建',
    timeKey: '构建',
  })

  // 启动环境变量
  const { parsed: globalEnv } = getEnv({ path: path.resolve(process.cwd(), '.env') })
  const { parsed: env } = getEnv({ path: path.resolve(process.cwd(), '.env.production') })
  const rollupConfig = getRollupConfig({ ...globalEnv, ...env } as NodeJS.ProcessEnv, isClearness)
  const rollupBuild = await rollup(rollupConfig)

  await runnerLog(() => rollupBuild.write(rollupConfig.output as OutputOptions), {
    name: 'rollup',
    info: '完成主进程代码构建',
    timeKey: '构建',
  })

  const builderConfig = getBuilderConfig(false, { isCreateExe, isAsar, archs: pattern })
  await runnerLog(() => build(builderConfig), {
    name: 'electron-build',
    info: '输出可执行程序成功',
    timeKey: '安装包',
  })

  console.timeEnd(allLog.timeKey('命令行执行'))
}

optionsBuildCli()
