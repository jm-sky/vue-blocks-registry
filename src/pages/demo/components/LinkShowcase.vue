<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import CodePreview from '@/components/demo/CodePreview.vue'
import ComponentSection from '@/components/demo/ComponentSection.vue'
import InstallationCode from '@/components/demo/InstallationCode.vue'
import ButtonLink from '@registry/components/ui/button-link/ButtonLink.vue'
import HoverLink from '@registry/components/ui/hover-link/HoverLink.vue'
import HoverLinkExternal from '@registry/components/ui/hover-link/HoverLinkExternal.vue'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

const installCode = 'npx vue-blocks-registry add hover-link button-link'

const hoverLinkCode = `<script setup lang="ts">
import { HoverLink } from '@registry/components/ui/hover-link'
<\/script>

<template>
  <div class="flex flex-row gap-4">
    <HoverLink to="/demo">
      Navigate to Demo
    </HoverLink>
    |
    <HoverLinkExternal href="https://vuejs.org" target="_blank">
      External Link
    </HoverLinkExternal>
  </div>
</template>`

const hoverLinkExternalCode = `<script setup lang="ts">
import { HoverLinkExternal } from '@registry/components/ui/hover-link'
<\/script>

<template>
  <HoverLinkExternal href="https://vuejs.org" target="_blank">
    Vue.js Documentation
  </HoverLinkExternal>
</template>`

const buttonLinkCode = `<script setup lang="ts">
import { ButtonLink } from '@registry/components/ui/button-link'
<\/script>

<template>
  <div class="flex gap-2">
    <ButtonLink to="/demo" variant="primary">
      Primary Link
    </ButtonLink>
    <ButtonLink to="/demo" variant="outline">
      Outline Link
    </ButtonLink>
  </div>
</template>`

const buttonLinkVibesCode = `<script setup lang="ts">
import { ButtonLink } from '@registry/components/ui/button-link'
<\/script>

<template>
  <div class="flex gap-4">
    <ButtonLink to="/demo" vibe="primary">
      Primary Vibe
    </ButtonLink>
    <ButtonLink to="/demo" vibe="outline">
      Outline Vibe
    </ButtonLink>
    <ButtonLink to="/demo" vibe="underline">
      Underline Vibe
    </ButtonLink>
  </div>
</template>`
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <DocsPageHeader
      :title="t('demo.showcase.link.title')"
      :description="t('demo.showcase.link.description')"
    />

    <!-- Preview -->
    <ComponentSection :title="t('demo.showcase.preview')">
      <CodePreview :code="hoverLinkCode">
        <template #preview>
          <div class="flex flex-row gap-4">
            <HoverLink to="/demo">
              Navigate to Demo
            </HoverLink>
            |
            <HoverLinkExternal href="https://vuejs.org" target="_blank">
              External Link
            </HoverLinkExternal>
          </div>
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
        <!-- HoverLink -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            HoverLink
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Internal router link with animated underline on hover.
          </p>
          <CodePreview :code="hoverLinkCode">
            <template #preview>
              <div class="flex flex-col gap-3">
                <HoverLink to="/demo">
                  Navigate to Demo
                </HoverLink>
                <HoverLink to="/demo/components">
                  View Components
                </HoverLink>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- HoverLinkExternal -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            HoverLinkExternal
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            External link with icon and hover animation.
          </p>
          <CodePreview :code="hoverLinkExternalCode">
            <template #preview>
              <div class="flex flex-col gap-3">
                <HoverLinkExternal href="https://vuejs.org" target="_blank">
                  <span class="flex items-center gap-2">
                    Vue.js Documentation
                    <ExternalLink :size="16" />
                  </span>
                </HoverLinkExternal>
                <HoverLinkExternal href="https://github.com" target="_blank">
                  <span class="flex items-center gap-2">
                    GitHub
                    <ExternalLink :size="16" />
                  </span>
                </HoverLinkExternal>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- ButtonLink -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            ButtonLink
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Router link styled as a button. Combines Button component with RouterLink functionality.
          </p>
          <CodePreview :code="buttonLinkCode">
            <template #preview>
              <div class="flex flex-wrap gap-2">
                <ButtonLink to="/demo" variant="primary">
                  Primary Link
                </ButtonLink>
                <ButtonLink to="/demo" variant="outline">
                  Outline Link
                </ButtonLink>
                <ButtonLink to="/demo" variant="secondary">
                  Secondary Link
                </ButtonLink>
              </div>
            </template>
          </CodePreview>
        </div>

        <!-- ButtonLink with Vibes -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            ButtonLink with Vibes ✨
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            ButtonLink also supports unique "vibe" animations.
          </p>
          <CodePreview :code="buttonLinkVibesCode">
            <template #preview>
              <div class="flex flex-wrap gap-4">
                <ButtonLink to="/demo" vibe="primary">
                  Primary Vibe
                </ButtonLink>
                <ButtonLink to="/demo" vibe="outline">
                  Outline Vibe
                </ButtonLink>
                <ButtonLink to="/demo" vibe="underline">
                  Underline Vibe
                </ButtonLink>
              </div>
            </template>
          </CodePreview>
        </div>
      </div>
    </ComponentSection>
  </div>
</template>
