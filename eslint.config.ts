import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/docs/**', '**/tmp-test-project/**', '**/scripts/**']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.strictTypeChecked,
  vueTsConfigs.stylisticTypeChecked,
  perfectionist.configs['recommended-natural'],

  // add your custom rules here
  {
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }],

      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      'vue/max-attributes-per-line': ['error', {
        'singleline': {
          'max': 3,
        },
        'multiline': {
          'max': 1,
        },
      }],
      // ----------------------------------------
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      // ----------------------------------------
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
          fallbackSort: { type: 'alphabetical', order: 'asc' },
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
        }
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'unsorted',
        },
      ],
      // ----------------------------------------
    }
  },

  // Registry-specific rules: enforce @registry imports only
  {
    name: 'registry/enforce-registry-imports',
    files: ['registry/**/*.{ts,tsx,vue}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/*'],
              message: 'Use @registry imports in registry files instead of @/ imports. Registry components must use @registry/* to work when installed in user projects.',
            },
            {
              group: ['~/*'],
              message: 'Use @registry imports in registry files instead of ~/ imports.',
            },
          ],
        },
      ],
    },
  },

  // Modules-specific rules: enforce absolute @registry imports (no relative parent paths)
  {
    name: 'registry/modules/enforce-absolute-imports',
    files: ['registry/modules/**/*.{ts,tsx,vue}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/*'],
              message: 'Use @registry imports in registry files instead of @/ imports. Registry components must use @registry/* to work when installed in user projects.',
            },
            {
              group: ['~/*'],
              message: 'Use @registry imports in registry files instead of ~/ imports.',
            },
            {
              group: ['../*'],
              message: 'Use absolute @registry imports instead of relative parent imports in modules/. For example, use "@registry/modules/auth/types/user" instead of "../types/user".',
            },
          ],
        },
      ],
    },
  },

  // Src-specific rules: update internal patterns for perfectionist
  {
    name: 'src/allow-both-imports',
    files: ['src/**/*.{ts,tsx,vue}'],
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'alphabetical', order: 'asc' },
          newlinesBetween: 'never',
          internalPattern: ['^~/.*', '^@/.*', '^@registry/.*'],
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
        }
      ],
    },
  },
)
