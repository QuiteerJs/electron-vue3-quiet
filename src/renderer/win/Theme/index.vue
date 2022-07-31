<template>
  <IpcOnMounted />
  <div class="dark:(text-40px) text-primary font-mono text-3xl font-bold text-30px">你好</div>
  <n-layout class="h-100vh py-10px px-20px">
    <DarkMode />
    <ThemeColorSelect />
  </n-layout>
</template>
<script setup lang="ts">
import IpcOnMounted from '@/components/IpcOnMounted'
import { DarkMode, ThemeColorSelect } from './components'
import { useThemeStore } from '@/store'
const theme = useThemeStore()

const checkoutDark = (flag: boolean) => theme.setDarkMode(flag)

setTimeout(() => {
  theme.setThemeColor('red')
}, 2000)
</script>
<style lang="scss" scoped></style>
