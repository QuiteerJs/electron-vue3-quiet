// vite.config.ts
import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default VueMacros({
  plugins: {
    vue: Vue(),
    vueJsx: VueJsx(), // if needed
  },
})
