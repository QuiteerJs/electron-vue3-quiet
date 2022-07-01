import type { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import { handleAxiosError } from './handleAxiosError'
import axios from 'axios'

interface RequestOptions {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete'
  data?: any
  params?: any
  config?: AxiosRequestConfig
}

/**
 * 封装axios请求类
 */
class CustomAxiosInstance {
  instance: AxiosInstance

  constructor(axiosConfig: AxiosRequestConfig) {
    this.instance = axios.create(axiosConfig)
    this.setInterceptor()
  }

  setInterceptor() {
    this.instance.interceptors.request.use(async config => {
      return config
    }, handleAxiosError)

    this.instance.interceptors.response.use(
      async response =>
        new Promise((resolve, reject): any => {
          const { status, config, data } = response

          if (status !== 200) reject(false)

          resolve(data)
        }),
      handleAxiosError
    )
  }
}

async function getRequestResponse(instance: AxiosInstance, options: RequestOptions) {
  options.method = options.method || 'get'
  const { method, url, config } = options
  const res: any = await instance[method](url, config)
  return res
}

export function createRequest(axiosConfig: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(axiosConfig)

  /**
   * 异步promise请求
   * @param param - 请求参数
   * - url: 请求地址
   * - method: 请求方法(默认get)
   * - data: 请求的body的data
   * - axiosConfig: axios配置
   */
  async function request<T = any>(options: RequestOptions): Promise<T> {
    const { instance } = customInstance
    const res: T = await getRequestResponse(instance, options)

    return res
  }

  /**
   * get请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function get<T = any>(url: string, params?: any, config?: AxiosRequestConfig) {
    return request<T>({ url, method: 'get', params, config })
  }

  /**
   * post请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return request<T>({ url, method: 'post', data, config })
  }
  /**
   * put请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return request<T>({ url, method: 'put', data, config })
  }

  /**
   * delete请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function handleDelete<T = any>(url: string, config: AxiosRequestConfig) {
    return request<T>({ url, method: 'delete', config })
  }

  return {
    get,
    post,
    put,
    delete: handleDelete
  }
}
