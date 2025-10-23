<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'
import CodePreview from '@/components/demo/CodePreview.vue'
import ComponentSection from '@/components/demo/ComponentSection.vue'

const installCode = `npx vue-blocks-registry add alert`

const basicUsageCode = `<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
</script>

<template>
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the CLI.
    </AlertDescription>
  </Alert>
</template>`

const defaultCode = `<template>
  <Alert>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components and dependencies to your app using the CLI.
    </AlertDescription>
  </Alert>
</template>`

const destructiveCode = `<template>
  <Alert variant="destructive">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>`
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <DocsPageHeader
      title="Alert"
      description="Displays a callout for user attention."
    />

    <!-- Preview -->
    <ComponentSection title="Preview">
      <CodePreview :code="basicUsageCode">
        <template #preview>
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the CLI.
            </AlertDescription>
          </Alert>
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
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the CLI.
            </AlertDescription>
          </Alert>
        </template>
      </CodePreview>
    </ComponentSection>

    <!-- Examples -->
    <ComponentSection
      title="Examples"
      id="examples"
    >
      <div class="space-y-8">
        <!-- Default -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Default</h3>
          <CodePreview :code="defaultCode">
            <template #preview>
              <Alert>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components and dependencies to your app using the CLI.
                </AlertDescription>
              </Alert>
            </template>
          </CodePreview>
        </div>

        <!-- Destructive -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Destructive</h3>
          <CodePreview :code="destructiveCode">
            <template #preview>
              <Alert variant="destructive">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>
            </template>
          </CodePreview>
        </div>
      </div>
    </ComponentSection>
  </div>
</template>
