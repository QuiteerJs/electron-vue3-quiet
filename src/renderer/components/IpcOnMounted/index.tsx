import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'

export default defineComponent({
  name: 'IpcOnMounted',
  setup(props, { expose }) {
    window.$message = useMessage()
    window.$dialog = useDialog()
    window.$notification = useNotification()
    window.$loadingBar = useLoadingBar()

    onMounted(() => {
      window.$ipc.send('dom-mounted')
    })

    const winStatus = (): Promise<Wicket.WinStatus> => window.$ipc.invoke('get-win-status')

    expose({ winStatus })

    return { winStatus }
  }
})
