import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import JobDoctor from 'src/DOCTOR/APIS/job.api'
import { toast } from 'react-toastify'
import DoctersApi from 'src/apis/docter.api'
import ReviewDoctor from '../ReviewDoctor'

interface TimeSlot {
  time: string
  display: string
  isAvailable: boolean
}

export default function DoctorDetail() {
  const { id } = useParams()
  const doctorId = Number(id) ///doctor/:id trên URL chuyển sang số.
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [currentWeek, setCurrentWeek] = useState(0)

  const { data: DoctorDetails } = useQuery({
    queryKey: ['api/doctors', doctorId],
    queryFn: () => {
      return JobDoctor.getDetailsDoctor(doctorId)
    }
  })

  const dataDoctorDetail = DoctorDetails?.data.data

  const createAppointmentMutation = useMutation({
    mutationFn: DoctersApi.postAppointmentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api/doctors', doctorId] })
      navigate('/user/thongtindatkham')
    },
    onError: () => {
      toast.error('Đặt lịch thất bại')
    }
  })

  // console.log(dataDoctorDetail)

  const getCurrentWeekDates = () => {
    const dates = []
    const today = new Date()

    const startOfWeek = new Date(today)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)
    startOfWeek.setDate(startOfWeek.getDate() + currentWeek * 7)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)

      const dateString = date.toISOString().split('T')[0]
      const dayName = date.toLocaleDateString('vi-VN', { weekday: 'short' })
      const dateFormatted = date.toLocaleDateString('vi-VN').slice(0, 5)

      const availableSlots = countAvailableSlots(dateString)

      dates.push({
        date: dateString,
        display: `${dayName}, ${dateFormatted}`,
        availableSlots: availableSlots
      })
    }

    return dates
  }

  const getAvailableTimeSlots = (selectedDate: string) => {
    if (!dataDoctorDetail || !selectedDate) return []
    const slots: TimeSlot[] = []

    // Tìm tất cả schedules cho ngày được chọn
    const daySchedules = dataDoctorDetail.schedules.filter((schedule) => {
      // Schedule format: "2025-11-28 08:00 - 2025-11-28 18:00"
      const scheduleDate = schedule.split(' ')[0]
      // console.log('Checking schedule:', schedule, 'Date:', scheduleDate)
      return scheduleDate === selectedDate
    })

    // console.log('Filtered schedules for date:', daySchedules)

    if (daySchedules.length === 0) {
      // console.log('No schedules found for this date')
      return []
    }

    // Tạo các khung giờ 30 phút từ schedules
    daySchedules.forEach((schedule) => {
      // Tách thời gian từ schedule
      const parts = schedule.split(' ')
      if (parts.length >= 5) {
        const startTimeStr = parts[1] // "08:00"
        const endTimeStr = parts[4] // "18:00"

        // console.log('Processing - Start:', startTimeStr, 'End:', endTimeStr)

        // Tạo khung giờ từ start đến end, mỗi khung 30 phút
        let currentHour = parseInt(startTimeStr.split(':')[0])
        let currentMinute = parseInt(startTimeStr.split(':')[1])
        const endHour = parseInt(endTimeStr.split(':')[0])
        const endMinute = parseInt(endTimeStr.split(':')[1])

        while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
          const time = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`

          // Tính thời gian kết thúc của khung giờ này
          let nextHour = currentHour
          let nextMinute = currentMinute + 30
          if (nextMinute >= 60) {
            nextHour += 1
            nextMinute = 0
          }
          const endTimeDisplay = `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`

          // Kiểm tra xem khung giờ này có bị đặt chưa
          const isBooked = dataDoctorDetail.appointments.some((appointment) => {
            const appointmentDate = new Date(appointment.appointmentDateTime).toISOString().split('T')[0]
            const appointmentTime = new Date(appointment.appointmentDateTime).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit'
            })
            return appointmentDate === selectedDate && appointmentTime === time
          })

          slots.push({
            time: time,
            display: `${time} - ${endTimeDisplay}`,
            isAvailable: !isBooked
          })

          // Tăng 30 phút
          currentMinute += 30
          if (currentMinute >= 60) {
            currentHour += 1
            currentMinute = 0
          }
        }
      }
    })

    // console.log('Final slots:', slots)
    return slots
  }

  const getTimeSlotsBySession = (selectedDate: string) => {
    const allSlots = getAvailableTimeSlots(selectedDate)

    const morningSlots = allSlots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0])
      return hour < 12
    })

    const afternoonSlots = allSlots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0])
      return hour >= 12
    })

    return { morningSlots, afternoonSlots }
  }

  const countAvailableSlots = (date: string) => {
    const slots = getAvailableTimeSlots(date)
    return slots.filter((slot) => slot.isAvailable).length
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime('')
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  // Trong DoctorDetail component - sửa hàm handleBookAppointment
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !dataDoctorDetail) {
      toast.error('Vui lòng chọn ngày và giờ khám')
      return
    }

    // Chuyển đến trang xác nhận thông tin, CHƯA gọi API
    const appointmentData = {
      doctorName: dataDoctorDetail.fullName,
      department: dataDoctorDetail.departmentName,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      doctorImage: dataDoctorDetail.imageUrl,
      doctorId: Number(dataDoctorDetail.id),
      doctorUserId: Number(dataDoctorDetail.userId)
    }

    // Navigate đến trang xác nhận với dữ liệu
    navigate('/user/xac-nhan-dat-lich', { state: appointmentData })
  }

  const nextWeek = () => setCurrentWeek((prev) => prev + 1)
  const prevWeek = () => setCurrentWeek((prev) => Math.max(0, prev - 1))

  return (
    <div className='bg-gradient-to-br from-blue-50 to-cyan-100 min-h-screen p-6'>
      {/* Thông tin chính bác sĩ */}
      <div className='bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100'>
        <div className='grid grid-cols-10 gap-6 w-full'>
          {/* Hình ảnh bác sĩ */}
          <div className='col-span-2'>
            <div className='relative'>
              <img
                src={
                  dataDoctorDetail?.imageUrl ||
                  'https://antimatter.vn/wp-content/uploads/2022/07/hinh-anh-hoat-hinh-3d-de-thuong.jpg'
                }
                alt='Anh-Doctor'
                className='rounded-xl w-full h-48 object-cover shadow-md'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl'></div>
            </div>
          </div>

          {/* Thông tin bác sĩ */}
          <div className='col-span-8 flex flex-col justify-between'>
            <div className='space-y-4'>
              <div>
                <h2 className='font-bold text-2xl text-gray-800 mb-1'>
                  BS. {dataDoctorDetail?.fullName || 'Đang tải...'}
                </h2>
                <p className='text-blue-600 font-medium'>{dataDoctorDetail?.departmentName || 'Đang tải...'}</p>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <span className='text-blue-600 text-sm font-bold'>{dataDoctorDetail?.experienceYears || '0'}</span>
                  </div>
                  <div>
                    <p className='font-semibold text-gray-800'>Kinh nghiệm</p>
                    <p className='text-gray-600 text-sm'>{dataDoctorDetail?.experienceYears || '0'} năm làm việc</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                    <svg className='w-4 h-4 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                    </svg>
                  </div>
                  <div>
                    <p className='font-semibold text-gray-800'>Điện thoại</p>
                    <p className='text-gray-600 text-sm'>{dataDoctorDetail?.phone || 'Đang tải...'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phần tư vấn và nút đặt */}
            <div className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl my-2 p-4 border border-blue-100'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-semibold text-gray-800'>Bác sĩ chuyên khoa {dataDoctorDetail?.departmentName}</p>
                  <p className='text-gray-600 text-sm'>Tư vấn Online qua App Medpro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-6'>
        {/* Phần bên trái - Lịch đặt khám */}
        <div className='flex-1'>
          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
            <div className='flex justify-between items-center mb-8'>
              <div>
                <h2 className='font-bold text-2xl text-gray-800 mb-1'>Đặt khám nhanh</h2>
                <p className='text-gray-600'>Chọn thời gian phù hợp với lịch trình của bạn</p>
              </div>
              <div className='flex gap-3'>
                <button
                  onClick={prevWeek}
                  className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                  </svg>
                  Tuần trước
                </button>
                <button
                  onClick={nextWeek}
                  className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium'
                >
                  Tuần sau
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </button>
              </div>
            </div>

            {/* Danh sách ngày trong tuần */}
            <div className='grid grid-cols-7 gap-3 mb-8'>
              {getCurrentWeekDates().map((dateObj) => (
                <button
                  key={dateObj.date}
                  onClick={() => handleDateSelect(dateObj.date)}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedDate === dateObj.date
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-blue-500 shadow-lg scale-105'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className='font-bold text-lg'>{dateObj.display.split(',')[0]}</div>
                  <div className='text-sm opacity-90'>
                    {dateObj.display.split(',')[1]}
                    <div className='text-xs opacity-75'>{new Date(dateObj.date).getFullYear()}</div>
                  </div>
                  <div
                    className={`text-xs mt-2 px-2 py-1 rounded-full ${
                      selectedDate === dateObj.date ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {dateObj.availableSlots} khung giờ
                  </div>
                </button>
              ))}
            </div>

            {/* Chọn giờ theo buổi */}
            {selectedDate && (
              <div className='space-y-8'>
                {/* Buổi sáng */}
                {getTimeSlotsBySession(selectedDate).morningSlots.length > 0 && (
                  <div>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='w-3 h-8 bg-orange-400 rounded-full'></div>
                      <h3 className='font-bold text-xl text-gray-800'>Buổi sáng</h3>
                    </div>
                    <div className='grid grid-cols-6 gap-3'>
                      {getTimeSlotsBySession(selectedDate).morningSlots.map((slot) => {
                        const isSelected = selectedTime === slot.time

                        return (
                          <button
                            key={slot.time}
                            onClick={() => slot.isAvailable && handleTimeSelect(slot.time)}
                            disabled={!slot.isAvailable}
                            className={`p-3 rounded-xl border-2 text-sm text-center transition-all duration-200 ${
                              isSelected
                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-500 shadow-lg scale-105'
                                : slot.isAvailable
                                  ? 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md hover:scale-105 text-gray-700'
                                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            {slot.display}
                            {!slot.isAvailable && <div className='text-xs text-red-500 mt-1'>Đã đặt</div>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Buổi chiều */}
                {getTimeSlotsBySession(selectedDate).afternoonSlots.length > 0 && (
                  <div>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='w-3 h-8 bg-purple-400 rounded-full'></div>
                      <h3 className='font-bold text-xl text-gray-800'>Buổi chiều</h3>
                    </div>
                    <div className='grid grid-cols-6 gap-3'>
                      {getTimeSlotsBySession(selectedDate).afternoonSlots.map((slot) => {
                        const isSelected = selectedTime === slot.time

                        return (
                          <button
                            key={slot.time}
                            onClick={() => slot.isAvailable && handleTimeSelect(slot.time)}
                            disabled={!slot.isAvailable}
                            className={`p-3 rounded-xl border-2 text-sm text-center transition-all duration-200 ${
                              isSelected
                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-500 shadow-lg scale-105'
                                : slot.isAvailable
                                  ? 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md hover:scale-105 text-gray-700'
                                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            {slot.display}
                            {!slot.isAvailable && <div className='text-xs text-red-500 mt-1'>Đã đặt</div>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Nếu không có khung giờ nào */}
                {getTimeSlotsBySession(selectedDate).morningSlots.length === 0 &&
                  getTimeSlotsBySession(selectedDate).afternoonSlots.length === 0 && (
                    <div className='text-center py-8 text-gray-500'>Không có khung giờ làm việc cho ngày này</div>
                  )}
              </div>
            )}

            {/* Nút xác nhận đặt lịch */}
            {selectedDate && selectedTime && (
              <div className='mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200'>
                <div className='text-center mb-6'>
                  <div className='font-bold text-green-800 text-lg mb-2'>Thông tin đặt lịch</div>
                  <div className='text-gray-700 bg-white rounded-lg p-4 shadow-sm'>
                    <div className='font-semibold'>
                      Ngày: <span className='text-green-600'>{new Date(selectedDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className='font-semibold'>
                      Giờ: <span className='text-green-600'>{selectedTime}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookAppointment}
                  disabled={createAppointmentMutation.isPending}
                  className={`w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 ${
                    createAppointmentMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {createAppointmentMutation.isPending ? 'Đang đặt lịch...' : 'Xác nhận đặt lịch'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Phần bên phải - Giới thiệu */}
        <div className='w-80'>
          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-3 h-8 bg-blue-400 rounded-full'></div>
              <h3 className='font-bold text-xl text-gray-800'>Giới thiệu</h3>
            </div>
            <div className='text-gray-700 leading-relaxed'>
              {dataDoctorDetail?.description ||
                `Bác sĩ ${dataDoctorDetail?.fullName} là chuyên gia ${dataDoctorDetail?.departmentName} với ${dataDoctorDetail?.experienceYears} năm kinh nghiệm lâm sàng. Bác sĩ có chuyên môn sâu trong chẩn đoán và điều trị các bệnh lý thường gặp.`}
            </div>

            {/* Thông tin thêm */}
            <div className='mt-6 p-4 bg-blue-50 rounded-xl'>
              <div className='font-semibold text-blue-800 mb-2'>Thông tin liên hệ</div>
              <div className='space-y-2 text-sm text-blue-700'>
                <div className='flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                  {dataDoctorDetail?.email}
                </div>
                <div className='flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                  </svg>
                  {dataDoctorDetail?.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5 w-[80%]'>
        <ReviewDoctor doctorId={doctorId} />
      </div>
    </div>
  )
}
