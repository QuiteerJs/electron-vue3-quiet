<script lang="ts">
</script>

<script>
export default {
  name: 'FontDemo',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import IpcOnMounted from '@/components/IpcOnMounted'

const fontList = ref<string[]>([])
window.$ipc.invoke('getFonts').then((fonts) => {
  fontList.value = fonts as string[]
})

function selectHandle(selectHandle: string) {
  document.documentElement.style.fontFamily = selectHandle
}
</script>

<template>
  <IpcOnMounted />
  <div class="font">
    <ul class="font-list">
      <li
        v-for="font in fontList"
        :key="font"
        class="font-item"
        :style="{ fontFamily: font }"
        @click="selectHandle(font)"
      >
        {{ font }}
      </li>
    </ul>
    <div class="display">
      <span>例子</span>
      <span>Demo</span>
      <span>123</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.font {
  display: flex;
}
.font-list {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  min-width: 240px;
  height: 100vh;
  padding: 5px 10px;
  overflow-y: auto;
  .font-item {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-size: 48px;
}
</style>
