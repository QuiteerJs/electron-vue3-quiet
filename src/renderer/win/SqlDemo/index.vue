<script setup lang="ts">
import type { DataTableColumn } from 'naive-ui'
import IpcOnMounted from '@/components/IpcOnMounted'

const columns = ref<DataTableColumn<Sql.UserEntity>[]>([
  { title: 'id', key: 'id' },
  { title: 'name', key: 'name' },
  { title: 'sex', key: 'sex', render: row => String(row.sex) },
  { title: 'age', key: 'age' },
])

const data = ref<Sql.UserEntity[]>([])

const search = async () => {
  const res = await window.$ipc.invoke<unknown, Sql.UserEntity[]>('sql-option', 'user-search-all')
  console.info('res: ', res)
  if (res) {
    window.$message.success('查询表成功!')
    data.value = res
  }
}

let n = 1
const add = async () => {
  const row: Sql.User = {
    name: `张三${n}`,
    sex: Boolean(n % 2),
    age: n,
  }
  n++
  const res = await window.$ipc.invoke<Sql.User, boolean>('sql-option', 'user-add-single', row)
  if (res)
    window.$message.success('添加行成功!')
  search()
}
</script>

<template>
  <IpcOnMounted />
  <div class="p-4">
    <div>sqlite3</div>
    <n-space class="p-4">
      <n-button type="primary" size="medium" @click="add">
        增加一条消息
      </n-button>
      <n-button type="primary" size="medium" @click="search">
        查询数据库
      </n-button>
    </n-space>
    <n-data-table :columns="columns" :data="data" />
  </div>
</template>
