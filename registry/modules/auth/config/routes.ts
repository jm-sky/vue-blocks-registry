// modules/auth/config/routes.ts
// Configurable route paths for auth module
// This allows the auth module to be used in different apps with different route structures

import type { RouteRecordRaw } from 'vue-router'

export const AuthRoutePaths = {
  login: import.meta.env.VITE_AUTH_LOGIN_PATH ?? '/auth/login',
  register: import.meta.env.VITE_AUTH_REGISTER_PATH ?? '/auth/register',
  forgotPassword: import.meta.env.VITE_AUTH_FORGOT_PASSWORD_PATH ?? '/auth/forgot-password',
  resetPassword: import.meta.env.VITE_AUTH_RESET_PASSWORD_PATH ?? '/auth/reset-password',
  changePassword: import.meta.env.VITE_AUTH_CHANGE_PASSWORD_PATH ?? '/auth/change-password',
  dashboard: import.meta.env.VITE_AUTH_DASHBOARD_PATH ?? '/dashboard',
} as const

// Named route versions (when using Vue Router named routes)
export const AuthRouteNames = {
  login: 'Login',
  register: 'Register',
  forgotPassword: 'ForgotPassword',
  resetPassword: 'ResetPassword',
  changePassword: 'ChangePassword',
  dashboard: 'Dashboard',
} as const

export const authRoutes: RouteRecordRaw[] = [
  {
    path: AuthRoutePaths.login,
    name: AuthRouteNames.login,
    component: () => import('@registry/modules/auth/pages/LoginPage.vue'),
  },
  {
    path: AuthRoutePaths.register,
    name: AuthRouteNames.register,
    component: () => import('@registry/modules/auth/pages/RegisterPage.vue'),
  },
  {
    path: AuthRoutePaths.forgotPassword,
    name: AuthRouteNames.forgotPassword,
    component: () => import('@registry/modules/auth/pages/ForgotPasswordPage.vue'),
  },
  {
    path: AuthRoutePaths.resetPassword,
    name: AuthRouteNames.resetPassword,
    component: () => import('@registry/modules/auth/pages/ResetPasswordPage.vue'),
  },
  {
    path: AuthRoutePaths.changePassword,
    name: AuthRouteNames.changePassword,
    component: () => import('@registry/modules/auth/pages/ChangePasswordPage.vue'),
  },
]
