<template>
  <nav class="bg-white/60 backdrop-blur-sm border-b border-slate-200/60">
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="flex items-center justify-between gap-4 py-4">
        <div class="flex gap-x-2">
          <RouterLink
            to="/demo"
            class="text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80"
            exact-active-class="text-blue-600 bg-blue-50/80 shadow-sm"
          >
            Przegląd
          </RouterLink>
          <RouterLink
            to="/demo/buttons"
            class="text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80"
            exact-active-class="text-blue-600 bg-blue-50/80 shadow-sm"
          >
            Buttons
          </RouterLink>
          <RouterLink
            to="/demo/forms"
            class="text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80"
            exact-active-class="text-blue-600 bg-blue-50/80 shadow-sm"
          >
            Forms
          </RouterLink>
          <RouterLink
            to="/demo/layout"
            class="text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80"
            exact-active-class="text-blue-600 bg-blue-50/80 shadow-sm"
          >
            Layout
          </RouterLink>
        </div>
        <div class="flex justify-end">
          <RouterLink
            to="/demo/auth"
            class="text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100/80"
            exact-active-class="text-blue-600 bg-blue-50/80 shadow-sm"
          >
            Auth DEMO
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
