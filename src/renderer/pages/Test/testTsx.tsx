import { withDirectives, resolveDirective } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref<string>('msg')
    return {
      msg
    }
  },
  expose: ['msg'],
  render() {
    return (
      <div>
        {this.msg}
        {withDirectives(<h1 style={{ maxWidth: '250px' }}>{`<div v-[①]:[③].[{④}]="②"></div>`}</h1>, [
          [resolveDirective('demo'), () => 1, 'value', { suffix: true }],
          [resolveDirective('ellipsis'), 1]
        ])}
        {/* <div><slot /></div> */}
        <div>{this.$slots.default()}</div>
        {/* <div><slot name="footer" :text="message" /></div> */}
        <div>{this.$slots.footer({ text: this.message })}</div>
      </div>
    )
  }
})
