export default defineComponent({
  name: 'LayoutContent',
  setup(props, { attrs, emit, expose, slots }) {
    return () => (
      <div class="h-[calc(100vh - 3.5rem)] overflow-x-auto" a:bg="base">
        <div a:text="30px primary" a:p="b-20px" a:bg="info-active">
          primary
        </div>
        <div a:text="30px info" a:bg="light">
          info
        </div>
        <div a:text="30px success" a:bg="light">
          success
        </div>
        <div a:text="30px warning" a:bg="light">
          warning
        </div>
        <div a:text="30px error" a:bg="light">
          error
        </div>
        <div a:text="30px primary" a:p="b-20px" a:bg="*test">
          别名
        </div>
        <RouterView />
      </div>
    )
  }
})
