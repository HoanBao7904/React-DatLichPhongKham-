import type { DocterListFillConfig, DoctorDetailResponse, DoctorListResponse } from 'src/types/docter.type'

import http from 'src/utils/http'

const URL = 'api/doctors'
const DoctersApi = {
  getDocters(params: DocterListFillConfig) {
    return http.get<DoctorListResponse>(URL, {
      params
    })
  },
  getDoctersDetail(id: string) {
    return http.get<DoctorDetailResponse>(`${URL}/${id}`)
  }
}

export default DoctersApi
