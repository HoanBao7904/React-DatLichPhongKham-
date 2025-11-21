import type { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import type { AllUser } from '../types/Admin.type'
import type { QueryConfig } from '../Pages/QlyKhachHang/QlyKhachHang'

const AllUserAPI = {
  getAllUser(params?: QueryConfig) {
    // Chuyển đổi params để phù hợp với Spring Boot
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<AllUser>>('/api/users', { params: springParams })
  }
}

export default AllUserAPI
