<script setup lang="ts">
import { LogOut, User } from 'lucide-vue-next'
import { computed } from 'vue'

export interface UserNavProps {
  userName?: string
  userEmail?: string
}

const props = defineProps<UserNavProps>()

const emit = defineEmits<{
  logout: []
}>()

// Generate initials from name or email
const initials = computed(() => {
  if (props.userName) {
    return props.userName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }
  if (props.userEmail) {
    return props.userEmail.substring(0, 2).toUpperCase()
  }
  return 'U'
})

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="relative group">
    <!-- Avatar trigger -->
    <button
      type="button"
      class="flex items-center justify-center size-9 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
      aria-label="User menu"
    >
      {{ initials }}
    </button>

    <!-- Dropdown menu -->
    <div class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <!-- User info -->
      <div class="px-4 py-3 border-b dark:border-gray-700">
        <p v-if="userName" class="text-sm font-medium text-gray-900 dark:text-white">
          {{ userName }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
          {{ userEmail }}
        </p>
      </div>

      <!-- Menu items -->
      <div class="py-2">
        <!-- Profile/Settings slot -->
        <slot name="menu-items">
          <RouterLink
            to="/profile"
            class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <User class="size-4" />
            Profile
          </RouterLink>
        </slot>

        <!-- Separator -->
        <div class="border-t dark:border-gray-700 my-2" />

        <!-- Logout -->
        <button
          type="button"
          class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left"
          @click="handleLogout"
        >
          <LogOut class="size-4" />
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
