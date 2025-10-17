<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LogoText from '@/components/layout/LogoText.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
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

    <!-- Navigation -->
    <nav class="bg-white border-b">
      <div class="container mx-auto px-4">
        <div class="flex space-x-8 py-4">
          <RouterLink
            to="/demo"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            exact-active-class="text-blue-600 bg-blue-50"
          >
            Przegląd
          </RouterLink>
          <RouterLink
            to="/demo/buttons"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            exact-active-class="text-blue-600 bg-blue-50"
          >
            Buttons
          </RouterLink>
          <RouterLink
            to="/demo/forms"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            exact-active-class="text-blue-600 bg-blue-50"
          >
            Forms
          </RouterLink>
          <RouterLink
            to="/demo/layout"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            exact-active-class="text-blue-600 bg-blue-50"
          >
            Layout
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
