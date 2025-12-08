export type QueryConfig = {
  page?: string
  size?: string
  totalElements?: string
  totalPages?: string
  [key: string]: string | undefined
}

export type Appointment = {
  id: number
  doctorFullName: string
  appointmentDateTime: string
  status: string
  note?: string
  doctorId: number
  doctorDepartmentName: string
  doctorExperienceYears: number
  doctorImageUrl?: string | null
}

export interface ReviewModalData {
  appointmentId: number
  doctorId: number
  doctorName: string
}

export interface UserReview {
  id: number
  rating: number
  comment: string
  createAt: string
  active: boolean
  userName: string
  doctorName: string
}

export interface PaymentModalData {
  appointmentId: number
  doctorName: string
  appointmentDateTime: string
}

export interface AppointmentStatsProps {
  data: Appointment[]
  userReviewsCount: number
}

export interface AppointmentItemProps {
  appointment: Appointment
  hasReviewedDoctor: (doctorId: number) => boolean
  getUserReviewForDoctor: (doctorId: number) => UserReview | undefined
  handleOpenPaymentModal: (appointment: Appointment) => void
  handleOpenReviewModal: (appointmentId: number, doctorId: number, doctorName: string) => void
  onclickCancel: (id: number) => void
}

export interface AppointmentListProps {
  appointments: Appointment[]
  queryConfig: QueryConfig
  totalPages: number
  hasReviewedDoctor: (doctorId: number) => boolean
  getUserReviewForDoctor: (doctorId: number) => UserReview | undefined
  handleOpenPaymentModal: (appointment: Appointment) => void
  handleOpenReviewModal: (appointmentId: number, doctorId: number, doctorName: string) => void
  onclickCancel: (id: number) => void
}

export interface PaymentModalProps {
  show: boolean
  paymentData: PaymentModalData | null
  qrCodeUrl: string
  paymentAmount: number
  checkingStatus: 'waiting' | 'checking' | 'success' | 'failed'
  checkMessage: string
  isCreating: boolean
  onClose: () => void
  onCreatePayment: () => void
}

export interface ReviewModalProps {
  show: boolean
  reviewData: ReviewModalData | null
  rating: number
  comment: string
  isSubmitting: boolean
  onClose: () => void
  onRatingChange: (rating: number) => void
  onCommentChange: (comment: string) => void
  onSubmit: () => void
}
