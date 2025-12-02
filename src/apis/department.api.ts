import type { DoctorDepartment } from 'src/DOCTOR/types/doctor.type'
import type { DepartMentDetailResponse, DepartMentListResponse } from 'src/types/department.type'
import type { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'api/departments'
const DePartMentsApi = {
  getDepartment() {
    return http.get<DepartMentListResponse>(URL)
  },
  getDepartmentDetail(id: string) {
    return http.get<DepartMentDetailResponse>(`${URL}/${id}`)
  },
  getdoctorDepartment(id: string) {
    return http.get<SuccessResponseApi<DoctorDepartment>>('api/doctors/department', { params: { id } })
  }
}
export default DePartMentsApi
