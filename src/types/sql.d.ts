declare namespace Sql {
  interface Extra {
    order?: 'desc' | 'asc'
    slot?: string[]
    limit?: number
    offset?: number
  }

  interface Logs {
    id: string
    time: string
    type: 'info' | 'warn' | 'error'
    index: '(select ifnull(max([index]), 0) + 1 from logs)'
    content: string
    extra: string
  }

  interface InsertLogsRow {
    time: string
    type: 'info' | 'warn' | 'error'
    content: string
    extra: string
  }
}
