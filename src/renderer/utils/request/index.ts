import { createRequest } from './createRequest'

export const request = createRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000 * 6,
})

export const uploadFile = createRequest({
  baseURL: import.meta.env.VITE_UPLOAD_URL,
  timeout: 1000 * 60,
  onUploadProgress(progressEvent) {
    const progress = parseInt(`${(progressEvent.loaded / progressEvent.total) * 100}`)
    console.log('onUploadProgress :>> ', progress)
  },
  onDownloadProgress(progressEvent) {
    const progress = parseInt(`${(progressEvent.loaded / progressEvent.total) * 100}`)
    console.log('onDownloadProgress :>> ', progress)
  },
})
