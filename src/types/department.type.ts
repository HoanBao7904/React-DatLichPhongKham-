/* eslint-disable @typescript-eslint/no-unused-expressions */
export interface DepartMentListResponse {
  operationType: string
  message: string
  code: string
  data: DepartMent[]
  size: number
  totalElements: number
  totalPages: number
  page: number
  pageSize: number
  'thời gian': string
}

export interface DepartMent {
  id: number
  name: string
  description: string
  active: boolean
  createdAt: string | null
  updatedAt: string | null
}

export interface DepartMentDetailResponse {
  operationType: string
  message: string
  code: string
  data: DepartMent // 👈 1 phòng ban
  'thời gian': string
}

// export interface DepartMentFillConfig {
//   id?: number
//   name?: boolean
// }
