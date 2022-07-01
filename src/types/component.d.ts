// 全局组件的类型定义
declare namespace Component {
  interface CardState {
    key: import('@common/enums/window').WinKey
    title: string
    content: string
    path: Wicket.WindowRoute
  }
}
