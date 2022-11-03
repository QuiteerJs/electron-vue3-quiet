import { Content } from './Content'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import IpcOnMounted from '@/components/IpcOnMounted'
// import { testApi } from '@/api'

export default defineComponent({
  name: 'Layout',
  setup() {
    const win = ref<InstanceType<typeof IpcOnMounted> | null>()

    onMounted(async () => {
      // const status = await win.value?.winStatus()
      // console.log('status :>> ', status)
    })

    return () => (
      <>
        <IpcOnMounted ref={win} />
        <div class=" flex flex-col box-border h-screen overflow-hidden">
          <Header></Header>
          <div class="flex-grow flex">
            <Sidebar></Sidebar>
            <div class="flex-grow">
              <Content></Content>
            </div>
          </div>
        </div>
      </>
    )
  }
})
