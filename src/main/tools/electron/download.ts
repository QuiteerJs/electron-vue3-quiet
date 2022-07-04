import { BrowserWindow, app } from 'electron'
import { join } from 'path'

export const downloadItemMap = new Map<string, Electron.DownloadItem>()

/**
 * 描述
 * @date 2022-03-18
 * @param {any} win:BrowserWindow
 * @param {any} options:DownloadOptions
 * @returns {any}
 */
export class Downloader {
  private downloadItem: Electron.DownloadItem
  private options: Download.DownloadOptions
  private win: BrowserWindow
  status: Download.DownloadStatus
  constructor(win: BrowserWindow, options: Download.DownloadOptions) {
    if (!options.savePath && !options.isShowSaveDialog) {
      options.savePath = app.getPath('downloads')
    }
    this.options = options
    this.win = win
  }

  /**
   * 描述   返回控制器
   * @date 2022-03-18
   * @returns {any}
   */
  get item(): Electron.DownloadItem {
    return this.downloadItem
  }

  /**
   * 描述   下载状态变化
   * @date 2022-03-18
   * @param {any} state
   * @param {any} message
   * @param {any} progress=0
   * @returns {any}
   */
  private statusChange(state: any, message: string, progress = 0) {
    this.status = {
      state,
      isSuccess: state === 'completed',
      message,
      progress
    }
  }

  /**
   * 描述  本次下载信息
   * @date 2022-03-18
   * @param {any} status
   * @returns {any}
   */
  private getDtails(status: any) {
    return {
      ...status,
      time: this.getTime(),
      url: this.item.getURL(),
      savePath: this.item.savePath,
      filename: this.item.getFilename()
    }
  }

  /**
   * 描述   下载时间
   * @date 2022-03-18
   * @returns {any}
   */
  private getTime() {
    const int = (n: number): number => parseInt(n + '')
    const pad = (n: number): string => n.toString().padStart(2, '0')

    const start = this.item.getStartTime() * 1000
    const now = new Date().getTime()
    const time = +((now - start) / 1000).toFixed(2)

    if (time < 60) return `${time}秒`
    if (time / 60 < 60) return `${int(time / 60)}分${pad(int(time % 60))}秒`
    return `${int(time / 60 / 60)}时${pad(int(time / 60))}分${pad(int(time % 60))}秒`
  }

  /**
   * 描述   启动下载
   * @date 2022-03-18
   * @returns DownloadDetails
   */
  start(): Promise<Download.DownloadDetails> {
    return new Promise((resolve, reject) => {
      this.win.webContents.downloadURL(this.options.url)

      this.win.webContents.session.on('will-download', async (event, item, webContents) => {
        console.log('this.options.isShowSaveDialog: ', this.options.isShowSaveDialog)
        if (this.options.isShowSaveDialog) {
          item.setSaveDialogOptions({ title: '请选择文件下载路径' })
        } else {
          const filePath = join(this.options.savePath as string, this.options.filename)
          item.setSavePath(filePath)
        }

        this.downloadItem = item
        downloadItemMap.set(this.options.eventKey as string, item)

        await this.hanleStatus()

        resolve(this.getDtails(this.status))
      })
    })
  }

  /**
   * 描述   监控下载状态
   * @date 2022-03-18
   * @returns {any}
   */
  private hanleStatus() {
    let num = 0
    return new Promise((resolve, reject) => {
      this.item
        .on('updated', (event, state) => {
          switch (state) {
            case 'interrupted':
              this.statusChange(state, '下载中断，可以恢复')
              if (this.item.canResume()) {
                if (num === 3) return resolve(this.status)
                num++
                this.item.resume()
              }
              break
            case 'progressing':
              if (this.downloadItem.isPaused()) {
                this.statusChange(state, '暂停下载')
              } else {
                const current = this.downloadItem.getReceivedBytes()
                const total = this.downloadItem.getTotalBytes()
                const progress = +((current / total) * 100).toFixed(0)

                this.statusChange(state, '当前进度', progress)
                if (this.options.isSendProgress) {
                  this.win.webContents.send(`download-progressing-${this.options.eventKey}`, progress)
                }
              }
              break
          }
        })
        .once('done', (event, state) => {
          switch (state) {
            case 'completed':
              this.statusChange(state, '下载成功')
              downloadItemMap.delete(this.options.eventKey as string)
              break
            case 'cancelled':
              this.statusChange(state, '下载取消')
              break
            case 'interrupted':
              this.statusChange(state, '下载中断，无法恢复')
              downloadItemMap.delete(this.options.eventKey as string)
              break
          }
          resolve(this.status)
        })
    })
  }
}
