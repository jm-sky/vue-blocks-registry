<template>
  <div class="space-y-8">
    <div class="animate-fade-in">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        Authentication Module
      </h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
        Kompletny moduł autoryzacji z formularzami logowania, rejestracji i zarządzania hasłem
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <StandoutCard>
        <StandoutCardHeader>
          Dostępne komponenty
        </StandoutCardHeader>
        <StandoutCardContent>
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
              <StatusBadge status="mock-api" />
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
              <StatusBadge status="mock-api" />
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
              <StatusBadge status="mock-api" />
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
              <StatusBadge status="mock-api" />
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
              <StatusBadge status="mock-api" />
            </div>
          </div>
        </StandoutCardContent>
      </StandoutCard>

      <StandoutCard>
        <StandoutCardHeader>
          Funkcjonalności
        </StandoutCardHeader>
        <StandoutCardContent>
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
        </StandoutCardContent>
      </StandoutCard>

      <StandoutCard variant="emerald" :animate="false">
        <StandoutCardHeader variant="emerald">
          <template #icon>
            <svg class="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </template>
          Demo Mode - Mock API Aktywne
          <template #description>
            <p class="text-emerald-800 dark:text-emerald-200 mt-2">
              Aplikacja działa w trybie demo z mock API (bez prawdziwego backendu). Możesz przetestować wszystkie funkcje auth!
            </p>
          </template>
        </StandoutCardHeader>
        <StandoutCardContent variant="emerald">
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
        </StandoutCardContent>
      </StandoutCard>

      <StandoutCard variant="blue" :animate="false">
        <StandoutCardHeader variant="blue">
          <template #icon>
            <svg class="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </template>
          Konfiguracja dla produkcji
        </StandoutCardHeader>
        <StandoutCardContent variant="blue">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            Aby podłączyć prawdziwy backend API, zmień w pliku <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">.env</code>:
          </p>
          <pre class="bg-slate-900 dark:bg-slate-950 text-blue-100 dark:text-blue-200 p-3 rounded-lg text-xs overflow-x-auto font-mono">VITE_USE_MOCK_AUTH=false
VITE_API_BASE_URL=https://your-api.com/api</pre>
          <p class="text-sm text-blue-800 dark:text-blue-200">
            Backend musi udostępniać endpointy:
          </p>
          <div class="space-y-1 text-xs text-blue-800 dark:text-blue-200">
            <div class="flex items-center gap-2">
              <span>•</span>
              <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-mono">POST /auth/login</code>
            </div>
            <div class="flex items-center gap-2">
              <span>•</span>
              <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-mono">POST /auth/register</code>
            </div>
            <div class="flex items-center gap-2">
              <span>•</span>
              <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-mono">POST /auth/logout</code>
            </div>
            <div class="flex items-center gap-2">
              <span>•</span>
              <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-mono">GET /auth/me</code>
            </div>
            <div class="flex items-center gap-2">
              <span>•</span>
              <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-mono">POST /auth/forgot-password</code>
            </div>
            <div class="flex items-center gap-2">
              <span>•</span>
              <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-mono">POST /auth/reset-password</code>
            </div>
            <div class="flex items-center gap-2">
              <span>•</span>
              <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-mono">POST /auth/change-password</code>
            </div>
          </div>
        </StandoutCardContent>
      </StandoutCard>

      <StandoutCard variant="blue" :animate="false">
        <StandoutCardHeader variant="blue">
          <template #icon>
            <svg class="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </template>
          Jak używać
        </StandoutCardHeader>
        <StandoutCardContent variant="blue">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            Moduł auth jest dostępny w <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">registry/modules/auth/</code>
          </p>
          <pre class="bg-slate-900 dark:bg-slate-950 text-blue-100 dark:text-blue-200 p-4 rounded-lg text-xs overflow-x-auto font-mono"><code>// Import composable
import { useAuth } from '@registry/modules/auth/composables/useAuth'

// W komponencie
const { login, register, isAuthenticated, user } = useAuth()

// Logowanie
await login({ email, password })

// Rejestracja
await register({ email, password, passwordConfirmation })</code></pre>
        </StandoutCardContent>
      </StandoutCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import DemoBadge from '@/components/ui/badge/DemoBadge.vue'
import StatusBadge from '@/components/ui/badge/StatusBadge.vue'
import StandoutCard from '@/components/ui/card/StandoutCard.vue'
import StandoutCardContent from '@/components/ui/card/StandoutCardContent.vue'
import StandoutCardHeader from '@/components/ui/card/StandoutCardHeader.vue'
</script>
