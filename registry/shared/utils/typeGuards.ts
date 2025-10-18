// shared/utils/typeGuards.ts
import { HttpStatusCode, type AxiosError, type AxiosResponse } from 'axios'

export interface ValidationErrorResponse {
  errors: Record<string, string[]>
}

export type ValidationError = AxiosError<ValidationErrorResponse> & {
  response: AxiosResponse<ValidationErrorResponse>
}

export function isValidationError(err: any): err is ValidationError {
  return err?.response?.status === HttpStatusCode.UnprocessableEntity && !!err.response.data?.errors
}
