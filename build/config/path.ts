import { fileURLToPath } from 'url'
import { normalizePath } from 'vite'

/**
 * 解析路径
 * @param basePath - 基础路径
 */
export function resolvePath(rootPath: string, basePath: string) {
  const root = fileURLToPath(new URL(rootPath, basePath))
  const src = `${root}src/renderer`

  return {
    root: normalizePath(root),
    renderer: normalizePath(src),
  }
}
