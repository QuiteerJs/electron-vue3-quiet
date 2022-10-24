/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { defineConfig } from 'vite'
import { resolveConfig, resolvePath, viteDefine } from './build'

export default defineConfig(() => {
  const { renderer } = resolvePath('./', import.meta.url)

  return {
    resolve: resolveConfig(renderer),
    define: viteDefine,
    test: {
      globals: true,
    },
  }
})
