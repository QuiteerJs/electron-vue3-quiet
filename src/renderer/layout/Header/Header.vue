<script setup lang="ts">
import Control from './Control/index.vue'
</script>

<template>
  <div class="drag h-14 min-h-14 bg-[#2A2D39] flex justify-between px-10px">
    <div class="no-drag icon">
      <icon-file-icons:electron />
    </div>
    <div class="container">
      <Control />
      <div class="flex justify-between items-center px-20px">
        <div class="no-drag h-30px w-240px">
          <n-input size="small" class="h-26px text-14px placeholder-green-500" />
        </div>
        <div class="no-drag w-28px h-26px flex justify-center items-center bg-[#14181D] rounded mr-50px">
          <icon-twemoji:boar class="text-20px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  @apply flex justify-center items-center bg-[#14181D] w-38px h-36px  mt-10px rounded text-cyan-300 text-24px hover:opacity-80;
}
</style>
