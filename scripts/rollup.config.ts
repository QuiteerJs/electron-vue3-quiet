// Node.js 提供的所有模块的名称列表。
import { builtinModules } from 'module'
import path from 'path'
// 提供别名
import { readdirSync } from 'fs'
import alias from '@rollup/plugin-alias'
//  将common依赖包转为es模块
import commonjs from '@rollup/plugin-commonjs'
// 使用Node解析算法来定位模块，以便在node_modules中使用第三方模块
import nodeResolve from '@rollup/plugin-node-resolve'
// .json文件转换为ES6模块
import json from '@rollup/plugin-json'
// 构建及压缩
import esbuild from 'rollup-plugin-esbuild'
// 混淆
import obfuscator from 'rollup-plugin-obfuscator'
// 注入环境变量
import replace from '@rollup/plugin-replace'
import { defineConfig } from 'rollup'

import { dependencies } from '../package.json'

const resolve = (filePath: string) => path.resolve(__dirname, `../${filePath}`)

const transformEnv = (env: NodeJS.ProcessEnv) => {
  const prefix = 'process.env.'
  const envObj = {}
  Object.entries(env).forEach(([key, value]) => {
    envObj[`${prefix}${key}`] = JSON.stringify(value)
  })

  return envObj
}

const inputOptions = () => {
  const files: string[] = readdirSync(resolve('src/preload'))
  return files.reduce(
    (pre, now) => {
      if (now === 'main') {
        return {
          ...pre,
          preload: resolve(`src/preload/${now}/index.ts`)
        }
      }
      return {
        ...pre,
        [now]: resolve(`src/preload/${now}/index.ts`)
      }
    },
    { main: resolve('src/main/index.ts') }
  )
}

export default (env: NodeJS.ProcessEnv, isClearness?: boolean) => {
  const isPord = env.NODE_ENV === 'production'

  return defineConfig({
    input: inputOptions(),
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: false,
      sanitizeFileName: (fileName: string) => {
        if (fileName === 'preload')
          return 'preload/main'
        if (fileName !== 'main')
          return `preload/${fileName}`
        return fileName
      }
    },
    plugins: [
      replace({
        preventAssignment: true,
        ...transformEnv(env)
      }),
      alias({
        entries: [
          { find: '~', replacement: resolve('src/main') },
          { find: '@common', replacement: resolve('src/common') },
          { find: '@enums', replacement: resolve('src/enums') }
        ]
      }),
      commonjs({
        // 如果为false，则跳过CommonJS模块的源映射生成。这将提高性能。
        sourceMap: false
      }),
      nodeResolve({
        // 指定插件将要操作的文件的扩展名。
        extensions: ['.mjs', '.ts', '.js', '.json', '.node']
      }),
      json(),
      esbuild({
        include: /\.[jt]s?$/,
        exclude: /node_modules/,
        // watch: process.argv.includes('--watch'), // rollup 中有配置
        sourceMap: false, // default
        minify: isClearness ? false : isPord,
        target: 'esnext', // default, or 'es20XX', 'esnext'
        // Like @rollup/plugin-replace
        define: {
          __VERSION__: '"x.y.z"'
        },
        loaders: {
          '.json': 'json',
          '.ts': 'ts'
        }
      }),
      isPord && !isClearness ? obfuscator({}) : null
    ],
    external: [...builtinModules, ...Object.keys(dependencies), 'electron']
  })
}
