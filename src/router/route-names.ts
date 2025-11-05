// Centralized route names for type-safe navigation
// Best practice: Use named routes instead of hardcoded paths

export const RouteNames = {
  // Public routes
  HOME: 'Home',
  // Main demo (v3)
  DEMO: 'Demo',
  DEMO_OVERVIEW: 'DemoOverview',
  DEMO_INTRODUCTION: 'DemoIntroduction',
  DEMO_COMPONENTS: 'DemoComponents',
  DEMO_COMPONENTS_BUTTON: 'DemoComponentsButton',
  DEMO_COMPONENTS_LINKS: 'DemoComponentsLinks',
  DEMO_COMPONENTS_LAYOUT: 'DemoComponentsLayout',
  DEMO_COMPONENTS_DATA_TABLE: 'DemoComponentsDataTable',
  DEMO_COMPONENTS_CODE_BLOCK: 'DemoComponentsCodeBlock',
  DEMO_EXAMPLES: 'DemoExamples',
  DEMO_EXAMPLES_DASHBOARD: 'DemoExamplesDashboard',
  DEMO_EXAMPLES_AUTH: 'DemoExamplesAuth',
  DEMO_EXAMPLES_I18N: 'DemoExamplesI18n',
  DEMO_EXAMPLES_SETTINGS: 'DemoExamplesSettings',
  DEMO_EXAMPLES_USER: 'DemoExamplesUser',
  DEMO_EXAMPLES_LOGS: 'DemoExamplesLogs',
  DEMO_EXAMPLES_TENANT: 'DemoExamplesTenant',

  // Auth routes
  AUTH: 'Auth',
  AUTH_LOGIN: 'Login',
  AUTH_LOGIN_OFFICIAL: 'LoginOfficial',
  AUTH_REGISTER: 'Register',
  AUTH_FORGOT_PASSWORD: 'ForgotPassword',
  AUTH_RESET_PASSWORD: 'ResetPassword',
  AUTH_CHANGE_PASSWORD: 'ChangePassword',
  AUTH_TWO_FACTOR_SETUP: 'TwoFactorSetup',
  AUTH_TWO_FACTOR_VERIFY: 'TwoFactorVerify',

  // Protected routes
  SELECT_TENANT: 'SelectTenant',
  DASHBOARD: 'Dashboard',
  USER_PROFILE: 'UserProfile',
  USER_PROFILE_EDIT: 'UserProfileEdit',
  SETTINGS: 'Settings',

  // Error routes
  NOT_FOUND: 'NotFound',
} as const

// Type for route names (for TypeScript autocomplete)
export type RouteName = (typeof RouteNames)[keyof typeof RouteNames]

// Route paths (for direct path usage when needed)
export const RoutePaths = {
  HOME: '/',
  // Main demo (v3)
  DEMO: '/demo',
  DEMO_OVERVIEW: '/demo',
  DEMO_INTRODUCTION: '/demo/introduction',
  DEMO_COMPONENTS: '/demo/components',
  DEMO_COMPONENTS_BUTTON: '/demo/components/button',
  DEMO_COMPONENTS_LINKS: '/demo/components/links',
  DEMO_COMPONENTS_LAYOUT: '/demo/components/layout',
  DEMO_COMPONENTS_DATA_TABLE: '/demo/components/data-table',
  DEMO_COMPONENTS_CODE_BLOCK: '/demo/components/code-block',
  DEMO_EXAMPLES: '/demo/examples',
  DEMO_EXAMPLES_DASHBOARD: '/demo/examples/dashboard',
  DEMO_EXAMPLES_AUTH: '/demo/examples/auth',
  DEMO_EXAMPLES_I18N: '/demo/examples/i18n',
  DEMO_EXAMPLES_SETTINGS: '/demo/examples/settings',
  DEMO_EXAMPLES_USER: '/demo/examples/user',
  DEMO_EXAMPLES_LOGS: '/demo/examples/logs',
  DEMO_EXAMPLES_TENANT: '/demo/examples/tenant',

  AUTH: '/auth',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGIN_OFFICIAL: '/auth/login/official',
  AUTH_REGISTER: '/auth/register',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/auth/reset-password',
  AUTH_CHANGE_PASSWORD: '/auth/change-password',
  AUTH_TWO_FACTOR_SETUP: '/auth/2fa/setup',
  AUTH_TWO_FACTOR_VERIFY: '/auth/2fa/verify',

  SELECT_TENANT: '/select-tenant',
  DASHBOARD: '/dashboard',
  USER_PROFILE: '/profile',
  USER_PROFILE_EDIT: '/profile/edit',
  SETTINGS: '/settings',
} as const
