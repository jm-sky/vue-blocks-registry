<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import CodePreview from '@/components/demo/CodePreview.vue'
import ComponentSection from '@/components/demo/ComponentSection.vue'
import InstallationCode from '@/components/demo/InstallationCode.vue'
import { Button } from '@registry/components/ui/button'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

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
    <Button variant="primary" vibe="primary">Primary Vibe</Button>
    <Button variant="outline" vibe="outline">Outline Vibe</Button>
    <Button variant="ghost" vibe="underline">Underline Vibe</Button>
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
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
  </div>
</template>`
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <DocsPageHeader
      :title="t('demo.showcase.button.title')"
      :description="t('demo.showcase.button.description')"
    />

    <!-- Preview -->
    <ComponentSection :title="t('demo.showcase.preview')">
      <CodePreview :code="basicVibeUsageCode">
        <template #preview>
          <Button vibe="primary">
            {{ t('demo.showcase.button.click_me') }}
          </Button>
        </template>
      </CodePreview>
    </ComponentSection>

    <!-- Installation -->
    <ComponentSection
      id="installation"
      :title="t('demo.showcase.installation')"
    >
      <InstallationCode :code="installCode" />
    </ComponentSection>

    <!-- Examples -->
    <ComponentSection
      id="examples"
      :title="t('demo.showcase.examples')"
    >
      <div class="space-y-8">
        <!-- Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            {{ t('demo.showcase.button.variants.title') }}
          </h3>
          <CodePreview :code="variantsCode">
            <template #preview>
              <div class="flex flex-wrap gap-2">
                <Button variant="primary">
                  {{ t('demo.showcase.button.variants.primary') }}
                </Button>
                <Button variant="outline">
                  {{ t('demo.showcase.button.variants.outline') }}
                </Button>
                <Button variant="destructive">
                  {{ t('demo.showcase.button.variants.destructive') }}
                </Button>
                <Button variant="secondary">
                  {{ t('demo.showcase.button.variants.secondary') }}
                </Button>
                <Button variant="ghost">
                  {{ t('demo.showcase.button.variants.ghost') }}
                </Button>
                <Button variant="link">
                  {{ t('demo.showcase.button.variants.link') }}
                </Button>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- Vibes (Unique Feature) -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            {{ t('demo.showcase.button.vibes.title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            {{ t('demo.showcase.button.vibes.description') }}
          </p>
          <CodePreview :code="vibesCode">
            <template #preview>
              <div class="flex flex-wrap gap-4">
                <Button vibe="primary">
                  {{ t('demo.showcase.button.vibes.primary') }}
                </Button>
                <Button variant="outline" vibe="outline">
                  {{ t('demo.showcase.button.vibes.outline') }}
                </Button>
                <Button variant="ghost" vibe="underline">
                  {{ t('demo.showcase.button.vibes.underline') }}
                </Button>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- Sizes -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            {{ t('demo.showcase.button.sizes.title') }}
          </h3>
          <CodePreview :code="sizesCode">
            <template #preview>
              <div class="flex items-center gap-2">
                <Button size="sm">
                  {{ t('demo.showcase.button.sizes.small') }}
                </Button>
                <Button size="default">
                  {{ t('demo.showcase.button.sizes.default') }}
                </Button>
                <Button size="lg">
                  {{ t('demo.showcase.button.sizes.large') }}
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
            {{ t('demo.showcase.button.states.title') }}
          </h3>
          <CodePreview :code="statesCode">
            <template #preview>
              <div class="flex gap-2">
                <Button>{{ t('demo.showcase.button.states.normal') }}</Button>
                <Button loading>
                  {{ t('demo.showcase.button.states.loading') }}
                </Button>
                <Button disabled>
                  {{ t('demo.showcase.button.states.disabled') }}
                </Button>
              </div>
            </template>
          </CodePreview>
        </div>
      </div>
    </ComponentSection>
  </div>
</template>
