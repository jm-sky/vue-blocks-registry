<script setup lang="ts">
import UserNav from '@registry/components/layout/UserNav.vue'
import HoverLink from '@registry/components/ui/hover-link/HoverLink.vue'
import LogoText from '@registry/components/ui/LogoText.vue'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import DarkModeToggle from '@registry/shared/components/DarkModeToggle.vue'
import LocaleToggle from '@registry/shared/i18n/components/LocaleToggle.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

// Navigation links - can be customized via props in the future
const navLinks = computed(() => [
  { to: '/dashboard', label: t('navigation.dashboard') },
  { to: '/profile', label: t('navigation.profile') },
  { to: '/settings', label: t('navigation.settings') },
])

const handleLogout = async () => {
  authStore.logout()
  await router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-muted">
    <!-- Top Bar -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        <div class="mr-4 flex items-center gap-2 md:mr-6">
          <RouterLink to="/dashboard" class="flex items-center gap-2 hover:brightness-80 transition-all duration-300">
            <LogoText />
          </RouterLink>
          <nav class="hidden md:flex items-center gap-6 text-sm ml-6">
            <template v-for="link in navLinks" :key="link.to">
              <HoverLink :to="link.to">
                {{ link.label }}
              </HoverLink>
            </template>
          </nav>
        </div>

        <div class="flex flex-1 items-center justify-end space-x-2">
          <nav class="flex items-center space-x-2">
            <LocaleToggle />
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
                  {{ t('navigation.profile') }}
                </RouterLink>
              </template>
            </UserNav>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
