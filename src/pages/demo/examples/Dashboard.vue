<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()
</script>

<template>
  <div class="space-y-8">
    <DocsPageHeader :title="t('demo.dashboard_example.title')" :description="t('demo.dashboard_example.description')" />

    <div class="rounded-lg border border-border bg-card p-8">
      <p class="text-center text-muted-foreground">
        {{ t('demo.dashboard_example.coming_soon') }}
      </p>
      <div class="mt-4 text-center">
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          {{ t('demo.dashboard_example.view_existing') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

