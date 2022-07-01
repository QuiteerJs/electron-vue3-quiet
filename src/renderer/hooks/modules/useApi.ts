import type { AxiosError } from 'axios'

export function useApi<T>(api) {
  const loading = ref<boolean>(false)
  const result = ref<T>(null)
  const error = ref<AxiosError>(null)

  const fetchResource = (params): T => {
    loading.value = true
    return api(params)
      .then(data => {
        // 按照约定，api返回的结果直接复制给result
        result.value = data
      })
      .catch(e => {
        error.value = e
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    loading,
    error,
    result,
    fetchResource
  }
}
