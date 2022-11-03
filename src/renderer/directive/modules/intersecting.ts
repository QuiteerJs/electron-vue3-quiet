// v-intersecting:show
// v-intersecting:hide
import type { Directive } from 'vue'

type Fn = (isIntersecting: boolean) => void

interface Params {
  show?: Fn
  hide?: Fn
}

const directive: Directive<HTMLElement, Fn | Params> = {
  mounted(el, { arg, value }) {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (!arg && typeof value === 'object') {
        isIntersecting && value.show && value.show(isIntersecting)
        isIntersecting || !value.hide || value.hide(isIntersecting)
      }

      if (arg && typeof value === 'function') {
        if (arg === 'show' && isIntersecting)
          value(isIntersecting)

        if (arg === 'hide' && !isIntersecting)
          value(isIntersecting)
      }
    })
    observer.observe(el)
  }
}

export default {
  name: 'intersecting',
  directive
}
