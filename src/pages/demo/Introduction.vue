<script setup lang="ts">
import { LayoutDashboard, Lock, Star, Table } from 'lucide-vue-next'
import { type Component, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FeatureCard from '@/components/demo/FeatureCard.vue'
import InstallationCode from '@/components/demo/InstallationCode.vue'
import CodeBlock from '@/components/ui/code-block/CodeBlock.vue'
import { RoutePaths } from '@/router/route-names'
import ButtonLink from '@registry/components/ui/button-link/ButtonLink.vue'
import ButtonLinkExternal from '@registry/components/ui/button-link/ButtonLinkExternal.vue'
import Card from '@registry/components/ui/card/Card.vue'
import CardContent from '@registry/components/ui/card/CardContent.vue'
import DocsPageHeader from './layouts/partials/DocsPageHeader.vue'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, tm } = useI18n()

// Helper to convert translation message object to array
const toArray = (key: string): string[] => {
  const msg = tm(key)
  return Array.isArray(msg) ? msg : Object.values(msg)
}

// Installation code snippets
const createProjectCode = 'pnpm create vite@latest my-vue-app --template vue-ts'
const addTailwindCode = 'pnpm add tailwindcss @tailwindcss/vite'
const tailwindCssCode = '@import "tailwindcss";'
const tsconfigCode = `{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`
const tsconfigAppCode = `{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}`
const viteConfigCode = `import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`
const runCliCode = 'pnpm dlx vue-blocks-registry init'
const addComponentCode = 'pnpm dlx vue-blocks-registry add button'

const features = computed(() => [
  {
    title: t('demo.introduction.features.ui_components.title'),
    items: toArray('demo.introduction.features.ui_components.items'),
    iconComponent: Star as Component,
    iconClass: 'size-5 text-blue-600',
    iconBgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
  },
  {
    title: t('demo.introduction.features.layouts.title'),
    items: toArray('demo.introduction.features.layouts.items'),
    iconComponent: LayoutDashboard as Component,
    iconClass: 'size-5 text-violet-600',
    iconBgClass: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20'
  },
  {
    title: t('demo.introduction.features.auth_modules.title'),
    items: toArray('demo.introduction.features.auth_modules.items'),
    iconComponent: Lock as Component,
    iconClass: 'size-5 text-emerald-600',
    iconBgClass: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'
  },
  {
    title: t('demo.introduction.features.data_table.title'),
    items: toArray('demo.introduction.features.data_table.items'),
    iconComponent: Table as Component,
    iconClass: 'size-5 text-amber-600',
    iconBgClass: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20'
  }
])
</script>

