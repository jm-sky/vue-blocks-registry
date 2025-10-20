import { RouteNames, RoutePaths } from './route-names'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.HOME,
    name: RouteNames.HOME,
    redirect: RoutePaths.DEMO,
  },
  {
    path: RoutePaths.DEMO,
    name: RouteNames.DEMO,
    component: () => import('@/pages/DemoParent.vue'),
    children: [
      {
        path: '',
        name: RouteNames.DEMO_OVERVIEW,
        component: () => import('@/pages/demo/Overview.vue'),
      },
      {
        path: 'buttons',
        name: RouteNames.DEMO_BUTTONS,
        component: () => import('@/pages/demo/Buttons.vue'),
      },
      {
        path: 'forms',
        name: RouteNames.DEMO_FORMS,
        component: () => import('@/pages/demo/Forms.vue'),
      },
      {
        path: 'layout',
        name: RouteNames.DEMO_LAYOUT,
        component: () => import('@/pages/demo/Layout.vue'),
      },
      {
        path: 'auth',
        name: RouteNames.DEMO_AUTH,
        component: () => import('@/pages/demo/Auth.vue'),
      },
    ],
  },
  {
    path: RoutePaths.AUTH_LOGIN,
    name: RouteNames.AUTH_LOGIN,
    component: () => import('@registry/modules/auth/pages/LoginPage.vue'),
    meta: {
      message: 'Demo credentials: "demo@example.com" with password: "password123"',
    },
  },
  {
    path: RoutePaths.AUTH_REGISTER,
    name: RouteNames.AUTH_REGISTER,
    component: () => import('@registry/modules/auth/pages/RegisterPage.vue'),
  },
  {
    path: RoutePaths.AUTH_FORGOT_PASSWORD,
    name: RouteNames.AUTH_FORGOT_PASSWORD,
    component: () => import('@registry/modules/auth/pages/ForgotPasswordPage.vue'),
  },
  {
    path: RoutePaths.AUTH_RESET_PASSWORD,
    name: RouteNames.AUTH_RESET_PASSWORD,
    component: () => import('@registry/modules/auth/pages/ResetPasswordPage.vue'),
  },
  {
    path: RoutePaths.AUTH_CHANGE_PASSWORD,
    name: RouteNames.AUTH_CHANGE_PASSWORD,
    component: () => import('@registry/modules/auth/pages/ChangePasswordPage.vue'),
  },
  {
    path: RoutePaths.DASHBOARD,
    name: RouteNames.DASHBOARD,
    component: () => import('@/pages/dashboard/DashboardPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteNames.NOT_FOUND,
    component: () => import('@/pages/NotFoundPage.vue'),
  }
]
