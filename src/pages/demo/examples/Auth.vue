<script setup lang="ts">
import { BookIcon, CheckCircleIcon, SettingsIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import InstallationCode from '@/components/demo/InstallationCode.vue'
import DemoBadge from '@/components/ui/badge/DemoBadge.vue'
import StatusBadge from '@/components/ui/badge/StatusBadge.vue'
import HoverCard from '@registry/components/ui/hover-card/HoverCard.vue'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

const installCodeFull = 'npx vue-blocks-registry add authFull'
const installCodeFeat = 'npx vue-blocks-registry add authFeat'

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
    <DocsPageHeader
      :title="t('demo.auth_example.title')"
      :description="t('demo.auth_example.description')"
    />

    <div class="grid grid-cols-1 gap-6">
      <HoverCard
        animate
        :title="t('demo.auth_example.available_components')"
        dense
      >
        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">{{ t('demo.auth_example.components.login_form.title') }}</span>
              <DemoBadge to="/auth/login" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {{ t('demo.auth_example.components.login_form.description') }}
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">{{ t('demo.auth_example.components.register_form.title') }}</span>
              <DemoBadge to="/auth/register" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {{ t('demo.auth_example.components.register_form.description') }}
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">{{ t('demo.auth_example.components.forgot_password.title') }}</span>
              <DemoBadge to="/auth/forgot-password" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {{ t('demo.auth_example.components.forgot_password.description') }}
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">{{ t('demo.auth_example.components.reset_password.title') }}</span>
              <DemoBadge to="/auth/reset-password" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {{ t('demo.auth_example.components.reset_password.description') }}
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="size-2 bg-blue-600 rounded-full mt-2" />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-slate-900 dark:text-slate-100">{{ t('demo.auth_example.components.change_password.title') }}</span>
              <DemoBadge to="/auth/change-password" />
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {{ t('demo.auth_example.components.change_password.description') }}
            </p>
          </div>
        </div>

        <p class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-6">
          <StatusBadge status="mock-api" />
          {{ t('demo.auth_example.mock_api_info') }}
        </p>
      </HoverCard>

      <HoverCard animate :title="t('demo.auth_example.installation.title')" dense>
        <div class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {{ t('demo.auth_example.installation.full_module.title') }}
            </p>
            <InstallationCode :code="installCodeFull" />
            <p class="text-xs text-slate-600 dark:text-slate-400">
              {{ t('demo.auth_example.installation.full_module.description') }}
            </p>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {{ t('demo.auth_example.installation.feature_only.title') }}
            </p>
            <InstallationCode :code="installCodeFeat" />
            <p class="text-xs text-slate-600 dark:text-slate-400">
              {{ t('demo.auth_example.installation.feature_only.description') }}
            </p>
          </div>
        </div>
      </HoverCard>

      <HoverCard animate :title="t('demo.auth_example.features_title')" dense>
        <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            {{ t('demo.auth_example.features.pinia_store') }}
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            {{ t('demo.auth_example.features.composables') }}
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            {{ t('demo.auth_example.features.validation') }}
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            {{ t('demo.auth_example.features.api_integration') }}
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            {{ t('demo.auth_example.features.typescript') }}
          </li>
          <li class="flex items-center gap-2">
            <span class="text-emerald-600 dark:text-emerald-400">✓</span>
            {{ t('demo.auth_example.features.persistence') }}
          </li>
        </ul>
      </HoverCard>

      <HoverCard
        :icon-component="CheckCircleIcon"
        icon-class="size-5"
        icon-bg-class="p-0"
        variant="emerald"
        animate
        :title="t('demo.auth_example.demo_mode.title')"
        :description="t('demo.auth_example.demo_mode.description')"
        dense
      >
        <div class="bg-emerald-100 dark:bg-emerald-900/30 px-4 py-3 rounded-lg">
          <p class="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
            {{ t('demo.auth_example.demo_mode.test_accounts') }}
          </p>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
              <span>•</span>
              <span>{{ t('demo.auth_example.demo_mode.email') }}</span>
              <code class="bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded text-xs font-mono">demo@example.com</code>
              <span>|</span>
              <span>{{ t('demo.auth_example.demo_mode.password') }}</span>
              <code class="bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded text-xs font-mono">password123</code>
            </div>
            <div class="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
              <span>•</span>
              <span>{{ t('demo.auth_example.demo_mode.email') }}</span>
              <code class="bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded text-xs font-mono">test@test.com</code>
              <span>|</span>
              <span>{{ t('demo.auth_example.demo_mode.password') }}</span>
              <code class="bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded text-xs font-mono">test1234</code>
            </div>
          </div>
          <p class="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
            {{ t('demo.auth_example.demo_mode.register_info') }}
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
        :title="t('demo.auth_example.production_config.title')"
        dense
      >
        <p>
          {{ t('demo.auth_example.production_config.description') }} <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">{{ t('demo.auth_example.production_config.file') }}</code>{{ t('demo.auth_example.production_config.file_text') }}
        </p>
        <InstallationCode :code="authEnvCode" />
        <p>
          {{ t('demo.auth_example.production_config.backend_endpoints') }}
        </p>
      </HoverCard>

      <HoverCard
        :icon-component="BookIcon"
        icon-class="size-5"
        icon-bg-class="p-0"
        variant="blue"
        animate
        :title="t('demo.auth_example.how_to_use.title')"
        dense
      >
        <p>
          {{ t('demo.auth_example.how_to_use.description') }} <code class="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded text-xs font-mono">registry/modules/auth/</code>
        </p>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <InstallationCode :code="authUsageCode" />
      </HoverCard>
    </div>
  </div>
</template>
