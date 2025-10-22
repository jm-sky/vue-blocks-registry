<script setup lang="ts">
import Button from '@registry/components/ui/button/Button.vue'

</script>

<template>
  <RouterLink
    v-slot="{ navigate, href }"
    to="/demo"
    custom
  >
    <Button
      as="a"
      variant="ghost"
      :href
      @click="navigate"
    >
      Demo Home
    </Button>
  </RouterLink>
</template>
