<script setup lang="tsx">
interface Props {
  cardList: Component.CardState[]
}

const props = withDefaults(defineProps<Props>(), {
  cardList: () => []
})
defineOptions({ name: 'CardGroup' })

const openNewWindow = (item: Component.CardState) => {
  window.$ipc.send('main-open', toRaw(item))
}

defineRender(() => (
      <div class="p-2 flex flex-wrap select-none">
        {props.cardList.map((item) => {
          return (
            <n-card
              hoverable
              title={item.title}
              class="!w-210px cursor-pointer mr-14px mb-14px"
              onClick={() => openNewWindow(item)}
            >
              {item.content}
            </n-card>
          )
        })}
      </div>
))
</script>
