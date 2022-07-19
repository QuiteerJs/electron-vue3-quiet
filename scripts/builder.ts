import { build } from 'electron-builder'
import type { CliOptions, Configuration } from 'electron-builder'
import { version, name } from '../package.json'
import { colorLog } from './patternLog'
const { doneLog, errorLog, okayLog, timeKey } = colorLog('electron-builder')

const config: Configuration = {
  asar: false,
  appId: 'org.TaiAi.electron-vue3-quiet',
  productName: name,
  protocols: {
    name: name,
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
    createStartMenuShortcut: true,
    artifactName: name + ' ${arch} Setup ' + version + '.${ext}'
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

console.time(timeKey('build'))
const rawOptions: CliOptions = { config }

export const runElectronBuilder = async (archs: string[], isCreateExe: boolean) => {
  okayLog('输出可执行程序')
  const setArch = (options: string[]) => options.forEach(key => (rawOptions[key] = true))

  if (archs.length) {
    setArch(archs)
  } else {
    setArch([process.arch])
  }

  if (!isCreateExe) setArch(['dir'])

  build(rawOptions)
    .then(_ => {
      doneLog(`${archs.length ? archs.toString() : process.arch}安装包打包完成`)
      console.timeEnd(timeKey('build'))
    })
    .catch(error => {
      errorLog(error)
      process.exit(1)
    })
}
