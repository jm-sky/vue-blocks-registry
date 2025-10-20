<script setup lang="ts">
import LogoText from '@/components/layout/LogoText.vue';

// Auth layout for login, register, forgot password pages
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-200 via-slate-100 to-purple-200 flex flex-col">
    <nav class="bg-white/80 backdrop-blur-sm shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <RouterLink to="/" class="text-xl font-bold text-gray-900">
              <LogoText />
            </RouterLink>
          </div>

          <div class="flex items-center space-x-4">
            <RouterLink
              to="/demo"
              class="text-sm text-gray-700 hover:text-gray-900"
            >
              Demo
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>

    <footer class="bg-white/80 backdrop-blur-sm border-t">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          &copy; 2025 Vue Blocks Registry. Demo application.
        </p>
      </div>
    </footer>
  </div>
</template>
