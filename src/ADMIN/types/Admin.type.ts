export interface AllUser {
  userId: number
  fullName: string
  email: string
  phone: string
  userName: string
  address: null
  dateOfBirth: null
  createdAt: null
  role: string
  active: boolean
}

export interface schedules {
  id: number
  dayOfWeek: string
  startAt: string
  endAt: string
  active: boolean
  doctorId: number
  doctorName: string
}
