// Mock settings service for demo purposes
import type { ISettingsService, Settings, UpdateSettingsData } from '@registry/modules/settings/types/settings.type'

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let mockSettings: Settings = {
  darkMode: false,
  locale: 'en',
}

class MockSettingsService implements ISettingsService {
  async getSettings(): Promise<Settings> {
    await delay(200)
    return { ...mockSettings }
  }

  async updateSettings(data: UpdateSettingsData): Promise<Settings> {
    await delay(300)
    mockSettings = { ...mockSettings, ...data }
    return { ...mockSettings }
  }
}

export const mockSettingsService = new MockSettingsService()


