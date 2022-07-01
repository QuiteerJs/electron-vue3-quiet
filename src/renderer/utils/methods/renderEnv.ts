export const renderDevExecFn = (callback: () => void) => import.meta.env.DEV && callback()

export const renderProExecFn = (callback: () => void) => import.meta.env.PROD && callback()

export const getRenderEnv = (callback: (env: ImportMetaEnv) => void) => callback(import.meta.env)
