<script setup lang="ts">
import { Clock, Mail, Shield, User } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AuthenticatedLayout from '@registry/app/layouts/AuthenticatedLayout.vue'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'

const authStore = useAuthStore()
const { t } = useI18n()

const stats = computed(() => [
  {
    name: t('dashboard.stats.user_id'),
    value: authStore.user?.id ?? '-',
    icon: User,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    name: t('dashboard.stats.email'),
    value: authStore.user?.email ?? '-',
    icon: Mail,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    name: t('dashboard.stats.status'),
    value: authStore.isAuthenticated ? t('dashboard.status_values.active') : t('dashboard.status_values.inactive'),
    icon: Shield,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    name: t('dashboard.stats.session'),
    value: t('dashboard.status_values.valid'),
    icon: Clock,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
])

const quickActions = computed(() => [
  {
    title: t('dashboard.quick_actions.change_password.title'),
    description: t('dashboard.quick_actions.change_password.description'),
    href: '/auth/change-password',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: t('dashboard.quick_actions.view_demo.title'),
    description: t('dashboard.quick_actions.view_demo.description'),
    href: '/demo',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: t('dashboard.quick_actions.auth_components.title'),
    description: t('dashboard.quick_actions.auth_components.description'),
    href: '/demo/auth',
    color: 'bg-purple-600 hover:bg-purple-700',
  },
])
</script>

<template>
  <AuthenticatedLayout>
    <div class="space-y-8">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h1 class="text-3xl font-bold mb-2">
          {{ t('dashboard.welcome', { name: authStore.user?.name || 'User' }) }} 👋
        </h1>
        <p class="text-blue-100">
          {{ t('dashboard.subtitle') }}
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card v-for="stat in stats" :key="stat.name">
          <CardContent class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-muted-foreground">
                  {{ stat.name }}
                </p>
                <p class="mt-2 text-lg font-semibold text-card-foreground truncate">
                  {{ stat.value }}
                </p>
              </div>
              <div :class="[stat.bgColor, 'p-3 rounded-lg']">
                <component :is="stat.icon" :class="[stat.color, 'size-6']" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- User Info Card -->
      <Card>
        <CardHeader>
          <CardTitle>{{ t('dashboard.user_info.title') }}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt class="text-sm font-medium text-muted-foreground">
                {{ t('dashboard.user_info.full_name') }}
              </dt>
              <dd class="mt-1 text-sm text-card-foreground">
                {{ authStore.user?.name ?? t('dashboard.user_info.not_provided') }}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-muted-foreground">
                {{ t('dashboard.user_info.email_address') }}
              </dt>
              <dd class="mt-1 text-sm text-card-foreground">
                {{ authStore.user?.email }}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-muted-foreground">
                {{ t('dashboard.user_info.user_id') }}
              </dt>
              <dd class="mt-1 text-sm text-card-foreground font-mono">
                {{ authStore.user?.id }}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-muted-foreground">
                {{ t('dashboard.user_info.auth_status') }}
              </dt>
              <dd class="mt-1">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {{ t('dashboard.user_info.authenticated') }}
                </span>
              </dd>
            </div>
          </dl>

          <!-- Avatar Section -->
          <div class="mt-6 pt-6 border-t border-border">
            <div class="flex items-center gap-4">
              <img
                v-if="authStore.user?.avatar"
                :src="authStore.user.avatar"
                :alt="authStore.user.name"
                class="size-16 rounded-full ring-2 ring-border"
              >
              <div
                v-else
                class="size-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
              >
                {{ authStore.user?.name?.charAt(0) ?? authStore.user?.email?.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-medium text-card-foreground">
                  {{ t('dashboard.user_info.profile_picture') }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ t('dashboard.user_info.avatar_generated') }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Quick Actions -->
      <Card>
        <CardHeader>
          <CardTitle>{{ t('dashboard.quick_actions.title') }}</CardTitle>
        </CardHeader>
        <CardContent class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RouterLink
            v-for="action in quickActions"
            :key="action.title"
            :to="action.href"
            :class="[action.color, 'block p-6 rounded-lg text-white transition-colors']"
          >
            <h3 class="text-lg font-semibold mb-2">
              {{ action.title }}
            </h3>
            <p class="text-sm text-white/80">
              {{ action.description }}
            </p>
          </RouterLink>
        </CardContent>
      </Card>

      <!-- Demo Info -->
      <Alert>
        <Shield class="size-4" />
        <AlertTitle>{{ t('dashboard.demo_mode.title') }}</AlertTitle>
        <AlertDescription>
          {{ t('dashboard.demo_mode.description') }}
        </AlertDescription>
      </Alert>
    </div>
  </AuthenticatedLayout>
</template>
