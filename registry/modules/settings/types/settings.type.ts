// modules/settings/types/settings.ts

import type { SupportedLocale } from '@registry/shared/i18n'

export type Theme = 'light' | 'dark'

export interface Settings {
  darkMode: boolean
  locale: SupportedLocale
}

export interface UpdateSettingsData {
  darkMode?: boolean
  locale?: SupportedLocale
}

export interface ISettingsService {
  getSettings(): Promise<Settings>
  updateSettings(data: UpdateSettingsData): Promise<Settings>
}
