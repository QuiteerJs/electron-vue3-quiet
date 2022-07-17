import 'zx/globals'
import inquirer from 'inquirer'
import { runElectronBuilder } from './builder'

const run = async () => {
  await $`rimraf dist && rimraf out`

  const { isTypecheck } = await inquirer
    .prompt([{ type: 'confirm', name: 'isTypecheck', message: '是否执行ts类型检查 ?' }])
    .catch(err => {
      console.log('err: ', err)
      process.exit(1)
    })

  const { pattern } = await inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'pattern',
        message: '请选择构建模式 , 默认为当前操作系统平台 ~',
        choices: [
          { name: 'x64', value: 'x64' },
          { name: 'ia32', value: 'ia32' },
          { name: 'dir:x64', value: 'dir,x64' },
          { name: 'dir:ia32', value: 'dir,ia32' },
          { name: 'arm64', value: 'arm64', disabled: process.platform !== 'darwin' }
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

  runElectronBuilder(pattern)
}

run()
