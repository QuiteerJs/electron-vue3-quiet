<template>
  <div class="menu" :class="active ? '!bg-[#DDDFE2]' : 'bg-[#1A1D25]'" @click="checkRoute">
    <Icon :icon="route.meta?.icon" class="text-24px" />
  </div>
</template>
<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { Icon } from '@iconify/vue'
const { route } = defineProps<{ route: RouteRecordRaw }>()
const routes = useRoute()
const router = useRouter()

const active = computed(() => route.name === router.currentRoute.value.name)

const checkRoute = () => {
  router.push(`/home/${String(route.name)}`)
}

// console.log('route: ', route)
// console.log('routes: ', routes)
// console.log('router: ', router)
</script>
<style scoped>
.menu {
  @apply w-38px h-38px rounded flex justify-center items-center m-auto mt-10px;
}
</style>
