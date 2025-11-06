// modules/logs-management/types/logs.type.ts
import type { TDateTime, TULID } from '@registry/shared/types/base.type'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export interface LogEntry {
  id: TULID
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  timestamp: TDateTime
}

export interface LogsFilter {
  level?: LogLevel
  query?: string
}


