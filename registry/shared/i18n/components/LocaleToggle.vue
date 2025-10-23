<script setup lang="ts">
import Button from '@registry/components/ui/button/Button.vue'
import { useLocale } from '../composables/useLocale'

const { nextLocale, currentLocale, toggleLocale } = useLocale()
</script>

<template>
  <Button
    variant="ghost"
    :aria-label="`Switch language to ${nextLocale.code.toUpperCase()}`"
    class="w-12"
    @click="toggleLocale"
  >
    <Transition
      enter-from-class="opacity-0 -translate-y-5"
      enter-active-class="absolute transition-all duration-300 ease-in-out"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-active-class="absolute transition-all duration-200 ease-in-out"
      leave-to-class="opacity-0 translate-y-5"
    >
      <span :key="currentLocale">
        {{ currentLocale.toUpperCase() }}
      </span>
    </Transition>
  </Button>
</template>
