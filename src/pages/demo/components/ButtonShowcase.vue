<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import CodePreview from '@/components/demo/CodePreview.vue'
import ComponentSection from '@/components/demo/ComponentSection.vue'
import { Button } from '@registry/components/ui/button'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const installCode = 'npx vue-blocks-registry add button'

const basicVibeUsageCode = `<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
<\/script>

<template>
  <Button vibe="primary">Click me</Button>
</template>`

const variantsCode = `<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
<\/script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button variant="primary">Primary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
</template>`

const vibesCode = `<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
<\/script>

<template>
  <div class="flex flex-wrap gap-4">
    <Button vibe="primary">Primary Vibe</Button>
    <Button vibe="outline">Outline Vibe</Button>
    <Button vibe="underline">Underline Vibe</Button>
  </div>
</template>`

const sizesCode = `<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'
<\/script>

<template>
  <div class="flex items-center gap-2">
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
      <ArrowRight :size="20" />
    </Button>
  </div>
</template>`

const statesCode = `<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
<\/script>

<template>
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
      <CodePreview :code="basicVibeUsageCode">
        <template #preview>
          <Button vibe="primary">
            Click me
          </Button>
        </template>
      </CodePreview>
    </ComponentSection>

    <!-- Installation -->
    <ComponentSection
      id="installation"
      title="Installation"
    >
      <div class="bg-slate-900 dark:bg-slate-950 rounded-lg border border-slate-700/60 p-4">
        <pre class="text-emerald-400 dark:text-emerald-300 text-sm font-mono">{{ installCode }}</pre>
      </div>
    </ComponentSection>

    <!-- Examples -->
    <ComponentSection
      id="examples"
      title="Examples"
    >
      <div class="space-y-8">
        <!-- Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            Variants
          </h3>
          <CodePreview :code="variantsCode">
            <template #preview>
              <div class="flex flex-wrap gap-2">
                <Button variant="primary">
                  Primary
                </Button>
                <Button variant="outline">
                  Outline
                </Button>
                <Button variant="destructive">
                  Destructive
                </Button>
                <Button variant="secondary">
                  Secondary
                </Button>
                <Button variant="ghost">
                  Ghost
                </Button>
                <Button variant="link">
                  Link
                </Button>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- Vibes (Unique Feature) -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            Vibes (Unique Feature ✨)
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Our Button component includes unique "vibe" animations that add extra visual appeal.
          </p>
          <CodePreview :code="vibesCode">
            <template #preview>
              <div class="flex flex-wrap gap-4">
                <Button vibe="primary">
                  Primary Vibe
                </Button>
                <Button vibe="outline">
                  Outline Vibe
                </Button>
                <Button vibe="underline">
                  Underline Vibe
                </Button>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- Sizes -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            Sizes
          </h3>
          <CodePreview :code="sizesCode">
            <template #preview>
              <div class="flex items-center gap-2">
                <Button size="sm">
                  Small
                </Button>
                <Button size="default">
                  Default
                </Button>
                <Button size="lg">
                  Large
                </Button>
                <Button size="icon">
                  <ArrowRight :size="20" />
                </Button>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- States -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            States
          </h3>
          <CodePreview :code="statesCode">
            <template #preview>
              <div class="flex gap-2">
                <Button>Normal</Button>
                <Button disabled>
                  Disabled
                </Button>
              </div>
            </template>
          </CodePreview>
        </div>
      </div>
    </ComponentSection>
  </div>
</template>
