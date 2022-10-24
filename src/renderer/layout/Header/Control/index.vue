<script setup lang="ts">
import { ref } from 'vue'

const windowOpt = (type: string) => {
  window.$ipc.send('window-option', type)
}
</script>

<template>
  <div class="h-20px flex justify-end">
    <div class="icon-item no-drag" @click="windowOpt('minimize')">
      <icon-ion:minus-round />
    </div>
    <div class="icon-item no-drag" @click="windowOpt('maximize')">
      <icon-fluent:maximize-20-filled />
    </div>
    <div class="icon-item no-drag" @click="windowOpt('hide')">
      <icon-ic:baseline-close />
    </div>
  </div>
</template>

<style scoped>
.icon-item {
  @apply mr-1 mt-1 rounded text-16px text-[#515468] hover:bg-[#1F222A];
}
</style>
