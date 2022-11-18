<script setup lang="ts">
import { EventKeys, IpcWindowOptions } from '@quiteer/electron-ipc/web'

const windowOpt = (type: IpcWindowOptions) => {
  window.$ipc.send(EventKeys.WindowOptionsKey, type)
}
</script>

<template>
  <div class="h-20px flex justify-end">
    <div class="icon-item no-drag" @click="windowOpt(IpcWindowOptions.MINIMIZE)">
      <icon-ion:minus-round />
    </div>
    <div class="icon-item no-drag" @click="windowOpt(IpcWindowOptions.MAXIMIZE)">
      <icon-fluent:maximize-20-filled />
    </div>
    <div class="icon-item no-drag" @click="windowOpt(IpcWindowOptions.HIDE)">
      <icon-ic:baseline-close />
    </div>
  </div>
</template>

<style scoped>
.icon-item {
  @apply mr-1 mt-1 rounded text-16px text-[#515468] hover:bg-[#1F222A];
}
</style>
