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
    <div class="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <!-- User info -->
      <div class="px-4 py-3 border-b border-border">
        <p class="text-sm font-medium text-card-foreground">
          {{ userName ?? 'N/A' }}
        </p>
        <p class="text-xs text-muted-foreground truncate">
          {{ userEmail ?? '-' }}
        </p>
      </div>

      <!-- Menu items -->
      <div class="py-2">
        <!-- Profile/Settings slot -->
        <slot name="menu-items">
          <RouterLink
            to="/profile"
            class="flex items-center gap-3 px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <User class="size-4" />
            Profile
          </RouterLink>
        </slot>

        <!-- Separator -->
        <div class="border-t border-border my-2" />

        <!-- Logout -->
        <button
          type="button"
          class="flex items-center gap-3 px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left"
          @click="handleLogout"
        >
          <LogOut class="size-4" />
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
