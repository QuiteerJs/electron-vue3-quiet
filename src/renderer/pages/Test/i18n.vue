<script setup lang="ts">
const { locale, t } = useI18n()

const check = () => {
  if (locale.value === 'en')
    locale.value = 'zh'
  else
    locale.value = 'en'
}
</script>

<template>
  <div class="flex justify-center items-center flex-col mt-10">
    <h2>{{ $t('demo.test') }}</h2>
    <h2>{{ t('demo1.test') }}</h2>
    <n-button @click="check">
      切换
    </n-button>
  </div>
</template>
