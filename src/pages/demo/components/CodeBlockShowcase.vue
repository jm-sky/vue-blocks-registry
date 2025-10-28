<script setup lang="ts">
import ComponentSection from '@/components/demo/ComponentSection.vue'
import InstallationCode from '@/components/demo/InstallationCode.vue'
import { CodeBlock, CodeTabs } from '@/components/ui/code-block'
import { Button } from '@registry/components/ui/button'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const installCode = 'pnpm add shiki'

// Example codes
const vueExample = `<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
<\/script>

<template>
  <div class="counter">
    <h1>Count: {{ count }}</h1>
    <button @click="increment">
      Increment
    </button>
  </div>
</template>

<style scoped>
.counter {
  text-align: center;
  padding: 2rem;
}
</style>`

const typescriptExample = `interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

class UserService {
  private users: User[] = []

  async getUser(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) ?? null
  }

  async createUser(data: Omit<User, 'id'>): Promise<User> {
    const user: User = {
      id: this.users.length + 1,
      ...data
    }
    this.users.push(user)
    return user
  }
}`

const bashExample = `# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test`

const lineNumbersExample = `function fibonacci(n: number): number {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// Calculate first 10 Fibonacci numbers
const results = Array.from({ length: 10 }, (_, i) => fibonacci(i))
console.log(results)`
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <DocsPageHeader
      title="Code Block"
      description="Beautiful syntax highlighting powered by Shiki, the same highlighter used in VS Code"
    />

    <!-- Installation -->
    <ComponentSection
      id="installation"
      title="Installation"
    >
      <div class="space-y-4">
        <p class="text-sm text-slate-600 dark:text-slate-400">
          First, install Shiki:
        </p>
        <InstallationCode :code="installCode" />
        <p class="text-sm text-slate-600 dark:text-slate-400">
          The CodeBlock and CodeTabs components are already included in the components/ui/code-block directory.
        </p>
      </div>
    </ComponentSection>

    <!-- Basic Usage -->
    <ComponentSection id="basic" title="Basic Usage">
      <div class="space-y-4">
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Simple code block with TypeScript syntax highlighting:
        </p>
        <CodeBlock
          :code="typescriptExample"
          language="typescript"
          theme="github-dark"
        />
      </div>
    </ComponentSection>

    <!-- Different Languages -->
    <ComponentSection id="languages" title="Supported Languages">
      <div class="space-y-8">
        <!-- Vue -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            Vue
          </h3>
          <CodeBlock
            :code="vueExample"
            language="vue"
            filename="Counter.vue"
          />
        </div>

        <!-- Bash -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            Bash
          </h3>
          <CodeBlock
            :code="bashExample"
            language="bash"
            filename="commands.sh"
          />
        </div>
      </div>
    </ComponentSection>

    <!-- Line Numbers -->
    <ComponentSection id="line-numbers" title="Line Numbers">
      <div class="space-y-4">
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Enable line numbers for better code reference:
        </p>
        <CodeBlock
          :code="lineNumbersExample"
          language="typescript"
          :show-line-numbers="true"
          filename="fibonacci.ts"
        />
      </div>
    </ComponentSection>

    <!-- Code Tabs (Preview + Code) -->
    <ComponentSection id="code-tabs" title="Code Tabs">
      <div class="space-y-4">
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Use CodeTabs to show both a preview and code, similar to shadcn-vue documentation:
        </p>
        <CodeTabs
          :code="`<Button variant='primary'>Click me</Button>`"
          language="vue"
        >
          <template #preview>
            <Button variant="primary">
              Click me
            </Button>
          </template>
        </CodeTabs>
      </div>
    </ComponentSection>

    <!-- Features -->
    <ComponentSection id="features" title="Features">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <h4 class="font-medium">
            🎨 Accurate Syntax Highlighting
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Powered by Shiki, using the same TextMate grammars as VS Code
          </p>
        </div>
        <div class="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <h4 class="font-medium">
            📋 Copy to Clipboard
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Built-in copy button with visual feedback
          </p>
        </div>
        <div class="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <h4 class="font-medium">
            🔢 Line Numbers
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Optional line numbers for code reference
          </p>
        </div>
        <div class="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <h4 class="font-medium">
            🎯 Multiple Languages
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Supports TypeScript, Vue, JavaScript, Bash, and many more
          </p>
        </div>
        <div class="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <h4 class="font-medium">
            🎭 Theme Support
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Choose from various VS Code themes
          </p>
        </div>
        <div class="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <h4 class="font-medium">
            📱 Responsive
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Works beautifully on all screen sizes
          </p>
        </div>
      </div>
    </ComponentSection>

    <!-- API Reference -->
    <ComponentSection id="api" title="API Reference">
      <div class="space-y-6">
        <!-- CodeBlock Props -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            CodeBlock Props
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800">
                  <th class="text-left py-2 px-4">
                    Prop
                  </th>
                  <th class="text-left py-2 px-4">
                    Type
                  </th>
                  <th class="text-left py-2 px-4">
                    Default
                  </th>
                  <th class="text-left py-2 px-4">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td class="py-2 px-4 font-mono">
                    code
                  </td>
                  <td class="py-2 px-4">
                    string
                  </td>
                  <td class="py-2 px-4">
                    -
                  </td>
                  <td class="py-2 px-4">
                    The code to display
                  </td>
                </tr>
                <tr>
                  <td class="py-2 px-4 font-mono">
                    language
                  </td>
                  <td class="py-2 px-4">
                    BundledLanguage
                  </td>
                  <td class="py-2 px-4">
                    'typescript'
                  </td>
                  <td class="py-2 px-4">
                    Programming language for syntax highlighting
                  </td>
                </tr>
                <tr>
                  <td class="py-2 px-4 font-mono">
                    theme
                  </td>
                  <td class="py-2 px-4">
                    BundledTheme
                  </td>
                  <td class="py-2 px-4">
                    'github-dark'
                  </td>
                  <td class="py-2 px-4">
                    Color theme for syntax highlighting
                  </td>
                </tr>
                <tr>
                  <td class="py-2 px-4 font-mono">
                    showLineNumbers
                  </td>
                  <td class="py-2 px-4">
                    boolean
                  </td>
                  <td class="py-2 px-4">
                    false
                  </td>
                  <td class="py-2 px-4">
                    Show line numbers
                  </td>
                </tr>
                <tr>
                  <td class="py-2 px-4 font-mono">
                    filename
                  </td>
                  <td class="py-2 px-4">
                    string
                  </td>
                  <td class="py-2 px-4">
                    -
                  </td>
                  <td class="py-2 px-4">
                    Optional filename to display in header
                  </td>
                </tr>
                <tr>
                  <td class="py-2 px-4 font-mono">
                    copyable
                  </td>
                  <td class="py-2 px-4">
                    boolean
                  </td>
                  <td class="py-2 px-4">
                    true
                  </td>
                  <td class="py-2 px-4">
                    Show copy button
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- CodeTabs Props -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">
            CodeTabs Props
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            CodeTabs extends all CodeBlock props and adds:
          </p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800">
                  <th class="text-left py-2 px-4">
                    Prop
                  </th>
                  <th class="text-left py-2 px-4">
                    Type
                  </th>
                  <th class="text-left py-2 px-4">
                    Default
                  </th>
                  <th class="text-left py-2 px-4">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td class="py-2 px-4 font-mono">
                    defaultTab
                  </td>
                  <td class="py-2 px-4">
                    'preview' | 'code'
                  </td>
                  <td class="py-2 px-4">
                    'preview'
                  </td>
                  <td class="py-2 px-4">
                    Default active tab
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ComponentSection>
  </div>
</template>

