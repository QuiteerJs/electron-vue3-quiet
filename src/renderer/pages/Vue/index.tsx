// import { Icon } from '@iconify/vue'
import { WinKey } from '@enums/window'
import CardGroup from '@/components/CardGroup'

export default defineComponent({
  name: 'Vue',
  setup() {
    const cardList = reactive<Component.CardState[]>([
      { key: WinKey.PRINT, title: '打印', content: '这是测试1的内容', path: 'print-demo' },
      { key: WinKey.DROP, title: '文件拖拽', content: '这是测试2的内容', path: 'drop-demo' },
      { key: WinKey.DOWNLOAD, title: '下载', content: '使用electron的api下载', path: 'download-demo' },
      { key: WinKey.SQL, title: '数据库操作', content: 'sqlite3在electron的应用', path: 'sql-demo' }
    ])
    return () => <CardGroup cardList={cardList}></CardGroup>
  }
})
