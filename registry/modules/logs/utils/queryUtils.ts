// modules/logs/utils/queryUtils.ts
import { HttpStatusCode } from 'axios'
import type { LogsFilter } from '@registry/modules/logs/types/logs.type'

export const logsQueryKeys = {
  all: ['logs'] as const,
  list: (filters?: LogsFilter) => [...logsQueryKeys.all, { ...(filters ?? {}) }] as const,
} as const

export function isClientError(error: unknown): boolean {
  const errorObj = error as { response?: { status?: number } }
  if (!errorObj.response) return false
  const status = errorObj.response.status
  const badRequest = HttpStatusCode.BadRequest as number
  const internalServerError = HttpStatusCode.InternalServerError as number
  return !!status && status >= badRequest && status < internalServerError
}

export function createLogsRetryFunction(maxAttempts = 2) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (failureCount: number, _error: unknown) => failureCount < maxAttempts
}

export function createLogsMutationRetryFunction(maxAttempts = 2) {
  return (failureCount: number, error: unknown) => {
    if (isClientError(error)) return false
    return failureCount < maxAttempts
  }
}

export const logsRetryFunction = createLogsRetryFunction()
export const logsMutationRetryFunction = createLogsMutationRetryFunction()


