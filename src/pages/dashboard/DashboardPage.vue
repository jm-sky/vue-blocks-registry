<script setup lang="ts">
import AuthenticatedLayout from '@registry/app/layouts/AuthenticatedLayout.vue'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import { Clock, Mail, Shield, User } from 'lucide-vue-next'
import { computed } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const authStore = useAuthStore()

const stats = computed(() => [
  {
    name: 'User ID',
    value: authStore.user?.id ?? '-',
    icon: User,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    name: 'Email',
    value: authStore.user?.email ?? '-',
    icon: Mail,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    name: 'Status',
    value: authStore.isAuthenticated ? 'Active' : 'Inactive',
    icon: Shield,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    name: 'Session',
    value: 'Valid',
    icon: Clock,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
])

const quickActions = [
  {
    title: 'Change Password',
    description: 'Update your account password',
    href: '/auth/change-password',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'View Demo',
    description: 'Explore component demos',
    href: '/demo',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Auth Components',
    description: 'View authentication module',
    href: '/demo/auth',
    color: 'bg-purple-600 hover:bg-purple-700',
  },
]
</script>

<template>
  <AuthenticatedLayout>
    <div class="space-y-8">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h1 class="text-3xl font-bold mb-2">
          Welcome back, {{ authStore.user?.name || 'User' }}! 👋
        </h1>
        <p class="text-blue-100">
          This is your dashboard. You're viewing a demo of the Vue Blocks Registry authentication system.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card v-for="stat in stats" :key="stat.name">
          <CardContent class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {{ stat.name }}
                </p>
                <p class="mt-2 text-lg font-semibold text-gray-900 dark:text-white truncate">
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
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Full Name
              </dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                {{ authStore.user?.name ?? 'Not provided' }}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email Address
              </dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                {{ authStore.user?.email }}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                User ID
              </dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                {{ authStore.user?.id }}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Authentication Status
              </dt>
              <dd class="mt-1">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Authenticated
                </span>
              </dd>
            </div>
          </dl>

          <!-- Avatar Section -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4">
              <img
                v-if="authStore.user?.avatar"
                :src="authStore.user.avatar"
                :alt="authStore.user.name"
                class="size-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
              >
              <div
                v-else
                class="size-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
              >
                {{ authStore.user?.name?.charAt(0) ?? authStore.user?.email?.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  Profile Picture
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Auto-generated from UI Avatars
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Quick Actions -->
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
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
        <AlertTitle>Demo Mode Active</AlertTitle>
        <AlertDescription>
          This dashboard is part of the Vue Blocks Registry demo. You're logged in with mock authentication.
          All data is stored in-memory and will be reset on page refresh.
        </AlertDescription>
      </Alert>
    </div>
  </AuthenticatedLayout>
</template>
