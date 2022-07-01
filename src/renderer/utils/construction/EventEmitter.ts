type AnyFn = (...args) => void

export class EventEmitter {
  private cache: Map<string, Set<AnyFn>>
  private static _instance: EventEmitter = null

  private constructor() {
    this.cache = new Map()
  }

  static getInstance() {
    if (!this._instance) {
      return (this._instance = new EventEmitter())
    }
    return this._instance
  }

  on(name, callback) {
    let fncs = this.cache.get(name)

    if (!fncs) fncs = new Set()

    fncs.add(callback)

    this.cache.set(name, fncs)
  }

  once(name, callback) {
    this.on(`once-${name}`, callback)
  }

  emit(name, ...args) {
    if (this.cache.has(name)) {
      this.cache.get(name).forEach(callback => {
        callback(...args)
      })
    }

    const onceEvent = `once-${name}`

    if (this.cache.has(onceEvent)) {
      this.cache.get(onceEvent).forEach(callback => {
        callback(...args)
      })

      this.cache.delete(onceEvent)
    }
  }

  off(name, callback) {
    if (this.cache.has(name)) {
      const funcs = this.cache.get(name)

      funcs.delete(callback)

      this.cache.set(name, funcs)
    }
  }
}

export const eventBus = EventEmitter.getInstance()
