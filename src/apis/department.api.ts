// import type { DepartMent, DepartMentFillConfig } from 'src/types/dePartMent.type'
import type { DepartMentDetailResponse, DepartMentFillConfig, DepartMentListResponse } from 'src/types/department.type'
import type {} from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'api/departments'
const DePartMentsApi = {
  getDepartment(params: DepartMentFillConfig) {
    return http.get<DepartMentListResponse>(URL, {
      params
    })
  },
  getDepartmentDetail(id: string) {
    return http.get<DepartMentDetailResponse>(`${URL}/${id}`)
  }
}
export default DePartMentsApi
