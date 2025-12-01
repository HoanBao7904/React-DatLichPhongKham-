export interface DoctorSchedules {
  id: number
  dayOfWeek: string
  startAt: string
  endAt: string
  active: boolean
  doctorId: number
  doctorName: string
}

export interface DoctorListSchedules {
  operationType: string
  message: string
  code: string
  data: DoctorSchedules[] // 👈 ĐÂY LÀ MẢNG SCHEDULES
  size: number
  'thời gian': string
}

export interface DoctorAppointment {
  id: number
  appointmentDateTime: string
  status: string
  note: string
  userId: number
  userFullName: string
  userEmail: string
  userPhone: string
  doctorId: number
  doctorFullName: string
  doctorDepartmentName: string
  doctorImageUrl: null
  doctorExperienceYears: number
}
export interface ProfileDoctor {
  id: number
  userId: number
  fullName: string
  email: string
  phone: string
  experienceYears: number
  description: string
  imageUrl: null
  active: boolean
  isFeatured: boolean
  departmentId: number
  departmentName: string
  schedules: string[]
  specializations: never[]
}

export interface DoctorDepartment {
  id: number
  userId: number
  fullName: string
  email: string
  phone: string
  experienceYears: number
  description: string
  imageUrl: null
  active: boolean
  isFeatured: boolean
  departmentId: number
  departmentName: string
  schedules: never[]
  specializations: never[]
  appointments: never[]
}
