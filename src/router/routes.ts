import AuthLinks from '@/pages/auth/partials/AuthLinks.vue'
import { RouteNames, RoutePaths } from './route-names'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.HOME,
    name: RouteNames.HOME,
    redirect: RoutePaths.DEMO,
  },
  // Main Demo (v3 - clean shadcn-vue inspired layout)
  {
    path: RoutePaths.DEMO,
    name: RouteNames.DEMO,
    component: () => import('@/pages/demo/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: RouteNames.DEMO_OVERVIEW,
        component: () => import('@/pages/demo/Overview.vue'),
      },
      {
        path: 'introduction',
        name: RouteNames.DEMO_INTRODUCTION,
        component: () => import('@/pages/demo/Introduction.vue'),
      },
      {
        path: 'components',
        name: RouteNames.DEMO_COMPONENTS,
        component: () => import('@/pages/demo/Components.vue'),
      },
      {
        path: 'components/button',
        name: RouteNames.DEMO_COMPONENTS_BUTTON,
        component: () => import('@/pages/demo/components/ButtonShowcase.vue'),
      },
      {
        path: 'components/links',
        name: RouteNames.DEMO_COMPONENTS_LINKS,
        component: () => import('@/pages/demo/components/LinkShowcase.vue'),
      },
      {
        path: 'components/layout',
        name: RouteNames.DEMO_COMPONENTS_LAYOUT,
        component: () => import('@/pages/demo/components/LayoutShowcase.vue'),
      },
      {
        path: 'components/data-table',
        name: RouteNames.DEMO_COMPONENTS_DATA_TABLE,
        component: () => import('@/pages/demo/components/DataTableShowcase.vue'),
      },
      {
        path: 'examples',
        name: RouteNames.DEMO_EXAMPLES,
        component: () => import('@/pages/demo/Examples.vue'),
      },
      {
        path: 'examples/dashboard',
        name: RouteNames.DEMO_EXAMPLES_DASHBOARD,
        component: () => import('@/pages/demo/examples/Dashboard.vue'),
      },
      {
        path: 'examples/auth',
        name: RouteNames.DEMO_EXAMPLES_AUTH,
        component: () => import('@/pages/demo/examples/Auth.vue'),
      },
      {
        path: 'examples/i18n',
        name: RouteNames.DEMO_EXAMPLES_I18N,
        component: () => import('@/pages/demo/I18nDemo.vue'),
      },
    ],
  },
  {
    path: RoutePaths.AUTH,
    name: RouteNames.AUTH,
    component: () => import('@/pages/AuthParent.vue'),
    meta: {
      message: 'Demo credentials: "demo@example.com" with password: "password123"',
      layoutActionsComponent: AuthLinks,
    },
    children: [
      {
        path: RoutePaths.AUTH_LOGIN,
        name: RouteNames.AUTH_LOGIN,
        component: () => import('@/pages/auth/LoginPage.vue'),
      },
      {
        path: RoutePaths.AUTH_LOGIN_OFFICIAL,
        name: RouteNames.AUTH_LOGIN_OFFICIAL,
        component: () => import('@/pages/auth/LoginOfficialPage.vue'),
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
    ],
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
