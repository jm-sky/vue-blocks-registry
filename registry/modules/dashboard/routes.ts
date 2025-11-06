export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/dashboard/pages/DashboardPage.vue'),
  },
]


