import 'virtual:windi.css'
// 通用字体
import 'vfonts/Lato.css'
import './styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App'
import router from './router'
import i18n from './i18n'
import customDirective from './directive'

// 解决tailwindcss覆盖naive样式的问题
// const meta = document.createElement('meta')
// meta.name = 'naive-ui-style'
// document.head.appendChild(meta)

const app = createApp(App)

app.use(createPinia()).use(router)
app.use(i18n).use(naive)
app.use(customDirective)

app.mount('#app')
