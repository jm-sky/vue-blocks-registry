<script setup lang="ts">
defineProps<{
  href: string
  target?: string
  ariaLabel?: string
}>()
</script>

<template>
  <a
    :href="href"
    :target="target"
    :aria-label="ariaLabel"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    class="relative before:absolute before:bottom-0 before:rounded-md before:h-0.5 before:w-0 before:bg-primary before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:text-primary hover:bg-transparent dark:hover:bg-transparent"
  >
    <slot />
  </a>
</template>
