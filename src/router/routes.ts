import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/demo',
  },
  {
    path: '/demo',
    component: () => import('@/pages/DemoParent.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/demo/Overview.vue'),
      },
      {
        path: 'buttons',
        component: () => import('@/pages/demo/Buttons.vue'),
      },
      {
        path: 'forms',
        component: () => import('@/pages/demo/Forms.vue'),
      },
      {
        path: 'layout',
        component: () => import('@/pages/demo/Layout.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  }
]
