import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import Paginate from 'src/components/Paginate'
import JobDoctor from 'src/DOCTOR/APIS/job.api'
import useQueryParam from 'src/hooks/useQueryParam'

// src/types/utils.type.ts hoặc file tương ứng
export type QueryConfig = {
  page?: string
  size?: string
  totalElements?: string
  totalPages?: string
  [key: string]: string | undefined
}

export default function ViewAppointment() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      size: queryParams.size || '5'
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['api/doctors/me/appointments', queryConfig],
    queryFn: () => JobDoctor.GetDoctorsAppointment(queryConfig)
  })

  const dataAppointment = data?.data
  const totalPages = data?.data.totalPages || 1
  //   const dataTimeLine = data?.data['thời gian']

  // Hàm format ngày giờ
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  }

  // Hàm lấy màu sắc cho trạng thái
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
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Hàm dịch trạng thái
  const getStatusText = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Đã xác nhận'
      case 'PENDING':
        return 'Chờ xác nhận'
      case 'CANCELLED':
        return 'Đã hủy'
      case 'COMPLETED':
        return 'Đã hoàn thành'
      default:
        return status
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Quản lý lịch hẹn</h1>
          <p className='mt-2 text-sm text-gray-600'>Tổng số: {dataAppointment?.data?.length ?? 0} lịch hẹn</p>
        </div>

        {/* Thống kê nhanh */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>Tổng số lịch hẹn</div>
            <div className='text-2xl font-bold text-gray-900'>{dataAppointment?.data?.length ?? 0}</div>
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>Đã xác nhận</div>
            <div className='text-2xl font-bold text-green-600'>
              {dataAppointment?.data?.filter((item) => item.status === 'CONFIRMED').length}
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>Chờ xác nhận</div>
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
        </div>

        {/* Danh sách lịch hẹn */}
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Danh sách lịch hẹn</h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>Thông tin chi tiết các cuộc hẹn với bác sĩ</p>
          </div>

          <div className='divide-y divide-gray-200'>
            {dataAppointment?.data?.map((appointment) => {
              const { date, time } = formatDateTime(appointment.appointmentDateTime)

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
                        {/* Thông tin bệnh nhân */}
                        <div className='space-y-2'>
                          <h4 className='text-sm font-medium text-gray-900'>Thông tin bệnh nhân</h4>
                          <div className='space-y-1 text-sm text-gray-600'>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Họ tên:</span>
                              <span>{appointment.userFullName}</span>
                            </div>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Email:</span>
                              <span className='truncate'>{appointment.userEmail}</span>
                            </div>
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>SĐT:</span>
                              <span>{appointment.userPhone}</span>
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
                            <div className='flex items-center'>
                              <span className='font-medium w-24'>Mã BS:</span>
                              <span>#{appointment.doctorId}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Avatar bác sĩ (nếu có) */}
                    <div className='mt-4 lg:mt-0 lg:ml-6 flex-shrink-0'>
                      <div className='flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full'>
                        {appointment.doctorImageUrl ? (
                          <img
                            src={appointment.doctorImageUrl}
                            alt={appointment.doctorFullName}
                            className='w-16 h-16 rounded-full object-cover'
                          />
                        ) : (
                          <span className='text-2xl font-semibold text-gray-500'>
                            {appointment.doctorFullName.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {/* <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
            <div className='flex-1 flex justify-between items-center'>
              <div>
                <p className='text-sm text-gray-700'>
                  Hiển thị <span className='font-medium'>{sampleData.data.length}</span> trong tổng số{' '}
                  <span className='font-medium'>{sampleData.totalElements}</span> kết quả
                </p>
              </div>
              <div className='flex space-x-2'>
                <button
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                  disabled={sampleData.page === 0}
                >
                  Trước
                </button>
                <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
                  Trang {sampleData.page + 1} / {sampleData.totalPages}
                </span>
                <button
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                  disabled={sampleData.page + 1 >= sampleData.totalPages}
                >
                  Tiếp
                </button>
              </div>
            </div>
          </div> */}
          {totalPages && (
            <div className='mt-6'>
              <Paginate queryConfig={queryConfig} totalPages={totalPages} />
            </div>
          )}
        </div>

        {/* Footer info */}
        {/* <div className='mt-4  text-xl text-gray-500 font-bold'>Dữ liệu được cập nhật lúc: {dataTimeLine}</div> */}
      </div>
    </div>
  )
}
