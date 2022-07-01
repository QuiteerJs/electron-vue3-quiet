import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export default (srcPath: string) => {
  return [
    Icons({
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader(`${srcPath}/assets/svg`)
      },
      autoInstall: true,
      scale: 1,
      defaultClass: 'inline-block',
      jsx: 'preact'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core']
    }),
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          customCollections: ['custom'],
          componentPrefix: 'icon'
        }),
        NaiveUiResolver()
      ]
    })
  ]
}
