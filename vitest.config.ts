/* eslint-disable spaced-comment */
/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { defineConfig } from 'vite'
import { resolveConfig, viteDefine, resolvePath } from './build'

export default defineConfig(() => {
  const { renderer } = resolvePath('./', import.meta.url)

  return {
    resolve: resolveConfig(renderer),
    define: viteDefine,
    test: {
      globals: true
    }
  }
})
