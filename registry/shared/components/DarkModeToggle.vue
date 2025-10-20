<script setup lang="ts">
import Button from '@registry/components/ui/button/Button.vue';
import { useDarkMode } from '../composables/useDarkMode'
import { Moon, Sun } from 'lucide-vue-next'

const { isDark, toggle } = useDarkMode()
</script>

<template>
  <Button
    @click="toggle"
    variant="ghost"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Sun v-if="isDark" class="size-4" />
    <Moon v-else class="size-4" />
  </Button>
</template>
