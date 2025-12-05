import type { SuccessResponseApi, SuccessResponseApi1 } from 'src/types/utils.type'
import http from 'src/utils/http'
export type RatingReview = {
  id: number
  rating: number
  comment: string
  createAt: string
  active: boolean
  userName: string
  doctorName: string
}

const apiRaiting = {
  getAllReviewByDoctorId(id: number) {
    return http.get<SuccessResponseApi<RatingReview>>(`/api/reviews/doctor/${id}`)
  },
  postReviewUser(body: { rating: number; comment?: string; doctorId: number }) {
    return http.post<SuccessResponseApi1<RatingReview>>('/api/reviews/me', body)
  },
  updateReviewUSer(body: { rating: number; comment?: string }, id: number) {
    return http.put(`/api/reviews/me/${id}`, body)
  },
  deleteReview(id: number) {
    return http.delete(`api/reviews/me/${id}`)
  },
  getAllReviewMe() {
    return http.get<SuccessResponseApi<RatingReview>>('/api/reviews/me')
  }
}

export default apiRaiting