<template>
  <div class="space-y-10">
    <DocsPageHeader :title="t('demo.introduction.title')" :description="t('demo.introduction.description')" />

    <Card>
      <CardContent class="leading-7 text-muted-foreground">
        {{ t('demo.introduction.intro_text') }}
      </CardContent>
    </Card>

    <div class="space-y-4">
      <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
        {{ t('demo.introduction.what_is_title') }}
      </h2>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="leading-7 text-muted-foreground" v-html="t('demo.introduction.what_is_p1')" />

      <p class="leading-7 text-muted-foreground">
        {{ t('demo.introduction.what_is_p2') }}
      </p>
    </div>

    <div class="space-y-6">
      <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
        {{ t('demo.introduction.installation_title') }}
      </h2>

      <div class="space-y-6">
        <!-- Step 1: Create project -->
        <div class="space-y-2">
          <h3 class="text-xl font-semibold">
            {{ t('demo.introduction.installation.step1.title') }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t('demo.introduction.installation.step1.description') }}
          </p>
          <InstallationCode :code="createProjectCode" class="max-w-3xl" />
        </div>

        <!-- Step 2: Add Tailwind CSS -->
        <div class="space-y-2">
          <h3 class="text-xl font-semibold">
            {{ t('demo.introduction.installation.step2.title') }}
          </h3>
          <InstallationCode :code="addTailwindCode" class="max-w-3xl" />
          <p class="text-sm text-muted-foreground mt-2">
            {{ t('demo.introduction.installation.step2.description', { file: 'src/style.css' }) }}
          </p>
          <CodeBlock
            :code="tailwindCssCode"
            language="css"
            filename="src/style.css"
            class="max-w-3xl"
          />
        </div>

        <!-- Step 3: Edit tsconfig.json -->
        <div class="space-y-2">
          <h3 class="text-xl font-semibold">
            {{ t('demo.introduction.installation.step3.title') }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t('demo.introduction.installation.step3.sections.tsconfig', {
              baseUrl: 'baseUrl',
              paths: 'paths',
              compilerOptions: 'compilerOptions',
              tsconfig: 'tsconfig.json',
              tsconfigApp: 'tsconfig.app.json'
            }) }}
          </p>
          <CodeBlock
            :code="tsconfigCode"
            language="json"
            filename="tsconfig.json"
            class="max-w-3xl"
            :highlight-lines="[11, 12, 13, 14, 15]"
            show-line-numbers
          />
          <p class="text-sm text-muted-foreground">
            {{ t('demo.introduction.installation.step3.sections.tsconfigApp', {
              baseUrl: 'baseUrl',
              tsconfigApp: 'tsconfig.app.json'
            }) }}
          </p>
          <CodeBlock
            :code="tsconfigAppCode"
            language="json"
            filename="tsconfig.app.json"
            class="max-w-3xl"
            :highlight-lines="[4, 5, 6, 7]"
            show-line-numbers
          />
        </div>

        <!-- Step 4: Update vite.config.ts -->
        <div class="space-y-2">
          <h3 class="text-xl font-semibold">
            {{ t('demo.introduction.installation.step4.title') }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t('demo.introduction.installation.step4.description', { file: 'vite.config.ts' }) }}
          </p>
          <CodeBlock
            :code="viteConfigCode"
            language="typescript"
            filename="vite.config.ts"
            class="max-w-3xl"
            :highlight-lines="[2, 9]"
            show-line-numbers
          />
        </div>

        <!-- Step 5: Run CLI -->
        <div class="space-y-2">
          <h3 class="text-xl font-semibold">
            {{ t('demo.introduction.installation.step5.title') }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t('demo.introduction.installation.step5.description', { command: 'vue-blocks-registry init' }) }}
          </p>
          <InstallationCode :code="runCliCode" class="max-w-3xl" />
        </div>

        <!-- Step 6: Add components -->
        <div class="space-y-2">
          <h3 class="text-xl font-semibold">
            {{ t('demo.introduction.installation.step6.title') }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t('demo.introduction.installation.step6.description') }}
          </p>
          <InstallationCode :code="addComponentCode" class="max-w-3xl" />
        </div>
      </div>
    </div>

    <div class="space-y-4 animate-slide-up">
      <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
        {{ t('demo.introduction.features_title') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :items="feature.items"
          :icon-component="feature.iconComponent"
          :icon-class="feature.iconClass"
          :icon-bg-class="feature.iconBgClass"
          dense
        />
      </div>
    </div>

    <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
      {{ t('demo.introduction.technologies_title') }}
    </h2>

    <div class="grid grid-cols-2 gap-4 not-prose my-6">
      <FeatureCard
        :title="t('demo.introduction.tech.frontend')"
        :items="toArray('demo.introduction.tech.frontend_items')"
      />
      <FeatureCard
        :title="t('demo.introduction.tech.tools')"
        :items="toArray('demo.introduction.tech.tools_items')"
      />
    </div>

    <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
      {{ t('demo.introduction.get_started_title') }}
    </h2>

    <p class="leading-7 text-muted-foreground">
      {{ t('demo.introduction.get_started_text') }}
    </p>

    <div class="flex flex-wrap gap-4 justify-center md:justify-start not-prose my-6">
      <ButtonLink :to="RoutePaths.DEMO_COMPONENTS_BUTTON" size="lg" variant="primary">
        {{ t('demo.introduction.view_components') }}
      </ButtonLink>
      <ButtonLinkExternal href="https://github.com/jm-sky/vue-blocks-registry" size="lg" variant="outline">
        {{ t('demo.introduction.github_repo') }}
      </ButtonLinkExternal>
    </div>
  </div>
</template>
