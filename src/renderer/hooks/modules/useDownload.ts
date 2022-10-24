import { v4 as uuidv4 } from 'uuid'

export function useDownload() {
  const eventKey = uuidv4()
  const eventName = `download-progressing-${eventKey}`

  const progress = ref(0)
  const info = ref<Download.DownloadDetails>()

  window.$ipc.on<number>(eventName, (event, num) => {
    progress.value = num ?? 0
  })

  const start = (optsions: Download.DownloadOptions): Promise<Download.DownloadDetails> => {
    return new Promise((resolve, reject) => {
      window.$ipc
        .invoke<Download.DownloadOptions, Download.DownloadDetails>('download-option', 'file', {
          ...optsions,
          eventKey,
        })
        .then((data) => {
          if (data.isSuccess)
            window.$message.success(data.message)

          info.value = data
          window.$ipc.removeAllListeners(eventName)
          resolve(data)
        })
        .catch(reject)
    })
  }

  return { progress, downloadInfo: info, downloadStart: start }
}
