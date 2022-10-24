interface MyEvent<Data> extends Event {
  detail: Data
}

export class CreateEvent<Args> {
  private eventName: string
  private listener: (event: MyEvent<Args>) => void
  private callback: (...args: any[]) => void

  constructor(eventName: string, callback?: () => void) {
    this.eventName = eventName
    callback && (this.callback = callback)
  }

  dispatch(args?: Args) {
    if (!this.eventName)
      return

    const event = args ? new CustomEvent(this.eventName, { detail: args }) : new Event(this.eventName)

    window.dispatchEvent(event)
  }

  listen() {
    this.listener = (event: MyEvent<Args>) => {
      this.callback(event?.detail ?? event)
    }

    window.addEventListener(this.eventName as any, this.listener)
  }

  destroy() {
    window.removeEventListener(this.eventName as any, this.listener)
  }
}
