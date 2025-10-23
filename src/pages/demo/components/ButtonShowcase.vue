<script setup lang="ts">
import { Button } from '@/components/ui/button'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'
import CodePreview from '@/components/demo/CodePreview.vue'
import ComponentSection from '@/components/demo/ComponentSection.vue'

const installCode = `npx vue-blocks-registry add button`

const basicUsageCode = `<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button>Click me</Button>
</template>`

const variantsCode = `<template>
  <div class="flex flex-wrap gap-2">
    <Button variant="primary">Primary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
</template>`

const sizesCode = `<template>
  <div class="flex items-center gap-2">
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Button>
  </div>
</template>`

const statesCode = `<template>
  <div class="flex gap-2">
    <Button>Normal</Button>
    <Button disabled>Disabled</Button>
  </div>
</template>`
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <DocsPageHeader
      title="Button"
      description="Displays a button or a component that looks like a button."
    />

    <!-- Preview -->
    <ComponentSection title="Preview">
      <CodePreview :code="basicUsageCode">
        <template #preview>
          <Button>Click me</Button>
        </template>
      </CodePreview>
    </ComponentSection>

    <!-- Installation -->
    <ComponentSection
      title="Installation"
      id="installation"
    >
      <div class="bg-slate-900 dark:bg-slate-950 rounded-lg border border-slate-700/60 p-4">
        <pre class="text-emerald-400 dark:text-emerald-300 text-sm font-mono">{{ installCode }}</pre>
      </div>
    </ComponentSection>

    <!-- Usage -->
    <ComponentSection
      title="Usage"
      id="usage"
    >
      <CodePreview :code="basicUsageCode">
        <template #preview>
          <Button>Click me</Button>
        </template>
      </CodePreview>
    </ComponentSection>

    <!-- Examples -->
    <ComponentSection
      title="Examples"
      id="examples"
    >
      <div class="space-y-8">
        <!-- Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Variants</h3>
          <CodePreview :code="variantsCode">
            <template #preview>
              <div class="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- Sizes -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Sizes</h3>
          <CodePreview :code="sizesCode">
            <template #preview>
              <div class="flex items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- States -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">States</h3>
          <CodePreview :code="statesCode">
            <template #preview>
              <div class="flex gap-2">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </template>
          </CodePreview>
        </div>
      </div>
    </ComponentSection>
  </div>
</template>
