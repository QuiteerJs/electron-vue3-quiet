<script lang="ts" setup>
import IpcOnMounted from '@/components/IpcOnMounted'

const emits = defineEmits(['dropFiles'])

const isDragover = ref(false)
let timer: NodeJS.Timeout

window.addEventListener('dragover', dragoverHandle)
window.addEventListener('drop', dropHandle)

onUnmounted(() => {
  window.removeEventListener('dragover', dragoverHandle)
  window.removeEventListener('drop', dropHandle)
})

async function dropHandle(e: DragEvent) {
  if (e?.dataTransfer?.files.length) {
    // 处理本地文件
    const files = e.dataTransfer.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      fetchFile(file.path)
    }
  }
  else if (e.dataTransfer?.items.length) {
    // 处理网页拖拽
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      const item = e.dataTransfer.items[i]
      if (item.kind === 'string') {
        if (item.type.includes('text/html')) {
          item.getAsString(async (str) => {
            const dom = new DOMParser().parseFromString(str, 'text/html')
            getDomFile([], dom.body).map(path => fetchFile(path))
          })
        }
      }
    }
  }
}
function dragoverHandle(e: DragEvent) {
  e.preventDefault()
  isDragover.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    isDragover.value = false
  }, 100)
}

function getDomFile(fileList: string[] = [], dom: HTMLElement) {
  for (let i = 0; i < dom.children.length; i++) {
    if (
      dom.children[i] instanceof HTMLImageElement
      || dom.children[i] instanceof HTMLAudioElement
      || dom.children[i] instanceof HTMLVideoElement
    )
      fileList.push((dom.children[i] as HTMLImageElement | HTMLAudioElement | HTMLVideoElement).src)
    else
      getDomFile(fileList, dom.children[i] as HTMLElement)
  }
  return fileList
}

async function fetchFile(path: string) {
  try {
    const res = await fetch(path)
    const blob = await res.blob()

    console.log(
      JSON.stringify(
        {
          type: blob.type,
          size: blob.size,
          path,
        },
        null,
        2,
      ),
    )
  }
  catch (err) {
    console.error('getBlobByPath', err)
  }
}
</script>

<template>
  <div class="drop-container" :class="{ show: isDragover }">
    <div class="tips">
      将文件拖到这里进行添加
    </div>
  </div>
  <IpcOnMounted />
</template>

<style scoped>
.drop-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 200ms ease-in-out;
  box-shadow: 0 0 32px 16px rgba(0, 0, 0, 0.5) inset;
  z-index: 9999;
  overflow: hidden;
  backdrop-filter: blur(10px);
  pointer-events: none;
}

.drop-container.show {
  opacity: 1;
}

.drop-container.show .tips {
  bottom: 30px;
}

.tips {
  position: absolute;
  bottom: -40px;
  left: 50%;
  color: #fff;
  transform: translateX(-50%);
  transition: bottom 200ms ease-in-out;
  text-shadow: 1px 1px rgba(255, 255, 255, 0.3);
}
</style>
