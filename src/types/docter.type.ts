/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Doctor {
  id: number
  userId: number
  fullName: string
  email: string
  phone: string
  experienceYears: number
  description: string
  imageUrl: string | null
  active: boolean
  isFeatured: boolean
  departmentId: number
  departmentName: string
  schedules: any[]
  specializations: any[]
  appointments: any[]
}

export interface DoctorListResponse {
  operationType: string
  message: string
  code: string
  data: Doctor[] // 👈 MẢNG DOCTOR
  size: number
  totalElements: number
  totalPages: number
  page: number
  pageSize: number
  'thời gian': string
}

export interface DoctorDetailResponse {
  operationType: string
  message: string
  code: string
  data: Doctor // 👈 1 doctor
  'thời gian': string
}

export interface DocterListFillConfig {
  id?: number
  isFeatured?: boolean
  departmentName?: string
  departmentId?: number
}
