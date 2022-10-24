import { resolve } from 'path'
import type { UserConfig } from 'vite'

export function resolveConfig(root: string): UserConfig['resolve'] {
  return {
    alias: {
      '@common': resolve(root, '../common'),
      '@enums': resolve(root, '../enums'),
      '@': root,
    },
  }
}
