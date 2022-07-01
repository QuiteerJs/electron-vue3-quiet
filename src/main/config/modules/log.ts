import log from 'electron-log'
import { join, resolve } from 'path'
import { logsPath } from './paths'
function getTime() {
  const time = new Date()
  const year = time.getFullYear()
  const mounth = time.getMonth() + 1
  const day = time.getDate()
  const hours = time.getHours()

  return `${year}年${mounth}月${day}日${hours}时.log`
}

log.transports.file.resolvePath = () => join(logsPath, `${getTime()}`)

export function printInfo(type: 'info' | 'error', info: string, value: any = '') {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  switch (type) {
    case 'info':
      log.info(` \u2618 ${info} \u27A4 \u27A4 \u27A4  ${value}`)
      break
    case 'error':
      log.error(` \u2622 ${info} \u27A4 \u27A4 \u27A4  ${value}`)
      break
  }
}
