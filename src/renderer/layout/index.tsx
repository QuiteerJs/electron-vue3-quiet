import IpcOnMounted from '@/components/IpcOnMounted'
import { Content } from './Content'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { testApi } from '@/api'
import { useApi } from '@/hooks'

export default defineComponent({
  name: 'Layout',
  setup(props, context) {
    const win = ref<InstanceType<typeof IpcOnMounted>>(null)

    onMounted(async () => {
      const status = await win.value.winStatus()
      console.log('status :>> ', status)
      const { loading, error, result, fetchResource } = useApi<Test.api>(testApi)
    })

    console.log('import.meta.env: ', import.meta.env)

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
