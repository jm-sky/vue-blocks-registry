// shared/utils/typeGuards.ts
import { type AxiosError, type AxiosResponse, HttpStatusCode, isAxiosError } from 'axios'

export interface ValidationErrorResponse {
  errors: Record<string, string[]>
}

export type ValidationError = AxiosError<ValidationErrorResponse> & {
  response: AxiosResponse<ValidationErrorResponse>
}

export function isValidationError(err: unknown): err is ValidationError {
  return isAxiosError(err) && err.response?.status === HttpStatusCode.UnprocessableEntity && !!err.response.data?.errors
}
