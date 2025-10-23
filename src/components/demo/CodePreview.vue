<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/composables/useClipboard'

interface Props {
  code: string
  title?: string
}

const props = defineProps<Props>()

const { copy, copied } = useCopyToClipboard()
const activeTab = ref('preview')

const handleCopy = () => {
  copy(props.code)
}
</script>

<template>
  <div class="relative">
    <Tabs v-model="activeTab" class="w-full">
      <div class="flex items-center justify-between mb-2">
        <TabsList>
          <TabsTrigger value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            Code
          </TabsTrigger>
        </TabsList>

        <!-- Copy button - only visible on Code tab -->
        <Button
          v-if="activeTab === 'code'"
          variant="outline"
          size="sm"
          @click="handleCopy"
          class="gap-2"
        >
          <svg
            v-if="!copied"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </Button>
      </div>

      <!-- Preview Tab -->
      <TabsContent value="preview" class="mt-0">
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-8 min-h-[200px] flex items-center justify-center">
          <slot name="preview" />
        </div>
      </TabsContent>

      <!-- Code Tab -->
      <TabsContent value="code" class="mt-0">
        <div class="bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-700/60 p-6 shadow-lg overflow-x-auto">
          <pre class="text-sm font-mono text-slate-100"><code>{{ code }}</code></pre>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
