<template>
  <nav class="bg-white border-b">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between gap-4 py-4">
        <div class="flex gap-x-8">
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
        <div class="flex justify-end gap-x-8">
          <RouterLink
            to="/demo/auth"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            exact-active-class="text-blue-600 bg-blue-50"
          >
            Auth DEMO
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
