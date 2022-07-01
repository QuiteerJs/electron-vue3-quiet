// 事件总线，全局单例
import { eventBus } from '@/utils'

export function useEventBus() {
  const instance = {
    eventMap: new Map(),
    // 复用eventBus事件收集相关逻辑
    on: eventBus.on,
    once: eventBus.once,
    // 清空eventMap
    clear() {
      this.eventMap.forEach((list, key) => {
        list.forEach(cb => {
          eventBus.off(key, cb)
        })
      })
      eventMap.clear()
    }
  }
  const eventMap = new Map()
  // 劫持两个监听方法，收集当前组件对应的事件
  const on = (key, cb) => {
    instance.on(key, cb)
    eventBus.on(key, cb)
  }
  const once = (key, cb) => {
    instance.once(key, cb)
    eventBus.once(key, cb)
  }

  // 组件卸载时取消相关的事件
  onUnmounted(() => {
    instance.clear()
  })
  return {
    on,
    once,
    off: eventBus.off.bind(eventBus),
    emit: eventBus.emit.bind(eventBus)
  }
}
