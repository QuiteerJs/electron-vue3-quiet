import { RouterLink, RouterView } from 'vue-router'
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'
import TestTsx from './testTsx'
import IpcOnMounted from '@/components/IpcOnMounted'
// import { getRenderEnv } from '@/utils'
import { useDemoStore } from '@/store'

export default defineComponent({
  setup() {
    window.$message = useMessage()
    window.$dialog = useDialog()
    window.$notification = useNotification()
    window.$loadingBar = useLoadingBar()
    // const router = useRouter()
    // const route = useRoute()
    const demoStore = useDemoStore()
    demoStore.actionDemo('德莫')

    const testTsx = ref<InstanceType<typeof TestTsx>>()
    const win = ref<InstanceType<typeof IpcOnMounted>>()

    onMounted(async () => {
      console.log('win: ', win)
      const status = await win.value?.winStatus()
      console.log('status :>> ', status)
      console.log('testTsx: ', testTsx.value?.msg)
    })

    const slots = { default: () => '默认插槽', footer: () => '具名插槽' }

    const showMsg = (str: string, type: string) => {
      window.$message.destroyAll()
      window.$message[type](str)
    }

    return () => (
      <>
        <IpcOnMounted ref={win} />
        <n-card>
          <RouterLink to="/home/windicss">跳转</RouterLink>
          <RouterView />
          <h1>通过vite注入的全局变量PROJECT_BUILD_TIME: {PROJECT_BUILD_TIME}</h1>
          <TestTsx ref={testTsx} v-slots={slots} />
          <TestTsx ref={testTsx}>{{ default: () => '默认插槽', footer: () => '具名插槽' }}</TestTsx>
        </n-card>
        <div
          // v-intersecting:show={isIntersecting => showMsg('show', 'info')}
          // v-intersecting:hide={isIntersecting => showMsg('hide', 'warning')}
          v-intersecting={{
            show: () => showMsg('show', 'info'),
            hide: () => showMsg('hide', 'warning')
          }}
          // v-intersecting={{ hide: isIntersecting => showMsg('hide', 'warning') }}
          v-text={'测试的哈斯大苏打'}
        />
      </>
    )
  }
})
