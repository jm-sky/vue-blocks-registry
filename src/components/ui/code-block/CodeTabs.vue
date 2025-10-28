<script setup lang="ts">
import { type BundledLanguage, type BundledTheme } from 'shiki'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'
import CodeBlock from './CodeBlock.vue'
import type { VNode } from 'vue'

export interface CodeTabsProps {
  code: string
  language?: BundledLanguage
  theme?: BundledTheme
  showLineNumbers?: boolean
  filename?: string
  copyable?: boolean
  defaultTab?: 'preview' | 'code'
}

withDefaults(defineProps<CodeTabsProps>(), {
  language: 'typescript',
  theme: 'github-dark',
  showLineNumbers: false,
  copyable: true,
  defaultTab: 'preview',
})

defineSlots<{
  preview(): VNode
}>()
</script>

<template>
  <Tabs :default-value="defaultTab" class="w-full">
    <div class="flex items-center justify-between rounded-t-lg border border-b-0 border-border bg-muted/40 px-4">
      <TabsList class="h-auto bg-transparent p-0">
        <TabsTrigger
          value="preview"
          class="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          class="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
        >
          Code
        </TabsTrigger>
      </TabsList>
    </div>

    <TabsContent value="preview" class="mt-0">
      <div class="rounded-b-lg border border-border bg-background p-8">
        <div class="flex items-center justify-center">
          <slot name="preview" />
        </div>
      </div>
    </TabsContent>

    <TabsContent value="code" class="mt-0">
      <div class="rounded-b-lg overflow-hidden">
        <CodeBlock
          :code="code"
          :language="language"
          :theme="theme"
          :show-line-numbers="showLineNumbers"
          :filename="filename"
          :copyable="copyable"
          class="border-0 rounded-t-none"
        />
      </div>
    </TabsContent>
  </Tabs>
</template>

