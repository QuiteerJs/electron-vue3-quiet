export class ImageTools {
  static toBase64(localPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let img: HTMLImageElement | null = new Image()
      if (img) {
        img.src = localPath
        img.onload = () => {
          let canvas: HTMLCanvasElement | null = document.createElement('canvas')
          const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

          if (!ctx || !img) return

          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const dataURL = canvas.toDataURL()
          img = null
          canvas = null
          resolve(dataURL)
        }

        img.onerror = () => {
          reject(`图片加载失败或该地址无法解析为base64 ==> ${localPath}`)
        }
      }
    })
  }

  static Base64toFile(base64: string, filename: string): File {
    if (!base64.startsWith('data:')) return new File([], filename)

    const [, str] = base64.split(',')
    const buff = Buffer.from(str, 'base64')

    return new File([buff], filename)
  }
}
