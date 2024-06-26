export interface ErrorState {
  status?: number
  message?: string
  code?: number
  errors?: Record<string, string[]>
  error?: {
    message: string;
    code: number | string;
  };
}

export interface ErrorResponse {
  message: string
  code: number
}