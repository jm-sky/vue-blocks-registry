// modules/logs-management/services/logsService.ts
import { apiClient } from '@registry/shared/services/apiClient'
import type { LogEntry, LogsFilter } from '@registry/modules/logs-management/types/logs.type'

class LogsService {
  async getLogs(filters: LogsFilter = {}): Promise<LogEntry[]> {
    const response = await apiClient.get<LogEntry[]>('/logs', { params: filters })
    return response.data
  }
}

export const logsService = new LogsService()


