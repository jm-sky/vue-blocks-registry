// modules/settings/services/settingsService.ts
import { apiClient } from '@registry/shared/services/apiClient'
import type { ISettingsService, Settings, UpdateSettingsData } from '@registry/modules/settings/types/settings.type'

class SettingsService implements ISettingsService {
  async getSettings(): Promise<Settings> {
    const response = await apiClient.get<Settings>('/settings/me')
    return response.data
  }

  async updateSettings(data: UpdateSettingsData): Promise<Settings> {
    const response = await apiClient.patch<Settings>('/settings/me', data)
    return response.data
  }
}

export const settingsService = new SettingsService()


