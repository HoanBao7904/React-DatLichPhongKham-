import type { SuccessResponseApi, SuccessResponseApi1 } from 'src/types/utils.type'
import http from 'src/utils/http'
import type { AllUser } from '../types/Admin.type'
import type { QueryConfig } from '../Pages/QlyKhachHang/QlyKhachHang'
import type { User } from 'src/types/user.type'

// interface active {
//   active: boolean
// }

const AllUserAPI = {
  getAllUser(params?: QueryConfig) {
    // Chuyển đổi params để phù hợp với Spring Boot
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<AllUser>>('/api/users', { params: springParams })
  },
  AddUserAPI(bodyuser: Omit<User, 'userId' | 'address' | 'createdAt' | 'Active' | 'role'>) {
    return http.post<User>('/api/users', bodyuser)
  },
  updateUserAPI(id: string | number, user: Omit<User, 'userId' | 'createdAt' | 'role' | 'active' | 'password'>) {
    return http.patch(`/api/users/${id}`, user)
  },
  deleteUserAPI(id: string | number) {
    return http.delete(`/api/users/manually/${id}`)
  },
  getUser(id: number | string) {
    return http.get<SuccessResponseApi1<User>>(`/api/users/${id}`)
  },
  CapNhapAction(active: boolean, id: string | number) {
    const body = { active: active }
    return http.patch<SuccessResponseApi1<User>>(`/api/users/${id}/status`, body)
  },
  CapNhapRole(body: { userId: number; roleId: number }) {
    return http.post<SuccessResponseApi1<User>>('/api/users/assign-role', body)
  }
}

export default AllUserAPI
