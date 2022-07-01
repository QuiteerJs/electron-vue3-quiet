import { DB } from '~/tools'
import { SqliteTabel, SqliteMode, SqlPrimaryKey } from '@common/enums/sql'
import { JsonTool } from '@common/utils/JsonTool'
import { v4 as uuidv4 } from 'uuid'

export const ipcBus = new Map<string, (event: Electron.IpcMainEvent, options: unknown) => unknown>()

/**
 * 创建logs表
 *  replace into logs (id,time,type,index,content,extra) values (1xxxx,2022-04-30T04:08:05.913Z,info,0,$content,extra)
 */
ipcBus.set('create-logs', async event => {
  return DB.createTabel<Sql.Logs>(SqliteTabel.LOGS, {
    id: SqliteMode.PRIMARYKEY,
    time: SqliteMode.TIME,
    type: SqliteMode.TEXT,
    index: SqliteMode.INTEGER,
    content: SqliteMode.JSON,
    extra: SqliteMode.JSON
  })
})

/**
 * 无条件查询logs表
 */
ipcBus.set('search-logs', async event => {
  return DB.fetch<Sql.Logs[]>(`select * from ${SqliteTabel.LOGS} limit 100`)
})

/**
 * 增加行
 * uuid作为主键
 * 自增非主建列
 */
ipcBus.set('logs-add-row', (event, state: Sql.InsertLogsRow) => {
  const row: Sql.Logs = {
    id: uuidv4(),
    index: '(select ifnull(max([index]), 0) + 1 from logs)',
    ...state,
    content: '$content'
  }

  return DB.addRow<Sql.Logs, { $content: string }>(SqliteTabel.LOGS, row, { $content: state.content })
})

/**
 * 增加列
 */
ipcBus.set('logs-add-column', async (event, { column, type }: { column: string; type: SqliteMode }) => {
  return DB.addColumn(SqliteTabel.LOGS, column, type)
})

/**
 * 通过主键删除行
 */
ipcBus.set('logs-delete-row', (event, id: string) => {
  return DB.del(SqliteTabel.LOGS, { id })
})

/**
 * 通过主键修改字段
 */
ipcBus.set('logs-update-row', (event, { id, updates }: { id: string; updates: Record<string, unknown> }) => {
  const update: Record<string, string> = {}
  for (const key in updates) update[key] = new JsonTool(updates[key]).toJsonString()
  return DB.update(SqliteTabel.LOGS, { id }, update)
})

/**
 * 通过指定字段查询
 */
ipcBus.set('logs-search', (event, state: Record<string, string>[]) => {
  return DB.get(SqliteTabel.LOGS, state)
})
