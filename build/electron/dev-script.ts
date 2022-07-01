import type { ChildProcessWithoutNullStreams } from 'child_process'

import path from 'path'
import { spawn } from 'child_process'
import { config as getEnv } from 'dotenv'
import { watch } from 'rollup'
import getOption from './rollup.config'
import electron from 'electron'

const [, , currentPort] = process.argv

const { parsed: globalEnv } = getEnv({ path: path.resolve(process.cwd(), '.env') })
const { parsed: env } = getEnv({ path: path.resolve(process.cwd(), '.env.development') })

const mainOptions = getOption({ ...env, ...globalEnv, PORT: currentPort } as NodeJS.ProcessEnv)

const resolve = (filePath: string) => path.resolve(__dirname, `../../${filePath}`)

mainReady()

function mainReady() {
  return new Promise((resolve, reject) => {
    const watcher = watch(mainOptions)

    watcher.on('change', filename => {
      console.log(`\n主进程文件变更`, filename)
    })

    watcher.on('event', event => {
      if (event.code === 'END') {
        startElectron()
        resolve('END')
      } else if (event.code === 'ERROR') {
        reject(event.error)
      }
    })
  })
}

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

  electronProcess = spawn(electron as any, [`${resolve('dist/main.js')}`, `--inspect=9528`])

  electronProcess.stdout.on('data', removeJunk)

  electronProcess.stderr.on('data', removeJunk)

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function removeJunk(chunk: string) {
  if (/\d+-\d+-\d+ \d+:\d+:\d+\.\d+ Electron(?: Helper)?\[\d+:\d+] /.test(chunk)) return false
  if (/\[\d+:\d+\/|\d+\.\d+:ERROR:CONSOLE\(\d+\)\]/.test(chunk)) return false
  if (/ALSA lib [a-z]+\.c:\d+:\([a-z_]+\)/.test(chunk)) return false

  const data = chunk.toString().split(/\r?\n/)
  let log = ''
  data.forEach(line => {
    log += `  ${line}\n`
  })
  console.log(log)
}
