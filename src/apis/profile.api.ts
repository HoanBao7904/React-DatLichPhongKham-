import type { User } from 'src/types/user.type'
import type { SuccessResponseApi1 } from 'src/types/utils.type'
import http from 'src/utils/http'

// interface bodyupdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
//   password?: string
//   newPassword?: string
// }

export interface updateProfice {
  fullName: string
  email: string
  phone: string
  userName: string
  address: string
  dateOfBirth: string // Date trong backend → Date hoặc null
}

const userAPI = {
  getProfile() {
    return http.get<SuccessResponseApi1<User>>('api/users/me')
  },
  updateProfile(body: updateProfice) {
    return http.put<SuccessResponseApi1<User>>('api/users/profile', body)
  }
}

export default userAPI
