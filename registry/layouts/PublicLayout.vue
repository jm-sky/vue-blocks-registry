<script setup lang="ts">
import LogoText from '@registry/components/ui/LogoText.vue'
import DarkModeToggle from '@registry/shared/components/DarkModeToggle.vue'
import LocaleToggle from '@registry/shared/i18n/components/LocaleToggle.vue'

// Default layout for public pages (no authentication required)
</script>

<template>
  <div class="min-h-screen bg-background">
    <nav class="bg-card shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <RouterLink to="/" class="text-xl font-bold text-card-foreground">
              <LogoText />
            </RouterLink>
          </div>

          <div class="flex items-center space-x-4">
            <RouterLink
              to="/auth/login"
              class="text-sm text-foreground hover:text-primary"
            >
              Zaloguj się
            </RouterLink>
            <RouterLink
              to="/auth/register"
              class="text-sm bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
            >
              Zarejestruj się
            </RouterLink>
            <LocaleToggle />
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>

    <footer class="bg-card border-t border-border mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-muted-foreground">
          &copy; 2025 MyApp. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
