<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        Authentication Module
      </h2>
      <p class="text-gray-600">
        Kompletny moduł autoryzacji z formularzami logowania, rejestracji i zarządzania hasłem
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-xl">
            Dostępne komponenty
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="size-2 bg-blue-600 rounded-full mt-2" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900">Login Form</span>
                <RouterLink
                  to="/auth/login"
                  class="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  (Zobacz pełną stronę)
                </RouterLink>
              </div>
              <p class="text-sm text-gray-600">
                Formularz logowania z walidacją
              </p>
              <p class="text-xs text-green-700 mt-1">
                ✅ Działa w trybie demo z mock API
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="size-2 bg-blue-600 rounded-full mt-2" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900">Register Form</span>
                <RouterLink
                  to="/auth/register"
                  class="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  (Zobacz pełną stronę)
                </RouterLink>
              </div>
              <p class="text-sm text-gray-600">
                Formularz rejestracji z potwierdzeniem hasła
              </p>
              <p class="text-xs text-green-700 mt-1">
                ✅ Działa w trybie demo z mock API
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="size-2 bg-blue-600 rounded-full mt-2" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900">Forgot Password</span>
                <RouterLink
                  to="/auth/forgot-password"
                  class="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  (Zobacz pełną stronę)
                </RouterLink>
              </div>
              <p class="text-sm text-gray-600">
                Formularz resetowania hasła
              </p>
              <p class="text-xs text-green-700 mt-1">
                ✅ Działa w trybie demo z mock API
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="size-2 bg-blue-600 rounded-full mt-2" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900">Reset Password</span>
                <RouterLink
                  to="/auth/reset-password"
                  class="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  (Zobacz pełną stronę)
                </RouterLink>
              </div>
              <p class="text-sm text-gray-600">
                Formularz ustawiania nowego hasła
              </p>
              <p class="text-xs text-green-700 mt-1">
                ✅ Działa w trybie demo z mock API
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="size-2 bg-blue-600 rounded-full mt-2" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900">Change Password</span>
                <RouterLink
                  to="/auth/change-password"
                  class="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  (Zobacz pełną stronę)
                </RouterLink>
              </div>
              <p class="text-sm text-gray-600">
                Formularz zmiany hasła dla zalogowanych użytkowników
              </p>
              <p class="text-xs text-green-700 mt-1">
                ✅ Działa w trybie demo z mock API
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-xl">
            Funkcjonalności
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-center gap-2">
              <span class="text-green-600">✓</span>
              Pinia store dla zarządzania stanem autoryzacji
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-600">✓</span>
              Composables (useAuth, useLogout)
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-600">✓</span>
              Walidacja formularzy z Zod i VeeValidate
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-600">✓</span>
              Integracja z API (axios)
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-600">✓</span>
              TypeScript types dla User i Credentials
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-600">✓</span>
              LocalStorage persistence dla JWT token
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card class="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle class="text-xl">
            ✅ Demo Mode - Mock API Aktywne
          </CardTitle>
          <CardDescription class="text-green-800">
            Aplikacja działa w trybie demo z mock API (bez prawdziwego backendu). Możesz przetestować wszystkie funkcje auth!
          </CardDescription>
        </CardHeader>
        <CardContent class="px-4">
          <div class="bg-green-100 px-4 py-3 rounded-lg text-sm">
            <p class="font-semibold text-green-900 mb-1">
              Testowe konta:
            </p>
            <ul class="space-y-1 text-green-800">
              <li>• Email: <code class="bg-green-200 px-1.5 py-0.5 rounded">demo@example.com</code> | Hasło: <code class="bg-green-200 px-1.5 py-0.5 rounded">password123</code></li>
              <li>• Email: <code class="bg-green-200 px-1.5 py-0.5 rounded">test@test.com</code> | Hasło: <code class="bg-green-200 px-1.5 py-0.5 rounded">test1234</code></li>
            </ul>
            <p class="mt-2 text-xs text-green-700">
              Możesz też zarejestrować nowe konto - zostanie zapisane w pamięci przeglądarki (tylko na czas sesji)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card class="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle class="text-xl">
            🔧 Konfiguracja dla produkcji
          </CardTitle>
        </CardHeader>
        <CardContent class="px-4">
          <p class="text-sm text-blue-800 mb-2">
            Aby podłączyć prawdziwy backend API, zmień w pliku <code class="bg-blue-100 px-1.5 py-0.5 rounded">.env</code>:
          </p>
          <pre class="bg-blue-900 text-blue-100 p-3 rounded text-xs overflow-x-auto mb-2">VITE_USE_MOCK_AUTH=false
VITE_API_BASE_URL=https://your-api.com/api</pre>
          <p class="text-sm text-blue-800 mb-2">
            Backend musi udostępniać endpointy:
          </p>
          <ul class="text-xs text-blue-800 space-y-1 ml-4">
            <li>• <code class="bg-blue-100 px-1.5 py-0.5 rounded">POST /auth/login</code></li>
            <li>• <code class="bg-blue-100 px-1.5 py-0.5 rounded">POST /auth/register</code></li>
            <li>• <code class="bg-blue-100 px-1.5 py-0.5 rounded">POST /auth/logout</code></li>
            <li>• <code class="bg-blue-100 px-1.5 py-0.5 rounded">GET /auth/me</code></li>
            <li>• <code class="bg-blue-100 px-1.5 py-0.5 rounded">POST /auth/forgot-password</code></li>
            <li>• <code class="bg-blue-100 px-1.5 py-0.5 rounded">POST /auth/reset-password</code></li>
            <li>• <code class="bg-blue-100 px-1.5 py-0.5 rounded">POST /auth/change-password</code></li>
          </ul>
        </CardContent>
      </Card>

      <Card class="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle class="text-xl">
            Jak używać
          </CardTitle>
        </CardHeader>
        <CardContent class="px-4">
          <p class="text-sm text-blue-800 mb-2">
            Moduł auth jest dostępny w <code class="bg-blue-100 px-1.5 py-0.5 rounded">registry/modules/auth/</code>
          </p>
          <pre class="bg-blue-900 text-blue-100 p-4 rounded text-xs overflow-x-auto"><code>// Import composable
import { useAuth } from '@registry/modules/auth/composables/useAuth'

// W komponencie
const { login, register, isAuthenticated, user } = useAuth()

// Logowanie
await login({ email, password })

// Rejestracja
await register({ email, password, passwordConfirmation })</code></pre>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

</script>
