import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    name: 'loading',
    path: `/loading`,
    component: () => import('@/win/Loading/index.vue')
  },
  {
    name: 'feel-brid',
    path: `/feel-brid`,
    component: () => import('@/win/FeelBrid/index.vue')
  },
  {
    name: 'drop-demo',
    path: `/drop-demo`,
    component: () => import('@/win/DropDemo/index.vue')
  },
  {
    name: 'print-demo',
    path: `/print-demo`,
    component: () => import('@/win/PrintDemo/index.vue')
  },
  {
    name: 'sql-demo',
    path: `/sql-demo`,
    component: () => import('@/win/SqlDemo/index.vue')
  },
  {
    name: 'download-demo',
    path: `/download-demo`,
    component: () => import('@/win/DownloadDemo')
  },
  {
    name: 'theme',
    path: `/theme`,
    component: () => import('@/win/Theme/index.vue')
  }
] as RouteRecordRaw[]
