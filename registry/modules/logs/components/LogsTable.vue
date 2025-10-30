<script setup lang="ts">
import { ref } from 'vue'

interface LogRow {
  id: string
  level: string
  message: string
  timestamp: string
}

const rows = ref<LogRow[]>([])
// placeholder, integration with service can be added
</script>

<template>
  <div class="border rounded">
    <div class="grid grid-cols-12 border-b bg-muted px-3 py-2 text-sm font-medium">
      <div class="col-span-2">
        Time
      </div>
      <div class="col-span-2">
        Level
      </div>
      <div class="col-span-8">
        Message
      </div>
    </div>
    <div v-if="rows.length === 0" class="p-4 text-sm text-muted-foreground">
      No logs
    </div>
    <div v-else>
      <div v-for="row in rows" :key="row.id" class="grid grid-cols-12 px-3 py-2 text-sm border-b">
        <div class="col-span-2">
          {{ row.timestamp }}
        </div>
        <div class="col-span-2 uppercase">
          {{ row.level }}
        </div>
        <div class="col-span-8 font-mono truncate">
          {{ row.message }}
        </div>
      </div>
    </div>
  </div>
</template>



