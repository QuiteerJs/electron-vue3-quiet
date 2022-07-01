import type { App } from 'vue'

const modules = import.meta.globEager('./modules/*.ts')

export default {
  install(app: App) {
    Object.values(modules).forEach(model => {
      app.directive(model.default.name, model.default.directive)
    })
  }
}
