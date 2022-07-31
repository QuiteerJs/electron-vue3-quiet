<template>
  <n-divider title-placement="center">系统主题</n-divider>
  <n-grid :cols="8" :x-gap="8" :y-gap="12">
    <n-grid-item v-for="color in theme.themeColorList" :key="color" class="flex justify-center">
      <ColorCheckbox
        :color="color"
        :checked="color === theme.themeColor"
        @click="theme.setThemeColor(color)"
      />
    </n-grid-item>
  </n-grid>
  <n-space :vertical="true" class="pt-12px">
    <n-color-picker :value="theme.themeColor" :show-alpha="false" @update-value="theme.setThemeColor" />
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/store'
import { ColorCheckbox } from './components'

const theme = useThemeStore()
</script>

<style scoped></style>
