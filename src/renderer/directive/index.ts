import type { App, Directive } from 'vue'

type Model = ImportMetaGlob<{ directive: Directive<HTMLElement, unknown>; name: string }>

const modules = import.meta.glob('./modules/*.ts', { eager: true })

export default {
  install(app: App) {
    Object.values(modules).forEach((item) => {
      const model = item as Model
      app.directive(model.default.name, model.default.directive)
    })
  },
}
