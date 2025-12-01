import type { AppointmentUser, DoctorDetailResponse, DoctorListResponse } from 'src/types/docter.type'
import type { SuccessResponseApi } from 'src/types/utils.type'
import type { QueryConfig } from 'src/ADMIN/Pages/QlyKhachHang/QlyKhachHang'
import http from 'src/utils/http'
import type { DoctorAppointment } from 'src/DOCTOR/types/doctor.type'

const URL = 'api/doctors'
const URLDatLich = 'api/appointments'
const URLAppointment = 'api/appointments/me'
const DoctersApi = {
  getDocters() {
    return http.get<DoctorListResponse>(URL)
  },
  getDoctersDetail(id: string) {
    return http.get<DoctorDetailResponse>(`${URL}/${id}`)
  },
  postAppointmentUser(body: { appointmentDateTime: string; note?: string; doctorId: number; userId: number }) {
    return http.post<SuccessResponseApi<AppointmentUser>>(URLDatLich, body)
  },
  GetDoctorsAppointment(params?: QueryConfig) {
    const springParams = {
      page: params?.page ? parseInt(params.page) - 1 : 0, // Spring Boot bắt đầu từ 0
      size: params?.size || '10'
    }
    return http.get<SuccessResponseApi<DoctorAppointment>>(URLAppointment, { params: springParams })
  }
}

export default DoctersApi
