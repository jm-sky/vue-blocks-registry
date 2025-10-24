// Demo app i18n configuration
// This merges registry messages with demo-specific messages

import { createI18n } from 'vue-i18n'
import { config, LOCALE_STORAGE_KEY, type SupportedLocale } from '@registry/shared/config/config'
// Import registry messages (auth, common, validation, errors)
import registryEn from '@registry/shared/i18n/locales/en'
import registryPl from '@registry/shared/i18n/locales/pl'
// Import demo-specific messages (demo, dashboard)
import demoEn from './locales/en'
import demoPl from './locales/pl'
import type { I18nOptions } from 'vue-i18n'

// Merge registry and demo messages
const en = { ...registryEn, ...demoEn }
const pl = { ...registryPl, ...demoPl }

// Export merged type for type safety
export type Messages = typeof en

const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'pl']

/**
 * Get stored locale, browser preferred locale, or default from config
 */
const getStoredLocale = (): SupportedLocale => {
  // 1. Check localStorage
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale
  }

  // 2. Check browser preferred language
  const browserLanguages = navigator.languages.length > 0 ? navigator.languages : [navigator.language]
  for (const lang of browserLanguages) {
    const languageCode = lang.split('-')[0]?.toLowerCase()
    if (languageCode && SUPPORTED_LOCALES.includes(languageCode as SupportedLocale)) {
      return languageCode as SupportedLocale
    }
  }

  // 3. Use default from config
  return config.i18n.defaultLocale
}

// i18n configuration for demo app
const i18nOptions: I18nOptions<{ message: Messages}> = {
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

export const i18n = createI18n(i18nOptions)
