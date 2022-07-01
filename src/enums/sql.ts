/**
 * 存储类型
 */
export const enum SqliteMode {
  // 递增的主建
  AUTOINCREMENT = 'integer primary key autoincrement',
  // 不递增的主建
  PRIMARYKEY = 'text primary key',
  NULL = 'null',
  INTEGER = 'integer',
  REAL = 'real',
  TEXT = 'text',
  TIME = 'timestamp',
  JSON = 'json'
}

/**
 * 数据库中的表名
 */
export const enum SqliteTabel {
  LOGS = 'logs'
}

/**
 * 表的主键
 */
export const enum SqlPrimaryKey {
  LOGS = 'id'
}
