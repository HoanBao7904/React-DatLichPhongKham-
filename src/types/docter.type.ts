/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Doctor {
  id: number
  userId: number
  fullName: string
  email: string
  phone: string
  experienceYears: number
  description: string | null
  imageUrl: string | null
  active: boolean
  isFeatured: boolean
  departmentId: number | null // <-- CHO PHÉP null
  departmentName: string | null // <-- CHO PHÉP null
  schedules: string[]
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

export interface AppointmentUser {
  id: number
  appointmentDateTime: string
  status: string
  note: null
  userId: number
  userFullName: string
  userEmail: string
  userPhone: string
  doctorId: number
  doctorFullName: string
  doctorDepartmentName: string
  doctorImageUrl: string | null
  doctorExperienceYears: number
}
