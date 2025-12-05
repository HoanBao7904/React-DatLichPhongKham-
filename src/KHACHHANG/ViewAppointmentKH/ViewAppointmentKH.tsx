import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import DoctersApi from 'src/apis/docter.api'
import apiRating from 'src/apis/rating.api'
import Paginate from 'src/components/Paginate'
import useQueryParam from 'src/hooks/useQueryParam'
import ProductRating from 'src/components/ProductRating'
import apiPayment, { type PayMent } from 'src/apis/pay.api'

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
}

interface ReviewModalData {
  appointmentId: number
  doctorId: number
  doctorName: string
}

interface UserReview {
  id: number
  rating: number
  comment: string
  createAt: string
  active: boolean
  userName: string
  doctorName: string
}

interface PaymentModalData {
  appointmentId: number
  doctorName: string
  appointmentDateTime: string
}

export default function ViewAppointmentKH() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      size: queryParams.size || '5'
    },
    isUndefined
  )
  const queryClient = useQueryClient() //làm mới dữ liệu

  // State cho đánh giá
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewData, setReviewData] = useState<ReviewModalData | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [userReviews, setUserReviews] = useState<UserReview[]>([])

  // State cho thanh toán
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentModalData | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [paymentAmount, setPaymentAmount] = useState<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentInfo, setPaymentInfo] = useState<PayMent | null>(null)
  const [checkInterval, setCheckInterval] = useState<NodeJS.Timeout | null>(null)
  const [checkingStatus, setCheckingStatus] = useState<'waiting' | 'checking' | 'success' | 'failed'>('waiting')
  const [checkMessage, setCheckMessage] = useState('')

  const { data } = useQuery({
    queryKey: ['api/appointments/me', queryConfig],
    queryFn: () => DoctersApi.GetDoctorsAppointment(queryConfig)
  })

  const cancelAppointment = useMutation({
    mutationFn: (id: number) => AllUserAPI.putCancelAppointment(id),
    onSuccess: (_, id) => {
      toast.success(`Hủy cuộc hẹn thành công id:${id}`)
      queryClient.invalidateQueries({
        queryKey: ['api/appointments/me']
      })
    },
    onError: () => {
      toast.error(`Hủy lịch hẹn thất bại`)
    }
  })

  const createPaymentMutation = useMutation({
    mutationFn: apiPayment.postPayment,
    onSuccess: (response) => {
      if (response.data?.data) {
        const paymentData = response.data.data
        toast.success('Đã tạo mã QR thanh toán!')

        setPaymentAmount(paymentData.amount)
        setQrCodeUrl(paymentData.paymentUrl)
        setPaymentInfo(paymentData)

        // Reset trạng thái check
        setCheckingStatus('waiting')
        setCheckMessage('')

        // Bắt đầu kiểm tra sau 20 giây
        setTimeout(() => {
          startCheckingPayment(paymentData)
        }, 20000)
      }
    },
    onError: (error) => {
      toast.error(`Tạo thanh toán thất bại: ${error.message || 'Có lỗi xảy ra'}`)
    }
  })

  const postReview = useMutation({
    mutationFn: (reviewData: { rating: number; comment: string; doctorId: number }) =>
      apiRating.postReviewUser(reviewData),
    onSuccess: (response) => {
      toast.success('Đánh giá thành công!')
      setShowReviewModal(false)
      setRating(5)
      setComment('')

      if (response?.data?.data) {
        setUserReviews((prev) => [...prev, response.data.data as UserReview])
      }

      queryClient.invalidateQueries({
        queryKey: ['api/appointments/me']
      })
    },
    onError: () => {
      toast.error('Đánh giá thất bại')
    }
  })

  const dataAppointment = data?.data
  const totalPages = data?.data.totalPages || 1

  // Hàm format date
  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'PAID':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Đã xác nhận'
      case 'PENDING':
        return 'Chờ thanh toán'
      case 'CANCELLED':
        return 'Đã hủy'
      case 'COMPLETED':
        return 'Đã hoàn thành'
      case 'PAID':
        return 'Đã thanh toán'
      default:
        return status
    }
  }

  // Hàm kiểm tra đã đánh giá bác sĩ
  const hasReviewedDoctor = (doctorId: number): boolean => {
    return userReviews.some((review) => review.id === doctorId)
  }

  // Hàm lấy đánh giá của user cho bác sĩ
  const getUserReviewForDoctor = (doctorId: number): UserReview | undefined => {
    return userReviews.find((review) => review.id === doctorId)
  }

  const onclickCancel = (id: number) => {
    cancelAppointment.mutate(id)
  }

  //  HÀM XỬ LÝ THANH TOÁN
  const handleOpenPaymentModal = (appointment: Appointment) => {
    setPaymentData({
      appointmentId: appointment.id,
      doctorName: appointment.doctorFullName,
      appointmentDateTime: appointment.appointmentDateTime
    })

    // Reset state
    setQrCodeUrl('')
    setPaymentAmount(0)
    setPaymentInfo(null)
    setCheckingStatus('waiting')
    setCheckMessage('')

    setShowPaymentModal(true)
  }

  const handleCreatePayment = () => {
    if (!paymentData) return

    createPaymentMutation.mutate({
      appointmentId: paymentData.appointmentId,
      paymentMethod: 'BANK_TRANSFER'
    })
  }

  // const checkPaymentStatus = async (paymentInfo: PayMent) => {
  //   try {
  //     const response = await fetch(
  //       `https://script.google.com/macros/s/AKfycbx5gKpCnQPUhYP3yBYdyeqLyLRi0-7RimRs_5gjPaz3Qrd-iwXhqiuXHW0ZQoltsXE/exec`
  //     )

  //     const data = await response.json()

  //     if (data.data && data.data.length > 0) {
  //       const searchContent = `COCLK${paymentInfo.appointmentId}`

  //       // CHECK TẤT CẢ GIAO DỊCH
  //       for (const transaction of data.data) {
  //         const transactionAmount = transaction['Giá trị']
  //         const transactionDescription = transaction['Mô tả']

  //         // Kiểm tra cả số tiền VÀ nội dung
  //         if (transactionAmount >= paymentInfo.amount && transactionDescription.includes(searchContent)) {
  //           // Cập nhật trạng thái thành công
  //           setCheckingStatus('success')
  //           setCheckMessage('Thanh toán thành công!')

  //           toast.success(`Thanh toán thành công cho cuộc hẹn #${paymentInfo.appointmentId}`)

  //           // Cập nhật UI sau 2 giây
  //           setTimeout(() => {
  //             setShowPaymentModal(false)
  //             queryClient.invalidateQueries({
  //               queryKey: ['api/appointments/me']
  //             })
  //           }, 2000)

  //           return true
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Lỗi khi kiểm tra thanh toán:', error)
  //   }
  //   return false
  // }
  const checkPaymentStatus = async (paymentInfo: PayMent): Promise<'success' | 'pending' | 'failed'> => {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbx5gKpCnQPUhYP3yBYdyeqLyLRi0-7RimRs_5gjPaz3Qrd-iwXhqiuXHW0ZQoltsXE/exec`
      )

      if (!response.ok) {
        console.error('Lỗi khi gọi API kiểm tra thanh toán')
        return 'pending'
      }

      const data = await response.json()

      if (data.data && data.data.length > 0) {
        const searchContent = `COCLK${paymentInfo.appointmentId}`

        // CHECK TẤT CẢ GIAO DỊCH
        for (const transaction of data.data) {
          const transactionAmount = transaction['Giá trị']
          const transactionDescription = transaction['Mô tả']

          // Kiểm tra cả số tiền VÀ nội dung
          if (transactionAmount >= paymentInfo.amount && transactionDescription.includes(searchContent)) {
            // Cập nhật trạng thái thành công
            setCheckingStatus('success')
            setCheckMessage('✅ Thanh toán thành công!')

            toast.success(`Thanh toán thành công cho cuộc hẹn #${paymentInfo.appointmentId}`)

            // Cập nhật UI sau 2 giây
            setTimeout(() => {
              setShowPaymentModal(false)
              queryClient.invalidateQueries({
                queryKey: ['api/appointments/me']
              })
            }, 2000)

            return 'success'
          }
        }

        // Không tìm thấy giao dịch phù hợp
        return 'pending'
      }

      // Không có dữ liệu giao dịch
      return 'pending'
    } catch (error) {
      console.error('Lỗi khi kiểm tra thanh toán:', error)
      return 'pending'
    }
  }

  // const startCheckingPayment = (paymentInfo: PayMent) => {
  //   // Dừng interval cũ nếu có
  //   if (checkInterval) {
  //     clearInterval(checkInterval)
  //   }

  //   setCheckingStatus('checking')
  //   setCheckMessage('Đang kiểm tra thanh toán...')

  //   const interval = setInterval(async () => {
  //     const isPaid = await checkPaymentStatus(paymentInfo)
  //     if (isPaid) {
  //       clearInterval(interval)
  //       setCheckInterval(null)
  //     }
  //   }, 5000) // Check mỗi 5 giây

  //   setCheckInterval(interval)

  //   // Tự động dừng sau 10 phút
  //   setTimeout(() => {
  //     if (checkInterval) {
  //       clearInterval(checkInterval)
  //       setCheckInterval(null)
  //       if (checkingStatus !== 'success') {
  //         setCheckingStatus('failed')
  //         setCheckMessage('⏰ Đã dừng kiểm tra sau 10 phút')
  //         toast.info('Đã dừng kiểm tra thanh toán sau 10 phút')
  //       }
  //     }
  //   }, 600000) // 10 phút
  // }
  const startCheckingPayment = (paymentInfo: PayMent) => {
    // Dừng interval cũ nếu có
    if (checkInterval) {
      clearInterval(checkInterval)
    }

    setCheckingStatus('checking')
    setCheckMessage('Đang kiểm tra thanh toán...')

    let checkCount = 0
    const maxChecks = 6 // 6 lần * 5 giây = 30 giây
    const checkIntervalMs = 5000 // 5 giây

    const interval = setInterval(async () => {
      checkCount++

      // Cập nhật thời gian còn lại
      const remainingSeconds = (maxChecks - checkCount) * 5
      setCheckMessage(`Đang kiểm tra... (Còn lại: ${remainingSeconds}s)`)

      // Kiểm tra thanh toán
      const status = await checkPaymentStatus(paymentInfo)

      if (status === 'success') {
        clearInterval(interval)
        setCheckInterval(null)
        return
      }

      // Nếu đã kiểm tra đủ số lần
      if (checkCount >= maxChecks) {
        clearInterval(interval)
        setCheckInterval(null)

        setCheckingStatus('failed')
        setCheckMessage('Hết thời gian kiểm tra (30 giây)')

        toast.error('Không phát hiện thanh toán trong 30 giây!', {
          position: 'top-right',
          autoClose: 5000
        })
      }
    }, checkIntervalMs)

    setCheckInterval(interval)
  }
  const handleClosePaymentModal = () => {
    // Dừng interval nếu có
    if (checkInterval) {
      clearInterval(checkInterval)
      setCheckInterval(null)
    }

    // Reset tất cả state
    setCheckingStatus('waiting')
    setCheckMessage('')
    setShowPaymentModal(false)
  }

  //  HÀM XỬ LÝ ĐÁNH GIÁ
  const handleOpenReviewModal = (appointmentId: number, doctorId: number, doctorName: string) => {
    const userReview = getUserReviewForDoctor(doctorId)

    if (!userReview) {
      setReviewData({ appointmentId, doctorId, doctorName })
      setRating(5)
      setComment('')
      setShowReviewModal(true)
    }
  }

  const handleSubmitReview = () => {
    if (!reviewData) return

    if (rating < 1 || rating > 5) {
      toast.error('Vui lòng chọn số sao từ 1 đến 5')
      return
    }

    if (!comment.trim()) {
      toast.error('Vui lòng nhập nội dung đánh giá')
      return
    }

    if (comment.trim().length < 10) {
      toast.error('Nội dung đánh giá phải có ít nhất 10 ký tự')
      return
    }

    const reviewPayload = {
      rating,
      comment: comment.trim(),
      doctorId: reviewData.doctorId
    }

    postReview.mutate(reviewPayload)
  }

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval)
      }
    }
  }, [checkInterval])

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Lịch hẹn của tôi</h1>
          <p className='mt-2 text-sm text-gray-600'>Tổng số: {dataAppointment?.data?.length ?? 0} lịch hẹn</p>
        </div>

        {/* Thống kê nhanh */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>Đã xác nhận</div>
            <div className='text-2xl font-bold text-green-600'>
              {dataAppointment?.data?.filter((item) => item.status === 'CONFIRMED').length}
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>Chờ thanh toán</div>
            <div className='text-2xl font-bold text-yellow-600'>
              {dataAppointment?.data?.filter((item) => item.status === 'PENDING').length}
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>Đã hoàn thành</div>
            <div className='text-2xl font-bold text-blue-600'>
              {dataAppointment?.data?.filter((item) => item.status === 'COMPLETED').length}
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>Đã đánh giá</div>
            <div className='text-2xl font-bold text-purple-600'>{userReviews.length}</div>
            <div className='text-xs text-gray-500 mt-1'>
              {userReviews.length} / {dataAppointment?.data?.filter((item) => item.status === 'COMPLETED').length} hoàn
              thành
            </div>
          </div>
        </div>

        {/* Danh sách lịch hẹn */}
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Danh sách lịch hẹn</h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>Thông tin chi tiết các cuộc hẹn của bạn với bác sĩ</p>
          </div>

          <div className='divide-y divide-gray-200'>
            {dataAppointment?.data?.map((appointment) => {
              const { date, time } = formatDate(appointment.appointmentDateTime)
              const hasReviewed = hasReviewedDoctor(appointment.doctorId)
              const userReview = getUserReviewForDoctor(appointment.doctorId)

              return (
                <div key={appointment.id} className='px-4 py-5 sm:px-6 hover:bg-gray-50 transition-colors duration-150'>
                  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                    {/* Thông tin chính */}
                    <div className='flex-1'>
                      <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center space-x-3'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}
                          >
                            {getStatusText(appointment.status)}
                          </span>
                          <span className='text-sm text-gray-500'>ID: #{appointment.id}</span>
                        </div>
                        <div className='text-right'>
                          <div className='text-lg font-semibold text-gray-900'>{date}</div>
                          <div className='text-sm text-gray-500'>{time}</div>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Thông tin cuộc hẹn */}
                        <div className='space-y-2'>
                          <h4 className='text-sm font-medium text-gray-900'>Thông tin cuộc hẹn</h4>
                          <div className='space-y-1 text-sm text-gray-600'>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Ngày:</span>
                              <span className='font-semibold'>{date}</span>
                            </div>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Giờ:</span>
                              <span className='font-semibold'>{time}</span>
                            </div>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Ghi chú:</span>
                              <span className='flex-1'>{appointment.note || 'Không có ghi chú'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Thông tin bác sĩ */}
                        <div className='space-y-2'>
                          <h4 className='text-sm font-medium text-gray-900'>Thông tin bác sĩ</h4>
                          <div className='space-y-1 text-sm text-gray-600'>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Bác sĩ:</span>
                              <span className='font-semibold text-blue-600'>{appointment.doctorFullName}</span>
                            </div>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Khoa:</span>
                              <span>{appointment.doctorDepartmentName}</span>
                            </div>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Kinh nghiệm:</span>
                              <span>{appointment.doctorExperienceYears} năm</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Avatar bác sĩ */}
                    <div className='mt-4 lg:mt-0 lg:ml-6 flex-shrink-0'>
                      <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-2'>
                          {appointment.doctorImageUrl ? (
                            <img
                              src={appointment.doctorImageUrl}
                              alt={appointment.doctorFullName}
                              className='w-16 h-16 rounded-full object-cover'
                            />
                          ) : (
                            <span className='text-2xl font-semibold text-gray-500'>
                              {appointment?.doctorFullName?.charAt(0) ?? 'BS'}
                            </span>
                          )}
                        </div>
                        {/* HIỂN THỊ ĐÁNH GIÁ */}
                        {hasReviewed && userReview && (
                          <div className='text-center'>
                            <div className='flex justify-center mb-1'>
                              <ProductRating
                                rating={userReview.rating}
                                activeClassName='w-3 h-3 fill-yellow-400'
                                nonActiveClassName='w-3 h-3 fill-gray-300'
                              />
                            </div>
                            <span className='text-xs text-green-600 font-medium'>Đã đánh giá</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className='mt-4 flex flex-wrap gap-2 justify-end'>
                    {appointment.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleOpenPaymentModal(appointment)}
                          className='px-4 py-2 bg-green from-green-500 to-emerald-600 text-white text-sm font-medium rounded-md hover:from-green-600 hover:to-emerald-700 transition-colors'
                        >
                          Thanh toán ngay
                        </button>
                        <button
                          onClick={() => onclickCancel(appointment.id)}
                          className='px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors'
                        >
                          Hủy lịch hẹn
                        </button>
                      </>
                    )}
                    {appointment.status === 'CONFIRMED' && (
                      <button
                        onClick={() => onclickCancel(appointment.id)}
                        className='px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors'
                      >
                        Hủy lịch hẹn
                      </button>
                    )}
                    {appointment.status === 'COMPLETED' && (
                      <>
                        {hasReviewed && userReview ? (
                          <div className='px-4 py-2 bg-green-50 text-green-700 border border-green-200 text-sm font-medium rounded-md flex items-center'>
                            <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path
                                fillRule='evenodd'
                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                            <span>Đã đánh giá</span>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              handleOpenReviewModal(appointment.id, appointment.doctorId, appointment.doctorFullName)
                            }
                            className='px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-medium rounded-md hover:from-yellow-600 hover:to-amber-600 transition-colors'
                          >
                            Đánh giá bác sĩ
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {totalPages && (
            <div className='mt-6'>
              <Paginate queryConfig={queryConfig} totalPages={totalPages} />
            </div>
          )}
        </div>
      </div>

      {/*  MODAL THANH TOÁN  */}
      {showPaymentModal && paymentData && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Thanh toán cho cuộc hẹn với BS. {paymentData.doctorName}
                </h3>
                <button onClick={handleClosePaymentModal} className='text-gray-400 hover:text-gray-600'>
                  <span className='text-2xl'>×</span>
                </button>
              </div>

              <div className='mb-6'>
                {/* Thông tin cuộc hẹn */}
                <div className='bg-gray-50 p-4 rounded-lg mb-4'>
                  <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div className='text-gray-600'>Mã cuộc hẹn:</div>
                    <div className='font-semibold'>#{paymentData.appointmentId}</div>

                    <div className='text-gray-600'>Ngày khám:</div>
                    <div className='font-semibold'>{formatDate(paymentData.appointmentDateTime).date}</div>

                    <div className='text-gray-600'>Giờ khám:</div>
                    <div className='font-semibold'>{formatDate(paymentData.appointmentDateTime).time}</div>
                  </div>
                </div>

                {/* QR Code Section */}
                {qrCodeUrl ? (
                  <div className='text-center'>
                    <div className='mb-4'>
                      <h4 className='text-md font-medium text-gray-700 mb-2'>Quét mã QR để thanh toán</h4>
                      <div className='inline-block p-4 bg-white border border-gray-200 rounded-lg'>
                        <img src={qrCodeUrl} alt='QR Code Thanh toán' className='w-64 h-64 mx-auto' />
                      </div>
                    </div>

                    <div className='mb-4 text-sm text-gray-600'>
                      <p className='mb-1'>
                        <span className='font-medium'>Số tiền:</span> {paymentAmount.toLocaleString('vi-VN')} VNĐ
                      </p>
                      <p className='mb-1'>
                        <span className='font-medium'>Nội dung CK:</span> COCLK{paymentData.appointmentId}
                      </p>
                    </div>

                    {/* Trạng thái check thanh toán */}
                    {checkingStatus !== 'waiting' && (
                      <div
                        className={`mt-4 p-4 rounded-lg ${
                          checkingStatus === 'success'
                            ? 'bg-green-50 border border-green-200'
                            : checkingStatus === 'checking'
                              ? 'bg-blue-50 border border-blue-200'
                              : 'bg-yellow-50 border border-yellow-200'
                        }`}
                      >
                        <div className='flex items-center'>
                          {checkingStatus === 'success' && (
                            <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3'>
                              <svg
                                className='w-6 h-6 text-green-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                              </svg>
                            </div>
                          )}
                          {checkingStatus === 'checking' && (
                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                              <svg className='w-6 h-6 text-blue-600 animate-spin' fill='none' viewBox='0 0 24 24'>
                                <circle
                                  className='opacity-25'
                                  cx='12'
                                  cy='12'
                                  r='10'
                                  stroke='currentColor'
                                  strokeWidth='4'
                                />
                                <path
                                  className='opacity-75'
                                  fill='currentColor'
                                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                />
                              </svg>
                            </div>
                          )}
                          {checkingStatus === 'failed' && (
                            <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3'>
                              <svg
                                className='w-6 h-6 text-yellow-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                              </svg>
                            </div>
                          )}

                          <div className='flex-1'>
                            <h4 className='font-medium text-gray-900'>
                              {checkingStatus === 'success'
                                ? 'Thanh toán thành công!'
                                : checkingStatus === 'checking'
                                  ? 'Đang kiểm tra thanh toán...'
                                  : 'Đã dừng kiểm tra'}
                            </h4>
                            <p
                              className={`text-sm ${
                                checkingStatus === 'success'
                                  ? 'text-green-700'
                                  : checkingStatus === 'checking'
                                    ? 'text-blue-700'
                                    : 'text-yellow-700'
                              }`}
                            >
                              {checkMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <div className='mb-4'>
                      <svg
                        className='w-16 h-16 mx-auto text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                        />
                      </svg>
                    </div>
                    <p className='text-gray-600 mb-4'>Nhấn nút bên dưới để tạo mã QR thanh toán</p>
                    <button
                      onClick={handleCreatePayment}
                      disabled={createPaymentMutation.isPending}
                      className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                        createPaymentMutation.isPending
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                      }`}
                    >
                      {createPaymentMutation.isPending ? 'Đang tạo mã QR...' : 'Tạo mã QR thanh toán'}
                    </button>
                  </div>
                )}
              </div>

              <div className='flex justify-end space-x-3 pt-4 border-t'>
                <button
                  onClick={handleClosePaymentModal}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
                >
                  {qrCodeUrl ? 'Đóng' : 'Hủy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  MODAL ĐÁNH GIÁ  */}
      {showReviewModal && reviewData && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Đánh giá bác sĩ {reviewData.doctorName}</h3>
                <button onClick={() => setShowReviewModal(false)} className='text-gray-400 hover:text-gray-600'>
                  <span className='text-2xl'>×</span>
                </button>
              </div>

              <div className='mt-4 mb-6'>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Số sao đánh giá:</label>
                  <div className='flex items-center space-x-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setRating(star)}
                        className='text-xl focus:outline-none transition-transform hover:scale-110'
                      >
                        <span className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                      </button>
                    ))}
                    <span className='ml-2 text-lg font-semibold text-gray-700'>{rating}/5</span>
                  </div>
                </div>

                <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Nội dung đánh giá:</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    rows={4}
                    placeholder='Chia sẻ trải nghiệm của bạn với bác sĩ...'
                    maxLength={500}
                  />
                  <div className='flex justify-between mt-1'>
                    <p className='text-xs text-gray-500'>Tối thiểu 10 ký tự</p>
                    <p className='text-xs text-gray-500'>{comment.length}/500</p>
                  </div>
                </div>
              </div>

              <div className='flex justify-end space-x-3'>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={postReview.isPending || comment.trim().length < 10}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                    postReview.isPending || comment.trim().length < 10
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600'
                  }`}
                >
                  {postReview.isPending ? 'Đang xử lý...' : 'Gửi đánh giá'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
