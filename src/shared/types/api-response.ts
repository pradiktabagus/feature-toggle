export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  error?: {
    code: string
    details?: string
  }
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  success: false
  message: string
  error: {
    code: string
    details?: string
  }
}

export interface ApiSuccess<T = unknown> {
  success: true
  message: string
  data: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}