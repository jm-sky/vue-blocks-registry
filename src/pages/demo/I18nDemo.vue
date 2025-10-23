<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { Alert, AlertDescription, AlertTitle } from '@registry/components/ui/alert'
import { Button } from '@registry/components/ui/button'
import { useLocale } from '@registry/shared/i18n'
import LocaleDropdown from '@registry/shared/i18n/components/LocaleDropdown.vue'
import LocaleSwitcher from '@registry/shared/i18n/components/LocaleSwitcher.vue'

const { t } = useI18n()
const { currentLocale } = useLocale()
</script>

<template>
  <div class="container mx-auto max-w-4xl py-10 space-y-8">
    <div>
      <h1 class="text-4xl font-bold mb-4">
        {{ t('common.welcome') }}
      </h1>
      <p class="text-lg text-muted-foreground">
        Current locale: <span class="font-semibold">{{ currentLocale }}</span>
      </p>
    </div>

    <!-- Locale Switchers Demo -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-2xl font-semibold">
        Locale Switchers
      </h2>

      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-medium mb-2">
            Button Switcher
          </h3>
          <LocaleSwitcher />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">
            Dropdown Switcher
          </h3>
          <LocaleDropdown />
        </div>
      </div>
    </div>

    <!-- Common Translations -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-2xl font-semibold">
        Common Translations
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="p-4 bg-accent/10 rounded">
          <p class="text-sm text-muted-foreground">
            App Name
          </p>
          <p class="font-medium">
            {{ t('common.app_name') }}
          </p>
        </div>
        <div class="p-4 bg-accent/10 rounded">
          <p class="text-sm text-muted-foreground">
            Loading
          </p>
          <p class="font-medium">
            {{ t('common.loading') }}
          </p>
        </div>
        <div class="p-4 bg-accent/10 rounded">
          <p class="text-sm text-muted-foreground">
            Save
          </p>
          <p class="font-medium">
            {{ t('common.save') }}
          </p>
        </div>
        <div class="p-4 bg-accent/10 rounded">
          <p class="text-sm text-muted-foreground">
            Cancel
          </p>
          <p class="font-medium">
            {{ t('common.cancel') }}
          </p>
        </div>
        <div class="p-4 bg-accent/10 rounded">
          <p class="text-sm text-muted-foreground">
            Delete
          </p>
          <p class="font-medium">
            {{ t('common.delete') }}
          </p>
        </div>
        <div class="p-4 bg-accent/10 rounded">
          <p class="text-sm text-muted-foreground">
            Search
          </p>
          <p class="font-medium">
            {{ t('common.search') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Auth Translations -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-2xl font-semibold">
        Authentication Translations
      </h2>

      <div class="space-y-4">
        <Alert>
          <AlertCircle class="h-4 w-4" />
          <AlertTitle>{{ t('auth.sign_in_to_account') }}</AlertTitle>
          <AlertDescription>
            {{ t('auth.dont_have_account') }} {{ t('auth.sign_up') }}
          </AlertDescription>
        </Alert>

        <div class="flex gap-2">
          <Button>{{ t('auth.login') }}</Button>
          <Button variant="outline">
            {{ t('auth.register') }}
          </Button>
          <Button variant="ghost">
            {{ t('auth.forgot_password') }}
          </Button>
        </div>
      </div>
    </div>

    <!-- Navigation Translations -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-2xl font-semibold">
        Navigation Translations
      </h2>

      <div class="flex flex-wrap gap-2">
        <Button variant="outline">
          {{ t('navigation.home') }}
        </Button>
        <Button variant="outline">
          {{ t('navigation.dashboard') }}
        </Button>
        <Button variant="outline">
          {{ t('navigation.profile') }}
        </Button>
        <Button variant="outline">
          {{ t('navigation.settings') }}
        </Button>
        <Button variant="outline">
          {{ t('navigation.about') }}
        </Button>
        <Button variant="outline">
          {{ t('navigation.contact') }}
        </Button>
      </div>
    </div>

    <!-- Validation Messages -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-2xl font-semibold">
        Validation Messages
      </h2>

      <div class="space-y-2 text-sm">
        <p class="text-destructive">
          {{ t('validation.required') }}
        </p>
        <p class="text-destructive">
          {{ t('validation.email') }}
        </p>
        <p class="text-destructive">
          {{ t('validation.min_length', { min: 8 }) }}
        </p>
        <p class="text-destructive">
          {{ t('validation.password_mismatch') }}
        </p>
      </div>
    </div>

    <!-- Error Messages -->
    <div class="space-y-4 border rounded-lg p-6">
      <h2 class="text-2xl font-semibold">
        Error Messages
      </h2>

      <div class="space-y-2">
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertDescription>{{ t('errors.generic') }}</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertDescription>{{ t('errors.network') }}</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertDescription>{{ t('errors.unauthorized') }}</AlertDescription>
        </Alert>
      </div>
    </div>
  </div>
</template>
