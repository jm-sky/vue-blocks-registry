<script setup lang="ts">
import LogoText from '@/components/layout/LogoText.vue'

</script>

<template>
  <header class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm">
    <div class="container mx-auto px-6 py-8 max-w-7xl">
      <RouterLink to="/demo" class="hover:opacity-80 transition-all group">
        <LogoText class="group-hover:scale-105 transition-transform duration-200" />
      </RouterLink>
      <p class="text-slate-600 dark:text-slate-300 mt-3 text-lg font-light">
        Kolekcja komponentów UI do wykorzystania w projektach Vue.js
      </p>
    </div>
  </header>
</template>
