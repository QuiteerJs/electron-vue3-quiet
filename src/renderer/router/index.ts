import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const stairRouters: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
  { path: '/', redirect: '/home' },
]

const childRoute: Record<string, any> = import.meta.globEager('./modules/*.ts')

const mainRouters: Array<RouteRecordRaw> = Object.values(childRoute).reduce(
  (pre, now) => [...pre, ...now.default],
  [],
)

const routes: Array<RouteRecordRaw> = [...stairRouters, ...mainRouters]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
