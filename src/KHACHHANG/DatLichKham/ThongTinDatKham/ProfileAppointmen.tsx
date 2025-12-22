import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react' // Thêm useState
import userAPI from 'src/apis/profile.api'
import DoctersApi from 'src/apis/docter.api'
import { toast } from 'react-toastify'

interface AppointmentData {
  doctorName: string
  department: string
  appointmentDate: string
  appointmentTime: string
  doctorImage?: string
  doctorId: number
  doctorUserId: number
}

export default function ConfirmAppointment() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const appointmentData = location.state as AppointmentData
  const [note, setNote] = useState('') // State cho note

  // Lấy thông tin user
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile
  })

  const profile = profileData?.data.data

  // Mutation để đặt lịch (chỉ gọi khi bấm xác nhận)
  const createAppointmentMutation = useMutation({
    mutationFn: DoctersApi.postAppointmentUser,
    onSuccess: () => {
      toast.success('Đặt lịch thành công!')
      queryClient.invalidateQueries({ queryKey: ['api/doctors', appointmentData.doctorId] })
      // navigate('/user/thongtindatkham')
    },
    onError: () => {
      toast.error('Đặt lịch thất bại')
    }
  })

  const handleConfirm = () => {
    if (!profile) {
      toast.error('Không tìm thấy thông tin người dùng')
      return
    }
    const processedNote = note.trim() ? note.trim() : 'không có ghi chú'

    const appointmentRequest = {
      appointmentDateTime: `${appointmentData.appointmentDate}T${appointmentData.appointmentTime}:00`,
      // note: note || 'Ko có ghi chú',
      note: processedNote,
      doctorId: appointmentData.doctorId,
      userId: appointmentData.doctorUserId
    }
    console.log('API Request:', appointmentRequest)
    createAppointmentMutation.mutate(appointmentRequest)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!appointmentData) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Thông tin không hợp lệ</h2>
          <button
            onClick={() => navigate('/')}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Xác Nhận Thông Tin Đặt Lịch</h1>
          <p className='text-lg text-gray-600'>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Thông tin bệnh nhân */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Card thông tin cá nhân */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
              <div className='bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4'>
                <h2 className='text-xl font-bold text-white flex items-center gap-3'>
                  <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                    <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  Thông Tin Bệnh Nhân
                </h2>
              </div>

              <div className='p-6 space-y-6'>
                {/* Các thông tin bệnh nhân */}
                <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Họ và tên</label>
                    <p className='text-lg font-semibold text-gray-900'>{profile?.fullName || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
                  <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Email</label>
                    <p className='text-lg text-gray-900'>{profile?.email || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
                  <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Số điện thoại</label>
                    <p className='text-lg text-gray-900'>{profile?.phone || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                {/* Thêm input cho note */}
                <div className='flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200'>
                  <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                    <svg className='w-6 h-6 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-500 mb-3'>
                      Ghi chú cho bác sĩ (tùy chọn)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder='Mô tả triệu chứng, câu hỏi hoặc thông tin cần tư vấn...'
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
                      rows={4}
                      maxLength={500}
                    />
                    <div className='flex justify-between items-center mt-2'>
                      <span className='text-xs text-gray-500'>{note.length}/500 ký tự</span>
                      {note.length > 0 && (
                        <button onClick={() => setNote('')} className='text-xs text-red-500 hover:text-red-700'>
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Tóm tắt lịch hẹn */}
          <div className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-8'>
              <div className='bg-gradient-to-r from-blue-500 to-cyan-300 px-6 py-4'>
                <h2 className='text-xl font-bold text-white flex items-center gap-3'>
                  <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  Thông Tin Lịch Hẹn
                </h2>
              </div>

              <div className='p-6 space-y-6'>
                {/* Thông tin bác sĩ */}
                <div className='bg-blue-50 rounded-xl p-4 border border-blue-200'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                      {appointmentData.doctorImage ? (
                        <img
                          src={appointmentData.doctorImage}
                          alt={appointmentData.doctorName}
                          className='w-10 h-10 rounded-full object-cover'
                        />
                      ) : (
                        <div className='w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center'>
                          <span className='text-blue-600 font-bold text-sm'>
                            {appointmentData.doctorName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>Bác sĩ {appointmentData.doctorName}</h3>
                      <p className='text-sm text-blue-600'>{appointmentData.department}</p>
                    </div>
                  </div>
                </div>

                {/* Thời gian hẹn */}
                <div className='bg-green-50 rounded-xl p-4 border border-green-200'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>Thời gian hẹn</h3>
                      <p className='text-lg text-green-700 font-bold'>{appointmentData.appointmentTime}</p>
                      <p className='text-sm text-gray-600'>{formatDate(appointmentData.appointmentDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Hiển thị note nếu có */}
                {note && (
                  <div className='bg-purple-50 rounded-xl p-4 border border-purple-200'>
                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                        <svg className='w-5 h-5 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-900 text-sm mb-2'>Ghi chú của bạn</h3>
                        <p className='text-sm text-gray-700'>{note}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lưu ý quan trọng */}
                <div className='bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200'>
                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                      <svg className='w-5 h-5 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-bold text-yellow-800 text-sm mb-3'>Lưu ý quan trọng</h3>
                      <ul className='space-y-2 text-sm text-yellow-700'>
                        <li className='flex items-center gap-2'>
                          <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
                          Vui lòng đến trước 15 phút
                        </li>
                        <li className='flex items-center gap-2'>
                          <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
                          Mang theo CMND/CCCD và thẻ BHYT
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className='space-y-3'>
                  <button
                    onClick={handleConfirm}
                    disabled={createAppointmentMutation.isPending}
                    className='w-full bg-gradient-to-r from-blue-500 to-cyan-200 hover:from-green-700 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3'
                  >
                    {createAppointmentMutation.isPending ? (
                      <>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        <span>Đang đặt lịch...</span>
                      </>
                    ) : (
                      <>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        <span>Xác Nhận Đặt Lịch</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleGoBack}
                    className='w-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-3 px-6 rounded-xl transition-colors'
                  >
                    Quay Lại Chỉnh Sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
