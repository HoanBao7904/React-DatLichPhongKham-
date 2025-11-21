export type Role = 'USER' | 'ADMIN' | 'DOCTOR' | 'EMPLOYEE' // Thêm string để linh hoạt

export interface User {
  userId: number // Integer trong backend → number trong frontend
  fullName: string
  email: string
  phone: string
  userName: string
  address: string
  dateOfBirth: Date // Date trong backend → Date hoặc null
  createdAt: Date
  Active: boolean
  role: Role
}

export interface RegisterBody {
  fullName: string
  email: string
  phone: string
  userName: string
  password: string
}

export interface paginate {
  size?: number | string
  totalElements?: number | string
  totalPages?: number | string
  page?: number | string
}
