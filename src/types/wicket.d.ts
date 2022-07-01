/**
 * 窗口实例相关的类型
 */

declare namespace Wicket {
  // 窗口实例的状态
  interface WinStatus {
    id: number
    name: import('@enums/window').WinKey
    isCreate: boolean
    isRead: boolean
    isShow: boolean
    isFocus: boolean
  }

  // 定义win文件夹下的所有窗口
  type WindowRoute = 'loading' | 'feel-brid' | 'drop-demo' | 'print-demo' | 'sql-demo' | 'download-demo'
}
