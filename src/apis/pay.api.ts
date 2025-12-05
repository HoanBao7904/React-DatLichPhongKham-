import type { SuccessResponseApi1 } from 'src/types/utils.type'
import http from 'src/utils/http'

export type PayMent = {
  id: number
  amount: number
  paymentDate: string
  paymentMethod: string
  isDeposit: null
  status: string
  transactionId: string
  gatewayTransactionNo: null
  responseCode: null
  appointmentId: number
  paymentUrl: string
}

const apiPayment = {
  postPayment(body: { appointmentId: number; paymentMethod: string }) {
    return http.post<SuccessResponseApi1<PayMent>>('api/payments', body)
  }
}

export default apiPayment
