// modules/settings/utils/queryUtils.ts
import { HttpStatusCode } from 'axios'

export const settingsQueryKeys = {
  all: ['settings'] as const,
  me: () => [...settingsQueryKeys.all, 'me'] as const,
} as const

export function isAuthError(error: unknown): boolean {
  const errorObj = error as { response?: { status?: number } }
  if (!errorObj.response) return false
  const status = errorObj.response.status
  return status === HttpStatusCode.Unauthorized || status === HttpStatusCode.Forbidden
}

export function isClientError(error: unknown): boolean {
  const errorObj = error as { response?: { status?: number } }
  if (!errorObj.response) return false
  const status = errorObj.response.status
  const badRequest = HttpStatusCode.BadRequest as number
  const internalServerError = HttpStatusCode.InternalServerError as number
  return !!status && status >= badRequest && status < internalServerError
}

export function createSettingsRetryFunction(maxAttempts = 2) {
  return (failureCount: number, error: unknown) => {
    if (isAuthError(error)) return false
    return failureCount < maxAttempts
  }
}

export function createSettingsMutationRetryFunction(maxAttempts = 2) {
  return (failureCount: number, error: unknown) => {
    if (isClientError(error)) return false
    return failureCount < maxAttempts
  }
}

export const settingsRetryFunction = createSettingsRetryFunction()
export const settingsMutationRetryFunction = createSettingsMutationRetryFunction()


