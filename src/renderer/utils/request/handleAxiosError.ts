import type { AxiosError } from 'axios'
import { statusCodeMap } from './statusCodeMap'

async function showMessage(key, axiosError: AxiosError) {
  if (!statusCodeMap.has(key)) return

  console.log('已捕获的错误处理')
  window.$message.destroyAll()
  const handle = statusCodeMap.get(key)
  const message = await handle(axiosError)
  window.$message.warning(message)
}

/**
 * 处理axios请求失败的错误
 * @param error - 错误
 */
export async function handleAxiosError(axiosError: AxiosError) {
  const err = {
    status: axiosError.response?.status,
    code: axiosError.code,
    message: axiosError.message
  }

  for (const key in err) showMessage(err[key], axiosError)

  console.log('err :>> ', err)

  return Promise.reject(axiosError)
}
