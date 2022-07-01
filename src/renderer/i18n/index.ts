import { createI18n } from 'vue-i18n'

const modules = import.meta.globEager('./modules/*.ts')

const messages = Object.values(modules).reduce(
  (pre, now) => {
    const lang = now.default
    return {
      en: { ...pre?.en, ...lang.en },
      zh: { ...pre?.zh, ...lang.zh }
    }
  },
  { en: {}, zh: {} }
)

export default createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  locale: 'zh',
  messages
})
