<template>
  <IpcOnMounted />
  <div class="p-4">
    <div>sqlite3</div>
    <n-space class="p-4">
      <n-button type="primary" size="medium" @click="create">创建数据库</n-button>
      <n-button type="primary" size="medium" @click="search">查询数据库</n-button>
      <n-button type="primary" size="medium" @click="add">增加一条消息</n-button>
    </n-space>
    <n-data-table :columns="columns" :data="data" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'SqlDemo'
}
</script>
<script setup lang="ts">
import IpcOnMounted from '@/components/IpcOnMounted'

const columns = ref([
  { title: 'id', key: 'id' },
  { title: 'index', key: 'index' },
  { title: 'time', key: 'time' },
  { title: 'type', key: 'type' },
  { title: 'content', key: 'content' },
  { title: 'extra', key: 'extra' }
])

const data = ref<Sql.Logs[]>([])

const isAdd = ref(false)

const create = async () => {
  const res = await window.$ipc.invoke<unknown, boolean>('sql-option', 'create-logs')
  if (res) window.$message.success('创建表成功!')
  console.log('res: ', res)
}

const search = async () => {
  const res = await window.$ipc.invoke<unknown, Sql.Logs[]>('sql-option', 'search-logs')
  if (res) {
    window.$message.success('查询表成功!')
    data.value = res
  }
}

let n = 1
const add = async () => {
  const row: Sql.InsertLogsRow = {
    time: new Date().toJSON(),
    type: 'info',
    content: '这是测试数据' + n++,
    extra: 'extra' + n++
  }

  const res = await window.$ipc.invoke<Sql.InsertLogsRow, boolean>('sql-option', 'logs-add-row', row)
  if (res) window.$message.success('添加行成功!')
  search()
}
</script>
