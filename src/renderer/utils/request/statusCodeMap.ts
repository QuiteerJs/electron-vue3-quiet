import type { AxiosError } from 'axios'

type ErrorMessage = (err: AxiosError) => Promise<string>

export const statusCodeMap = new Map<number | string, ErrorMessage>()

statusCodeMap.set('Network Error', () => {
  return Promise.resolve('网络连接失败,请检查网络连接后重试!')
})

statusCodeMap.set('ECONNABORTED', () => {
  return Promise.resolve('网络连接超时,请检查网络后重试!')
})

statusCodeMap.set(400, () => {
  return Promise.resolve('语义有误，当前请求无法被服务器理解!')
})

statusCodeMap.set(401, () => {
  return Promise.resolve('登录状态失效!请重新登录!')
})

statusCodeMap.set(403, () => {
  return Promise.resolve('用户得到授权，但是访问是被禁止的!')
})

statusCodeMap.set(404, () => {
  return Promise.resolve('网络请求错误,未找到该资源!')
})

// 请求方法错误
statusCodeMap.set(405, () => {
  return Promise.resolve('网络请求错误,请求方法未允许!')
})

statusCodeMap.set(408, () => {
  return Promise.resolve('网络请求超时!')
})

statusCodeMap.set(500, () => {
  return Promise.resolve('服务器错误,请联系管理员!')
})

statusCodeMap.set(501, () => {
  return Promise.resolve('网络未实现!')
})

statusCodeMap.set(502, () => {
  return Promise.resolve('网络错误!')
})

statusCodeMap.set(503, () => {
  return Promise.resolve('服务不可用，服务器暂时过载或维护!!')
})

statusCodeMap.set(504, () => {
  return Promise.resolve('网络超时!')
})

statusCodeMap.set(505, () => {
  return Promise.resolve('http版本不支持该请求!')
})
