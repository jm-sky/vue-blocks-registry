<script setup lang="ts">
import MainNav, { type NavLink } from '@registry/components/layout/MainNav.vue'
import UserNav from '@registry/components/layout/UserNav.vue'
import LogoText from '@registry/components/ui/LogoText.vue'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import DarkModeToggle from '@registry/shared/components/DarkModeToggle.vue'
import { Home, Settings } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Navigation links - can be customized via props in the future
const navLinks: NavLink[] = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const handleLogout = async () => {
  authStore.logout()
  await router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-muted">
    <!-- Top Bar -->
    <nav class="bg-card shadow-sm border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Left: Logo -->
          <div class="flex items-center">
            <RouterLink to="/dashboard" class="text-xl font-bold text-card-foreground hover:opacity-80 transition-opacity">
              <LogoText />
            </RouterLink>
          </div>

          <!-- Center: Main Navigation -->
          <div class="hidden md:flex items-center">
            <MainNav :links="navLinks" />
          </div>

          <!-- Right: Preferences + User Menu -->
          <div class="flex items-center space-x-4">
            <DarkModeToggle />
            <UserNav
              :user-name="authStore.user?.name"
              :user-email="authStore.user?.email"
              @logout="handleLogout"
            >
              <template #menu-items>
                <RouterLink
                  to="/profile"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Profile
                </RouterLink>
                <RouterLink
                  to="/settings"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Settings
                </RouterLink>
              </template>
            </UserNav>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
