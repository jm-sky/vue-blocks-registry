import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  perfectionist.configs['recommended-natural'],

  // Custom rules
  {
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }],

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],

      // Vue rules
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 3 },
        multiline: { max: 1 },
      }],
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],

      // Perfectionist rules
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-object-types': 'off',
      'perfectionist/sort-union-types': 'off',
      'perfectionist/sort-modules': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          newlinesBetween: 'never',
          internalPattern: ['^~/.*', '^@/.*'],
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
            'type',
            'internal-type',
          ],
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'unsorted',
        },
      ],
    },
  },
)
