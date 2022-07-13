import { build } from 'electron-builder'
import type { CliOptions, Configuration } from 'electron-builder'
import chalk from 'chalk'

const [, , ...args] = process.argv

const config: Configuration = {
  asar: false,
  appId: 'org.TaiAi.electron-vue3-quiet',
  productName: 'electron-vue3-quiet',
  protocols: {
    name: 'electron-vue3-quiet',
    schemes: ['deeplink']
  },
  nsis: {
    oneClick: false,
    language: '2052',
    perMachine: true,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    runAfterFinish: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true
  },
  files: ['dist/**/*'],
  extraFiles: ['lib'],
  directories: {
    output: 'out'
  },
  publish: [
    {
      provider: 'generic',
      url: 'http://127.0.0.1'
    }
  ],
  dmg: {
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications'
      },
      {
        x: 130,
        y: 150,
        type: 'file'
      }
    ]
  },
  mac: { icon: 'icons/icon.icns' },
  win: { icon: 'icons/icon.ico', target: 'nsis' },
  linux: {
    target: ['AppImage', 'rpm', 'deb'],
    icon: 'icons',
    desktop: {
      StartupNotify: 'false',
      Encoding: 'UTF-8',
      MimeType: 'x-scheme-handler/deeplink'
    }
  }
}

const logo = '  electron-builder  '
const doneLog = chalk.bgGreen.white(logo) + ' '
const errorLog = chalk.bgRed.white(logo) + ' '
const okayLog = chalk.bgBlue.white(logo) + ' '
const timeKey = `\n${okayLog}本次 build 用时为`
console.time(timeKey)
const rawOptions: CliOptions = { config }

args.forEach(key => (rawOptions[key] = true))

build(rawOptions)
  .then(_ => {
    console.log(`\n${doneLog + args.at(-1) + '安装包打包完成'}`)
    console.timeEnd(timeKey)
    console.log('\n')
  })
  .catch(error => {
    console.log(`\n\n${errorLog + error}`)
    process.exit(1)
  })
