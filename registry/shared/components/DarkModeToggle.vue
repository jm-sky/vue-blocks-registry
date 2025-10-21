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
    <Sun v-if="isDark" class="size-4" />
    <Moon v-else class="size-4" />
  </Button>
</template>
