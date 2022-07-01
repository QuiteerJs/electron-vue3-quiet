import { request } from '@/utils/index'

export const testApi = () => request.get<Test.api>('/test')
