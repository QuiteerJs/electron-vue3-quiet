import type { PropType } from 'vue'

export default defineComponent({
  name: 'CardGroup',
  props: {
    cardList: {
      type: Array as PropType<Component.CardState[]>,
      default: () => []
    }
  },
  setup(props, { attrs, emit, expose, slots }) {
    const { cardList } = props

    const openNewWindow = item => {
      window.$ipc.send('main-open', toRaw(item))
    }

    return () => (
      <div class="p-2 flex flex-wrap select-none">
        {cardList.map(item => {
          return (
            <n-card
              hoverable
              title={item.title}
              class="!w-216px cursor-pointer mr-14px mb-14px"
              onClick={() => openNewWindow(item)}
            >
              {item.content}
            </n-card>
          )
        })}
      </div>
    )
  }
})
