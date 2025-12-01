export type Schedules = {
  id: number
  dayOfWeek: string
  startAt: string
  endAt: string
  active: boolean
  doctorId: number
  doctorName: string
}

export interface Appointment {
  id: number

  appointmentDateTime: string // "2025-09-22T14:30:00"
  note: string // ghi chú cuộc hẹn
  status: string // CONFIRMED | CANCELED | PENDING

  doctorId: number
  doctorFullName: string
  doctorDepartmentName: string
  doctorExperienceYears: number
  doctorImageUrl: string | null

  userId: number
  userFullName: string
  userEmail: string
  userPhone: string
}
export interface DoctorDetail {
  id: number
  fullName: string
  email: string
  phone: string
  description: string
  experienceYears: number

  departmentId: number
  departmentName: string

  imageUrl: string | null
  isFeatured: boolean
  active: boolean

  userId: number

  appointments: Appointment[]

  schedules: string[] // vì backend trả mảng string
  specializations: string[] // đang là array rỗng []
}

export interface DocterSearch {
  id: number
  userId: number
  fullName: string
  email: string
  phone: string
  experienceYears: number
  description: null
  imageUrl: null
  active: boolean
  isFeatured: boolean
  departmentId: null
  departmentName: null
  schedules: never[]
  specializations: never[]
  appointments: never[]
}

export interface DoctorSchedules {
  id: number
  dayOfWeek: string
  startAt: string
  endAt: string
  active: boolean
  doctorId: number
  doctorName: string
}
