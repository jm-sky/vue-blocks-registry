<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@registry/components/ui/dropdown-menu'
import { Languages } from 'lucide-vue-next'
import { useLocale } from '../composables/useLocale'

const { currentLocale, availableLocales, setLocale } = useLocale()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <Languages class="h-5 w-5" />
        <span class="sr-only">Switch language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="locale in availableLocales"
        :key="locale.code"
        :class="{ 'bg-accent': currentLocale === locale.code }"
        @click="setLocale(locale.code)"
      >
        {{ locale.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
