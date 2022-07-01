import { app } from 'electron'
import { resolve } from 'path'
import { getMainEnv } from './mainEnv'
import sq3 from 'sqlite3'
import { SqliteTabel, SqliteMode } from '@common/enums/sql'

class CreateDB {
  private static instance: CreateDB
  private db: sq3.Database
  constructor() {
    getMainEnv(env => {
      const userPath = app.getPath('home')
      const appName = app.getName()
      const filename = env.NODE_ENV ? `dev-${appName}.db` : `${appName}.db`
      const dbPath = resolve(userPath, filename)

      const sqlite3 = sq3.verbose()
      this.db = new sqlite3.Database(dbPath)
    })
  }

  static getInstance(): CreateDB {
    if (this.instance) return this.instance
    this.instance = new CreateDB()
    return this.instance
  }

  /**
   *  查询语句
   * @param sql 语句
   * @returns T
   */
  fetch<T>(sql: string): Promise<T> {
    console.log('sql: ', sql)
    return new Promise((resolve, reject) => {
      this.db.all(sql, (error, res) => {
        if (error) reject(error)
        resolve(res)
      })
    })
  }

  /**
   * 带参数的sql语句
   * @param sql sql语句
   * @param params sql语句中的参数
   * @returns
   */
  run(sql: string, params: Record<string, unknown> = null): Promise<boolean> {
    console.log('sql: ', sql)
    console.log('params: ', params)
    return new Promise((resolve, reject) => {
      if (params) {
        this.db.run(sql, params, err => {
          if (err) reject(err)
          resolve(true)
        })
      }

      this.db.run(sql, err => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }

  /**
   *  创建表
   * @param tabel 表名
   * @param columns 列名
   */
  createTabel<T>(tabel: SqliteTabel, columns: Record<keyof T, SqliteMode>) {
    let sql = Object.entries(columns).reduce(
      (sql, [key, type]) => `${sql}'${key}' ${type},`,
      `create table if not exists ${tabel} (`
    )

    return this.run(sql.slice(0, -1) + ')')
  }

  /**
   * 查询语句后缀
   * order by [index],datetime(created_at) desc
   * @param order 排序方式
   * @param slot 排序条件
   * @param limit 请求条数
   * @param offset 偏移量
   * @returns
   */
  suffix(sql: string, extra: Sql.Extra) {
    const { order = 'desc', slot = [], limit = 100, offset = 0 } = extra
    const orderStr = slot.length ? ` order by ${slot.toString()} ${order}` : ''
    return `${sql}${orderStr} limit ${limit} offset ${offset}`
  }

  /**
   *  查询数据
   * @param tabel 表名
   * @param search 查询参数
   * @returns
   */
  get<T extends Record<string, string>[], R extends unknown[]>(
    tabel: SqliteTabel,
    search: T,
    extra: Sql.Extra = null
  ): Promise<R> {
    let sql = search.reduce((pre, now) => {
      const [[key, value]] = Object.entries(now)
      return `${pre} ${key}='${value}' and`
    }, `select * from ${tabel} where`)

    return this.fetch<R>(this.suffix(sql.slice(0, -4), extra))
  }

  /**
   * 指定字段模糊查询
   * @param tabel 表名
   * @param sql sql语句
   * @returns
   */
  seek<T extends Record<string, string>[], R extends unknown[]>(
    tabel: SqliteTabel,
    likes: T,
    extra: Sql.Extra = null
  ): Promise<R> {
    const sql = likes.reduce((pre, now) => {
      let [[key, value]] = Object.entries(now)
      return `${pre} '${key}' like '%${value}%' and`
    }, `select * from ${tabel} where `)

    return this.fetch<R>(this.suffix(sql.slice(0, -4), extra))
  }

  /**
   * 更精细的条件查询
   * @param tabel 表名
   * @param search 指定字段查询
   * @param likes 模糊查询
   * @param extra 排序方式条目数偏移量等
   * @returns
   */
  search<T extends Record<string, string>[], L extends Record<string, string>[], R extends unknown[]>(
    tabel: SqliteTabel,
    search: T,
    likes: L,
    extra: Sql.Extra = null
  ): Promise<R> {
    let sql = `select * from ${tabel} where `
    search.forEach(item => {
      let [key, value] = Object.entries(item)[0]
      sql += `${key}='${value}' and `
    })

    likes.forEach(item => {
      let [key, value] = Object.entries(item)[0]
      sql += `${key} like '%${value}%' and `
    })

    return this.fetch<R>(this.suffix(sql.slice(0, -4), extra))
  }

  /**
   *  增加行
   * @param tabel 表名
   * @param target 当前行
   * @param injects 注入的key和value
   * @returns
   */
  addRow<T, I>(
    tabel: SqliteTabel,
    target: Record<keyof T, string | number>,
    injects: Record<keyof I, string | number>
  ) {
    const keys = Object.keys(target).map(key => `'${key}'`)

    const values = Object.values(target).map(value => {
      if (typeof value === 'string') {
        if (value.startsWith('$') || value.startsWith('(select')) return value
        return `'${value}'`
      }
      return value
    })

    const sql = `insert into ${tabel} (${keys.toString()}) values (${values.toString()})`

    return this.run(sql, injects)
  }

  /**
   *  增加列
   * @param tabel 表名
   * @param column 列名
   * @param type 列类型
   * @returns
   */
  addColumn(tabel: SqliteTabel, column: string, type: SqliteMode): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fetch<any[]>(`select * from sqlite_master where name='${tabel}' and sql like '%${column}%'`)
        .then(async ([{ sql: createSql } = { sql: '' }]) => {
          const keys = createSql.split(',').map(str => str.trim().replace("'", '').replace('"', ''))

          const flag = keys.some(str => str.startsWith(column))

          if (flag) resolve('列已存在')

          const sql = `alter table ${SqliteTabel.LOGS} add column ${column} ${type}`

          await this.run(sql)
          resolve(`${column} 添加成功!`)
        })
        .catch(reject)
    })
  }

  /**
   *  更新符合查询条件的部分列数据
   * @param tabel 表名
   * @param gists 更新条件
   * @param updates 更新的key和value
   */
  update(tabel: SqliteTabel, gists: Record<string, string>, updates: Record<string, string>) {
    let sql = Object.entries(gists)
      .reduce((pre, [key, value]) => {
        return `${pre} ${key}='${value} and`
      }, '')
      .slice(0, -4)

    Object.entries(updates).forEach(item => {
      let [key, value] = item
      this.run(`update ${tabel} set ${key}=$value where ${sql}`, {
        $value: value
      })
    })
  }

  /**
   *  删除符合查询条件的行
   * @param tabel 表名
   * @param gists 删除条件
   * @returns
   */
  del(tabel: SqliteTabel, gists: Record<string, string>) {
    let sql = Object.entries(gists).reduce((pre, [key, value]) => {
      return `${pre} ${key}='${value}' and`
    }, `delete from ${tabel} where`)

    return this.run(sql.slice(0, -4))
  }

  /**
   * 关闭数据库
   */
  close() {
    this.db.close()
    this.db = null
  }
}

export const DB = CreateDB.getInstance()
