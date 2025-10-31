export const settingsRoutes = [
  {
    path: '/settings',
    name: 'settings',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/settings/pages/SettingsPage.vue'),
  },
]

