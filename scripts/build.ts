import 'zx/globals'
import inquirer from 'inquirer'
import { runElectronBuilder } from './builder'

const run = async () => {
  await $`rimraf dist && rimraf out`

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
    await $`vue-tsc --noEmit --skipLibCheck`
  }

  await $`vite build`

  runElectronBuilder(pattern, isCreateExe)
}

run()
