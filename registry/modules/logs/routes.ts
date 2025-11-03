export const logsRoutes = [
  {
    path: '/logs',
    name: 'Logs',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/logs/pages/LogsBrowserPage.vue'),
  },
]
