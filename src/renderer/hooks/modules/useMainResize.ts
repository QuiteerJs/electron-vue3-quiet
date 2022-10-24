import { onMounted, onUnmounted, ref } from 'vue'

// 窗口尺寸调整钩子
export function useMainResize() {
  const height = ref(document.body.clientHeight)
  const width = ref(document.body.clientWidth)

  const updateSize = () => {
    height.value = document.body.clientHeight
    width.value = document.body.clientWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateSize, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })

  return { height, width }
}
