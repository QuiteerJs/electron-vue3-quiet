<template>
  <h1>NotFound</h1>
  <n-button type="primary" size="medium" @click="router.go(-1)"> back </n-button>
</template>
<script setup lang="ts">
const router = useRouter()
</script>
<style lang="scss" scoped></style>
