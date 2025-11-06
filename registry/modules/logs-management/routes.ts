export const logsRoutes = [
  {
    path: '/logs',
    name: 'Logs',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/logs-management/pages/LogsBrowserPage.vue'),
  },
]
