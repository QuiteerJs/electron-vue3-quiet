import { createI18n } from 'vue-i18n'

type LangStr = Record<string, string>

interface I18nLang {
  en: LangStr
  zh: LangStr
}

type Model = ImportMetaGlob<I18nLang>

const modules = import.meta.glob('./modules/*.ts', { eager: true })

const messages = Object.values(modules).reduce(
  (pre: I18nLang, now) => {
    const lang = (now as Model).default
    return {
      en: { ...pre.en, ...lang.en },
      zh: { ...pre.zh, ...lang.zh }
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
