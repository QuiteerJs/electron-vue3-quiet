export class Time {
  time: Date
  now: Date
  constructor(time: string | Date) {
    this.time = new Date(time)
    this.now = new Date()
  }

  get timeStr() {
    return this.ifYear() || this.ifMonth() || this.ifWeek() || this.ifYesterday() || this.ifDay() || ''
  }

  // 判断是否今年
  ifYear() {
    const date = this.time.getFullYear()
    const now = this.now.getFullYear()

    if (date !== now)
      return `${this.time.getFullYear()}/${this.time.getMonth() + 1}/${this.time.getDate()}`
    return false
  }

  // 是否本月
  ifMonth() {
    const date = this.time.getMonth() + 1
    const now = this.now.getMonth() + 1

    if (date !== now)
      return `${this.time.getMonth() + 1}月${this.time.getDate()}日`
    return false
  }

  // 判断是否本周
  ifWeek() {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const date = this.time.getDate()
    const now = this.now.getDate()
    const weekSum = this.now.getDay()

    if (now - date < 2)
      return false

    if (now - date > 6)
      return `${this.time.getMonth() + 1}月${this.time.getDate()}日`

    if (!weekSum)
      return `星期${week[this.time.getDay()]}`

    if (now - date < weekSum)
      return `星期${week[this.time.getDay()]}`

    return `${this.time.getMonth() + 1}月${this.time.getDate()}日`
  }

  // 判断是否是昨天
  ifYesterday() {
    const date = this.time.getDate()
    const now = this.now.getDate()
    if (now - date > 0)
      return '昨天'
    return false
  }

  // 判断是否当天
  ifDay() {
    const date = this.time.getDate()
    const now = this.now.getDate()
    if (date === now)
      return `${this.time.getHours()}:${this.time.getMinutes().toString().padStart(2, '0')}`

    return false
  }
}
