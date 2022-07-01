import { defineStore } from 'pinia'

interface DemoState {
  demo: {
    name: string
  }
}

export const useDemoStore = defineStore('demo', {
  state: (): DemoState => ({
    demo: {
      name: 'demo'
    }
  }),
  getters: {
    name: (state): string => state.demo.name
  },
  actions: {
    actionDemo(data: string) {
      this.demo.name = data
    }
  }
})
