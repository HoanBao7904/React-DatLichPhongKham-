export interface SuccessResponseApi<Data> {
  operationType: string
  message: string
  code: string
  data?: Data[]
  size: number
  'thời gian': string
  page?: number
  pageSize?: number
  totalElements?: number
  totalPages?: number
}

export interface SuccessResponseApi1<Data> {
  operationType: string
  message: string
  code: string
  data?: Data
  size: number
  thời_gian: string
  page?: number
  pageSize?: number
  totalElements?: number
  totalPages?: number
}

// export interface ErrorResponseApi
export interface ErrorResponseAPI<T = { email?: string; userName?: string }> {
  code: string
  details: T
  domain: string
  message: string
  operationType: string
  thời_gian: string
}

export interface ErrorResponseAPI1<
  T = { email?: string; userName?: string; fullName?: string; phone: string; password: string; dateOfBirth: Date }
> {
  code: string
  details: T
  domain: string
  message: string
  operationType: string
  thời_gian: string
}
