import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import JobDoctor from 'src/DOCTOR/APIS/job.api'
// Giả định các imports này đã có và hoạt động
// import JobDoctor from 'src/DOCTOR/APIS/job.api';

// Cần định nghĩa lại interface Schedule nếu chưa có trong file này
interface Schedule {
  id: number
  dayOfWeek: string
  startAt: string
  endAt: string
  active: boolean
  doctorId: number
  doctorName: string
}

export default function DoctorScheduleView() {
  // --- STATE QUẢN LÝ UI CHỨC NĂNG MỚI ---
  const [viewDate, setViewDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newSchedule, setNewSchedule] = useState({
    // Ngày mặc định cho Modal là ngày hiện tại
    day: format(new Date(), 'yyyy-MM-dd'),
    startHour: '09:00',
    endHour: '12:00'
  })
  // ----------------------------------------

  const { data: DoctorSchedules } = useQuery({
    queryKey: ['api/doctors/me/schedules'],
    queryFn: JobDoctor.getSchedulesDoctor // Sử dụng API của bạn
  })

  const schedulesData: Schedule[] = DoctorSchedules?.data?.data || []

  // 1. Tính toán ngày bắt đầu của tuần (Thứ 2 là ngày đầu tuần)
  const startDateOfWeek = startOfWeek(viewDate, { weekStartsOn: 1 })

  // 2. Tạo mảng 7 ngày dựa trên startDateOfWeek
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => addDays(startDateOfWeek, index))
  }, [startDateOfWeek])

  // Chức năng chuyển tuần
  const nextWeek = () => setViewDate(addWeeks(viewDate, 1))
  const prevWeek = () => setViewDate(subWeeks(viewDate, 1))
  const goToToday = () => setViewDate(new Date())

  // --- HÀM XỬ LÝ SỰ KIỆN (CHƯA GỌI API) ---
  const handleAddSchedule = () => {
    // Đây là nơi bạn sẽ gọi API để THÊM lịch
    console.log('Thêm lịch mới:', newSchedule)
    setIsModalOpen(false)
    // Sau khi gọi API thành công, gọi refetch của react-query: queryClient.invalidateQueries(['api/doctors/me/schedules']);
  }

  const handleDeleteSchedule = (scheduleId: number) => {
    // Đây là nơi bạn sẽ gọi API để XÓA lịch
    console.log('Xóa lịch ID:', scheduleId)
    // Sau khi gọi API thành công, gọi refetch của react-query
  }
  // ------------------------------------------

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* --- HEADER: Tiêu đề & Điều hướng --- */}
      <div className='mb-6 flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>Lịch Làm Việc</h1>
          <p className='text-gray-500 text-sm'>
            Tuần từ {format(startDateOfWeek, 'dd/MM/yyyy')} đến {format(addDays(startDateOfWeek, 6), 'dd/MM/yyyy')}
          </p>
        </div>

        <div className='flex items-center gap-3 mt-4 md:mt-0'>
          {/* Nút THÊM LỊCH MỚI */}
          <button
            onClick={() => setIsModalOpen(true)}
            className='px-4 py-2 rounded-lg bg-green-500 text-blue-500 font-medium hover:bg-green-600 transition flex items-center gap-2'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
            </svg>
            Thêm Lịch
          </button>

          {/* Các nút điều hướng tuần */}
          <button onClick={prevWeek} className='p-2 rounded-lg border hover:bg-gray-100 transition'>
            &lt; Tuần trước
          </button>
          <button
            onClick={goToToday}
            className='px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition'
          >
            Hôm nay
          </button>
          <button onClick={nextWeek} className='p-2 rounded-lg border hover:bg-gray-100 transition'>
            Tuần sau &gt;
          </button>
        </div>
      </div>

      {/* --- BODY: Lưới lịch 7 ngày --- */}
      <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
        {weekDays.map((day, index) => {
          // Lọc các lịch thuộc ngày này
          const dailySchedules = schedulesData
            .filter((s) => isSameDay(parseISO(s.startAt), day))
            .sort((a, b) => a.startAt.localeCompare(b.startAt)) // Sắp xếp theo giờ

          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={index}
              className={`flex flex-col rounded-xl border min-h-[200px] bg-white ${isToday ? 'border-blue-400 ring-1 ring-blue-400' : 'border-gray-200'}`}
            >
              {/* Header của Cột Ngày */}
              <div className={`p-3 text-center border-b ${isToday ? 'bg-blue-50' : 'bg-gray-50'} rounded-t-xl`}>
                <div className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                  {format(day, 'EEEE', { locale: vi })}
                </div>
                <div className={`text-xl font-bold ${isToday ? 'text-blue-700' : 'text-gray-800'}`}>
                  {format(day, 'dd/MM')}
                </div>
              </div>

              {/* Danh sách các ca làm việc trong ngày */}
              <div className='p-2 flex flex-col gap-2 flex-1'>
                {dailySchedules.length > 0 ? (
                  dailySchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      // Thêm group để hiện nút xóa khi hover
                      className='p-2 rounded-lg bg-white border border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition text-sm group relative'
                    >
                      <div className='font-bold text-gray-800'>
                        {format(parseISO(schedule.startAt), 'HH:mm')} - {format(parseISO(schedule.endAt), 'HH:mm')}
                      </div>
                      <div className={`text-xs mt-1 ${schedule.active ? 'text-green-600' : 'text-gray-500'}`}>
                        {schedule.active ? '● Đã có khách' : '○ Trống'}
                      </div>

                      {/* --- NÚT XÓA LỊCH --- */}
                      {/* Chỉ hiện nút xóa nếu lịch chưa được đặt (active: false) */}
                      {!schedule.active && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteSchedule(schedule.id) // Gọi hàm xóa
                          }}
                          className='absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'
                          title='Xóa lịch làm việc'
                        >
                          <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </button>
                      )}
                      {/* --- END NÚT XÓA --- */}
                    </div>
                  ))
                ) : (
                  <div className='flex-1 flex items-center justify-center text-gray-300 text-sm italic'>Trống</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* --- MODAL THÊM LỊCH LÀM VIỆC MỚI --- */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
          <div className='bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all'>
            <h3 className='text-2xl font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center'>
              Tạo Lịch Làm Việc Mới
              <button onClick={() => setIsModalOpen(false)} className='text-gray-400 hover:text-gray-600'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </h3>

            <div className='space-y-4'>
              {/* Chọn Ngày Áp Dụng */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Ngày áp dụng (Bấm vào đây để chọn ngày)
                </label>
                <input
                  type='date'
                  value={newSchedule.day}
                  onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              {/* Chọn Giờ Bắt Đầu/Kết Thúc */}
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Bắt đầu</label>
                  <input
                    type='time'
                    value={newSchedule.startHour}
                    onChange={(e) => setNewSchedule({ ...newSchedule, startHour: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div className='flex-1'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Kết thúc</label>
                  <input
                    type='time'
                    value={newSchedule.endHour}
                    onChange={(e) => setNewSchedule({ ...newSchedule, endHour: e.target.value })}
                    className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>

              <p className='text-xs text-blue-500 pt-2 bg-blue-50 p-2 rounded-lg'>
                Lịch sẽ được áp dụng cho ngày trong tuần bạn chọn (ví dụ: nếu bạn chọn Thứ 4, lịch này sẽ lặp lại vào
                tất cả các Thứ 4).
              </p>
            </div>

            {/* Footer Buttons */}
            <div className='mt-6 flex justify-end gap-3'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition'
              >
                Hủy
              </button>
              <button
                onClick={handleAddSchedule} // Gắn hàm xử lý thêm lịch
                className='px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition'
              >
                Lưu Lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
