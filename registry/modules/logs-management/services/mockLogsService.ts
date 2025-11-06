// Mock logs service for demo purposes
import type { LogEntry, LogLevel, LogsFilter } from '@registry/modules/logs-management/types/logs.type'

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const levels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal']

function generateMockLogs(count = 50): LogEntry[] {
  const now = Date.now()
  const logs: LogEntry[] = []
  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lvl = levels[Math.floor(Math.random() * levels.length)]!
    logs.push({
      id: `log_${i.toString().padStart(4, '0')}`,
      level: lvl,
      message: `Sample ${lvl.toUpperCase()} message #${i}`,
      timestamp: new Date(now - i * 1000 * 30).toISOString(),
    })
  }
  return logs
}

const mockLogs = generateMockLogs(120)

class MockLogsService {
  async getLogs(filters: LogsFilter = {}): Promise<LogEntry[]> {
    await delay(250)
    let result = [...mockLogs]
    if (filters.level) {
      result = result.filter(l => l.level === filters.level)
    }
    if (filters.query) {
      const q = filters.query.toLowerCase()
      result = result.filter(l => l.message.toLowerCase().includes(q))
    }
    return result
  }
}

export const mockLogsService = new MockLogsService()


