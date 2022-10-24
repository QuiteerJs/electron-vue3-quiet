import { resolveDirective, withDirectives } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref<string>('msg')
    return {
      msg,
    }
  },
  expose: ['msg'],
  render() {
    const el = <h1 style={{ maxWidth: '250px' }}>{'<div v-[①]:[③].[{④}]="②"></div>'}</h1>
    const slot = this.$slots.default && this.$slots.default()
    const footerSlot = this.$slots.footer && this.$slots.footer()
    return (
      <div>
        {this.msg}
        {withDirectives(el, [
          [resolveDirective('demo')!, () => 1, 'value', { suffix: true }],
          [resolveDirective('ellipsis')!, 1],
        ])}
        <div>
          <slot />
        </div>
        <div>
          <slot name="footer" text={this.msg} />
        </div>
        <div>{slot}</div>
        <div>{footerSlot}</div>
      </div>
    )
  },
})
