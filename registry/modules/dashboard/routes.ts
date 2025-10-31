export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/dashboard/pages/DashboardPage.vue'),
  },
]
