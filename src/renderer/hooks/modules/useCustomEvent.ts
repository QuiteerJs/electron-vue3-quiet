import { onUnmounted } from 'vue'

export function useCustomEvent() {
  const initiate = <T>(eventName: string, options: T) => {
    dispatchEvent(new CustomEvent(eventName, { detail: options }))
  }

  const listener = <T>(eventName: string, callback: (options?: T) => void) => {
    const listener = (event: CustomEvent) => {
      callback(event?.detail ?? event)
    }

    addEventListener(eventName as any, listener)

    onUnmounted(() => {
      removeEventListener(eventName as any, listener)
    })
  }

  return { initiateCustomEvent: initiate, listenerCustomEvent: listener }
}
