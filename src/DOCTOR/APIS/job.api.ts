import type { SuccessResponseApi, SuccessResponseApi1 } from 'src/types/utils.type'
import http from 'src/utils/http'
import type { DoctorDetail } from '../types/Schedules.type'
import type { DoctorListResponse } from 'src/types/docter.type'
import type { DoctorAppointment, DoctorDepartment, DoctorListSchedules, ProfileDoctor } from '../types/doctor.type'
import type { QueryConfig } from 'src/ADMIN/Pages/QlyKhachHang/QlyKhachHang'

const URLShedules = 'api/doctors/me/schedules'
const URL1 = 'api/doctors'
const URLSearch = '/api/doctors/search'
const URLAppointment = 'api/doctors/me/appointments'
const URLProfileDoctor = 'api/doctors/me'
const URLDoctorDepartment = '/api/doctors/department'

const JobDoctor = {
  getSchedulesDoctor() {
    return http.get<DoctorListSchedules>(URLShedules)
  },
  getDetailsDoctor(id: string | number) {
    return http.get<SuccessResponseApi1<DoctorDetail>>(`${URL1}/${id}`)
  },
  GetDoctorsSearch(keyword: string) {
    return http.get<DoctorListResponse>(URLSearch, {
      params: { keyword }
    })
  },
  GetDoctorsAppointment(params?: QueryConfig) {
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<DoctorAppointment>>(URLAppointment, { params: springParams })
  },
  GetProfileDoctor() {
    return http.get<SuccessResponseApi1<ProfileDoctor>>(URLProfileDoctor)
  },
  GetAllDoctorDepartment(id: string) {
    return http.get<SuccessResponseApi<DoctorDepartment>>(URLDoctorDepartment, {
      params: id
    })
  }
}

export default JobDoctor
