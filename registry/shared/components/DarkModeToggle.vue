<script setup lang="ts">
import Button from '@registry/components/ui/button/Button.vue'
import { Moon, Sun } from 'lucide-vue-next'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggle } = useDarkMode()
</script>

<template>
  <Button
    variant="ghost"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <Transition
      enter-from-class="opacity-0 -translate-y-5"
      enter-active-class="absolute transition-all duration-300 ease-in-out"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-active-class="absolute transition-all duration-200 ease-in-out"
      leave-to-class="opacity-0 translate-y-5"
    >
      <Sun v-if="isDark" :key="'sun'" class="size-4" />
      <Moon v-else :key="'moon'" class="size-4" />
    </Transition>
  </Button>
</template>
