export const mainDevExecFn = (callback: () => void) => process.env.NODE_ENV === 'development' && callback()

export const mainProExecFn = (callback: () => void) => process.env.NODE_ENV === 'production' && callback()

export const getMainEnv = (callback: (env: NodeJS.ProcessEnv) => void) => callback(process.env)
