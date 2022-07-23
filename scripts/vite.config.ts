import { defineConfig } from 'vite'
import { resolveConfig, viteDefine, resolvePath, setupVitePlugins } from '../build'
import { resolve } from 'path'

export default defineConfig(configEnv => {
  const { root, renderer } = resolvePath('../', import.meta.url)

  return {
    base: './',
    root: renderer,
    resolve: resolveConfig(renderer),
    define: viteDefine,
    build: {
      outDir: resolve(root, 'dist'),
      target: 'esnext',
      minify: 'esbuild',
      reportCompressedSize: false,
      emptyOutDir: false,
      chunkSizeWarningLimit: 2000
    },
    server: {
      host: '0.0.0.0'
    },
    plugins: [...setupVitePlugins(configEnv, renderer)],
    publicDir: resolve(root, 'public')
  }
})
