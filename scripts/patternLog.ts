import { chalk } from 'zx'

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
