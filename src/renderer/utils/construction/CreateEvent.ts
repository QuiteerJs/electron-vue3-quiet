interface MyEvent<Data> extends Event {
  detail: Data
}

export class CreateEvent<Args> {
  private eventName: string
  private listener: EventListenerOrEventListenerObject
  private callback: (...args) => void
  private args: Args = null

  constructor(eventName: string, callback?: (...args) => void) {
    this.eventName = eventName
    this.callback = callback
  }

  dispatch(args?: Args) {
    if (!this.eventName) return

    this.args = args
    const event = args ? new CustomEvent(this.eventName, { detail: args }) : new Event(this.eventName)

    window.dispatchEvent(event)
  }

  listen() {
    this.listener = (event: MyEvent<Args>) => {
      this.callback(event?.detail ?? event)
    }

    window.addEventListener(this.eventName, this.listener)
  }

  destroy() {
    window.removeEventListener(this.eventName, this.listener)
  }
}
