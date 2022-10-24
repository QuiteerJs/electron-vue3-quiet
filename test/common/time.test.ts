import { Time } from '@common/Time'

describe('测试获取当前时间的格式化', () => {
  beforeEach(() => {
    // 告诉 vitest 我们使用模拟时间
    vi.useFakeTimers()

    return () => {
      // 每次测试运行后恢复日期
      vi.useRealTimers()
    }
  })

  const date = new Date(2022, 5, 30)

  it('当前', () => {
    // 修改了本地时间
    vi.setSystemTime(date)
    expect(new Time(new Date()).timeStr).toEqual('0:00')
  })

  it('昨天', () => {
    vi.setSystemTime(date)
    expect(new Time(new Date(2022, 5, 29)).timeStr).toEqual('昨天')
  })

  it.each([27, 28])('本周', (d) => {
    vi.setSystemTime(date)
    expect(new Time(new Date(2022, 5, d)).timeStr).toEqual(d === 27 ? '星期一' : '星期二')
  })

  it('本月', () => {
    vi.setSystemTime(date)
    expect(new Time(new Date(2022, 5, 1)).timeStr).toEqual('6月1日')
  })

  it('非本年', () => {
    vi.setSystemTime(date)
    expect(new Time(new Date(2021, 5, 30)).timeStr).toEqual('2021/6/30')
  })
})
