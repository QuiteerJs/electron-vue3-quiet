<template>
  <div class="content">
    <Menu v-for="item in routes" :key="item.name" :route="item" />
  </div>
</template>
<script setup lang="ts">
import Menu from './Menu/Menu.vue'

const router = useRouter()
const [{ children: routes }] = router.options.routes.filter(route => route.name === 'home')
</script>
<style scoped>
.content {
  height: calc(100vh - 3.5rem);
  @apply bg-[#14181D] w-60px overflow-x-auto pb-20px;
}

/*滚动条里面轨道*/
::-webkit-scrollbar-track {
  background: #14181d;
  cursor: pointer !important;
  z-index: 1000 !important;
}
</style>
