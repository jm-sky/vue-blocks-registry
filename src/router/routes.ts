import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/demo',
  },
  {
    path: '/demo',
    component: () => import('@/pages/DemoParent.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/demo/Overview.vue'),
      },
      {
        path: 'buttons',
        component: () => import('@/pages/demo/Buttons.vue'),
      },
      {
        path: 'forms',
        component: () => import('@/pages/demo/Forms.vue'),
      },
      {
        path: 'layout',
        component: () => import('@/pages/demo/Layout.vue'),
      },
      {
        path: 'auth',
        component: () => import('@/pages/demo/Auth.vue'),
      },
    ],
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@registry/modules/auth/pages/LoginPage.vue'),
    meta: {
      message: 'Demo credentials: "demo@example.com" with password: "password123"',
    },
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@registry/modules/auth/pages/RegisterPage.vue'),
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@registry/modules/auth/pages/ForgotPasswordPage.vue'),
  },
  {
    path: '/auth/reset-password',
    name: 'ResetPassword',
    component: () => import('@registry/modules/auth/pages/ResetPasswordPage.vue'),
  },
  {
    path: '/auth/change-password',
    name: 'ChangePassword',
    component: () => import('@registry/modules/auth/pages/ChangePasswordPage.vue'),
  },
  {
    path: '/dashboard',
    redirect: '/demo',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  }
]
