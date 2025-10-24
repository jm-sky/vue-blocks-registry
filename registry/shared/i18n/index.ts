// shared/i18n/index.ts

export type { SupportedLocale } from '../config/config'
export { useLocale } from './composables/useLocale'
export type { ILocale } from './composables/useLocale'
export { createI18nInstance, defaultI18nOptions, i18n, LOCALE_LABELS, SUPPORTED_LOCALES } from './config/i18n'
