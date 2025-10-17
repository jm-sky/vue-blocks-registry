// shared/utils/typeGuards.ts
import { HttpStatusCode, type AxiosError } from 'axios'

export interface ValidationErrorResponse {
  errors: Record<string, string[]>
}

export type ValidationError = AxiosError<ValidationErrorResponse>

export function isValidationError(err: any): err is ValidationError {
  return err?.response?.status === HttpStatusCode.UnprocessableEntity && !!err.response.data?.errors
}
