<script setup lang="ts">
import LogoText from '@registry/components/ui/LogoText.vue';
import DarkModeToggle from '@registry/shared/components/DarkModeToggle.vue'

// Auth layout for login, register, forgot password pages
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-200 via-slate-100 to-purple-200 dark:from-gray-950 dark:via-gray-800 dark:to-gray-950 flex flex-col">
    <nav class="fixed top-2 right-2 flex gap-2 rounded-lg p-2 bg-card/50 backdrop-blur-sm">
      <slot name="actions" />
      <DarkModeToggle />
    </nav>

    <main class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="mx-auto text-center mb-8">
        <LogoText class="text-3xl drop-shadow" />
      </div>

      <slot />
    </main>

    <footer>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2025 Vue Blocks Registry. Demo application.
        </p>
      </div>
    </footer>
  </div>
</template>
