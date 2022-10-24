type AnyFn = (...args: any[]) => void

export class EventEmitter {
  private cache: Map<string, Set<AnyFn>>
  private static _instance: EventEmitter

  private constructor() {
    this.cache = new Map()
  }

  static getInstance() {
    if (!this._instance)
      return (this._instance = new EventEmitter())

    return this._instance
  }

  on(name: string, callback: () => void) {
    let fncs = this.cache.get(name)

    if (!fncs)
      fncs = new Set()

    fncs.add(callback)

    this.cache.set(name, fncs)
  }

  once(name: string, callback: () => void) {
    this.on(`once-${name}`, callback)
  }

  emit(name: string, ...args: any[]) {
    this.cache.get(name)?.forEach((callback) => {
      callback(...args)
    })

    const onceEvent = `once-${name}`

    this.cache.get(onceEvent)?.forEach((callback) => {
      callback(...args)
    })

    this.cache.delete(onceEvent)
  }

  off(name: string, callback: () => void) {
    const funcs = this.cache.get(name)

    funcs?.delete(callback)

    funcs && this.cache.set(name, funcs)
  }
}

export const eventBus = EventEmitter.getInstance()
