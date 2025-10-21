// Centralized route names for type-safe navigation
// Best practice: Use named routes instead of hardcoded paths

export const RouteNames = {
  // Public routes
  HOME: 'Home',
  DEMO: 'Demo',
  DEMO_OVERVIEW: 'DemoOverview',
  DEMO_BUTTONS: 'DemoButtons',
  DEMO_FORMS: 'DemoForms',
  DEMO_LAYOUT: 'DemoLayout',
  DEMO_AUTH: 'DemoAuth',

  // Auth routes
  AUTH_LOGIN: 'Login',
  AUTH_REGISTER: 'Register',
  AUTH_FORGOT_PASSWORD: 'ForgotPassword',
  AUTH_RESET_PASSWORD: 'ResetPassword',
  AUTH_CHANGE_PASSWORD: 'ChangePassword',

  // Protected routes
  DASHBOARD: 'Dashboard',

  // Error routes
  NOT_FOUND: 'NotFound',
} as const

// Type for route names (for TypeScript autocomplete)
export type RouteName = (typeof RouteNames)[keyof typeof RouteNames]

// Route paths (for direct path usage when needed)
export const RoutePaths = {
  HOME: '/',
  DEMO: '/demo',
  DEMO_OVERVIEW: '/demo',
  DEMO_BUTTONS: '/demo/buttons',
  DEMO_FORMS: '/demo/forms',
  DEMO_LAYOUT: '/demo/layout',
  DEMO_AUTH: '/demo/auth',

  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/auth/reset-password',
  AUTH_CHANGE_PASSWORD: '/auth/change-password',

  DASHBOARD: '/dashboard',
} as const
