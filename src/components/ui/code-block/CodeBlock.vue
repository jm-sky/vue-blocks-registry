<script setup lang="ts">
import { type BundledLanguage, type BundledTheme, codeToHtml } from 'shiki'
import { ref } from 'vue'
import { cn } from '@registry/lib/utils'
import CodeBlockCopyBtn from './CodeBlockCopyBtn.vue'
import type { HTMLAttributes } from 'vue'

export interface CodeBlockProps {
  code: string
  language?: BundledLanguage
  theme?: BundledTheme | { light: BundledTheme, dark: BundledTheme }
  showLineNumbers?: boolean
  highlightLines?: number[]
  filename?: string
  copyable?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  language: 'typescript',
  theme: 'github-dark',
  showLineNumbers: false,
  copyable: true,
})

const highlightedCode = ref<string>('')
const isLoading = ref(true)

// Initialize Shiki and highlight code
const initHighlighter = async () => {
  try {
    const isDualTheme = typeof props.theme === 'object' && 'light' in props.theme && 'dark' in props.theme

    highlightedCode.value = await codeToHtml(props.code, {
      lang: props.language,
      ...(isDualTheme
        ? { themes: props.theme }
        : { theme: props.theme }
      ),
      transformers: [
        {
          pre(node) {
            // Keep background for dual themes, remove for single theme
            if (!isDualTheme) {
              delete node.properties.style
            }
          },
          line(node, line) {
            // Add line numbers
            if (props.showLineNumbers) {
              node.properties['data-line'] = line
            }
            // Highlight specific lines
            if (props.highlightLines?.includes(line)) {
              node.properties.class = 'highlighted'
            }
          },
        },
      ],
    })
  } catch (error) {
    console.error('Failed to highlight code:', error)
    highlightedCode.value = `<pre><code>${escapeHtml(props.code)}</code></pre>`
  } finally {
    isLoading.value = false
  }
}

// Escape HTML for fallback
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m] ?? m)
}

// Initialize on mount
void initHighlighter()
</script>

<template>
  <div :class="cn('code-block-container relative group rounded-lg overflow-hidden border border-border bg-[#0d1117]', props.class)">
    <!-- Header -->
    <div v-if="filename || language" class="flex items-center justify-between px-4 pt-1 -mb-1 text-xs font-mono text-muted-foreground">
      <span>
        {{ filename }}
      </span>
      <span>
        {{ language }}
      </span>
    </div>

    <!-- Code content -->
    <div class="relative overflow-x-auto">
      <div v-if="isLoading" class="flex items-center justify-center p-8">
        <div class="text-sm text-muted-foreground">
          Loading...
        </div>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-else class="code-block-content" v-html="highlightedCode" />
    </div>

    <CodeBlockCopyBtn v-if="copyable" :code class="absolute top-6 right-4" />
  </div>
</template>

<style scoped>
.code-block-container {
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
}

.code-block-content :deep(pre) {
  margin: 0;
  padding: 1rem;
  background: transparent !important;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.7;
}

.code-block-content :deep(code) {
  display: block;
  background: transparent !important;
  padding: 0;
  font-family: inherit;
}

.code-block-content :deep([data-line]) {
  display: inline-block;
  width: 100%;
  padding-left: 3rem;
  position: relative;
}

.code-block-content :deep([data-line])::before {
  content: attr(data-line);
  position: absolute;
  left: 0;
  width: 2.5rem;
  text-align: right;
  color: rgba(128, 128, 128, 0.4);
  padding-right: 1rem;
}

.code-block-content :deep(.highlighted) {
  background: rgba(255, 255, 255, 0.05);
  border-left: 2px solid rgba(59, 130, 246, 0.5);
}

/* Scrollbar styling */
.code-block-content :deep(pre)::-webkit-scrollbar {
  height: 0.5rem;
}

.code-block-content :deep(pre)::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
}

.code-block-content :deep(pre)::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.3);
  border-radius: 0.25rem;
}

.code-block-content :deep(pre)::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.5);
}
</style>

