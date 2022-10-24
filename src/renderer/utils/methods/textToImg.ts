// text,需要生成的文字
// font，字体样式

export function textToImg(text: string) {
  // 创建画布
  const canvas = document.createElement('canvas')
  // 绘制文字环境
  const context = canvas.getContext('2d')

  if (!context)
    return
  // 画布宽度
  canvas.width = 160
  // 画布高度
  canvas.height = 130
  // 填充白色
  context.fillStyle = '#f3f4f5'
  // 绘制文字之前填充白色
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.font = 'italic small-caps 100 12px arial'
  context.fillStyle = '#e2e1e4'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  context.rotate((20 * Math.PI) / -180)
  // 绘制文字（参数：要写的字，x坐标，y坐标）

  context.fillText(text, 50, canvas.height / 2)
  // context.fillText(text, canvas.width / 2, canvas.height / 2)
  // 生成图片信息
  const dataUrl = canvas.toDataURL('image/png')
  return dataUrl
}
