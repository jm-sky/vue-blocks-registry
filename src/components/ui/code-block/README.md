# Code Block Component

Beautiful syntax highlighting components powered by [Shiki](https://shiki.style), the same highlighter used in VS Code.

## Features

- 🎨 **Accurate Syntax Highlighting** - Uses TextMate grammars, just like VS Code
- 📋 **Copy to Clipboard** - Built-in copy button with visual feedback
- 🔢 **Line Numbers** - Optional line numbering for code reference
- 🎯 **Multiple Languages** - TypeScript, Vue, JavaScript, Bash, and many more
- 🎭 **Theme Support** - Choose from various VS Code themes (default: github-dark)
- 🌓 **Dual Theme Support** - Optional light/dark mode switching
- 📱 **Responsive** - Works beautifully on all screen sizes

## Installation

```bash
pnpm add shiki
```

The `CodeBlock` and `CodeTabs` components are included in `src/components/ui/code-block/`.

## Components

### CodeBlock

Basic code block with syntax highlighting.

**Props:**

| Prop       | Type      | Default | Description |
|------------|-----------|---------|-------------|
| `code`     | `string`  | -       | The code to display (required) |
| `language` | `BundledLanguage`   | `'typescript'` | Programming language for syntax highlighting |
| `theme`    | `BundledTheme \| { light: BundledTheme, dark: BundledTheme }`      | `'github-dark'` | Color theme for syntax highlighting. Use object for automatic light/dark mode switching |
| `showLineNumbers`      | `boolean` | `false` | Show line numbers |
| `highlightLines` | `number[]` | -      | Array of line numbers to highlight |
| `filename` | `string`  | -      | Optional filename to display in header |
| `copyable` | `boolean` | `true` | Show copy button |

**Usage:**

```vue
<script setup lang="ts">
import { CodeBlock } from '@/components/ui/code-block'

const code = `
function greet(name: string): string {
  return \`Hello, \${name}!\`
}
`
</script>

<template>
  <CodeBlock 
    :code="code" 
    language="typescript"
    filename="greet.ts"
    :show-line-numbers="true"
  />
</template>
```

### CodeTabs

Code block with tabs for Preview and Code, similar to shadcn-vue documentation.

**Props:**

Extends all `CodeBlock` props plus:

| Prop         | Type      | Default | Description |
|--------------|-----------|---------|-------------|
| `defaultTab` | `'preview' \| 'code'` | `'preview'` | Default active tab |

**Usage:**

```vue
<script setup lang="ts">
import { CodeTabs } from '@/components/ui/code-block'
import { Button } from '@/components/ui/button'

const code = `<Button variant="primary">Click me</Button>`
</script>

<template>
  <CodeTabs :code="code" language="vue">
    <template #preview>
      <Button variant="primary">Click me</Button>
    </template>
  </CodeTabs>
</template>
```

## Supported Languages

Shiki supports all languages that VS Code supports, including:

- TypeScript/JavaScript
- Vue/React/Svelte
- HTML/CSS
- Bash/Shell
- JSON/YAML
- Python/Ruby/PHP
- And many more...

See the [full list of supported languages](https://shiki.style/languages).

## Supported Themes

Choose from many VS Code themes:

- `github-dark` (default)
- `github-light`
- `nord`
- `dracula`
- `monokai`
- And many more...

See the [full list of themes](https://shiki.style/themes).

## Examples

### Basic TypeScript Code

```vue
<CodeBlock
  :code="typescriptCode"
  language="typescript"
/>
```

### Single Theme

```vue
<CodeBlock
  :code="typescriptCode"
  language="typescript"
  theme="nord"
/>
```

### Dual Theme (Light/Dark Mode)

```vue
<CodeBlock
  :code="typescriptCode"
  language="typescript"
  :theme="{ light: 'github-light', dark: 'github-dark' }"
/>
```

### Vue Component with Line Numbers

```vue
<CodeBlock
  :code="vueCode"
  language="vue"
  filename="Counter.vue"
  :show-line-numbers="true"
/>
```

### Bash Commands

```vue
<CodeBlock
  :code="bashCode"
  language="bash"
  filename="install.sh"
/>
```

### Highlight Specific Lines

```vue
<CodeBlock
  :code="code"
  language="typescript"
  :show-line-numbers="true"
  :highlight-lines="[2, 4, 5]"
/>
```

### Interactive Preview + Code

```vue
<CodeTabs :code="buttonCode" language="vue">
  <template #preview>
    <Button variant="primary">Example Button</Button>
  </template>
</CodeTabs>
```

## Demo

Visit `/demo/components/code-block` to see all features in action.

## Credits

- [Shiki](https://shiki.style) - Beautiful syntax highlighter
- [shadcn-vue](https://www.shadcn-vue.com) - Design inspiration

