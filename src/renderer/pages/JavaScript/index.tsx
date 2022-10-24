// import { Icon } from '@iconify/vue'
import { WinKey } from '@enums/window'
import CardGroup from '@/components/CardGroup'

export default defineComponent({
  name: 'Electron',
  setup() {
    const cardList = reactive<Component.CardState[]>([
      { key: WinKey.PRINT, title: '打印', content: '使用electron的api打印', path: 'print-demo' },
      { key: WinKey.DROP, title: '文件拖拽', content: 'window的api实现文件拖拽', path: 'drop-demo' },
      { key: WinKey.DOWNLOAD, title: '下载', content: '使用electron的api下载', path: 'download-demo' },
      { key: WinKey.SQL, title: '数据库操作', content: 'sqlite3在electron的应用', path: 'sql-demo' },
    ])
    return () => <CardGroup cardList={cardList}></CardGroup>
  },
})
