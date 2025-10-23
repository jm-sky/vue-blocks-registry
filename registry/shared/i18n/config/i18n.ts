// shared/i18n/config/i18n.ts

import { config, LOCALE_STORAGE_KEY } from '@registry/shared/config/config'
import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import pl from '../locales/pl.json'
import type { I18n, I18nOptions } from 'vue-i18n'

export type SupportedLocale = 'en' | 'pl'

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'pl']

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'English',
  pl: 'Polski',
}

// Get stored locale or use default from config
const getStoredLocale = (): SupportedLocale => {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale
  }
  return config.i18n.defaultLocale
}

// Default i18n configuration
export const defaultI18nOptions: I18nOptions = {
  legacy: false, // Use Composition API mode
  locale: getStoredLocale(),
  fallbackLocale: config.i18n.fallbackLocale,
  messages: {
    en,
    pl,
  },
  globalInjection: true,
  missingWarn: import.meta.env.DEV,
  fallbackWarn: import.meta.env.DEV,
}

/**
 * Create i18n instance with custom options
 * @param options - Custom i18n options to override defaults
 */
export function createI18nInstance(options?: Partial<I18nOptions>): I18n {
  return createI18n({
    ...defaultI18nOptions,
    ...options,
  })
}

/**
 * Default i18n instance for the app
 */
export const i18n = createI18nInstance()
