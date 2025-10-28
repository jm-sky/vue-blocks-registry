<script setup lang="ts">
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCopyToClipboard } from '@/composables/useClipboard'
import type { BundledLanguage, BundledTheme } from 'shiki'

interface Props {
  code: string
  title?: string
  language?: BundledLanguage
  theme?: BundledTheme
  showLineNumbers?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue',
  theme: 'github-dark',
  showLineNumbers: false,
})

const { copy, copied } = useCopyToClipboard()
const activeTab = ref('preview')

const handleCopy = async () => {
  await copy(props.code)
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
          class="gap-2"
          @click="handleCopy"
        >
          <CopyIcon v-if="!copied" class="size-4" />
          <CheckIcon v-else class="size-4" />
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
        <div class="rounded-2xl shadow-lg overflow-hidden">
          <CodeBlock
            :code="code"
            :language="language"
            :theme="theme"
            :show-line-numbers="showLineNumbers"
            :copyable="false"
          />
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
