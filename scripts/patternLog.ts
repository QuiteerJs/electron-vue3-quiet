import { chalk } from 'zx'

interface LogInfo {
  name: string
  info: string
  timeKey: string
}

export function colorLog(name: string) {
  const logo = `  ${name}  `
  const doneLog = (info: string) => console.log('\n' + chalk.bgGreen.white(logo) + ' ' + info)

  const errorLog = (info: string) => console.log('\n' + chalk.bgRed.white(logo) + ' ' + info)

  const okayLog = (info: string) => console.log('\n' + chalk.bgBlue.white(logo) + ' ' + info)

  const timeKey = (info: string) => `\n${chalk.bgBlue.white(logo)} 本次 ${info} 用时为`

  return {
    logo,
    doneLog,
    errorLog,
    okayLog,
    timeKey
  }
}

export async function runnerLog(promiseCli: () => Promise<unknown>, logInfo: LogInfo) {
  const loger = colorLog(logInfo.name)
  console.time(loger.timeKey(logInfo.timeKey))
  await promiseCli().catch(error => {
    loger.errorLog(JSON.stringify(error))
    process.exit(1)
  })
  loger.doneLog(logInfo.info)
  console.timeEnd(loger.timeKey(logInfo.timeKey))
}
