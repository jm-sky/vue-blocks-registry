// Routes for user module (will be transformed to project aliases on install)
export const userRoutes = [
  {
    path: '/profile',
    name: 'profile',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/user/pages/ProfileView.vue'),
  },
  {
    path: '/profile/edit',
    name: 'profileEdit',
    meta: { requiresAuth: true },
    component: () => import('@registry/modules/user/pages/ProfileEdit.vue'),
  },
]



