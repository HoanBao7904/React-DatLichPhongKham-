import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { useState } from 'react'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import Paginate from 'src/components/Paginate'
import useQueryParam from 'src/hooks/useQueryParam'
import type { paginate } from 'src/types/user.type'

export type QueryConfig = {
  [key in keyof paginate]?: string
}

export type FromData = {
  status: string
}

export default function ViewAppointmentAdmin() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      totalElements: queryParams.totalElements,
      totalPages: queryParams.totalPages,
      size: queryParams.size || '10'
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['api/appointments', queryConfig],
    queryFn: () => AllUserAPI.ViewLichHenUser(queryConfig)
  })

  const totalPages = data?.data.totalPages
  //   console.log(data)
  const queryClient = useQueryClient()
  const deleteAppointment = useMutation({
    mutationFn: (id: string | number) => AllUserAPI.XoaLichHen(id),
    onSuccess: (_, id) => {
      toast.success(`xóa user có Userid:${id}`)
      queryClient.invalidateQueries({
        queryKey: ['/api/appointments']
      })
    },
    onError: () => {
      // console.error('Delete error:', error)
      toast.error('Xóa user thất bại')
    }
  })

  const CapNhapTrangThai = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => AllUserAPI.UpdateLichHen(id, { status }),
    onSuccess: () => {
      // Refresh lại dữ liệu sau khi cập nhật thành công
      queryClient.invalidateQueries({ queryKey: ['api/appointments'] })
      toast.success('Cập nhật trạng thái thành công!')
    },
    onError: (error) => {
      console.error('Update error:', error)
      toast.error('Cập nhật trạng thái thất bại')
    }
  })
  const handleAppointmentStatusChange = (id: number, newStatus: string) => {
    CapNhapTrangThai.mutate({ id, status: newStatus })
  }

  const handleDelete = (id: number) => {
    deleteAppointment.mutate(id)
  }

  const dataAppointment = data?.data.data
  console.log(dataAppointment)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'CONFIRMED' | 'COMPLETED'>('ALL')

  const filteredAppointments =
    filter === 'ALL' ? (dataAppointment ?? []) : (dataAppointment ?? []).filter((apt) => apt.status === filter)

  // Hàm format ngày giờ
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      weekday: date.toLocaleDateString('vi-VN', { weekday: 'long' })
    }
  }

  // Hàm lấy màu sắc và text cho trạng thái
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          text: 'Chờ xác nhận',
          selectColor: 'text-yellow-700'
        }
      case 'CONFIRMED':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          text: 'Đã xác nhận',
          selectColor: 'text-green-700'
        }
      case 'COMPLETED':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          text: 'Đã hoàn thành',
          selectColor: 'text-blue-700'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          text: status,
          selectColor: 'text-gray-700'
        }
    }
  }

  // Thống kê
  const stats = {
    total: (dataAppointment ?? []).length,
    pending: (dataAppointment ?? []).filter((apt) => apt.status === 'PENDING').length,
    confirmed: (dataAppointment ?? []).filter((apt) => apt.status === 'CONFIRMED').length,
    completed: (dataAppointment ?? []).filter((apt) => apt.status === 'COMPLETED').length
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Quản Lý Lịch Hẹn</h1>
          <p className='text-lg text-gray-600'>Theo dõi và quản lý tất cả lịch hẹn khám bệnh</p>
        </div>

        {/* Thống kê nhanh */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-200'>
            <div className='flex items-center'>
              <div className='p-3 bg-blue-100 rounded-xl'>
                <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Tổng số lịch hẹn</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-200'>
            <div className='flex items-center'>
              <div className='p-3 bg-yellow-100 rounded-xl'>
                <svg className='w-6 h-6 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Chờ xác nhận</p>
                <p className='text-2xl font-bold text-yellow-600'>{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-200'>
            <div className='flex items-center'>
              <div className='p-3 bg-green-100 rounded-xl'>
                <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Đã xác nhận</p>
                <p className='text-2xl font-bold text-green-600'>{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-200'>
            <div className='flex items-center'>
              <div className='p-3 bg-blue-100 rounded-xl'>
                <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Đã hoàn thành</p>
                <p className='text-2xl font-bold text-blue-600'>{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200'>
          <div className='flex flex-wrap gap-3'>
            <button
              onClick={() => setFilter('ALL')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === 'ALL' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả ({stats.total})
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === 'PENDING'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chờ xác nhận ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('CONFIRMED')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === 'CONFIRMED'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đã xác nhận ({stats.confirmed})
            </button>
            <button
              onClick={() => setFilter('COMPLETED')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === 'COMPLETED'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đã hoàn thành ({stats.completed})
            </button>
          </div>
        </div>

        {/* Danh sách lịch hẹn */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'>
            <h2 className='text-2xl font-bold text-gray-900'>Danh Sách Lịch Hẹn</h2>
            <p className='text-gray-600 mt-1'>
              Hiển thị {filteredAppointments.length} trong tổng số {stats.total} lịch hẹn
            </p>
          </div>

          <div className='divide-y divide-gray-200'>
            {filteredAppointments.map((appointment) => {
              const { date, time, weekday } = formatDateTime(appointment.appointmentDateTime)
              const statusInfo = getStatusInfo(appointment.status)

              return (
                <div key={appointment.id} className='p-6 hover:bg-gray-50 transition-all duration-200'>
                  <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
                    {/* Thông tin thời gian */}
                    <div className='lg:col-span-2'>
                      <div className='text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200'>
                        <div className='text-2xl font-bold text-blue-600'>{time}</div>
                        <div className='text-sm text-gray-600 mt-1'>{date}</div>
                        <div className='text-xs text-gray-500 mt-1'>{weekday}</div>
                      </div>
                    </div>

                    {/* Thông tin bác sĩ */}
                    <div className='lg:col-span-4'>
                      <div className='flex items-start gap-4'>
                        <div className='flex-shrink-0'>
                          {appointment.doctorImageUrl ? (
                            <img
                              src={appointment.doctorImageUrl}
                              alt={appointment.doctorFullName || 'Bác sĩ'}
                              className='w-12 h-12 rounded-xl object-cover border-2 border-gray-200'
                            />
                          ) : (
                            <div className='w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl border-2 border-gray-300 flex items-center justify-center'>
                              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className='flex-1'>
                          <h3 className='font-semibold text-gray-900 text-lg'>
                            {appointment.doctorFullName || 'Chưa phân công bác sĩ'}
                          </h3>
                          {appointment.doctorDepartmentName && (
                            <p className='text-blue-600 font-medium mt-1'>{appointment.doctorDepartmentName}</p>
                          )}
                          {appointment.doctorExperienceYears && (
                            <p className='text-gray-600 text-sm mt-1'>
                              {appointment.doctorExperienceYears} năm kinh nghiệm
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Thông tin bệnh nhân */}
                    <div className='lg:col-span-3'>
                      <div className='space-y-2'>
                        <div>
                          <span className='text-sm font-medium text-gray-500'>Bệnh nhân:</span>
                          <p className='text-gray-900 font-medium'>{appointment.userFullName}</p>
                        </div>
                        <div>
                          <span className='text-sm font-medium text-gray-500'>SĐT:</span>
                          <p className='text-gray-900'>{appointment.userPhone}</p>
                        </div>
                        <div>
                          <span className='text-sm font-medium text-gray-500'>Email:</span>
                          <p className='text-gray-900 text-sm truncate'>{appointment.userEmail}</p>
                        </div>
                      </div>
                    </div>

                    {/* Trạng thái và Actions */}
                    <div className='lg:col-span-3'>
                      <div className='flex flex-col gap-3'>
                        <div>
                          <select
                            value={appointment.status}
                            onChange={(e) => handleAppointmentStatusChange(appointment.id, e.target.value)}
                            disabled={CapNhapTrangThai.isPending}
                            className={`appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium ${statusInfo.selectColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <option value='PENDING'>Chờ xác nhận</option>
                            <option value='CONFIRMED'>Đã xác nhận</option>
                            <option value='COMPLETED'>Hoàn Thành</option>
                          </select>
                          {appointment.status === 'PENDING' && (
                            <button
                              onClick={() => handleDelete(appointment?.id)}
                              className='ml-2  flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors'
                            >
                              Hủy
                            </button>
                          )}
                        </div>

                        {/* Ghi chú */}
                        {appointment.note && (
                          <div className='bg-gray-50 rounded-lg p-3 border border-gray-200'>
                            <p className='text-sm text-gray-600'>
                              <span className='font-medium'>Ghi chú:</span> {appointment.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination và Footer */}
          <div className='px-6 py-4 bg-gray-50 border-t border-gray-200'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
              {totalPages && (
                <div className='mt-6'>
                  <Paginate queryConfig={queryConfig} totalPages={totalPages} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
