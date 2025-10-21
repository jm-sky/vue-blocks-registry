// Composable for type-safe routing
// Use this instead of hardcoded paths in RouterLink or router.push()

import { useRouter } from 'vue-router'
import { RouteNames, RoutePaths } from './route-names'

export function useAppRoutes() {
  const router = useRouter()

  /**
   * Navigate to a route by name (recommended - type-safe)
   * @example navigateTo('Dashboard')
   */
  async function navigateTo(name: keyof typeof RouteNames) {
    await router.push({ name: RouteNames[name] })
  }

  /**
   * Navigate to a route by path (use only when necessary)
   * @example navigateToPath('/dashboard')
   */
  async function navigateToPath(path: keyof typeof RoutePaths) {
    await router.push(RoutePaths[path])
  }

  return {
    RouteNames,
    RoutePaths,
    navigateTo,
    navigateToPath,
  }
}
