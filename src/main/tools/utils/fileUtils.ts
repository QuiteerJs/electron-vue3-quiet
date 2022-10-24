import type {
  Stats,
} from 'fs'
import {
  access,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdir,
  readFile,
  readdir,
  readdirSync,
  rename,
  rmdirSync,
  stat,
  statSync,
  unlink,
  unlinkSync,
  writeFile,
} from 'fs'
import ElectronLog from 'electron-log'
import axios from 'axios'

export class FileUtils {
  // isBuffer: boolean
  // isPath: boolean
  // buffer: Buffer
  // path: string

  // static fromBase64(base64: string) {
  //   const fileUtils = new FileUtils()
  //   fileUtils.buffer = Buffer.from(base64, 'base64')
  //   return fileUtils
  // }

  // static async fromPath(path: string) {
  //   if (await this.access(path)) {
  //     const fileUtils = new FileUtils()
  //     fileUtils.path = path
  //     return fileUtils
  //   }
  // }

  static async downloadFromHttp(sourcePath: string, targetPath: string): Promise<boolean> {
    return await new Promise<boolean>((resolve) => {
      axios({
        method: 'get',
        url: sourcePath,
        responseType: 'stream',
      })
        .then((response) => {
          try {
            response.data.pipe(createWriteStream(targetPath)).on('end', async () => {
              resolve(await this.access(targetPath))
            })
          }
          catch (err) {
            this.error('downloadFromHttp stream err', err)
            resolve(false)
          }
        })
        .catch((err) => {
          this.error('downloadFromHttp err', err)
          resolve(false)
        })
    })
  }

  static readFile(filePath: string, options = {}): Promise<any> {
    return new Promise((resolve) => {
      readFile(filePath, options, (err, data) => {
        if (err) {
          this.error('FileUtils readFile', err)
          resolve(null)
        }
        else {
          resolve(data)
        }
      })
    })
  }

  static writeFile(filePath: string, buffer: any, options = {}): Promise<boolean> {
    return new Promise((resolve) => {
      writeFile(filePath, buffer, options, (err) => {
        if (err)
          this.error('FileUtils writeFile', err)
        resolve(!err)
      })
    })
  }

  static mkdir(filePath: string, options = {}): Promise<boolean> {
    return new Promise((resolve) => {
      mkdir(filePath, options, (err) => {
        if (err)
          this.error('FileUtils mkdir', err)
        resolve(!err)
      })
    })
  }

  static unlink(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      unlink(filePath, (err) => {
        if (err)
          this.error('FileUtils unlink', err)
        resolve(!err)
      })
    })
  }

  static copyFile(sourcePath: string, targetPath: string): Promise<boolean> {
    return new Promise((resolve) => {
      let error = false
      const source = createReadStream(sourcePath)
      const target = createWriteStream(targetPath)
      source.on('error', () => {
        error = true
      })
      target
        .on('error', () => {
          error = true
        })
        .on('close', () => {
          const exists = existsSync(targetPath)
          if (error) {
            if (exists)
              unlinkSync(targetPath)
          }
          resolve(!error && exists)
        })
      source.pipe(target)
    })
  }

  static rename(oldPath: string, newPath: string) {
    return new Promise((resolve) => {
      rename(oldPath, newPath, (err) => {
        if (err)
          this.error('FileUtils rename', err)
        resolve(!err)
      })
    })
  }

  static access(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      access(filePath, (err) => {
        // if (err) this.error('FileUtils access', err)
        resolve(!err)
      })
    })
  }

  static existsSync(filePath: string) {
    return existsSync(filePath)
  }

  static readdir(filePath: string): Promise<Array<string>> {
    return new Promise((resolve) => {
      readdir(filePath, (err, files) => {
        if (err) {
          this.error('FileUtils readdir', err)
          resolve([])
        }
        else {
          resolve(files)
        }
      })
    })
  }

  static stat(filePath: string): Promise<Stats | false> {
    return new Promise((resolve) => {
      stat(filePath, (err, stats) => {
        if (err) {
          this.error('FileUtils stat', err)
          resolve(false)
        }
        else {
          resolve(stats)
        }
      })
    })
  }

  static rmRf(filePath: string) {
    if (existsSync(filePath)) {
      readdirSync(filePath).forEach((file) => {
        const curPath = `${filePath}/${file}`
        if (statSync(curPath).isDirectory())
          this.rmRf(curPath)
        else
          unlinkSync(curPath)
      })
      rmdirSync(filePath)
    }
  }

  private static error(...data: any[]) {
    ElectronLog.error(...data)
  }
}
