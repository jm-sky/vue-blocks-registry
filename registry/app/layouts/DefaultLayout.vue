<script setup lang="ts">
// Default layout for public pages (no authentication required)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <RouterLink to="/" class="text-xl font-bold text-gray-900">
              MyApp
            </RouterLink>
          </div>

          <div class="flex items-center space-x-4">
            <RouterLink
              to="/login"
              class="text-sm text-gray-700 hover:text-gray-900"
            >
              Zaloguj się
            </RouterLink>
            <RouterLink
              to="/register"
              class="text-sm bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
            >
              Zarejestruj się
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>

    <footer class="bg-white border-t mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          &copy; 2025 MyApp. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
