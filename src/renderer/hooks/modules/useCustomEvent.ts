import { onUnmounted } from 'vue'

export function useCustomEvent() {
  const initiate = <T>(eventName: string, options: T = null) => {
    dispatchEvent(new CustomEvent(eventName, { detail: options }))
  }

  const listener = <T>(eventName: string, callback: (options?: T) => void) => {
    const listener = (event: CustomEvent) => {
      callback(event?.detail ?? event)
    }

    addEventListener(eventName, listener)

    onUnmounted(() => {
      removeEventListener(eventName, listener)
    })
  }

  return { initiateCustomEvent: initiate, listenerCustomEvent: listener }
}
