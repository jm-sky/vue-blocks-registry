<script setup lang="ts">
import LogsTable from '@registry/modules/logs-management/components/LogsTable.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-semibold">
      {{ t('logs.page.title') }}
    </h1>
    <LogsTable />
  </div>
</template>

