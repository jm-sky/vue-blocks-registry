// modules/auth/config/routes.ts
// Configurable route paths for auth module
// This allows the auth module to be used in different apps with different route structures

export const authRoutes = {
  login: import.meta.env.VITE_AUTH_LOGIN_PATH ?? '/auth/login',
  register: import.meta.env.VITE_AUTH_REGISTER_PATH ?? '/auth/register',
  forgotPassword: import.meta.env.VITE_AUTH_FORGOT_PASSWORD_PATH ?? '/auth/forgot-password',
  resetPassword: import.meta.env.VITE_AUTH_RESET_PASSWORD_PATH ?? '/auth/reset-password',
  changePassword: import.meta.env.VITE_AUTH_CHANGE_PASSWORD_PATH ?? '/auth/change-password',
  dashboard: import.meta.env.VITE_AUTH_DASHBOARD_PATH ?? '/dashboard',
} as const

// Named route versions (when using Vue Router named routes)
export const authRouteNames = {
  login: 'Login',
  register: 'Register',
  forgotPassword: 'ForgotPassword',
  resetPassword: 'ResetPassword',
  changePassword: 'ChangePassword',
  dashboard: 'Dashboard',
} as const
