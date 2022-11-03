import type { CliOptions, Configuration } from 'electron-builder'
import { name, version } from '../package.json'

interface BuilderOptions {
  isCreateExe: boolean
  isAsar: boolean
  archs: string[]
}

const config: Configuration = {
  asar: false,
  appId: 'org.TaiAi.electron-vue3-quiet',
  productName: name,
  protocols: {
    name,
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
    artifactName: `${name} \${arch} Setup ${version}.\${ext}`
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

export default (isDefault: boolean, options?: BuilderOptions): CliOptions => {
  const defaultPlatformKey = process.arch

  if (isDefault)
    return { config, [defaultPlatformKey]: true }

  if (!options)
    throw new Error('electron-builder配置项缺失')

  const { isCreateExe, isAsar, archs } = options

  const rawOptions: CliOptions = { config: { ...config, asar: isAsar } }
  const setArch = (options: string[]) => options.forEach(key => (rawOptions[key] = true))

  if (archs.length)
    setArch(archs)
  else setArch([defaultPlatformKey])

  return {
    ...rawOptions,
    dir: !isCreateExe
  }
}
