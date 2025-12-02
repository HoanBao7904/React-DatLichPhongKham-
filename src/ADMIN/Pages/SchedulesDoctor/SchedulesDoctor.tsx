import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addDays, addWeeks, startOfWeek, subWeeks, format, isSameDay, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'

type ScheduleForm = {
  doctorId: number
  dayOfWeek: string
  startAt: string
  endAt: string
}

export default function SchedulesDoctor() {
  const [viewDate, setViewDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['schedules/doctor', id],
    queryFn: () => AllUserAPI.getViewSchedulesDoctor(Number(id))
  })

  const deleteSchedules = useMutation({
    mutationFn: (id: number) => AllUserAPI.deleteSchedules(id),
    onSuccess: (_, id) => {
      toast.success(`xóa thành công lịch id:${id}`)
      queryClient.invalidateQueries({
        queryKey: ['schedules/doctor']
      })
    },
    onError: (errors) => {
      console.log(errors)
      toast.error('xóa lịch không thành công')
    }
  })

  const schedulesData = data?.data.data || []

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch
  } = useForm<ScheduleForm>({
    defaultValues: {
      doctorId: Number(id),
      dayOfWeek: '',
      startAt: '',
      endAt: ''
    }
  })

  // Mutation để thêm lịch
  const addSchedules = useMutation({
    mutationFn: (body: ScheduleForm) => AllUserAPI.postScheludes(body),
    onSuccess: () => {
      toast.success('Thêm lịch làm việc thành công')
      setIsModalOpen(false)
      reset()
      // Invalid queries để refetch data
      queryClient.invalidateQueries({ queryKey: ['schedules/doctor', id] })
    },
    onError: (error) => {
      toast.error('Thêm lịch làm việc thất bại')
      console.log(error)
    }
  })

  // Hàm xử lý submit form
  const onSubmit = (data: ScheduleForm) => {
    // Chuyển đổi dayOfWeek từ date sang tên thứ (MONDAY, TUESDAY, etc.)
    const selectedDate = new Date(data.dayOfWeek)
    const dayOfWeek = format(selectedDate, 'EEEE').toUpperCase()

    // Kết hợp ngày và giờ để tạo startAt và endAt
    const startAt = `${data.dayOfWeek}T${data.startAt}:00`
    const endAt = `${data.dayOfWeek}T${data.endAt}:00`

    const submitData = {
      ...data,
      dayOfWeek,
      startAt,
      endAt
    }

    addSchedules.mutate(submitData)
  }

  const handleClickDelete = (id: number) => {
    deleteSchedules.mutate(id)
  }

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

  // Hàm mở modal và reset form
  const openModal = () => {
    reset({
      doctorId: Number(id),
      dayOfWeek: format(new Date(), 'yyyy-MM-dd'),
      startAt: '09:00',
      endAt: '12:00'
    })
    setIsModalOpen(true)
  }
  const handleBack = () => {
    navigate('/admin/quan-ly-lich-lam-viec')
  }

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
          <button
            onClick={handleBack}
            className='px-4 py-2 rounded-lg bg-slate-100 text-black font-medium hover:bg-slate-200 transition flex items-center gap-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
            </svg>
            Quay Lại
          </button>

          {/* Nút THÊM LỊCH MỚI */}
          <button
            onClick={openModal}
            className='px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition flex items-center gap-2'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
            </svg>
            Thêm Lịch
          </button>

          {/* Các nút điều hướng tuần */}
          <button
            onClick={prevWeek}
            className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition'
          >
            &lt; Tuần trước
          </button>
          <button
            onClick={goToToday}
            className='px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition'
          >
            Hôm nay
          </button>
          <button
            onClick={nextWeek}
            className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition'
          >
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
            .sort((a, b) => a.startAt.localeCompare(b.startAt))

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
                      className='p-2 rounded-lg bg-white border border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition text-sm group relative'
                    >
                      <div className='font-bold text-gray-800'>
                        {format(parseISO(schedule.startAt), 'HH:mm')} - {format(parseISO(schedule.endAt), 'HH:mm')}
                      </div>
                      <div className={`text-xs mt-1 ${schedule.active ? 'text-green-600' : 'text-gray-500'}`}>
                        {schedule.active ? '● Đã có khách' : '○ Trống'}
                      </div>

                      {!schedule.active && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Xóa')
                            handleClickDelete(schedule.id)
                            // handleClickDelete(schedule.id)
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
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  reset()
                }}
                className='text-gray-400 hover:text-gray-600'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-4'>
                {/* Chọn Ngày Áp Dụng */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Ngày áp dụng</label>
                  <input
                    type='date'
                    {...register('dayOfWeek', { required: 'Vui lòng chọn ngày' })}
                    className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                  />
                  {errors.dayOfWeek && <p className='text-red-500 text-sm mt-1'>{errors.dayOfWeek.message}</p>}
                </div>

                {/* Chọn Giờ Bắt Đầu/Kết Thúc */}
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Bắt đầu</label>
                    <input
                      type='time'
                      {...register('startAt', { required: 'Vui lòng chọn giờ bắt đầu' })}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    />
                    {errors.startAt && <p className='text-red-500 text-sm mt-1'>{errors.startAt.message}</p>}
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Kết thúc</label>
                    <input
                      type='time'
                      {...register('endAt', {
                        required: 'Vui lòng chọn giờ kết thúc',
                        validate: (value) => {
                          const startAt = watch('startAt')
                          if (startAt && value <= startAt) {
                            return 'Giờ kết thúc phải sau giờ bắt đầu'
                          }
                          return true
                        }
                      })}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    />
                    {errors.endAt && <p className='text-red-500 text-sm mt-1'>{errors.endAt.message}</p>}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className='mt-6 flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setIsModalOpen(false)
                    reset()
                  }}
                  className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  disabled={addSchedules.isPending}
                  className='px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {addSchedules.isPending ? 'Đang thêm...' : 'Lưu Lịch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
