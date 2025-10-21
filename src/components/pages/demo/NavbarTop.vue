<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true' || (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <nav class="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm">
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="flex items-center justify-between gap-4 py-4">
        <div class="flex gap-x-2">
          <RouterLink
            to="/demo"
            class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
            exact-active-class="text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20 shadow-sm"
          >
            Przegląd
          </RouterLink>
          <RouterLink
            to="/demo/buttons"
            class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
            exact-active-class="text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20 shadow-sm"
          >
            Buttons
          </RouterLink>
          <RouterLink
            to="/demo/forms"
            class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
            exact-active-class="text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20 shadow-sm"
          >
            Forms
          </RouterLink>
          <RouterLink
            to="/demo/layout"
            class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
            exact-active-class="text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20 shadow-sm"
          >
            Layout
          </RouterLink>
        </div>
        <div class="flex items-center gap-4">
          <!-- Dark Mode Toggle -->
          <button
            class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleDarkMode"
          >
            <svg
              v-if="!isDark"
              class="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          <RouterLink
            to="/demo/auth"
            class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
            exact-active-class="text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20 shadow-sm"
          >
            Auth DEMO
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
