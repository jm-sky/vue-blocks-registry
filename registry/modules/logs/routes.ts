export const logsRoutes = [
  {
    path: '/logs',
    name: 'logs',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/logs/pages/LogsBrowserPage.vue'),
  },
]

