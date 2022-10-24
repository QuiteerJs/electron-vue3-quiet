import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout'

export default [
  {
    name: 'home',
    path: '/home',
    component: Layout,
    redirect: '/home/electron',
    children: [
      {
        name: 'electron',
        path: 'electron',
        component: () => import('@/pages/Electron'),
        meta: {
          title: 'electron',
          icon: 'logos:electron',
        },
      },
      {
        name: 'vite',
        path: 'vite',
        component: () => import('@/pages/Vite'),
        meta: {
          title: 'vite',
          icon: 'vscode-icons:file-type-vite',
        },
      },
      {
        name: 'vue',
        path: 'vue',
        component: () => import('@/pages/Vue'),
        meta: {
          title: 'vue',
          icon: 'vscode-icons:file-type-vue',
        },
      },
      {
        name: 'javascript',
        path: 'javascript',
        component: () => import('@/pages/Vue'),
        meta: {
          title: 'javascript',
          icon: 'logos:javascript',
        },
      },
      // {
      //   name: 'windicss',
      //   path: 'windicss',
      //   component: () => import('@/pages/Test/windicss.vue')
      // },
      // {
      //   name: 'i18n',
      //   path: 'i18n',
      //   component: () => import('@/pages/Test/i18n.vue')
      // },
      // { path: '/print', name: 'Print', component: () => import('@/pages/Print.vue') }
    ],
  },
] as RouteRecordRaw[]
