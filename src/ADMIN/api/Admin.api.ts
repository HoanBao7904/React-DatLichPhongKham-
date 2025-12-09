import type { SuccessResponseApi, SuccessResponseApi1 } from 'src/types/utils.type'
import http from 'src/utils/http'
import type { AllUser, schedules } from '../types/Admin.type'
import type { QueryConfig } from '../Pages/QlyKhachHang/QlyKhachHang'
import type { User } from 'src/types/user.type'
import type { Departments, DoctorAppointment, DoctorDepartment } from 'src/DOCTOR/types/doctor.type'
import type { QueryConfig1 } from '../Pages/AllDoctor/AllDoctor'
import type { RatingReview } from 'src/apis/rating.api'

const AllUserAPI = {
  getAllUser(params?: QueryConfig) {
    // Chuyển đổi params để phù hợp với Spring Boot
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<AllUser>>('/api/users', { params: springParams })
  },
  AddUserAPI(bodyuser: Omit<User, 'userId' | 'address' | 'createdAt' | 'Active' | 'role' | 'id' | 'active'>) {
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
  },
  XoaLichHen(id: string | number) {
    //new
    return http.delete(`/api/appointments/${id}`)
  }, //new
  UpdateLichHen(id: string | number, body: { status: string }) {
    return http.put(`/api/appointments/${id}`, body)
  },
  ViewLichHenUser(params?: QueryConfig) {
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<DoctorAppointment>>('api/appointments', { params: springParams })
  },
  putCancelAppointment(id: number) {
    return http.put<SuccessResponseApi1<DoctorAppointment>>(`api/appointments/${id}/cancel-user`)
  },
  getAppointment(id: number) {
    return http.get<SuccessResponseApi1<DoctorAppointment>>(`api/appointments/${id}`)
  },
  getAllDoctor(params?: QueryConfig1) {
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<DoctorDepartment>>('api/doctors', { params: springParams })
  },
  getViewSchedulesDoctor(id: number | string) {
    return http.get<SuccessResponseApi<schedules>>(`api/schedules/doctor/${id}`)
  },
  postScheludes(body: { doctorId: number; dayOfWeek: string; startAt: string; endAt: string }) {
    return http.post('/api/schedules', body)
  },
  deleteSchedules(id: number) {
    return http.delete(`api/schedules/${id}`)
  },
  getAllReview(params?: QueryConfig) {
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<RatingReview>>('api/reviews', { params: springParams })
  },
  deleteReview(id: number) {
    return http.delete(`api/reviews/${id}`)
  },
  getAllDoctorAdmin() {
    return http.get<SuccessResponseApi<DoctorDepartment>>('api/doctors')
  },
  patchSatus(id: number, body: { isActive: boolean }) {
    return http.patch<SuccessResponseApi1<DoctorDepartment>>(`api/doctors/${id}`, body)
  },
  deleteDoctorAdmin(id: number) {
    return http.delete(`api/doctors/${id}`)
  },
  putupdateDoctor(
    //lỗi
    id: number,
    body: {
      fullName: string
      email: string
      phone: string
      experienceYears: number
      description: string
      active: boolean
      departmentName: string
    }
  ) {
    return http.put<SuccessResponseApi<DoctorDepartment>>(`api/doctors/${id}`, body)
  },
  getDetailsDoctor(id: number) {
    return http.get<SuccessResponseApi1<DoctorDepartment>>(`api/doctors/${id}`)
  },
  getDepartment(params?: QueryConfig) {
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<Departments>>('api/departments', { params: springParams })
  },
  deleteDepartment(id: number) {
    return http.delete(`api/departments/manually/${id}`)
  },
  getDetailDepartment(id: number) {
    return http.get<SuccessResponseApi1<Departments>>(`api/departments/${id}`)
  },
  UpdateDepartMent(id: number, body: { name: string; description: string }) {
    return http.put(`api/departments/${id}`, body)
  },
  addDepartments(body: { name: string; description: string }) {
    return http.post('api/departments', body)
  }
}

export default AllUserAPI
