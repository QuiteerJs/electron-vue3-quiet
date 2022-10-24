import type { ChildProcessWithoutNullStreams } from 'child_process'
import { $, path } from 'zx'
import { watch } from 'rollup'
import { config as getEnv } from 'dotenv'
import electron from 'electron'
import getOption from './rollup.config'

const [, , port] = process.argv
const { parsed: globalEnv } = getEnv({ path: path.resolve(process.cwd(), '.env') })
const { parsed: devEnv } = getEnv({ path: path.resolve(process.cwd(), '.env.development') })
const mainOptions = getOption({ ...devEnv, ...globalEnv, PORT: port } as unknown as NodeJS.ProcessEnv)

const watcher = watch(mainOptions)

watcher.on('change', (filename) => {
  // eslint-disable-next-line no-console
  console.log('主进程文件变更', filename)
})

watcher.on('event', async (event) => {
  if (event.code === 'END')
    startElectron()
  else if (event.code === 'ERROR')
    process.exit(1)
})

let electronProcess: ChildProcessWithoutNullStreams | null
let manualRestart = false

function startElectron() {
  if (electronProcess) {
    manualRestart = true
    electronProcess.pid && process.kill(electronProcess.pid)
    electronProcess = null

    setTimeout(() => {
      manualRestart = false
    }, 5000)
  }

  const mainPath = path.resolve(__dirname, '../dist/main.js')

  electronProcess = $.spawn(electron as any, [mainPath, '--inspect=9528'])

  electronProcess.stdout.on('data', removeJunk)

  electronProcess.stderr.on('data', removeJunk)

  electronProcess.on('close', () => {
    manualRestart || process.exit()
  })
}

function removeJunk(chunk: string) {
  if (/\d+-\d+-\d+ \d+:\d+:\d+\.\d+ Electron(?: Helper)?\[\d+:\d+] /.test(chunk))
    return false
  if (/\[\d+:\d+\/|\d+\.\d+:ERROR:CONSOLE\(\d+\)\]/.test(chunk))
    return false
  if (/ALSA lib [a-z]+\.c:\d+:\([a-z_]+\)/.test(chunk))
    return false

  const data = chunk.toString().split(/\r?\n/)
  let log = ''
  data.forEach((line) => {
    log += `  ${line}\n`
  })
  // eslint-disable-next-line no-console
  console.log(log)
}
