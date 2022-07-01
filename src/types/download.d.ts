declare namespace Download {
  interface DownloadOptions {
    // 目标资源
    url: string
    // 要保存的文件名(带后缀)
    filename: string
    // 确保事件唯一性的key
    eventKey?: string
    // 要保存到的地址
    savePath?: string
    // 是否展示路径选择
    isShowSaveDialog?: boolean
    // 是否返回进度
    isSendProgress?: boolean
  }

  interface DownloadStatus {
    // 当前状态
    state: string
    // 是否成功
    isSuccess: boolean
    // 提示语句
    message: string
    // 进度
    progress?: number
  }

  interface DownloadDetails extends DownloadStatus {
    // 耗时
    time: string
    // 目标资源
    url: string
    // 保存到本地的路径
    savePath: string
    // 文件名称
    filename: string
  }
}
