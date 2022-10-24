<script setup lang="ts"></script>

<template>
  <div class="content" a:bg="base">
    <!-- <div a:text="30px primary" a:p="b-20px" a:bg="info-active">primary</div>
    <div a:text="30px info" a:bg="light">info</div>
    <div a:text="30px success" a:bg="light">success</div>
    <div a:text="30px warning" a:bg="light">warning</div>
    <div a:text="30px error" a:bg="light">error</div>
    <div a:text="30px primary" a:p="b-20px" a:bg="*test">别名</div> -->
    <RouterView />
  </div>
</template>

<style scoped>
.content {
  height: calc(100vh - 3.5rem);
  @apply overflow-x-auto;
}
</style>
