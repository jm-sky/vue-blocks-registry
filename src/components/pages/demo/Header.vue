<script setup lang="ts">
import LogoText from '@/components/layout/LogoText.vue'

</script>

<template>
  <header class="bg-white shadow-sm border-b">
    <div class="container mx-auto px-4 py-6">
      <RouterLink to="/demo" class="hover:opacity-80 transition-all">
        <LogoText />
      </RouterLink>
      <p class="text-gray-600 mt-2">
        Kolekcja komponentów UI do wykorzystania w projektach Vue.js
      </p>
    </div>
  </header>
</template>
