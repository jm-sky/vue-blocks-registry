export const settingsRoutes = [
  {
    path: '/settings',
    name: 'Settings',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/settings/pages/SettingsPage.vue'),
  },
]

