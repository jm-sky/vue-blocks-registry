<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Languages } from 'lucide-vue-next'
import { useLocale } from '../composables/useLocale'

const { currentLocale, availableLocales, setLocale } = useLocale()
</script>

<template>
  <div class="flex items-center gap-1">
    <Button
      v-for="locale in availableLocales"
      :key="locale.code"
      variant="ghost"
      size="sm"
      :class="[
        'min-w-[60px]',
        currentLocale === locale.code
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground',
      ]"
      @click="setLocale(locale.code)"
    >
      <Languages class="mr-2 h-4 w-4" />
      {{ locale.code.toUpperCase() }}
    </Button>
  </div>
</template>
