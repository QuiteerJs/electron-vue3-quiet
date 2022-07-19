import 'zx/globals'
import inquirer from 'inquirer'
import { runElectronBuilder } from './builder'
import { config as getEnv } from 'dotenv'
import { rollup, OutputOptions } from 'rollup'
import getConfig from './rollup.config'
import { colorLog } from './patternLog'

const run = async () => {
  const allLog = colorLog('build:zx')
  console.time(allLog.timeKey('命令行执行'))

  const rimrafLog = colorLog('rimraf')
  try {
    console.time(rimrafLog.timeKey('清除'))
    await $`rimraf dist && rimraf out`
    rimrafLog.doneLog('清除 dist & out 目录 成功')
    console.timeEnd(rimrafLog.timeKey('清除'))
  } catch (error) {
    rimrafLog.errorLog(JSON.stringify(error))
  }

  const { isTypecheck } = await inquirer
    .prompt([{ type: 'confirm', name: 'isTypecheck', message: '是否执行ts类型检查?' }])
    .catch(err => {
      console.log('err: ', err)
      process.exit(1)
    })

  const { isCreateExe } = await inquirer
    .prompt([{ type: 'confirm', name: 'isCreateExe', message: '是否生成安装包?' }])
    .catch(err => {
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
            disabled: !(isLiunx || isMac)
          },
          {
            name: 'all',
            value: 'universal',
            disabled: !isMac
          }
        ]
      }
    ])
    .catch(err => {
      console.log('err: ', err)
      process.exit(1)
    })

  if (isTypecheck) {
    const typecheckLog = colorLog('vue-tsc')
    try {
      console.time(typecheckLog.timeKey('ts类型检查'))
      await $`vue-tsc --noEmit --skipLibCheck`
      typecheckLog.doneLog('完成ts类型检查')
      console.timeEnd(typecheckLog.timeKey('ts类型检查'))
    } catch (error) {
      typecheckLog.errorLog(JSON.stringify(error))
    }
  }

  const viteLog = colorLog('vite')
  try {
    console.time(viteLog.timeKey('构建'))
    await $`vite build --config scripts/vite.config.ts`
    viteLog.doneLog('完成渲染进程代码构建')
    console.timeEnd(viteLog.timeKey('构建'))
  } catch (error) {
    viteLog.errorLog(JSON.stringify(error))
  }

  const rollupLog = colorLog('rollup-build')
  rollupLog.okayLog('执行主进程代码构建')
  console.time(rollupLog.timeKey('构建'))
  // 启动环境变量
  const { parsed: globalEnv } = getEnv({ path: path.resolve(process.cwd(), '.env') })
  const { parsed: env } = getEnv({ path: path.resolve(process.cwd(), '.env.production') })
  const config = getConfig({ ...globalEnv, ...env } as NodeJS.ProcessEnv)

  const rollupBuild = await rollup(config)

  await rollupBuild.write(config.output as OutputOptions).catch(error => {
    rollupLog.errorLog(error)
    process.exit(1)
  })

  rollupLog.doneLog('完成主进程代码构建')
  console.timeEnd(rollupLog.timeKey('构建'))

  await runElectronBuilder(pattern, isCreateExe)
  console.timeEnd(allLog.timeKey('命令行执行'))
}

run()
