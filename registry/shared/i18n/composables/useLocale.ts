// shared/i18n/composables/useLocale.ts

import { LOCALE_STORAGE_KEY, type SupportedLocale } from '@registry/shared/config/config'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE_LABELS, SUPPORTED_LOCALES } from '../config/i18n'

export interface ILocale {
  code: SupportedLocale
  label: string
}

/**
 * Composable for managing application locale
 * Provides locale switching functionality with localStorage persistence
 */
export function useLocale() {
  const { locale, t } = useI18n()

  const currentLocale = computed<SupportedLocale>({
    get: () => locale.value as SupportedLocale,
    set: (newLocale: SupportedLocale) => {
      if (SUPPORTED_LOCALES.includes(newLocale)) {
        locale.value = newLocale
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', newLocale)
      }
    },
  })

  const availableLocales = computed<ILocale[]>(() =>
    SUPPORTED_LOCALES.map((locale: SupportedLocale) => ({
      code: locale,
      label: LOCALE_LABELS[locale],
    }))
  )

  const nextLocale = computed<ILocale>(() => {
    const currentIndex = SUPPORTED_LOCALES.indexOf(currentLocale.value)
    const nextIndex = (currentIndex + 1) % SUPPORTED_LOCALES.length
     
    return availableLocales.value[nextIndex] ?? availableLocales.value[0]
  })

  const setLocale = (newLocale: SupportedLocale) => {
    currentLocale.value = newLocale
  }

  const toggleLocale = () => {
    const currentIndex = SUPPORTED_LOCALES.indexOf(currentLocale.value)
    const nextIndex = (currentIndex + 1) % SUPPORTED_LOCALES.length
    currentLocale.value = SUPPORTED_LOCALES[nextIndex]
  }

  return {
    currentLocale,
    availableLocales,
    nextLocale,
    setLocale,
    toggleLocale,
    t,
  }
}
