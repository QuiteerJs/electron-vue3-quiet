import IpcOnMounted from '@/components/IpcOnMounted'
import { useDownload } from '@/hooks'

export default defineComponent({
  name: 'DownloadDemo',
  setup() {
    const { progress, downloadInfo, downloadStart } = useDownload()

    watchEffect(() => {
      console.log('downloadInfo: ', downloadInfo.value)
    })

    const click = () =>
      downloadStart({
        // url: 'http://file.ghaomc.com/api/v1/media/attach/knowledge/e79b4487e0f7466e9a202bb1d8d40c8a银杰优优 Setup 0.5.5.exeexe',
        url: 'http://erp.ghaomc.com/api/v1/media/temp/temp/694da8bd-849a-493a-929a-a478ce65b8b7.png',
        filename: '银杰优优.exe',
        // 是否返回进度
        isSendProgress: true
      })

    return () => (
      <>
        <main class="p-10">
          <IpcOnMounted />
          <n-button type="error" onClick={click} v-text="下载" />
          <n-card hoverable title="下载信息" class="mr-14px mb-14px">
            <n-progress type="dashboard" gap-position="bottom" percentage={progress.value} />
            <div>{downloadInfo.value}</div>
          </n-card>
          <div>{downloadInfo.value}</div>
        </main>
      </>
    )
  }
})
