<script setup lang="ts">
import { BookIcon, CheckCircleIcon, SettingsIcon } from 'lucide-vue-next'
import InstallationCode from '@/components/demo/InstallationCode.vue'
import DemoBadge from '@/components/ui/badge/DemoBadge.vue'
import StatusBadge from '@/components/ui/badge/StatusBadge.vue'
import HoverCard from '@registry/components/ui/hover-card/HoverCard.vue'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const authUsageCode = `// Import composable
import { useAuth } from '@registry/modules/auth/composables/useAuth'

// W komponencie
const { login, register, isAuthenticated, user } = useAuth()

// Logowanie
await login({ email, password })

// Rejestracja
await register({ email, password, passwordConfirmation })`

const authEnvCode = `VITE_USE_MOCK_AUTH=false
VITE_API_BASE_URL=https://your-api.com/api`

const authEndpoints = [
  'POST /auth/login',
  'POST /auth/register',
  'POST /auth/logout',
  'GET /auth/me',
  'POST /auth/forgot-password',
  'POST /auth/reset-password',
  'POST /auth/change-password',
]
</script>

<template>
  <div class="space-y-8">
    <DocsPageHeader title="Authentication Module" description="Kompletny moduł autoryzacji z formularzami logowania, rejestracji i zarządzania hasłem" />

    <div class="grid grid-cols-1 gap-6">
      <HoverCard
        animate
        title="Dostępne komponenty"
        dense
      >
        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">Login Form</span>
              <DemoBadge to="/auth/login" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Formularz logowania z walidacją
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">Register Form</span>
              <DemoBadge to="/auth/register" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Formularz rejestracji z potwierdzeniem hasła
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">Forgot Password</span>
              <DemoBadge to="/auth/forgot-password" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Formularz resetowania hasła
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">Reset Password</span>
              <DemoBadge to="/auth/reset-password" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Formularz ustawiania nowego hasła
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">Change Password</span>
              <DemoBadge to="/auth/change-password" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Formularz zmiany hasła dla zalogowanych użytkowników
            </p>
          </div>
        </div>

        <p class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-6">
          <StatusBadge status="mock-api" />
          Aplikacja działa w trybie demo z mock API (bez prawdziwego backendu). Możesz przetestować wszystkie funkcje auth!
        </p>
      </HoverCard>

      <HoverCard animate title="Funkcjonalności" dense>
        <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            Pinia store dla zarządzania stanem autoryzacji
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            Composables (useAuth, useLogout)
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            Walidacja formularzy z Zod i VeeValidate
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            Integracja z API (axios)
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            TypeScript types dla User i Credentials
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            LocalStorage persistence dla JWT token
          </li>
        </ul>
      </HoverCard>

      <HoverCard
        :icon-component="CheckCircleIcon"
        icon-class="size-5"
        icon-bg-class="p-0"
        variant="emerald"
        animate
        title="Demo Mode - Mock API Aktywne"
        description="Aplikacja działa w trybie demo z mock API (bez prawdziwego backendu). Możesz przetestować wszystkie funkcje auth!"
        dense
      >
        <div class="bg-emerald-100 dark:bg-emerald-900/30 px-4 py-3 rounded-lg">
          <p class="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
            Testowe konta:
          </p>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
              <span>•</span>
              <span>Email:</span>
              <code class="bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded text-xs font-mono">demo@example.com</code>
              <span>|</span>
              <span>Hasło:</span>
              <code class="bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded text-xs font-mono">password123</code>
            </div>
            <div class="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
              <span>•</span>
              <span>Email:</span>
              <code class="bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded text-xs font-mono">test@test.com</code>
              <span>|</span>
              <span>Hasło:</span>
              <code class="bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded text-xs font-mono">test1234</code>
            </div>
          </div>
          <p class="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
            Możesz też zarejestrować nowe konto - zostanie zapisane w pamięci przeglądarki (tylko na czas sesji)
          </p>
        </div>
      </HoverCard>

      <HoverCard
        :icon-component="SettingsIcon"
        icon-class="size-5"
        icon-bg-class="p-0"
        :items="authEndpoints"
        variant="blue"
        animate
        title="Konfiguracja dla produkcji"
        dense
      >
        <p>
          Aby podłączyć prawdziwy backend API, zmień w pliku <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">.env</code>:
        </p>
        <InstallationCode :code="authEnvCode" />
        <p>
          Backend musi udostępniać endpointy:
        </p>
      </HoverCard>

      <HoverCard
        :icon-component="BookIcon"
        icon-class="size-5"
        icon-bg-class="p-0"
        variant="blue"
        animate
        title="Jak używać"
        dense
      >
        <p>
          Moduł auth jest dostępny w <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">registry/modules/auth/</code>
        </p>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <InstallationCode :code="authUsageCode" />
      </HoverCard>
    </div>
  </div>
</template>
