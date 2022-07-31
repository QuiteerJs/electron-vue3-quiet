<template>
  <div class="flex align-center justify-between">
    <span>{{ label }}</span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  /** 文本 */
  label: string
}

defineProps<Props>()
</script>

<style scoped></style>
