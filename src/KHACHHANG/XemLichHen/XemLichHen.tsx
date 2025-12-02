import AppointmentItem from './MucHen/AppointmentItem'

export default function AllAppointments() {
  // Dữ liệu mẫu từ API
  const appointmentsData = {
    operationType: 'Success',
    message: 'success',
    code: 'OK',
    data: [
      {
        id: 1,
        appointmentDateTime: '2025-09-21T14:30:00',
        status: 'CONFIRMED',
        note: 'Khám tổng quát, cần tư vấn thêm1',
        userId: 4,
        userFullName: 'nguyen hoan bao',
        userEmail: 'phuc22.9.1@gmail.com',
        userPhone: '0999999999',
        doctorId: 1,
        doctorFullName: 'Ngô Quang Trường',
        doctorDepartmentName: 'Khoa Nội',
        doctorImageUrl: null,
        doctorExperienceYears: 5
      },
      {
        id: 2,
        appointmentDateTime: '2025-09-22T14:30:00',
        status: 'PENDING',
        note: 'Khám tổng quát, cần tư vấn thêm1',
        userId: 4,
        userFullName: 'nguyen hoan bao',
        userEmail: 'phuc22.9.1@gmail.com',
        userPhone: '0999999999',
        doctorId: null,
        doctorFullName: null,
        doctorDepartmentName: null,
        doctorImageUrl: null,
        doctorExperienceYears: null
      },
      {
        id: 3,
        appointmentDateTime: '2025-09-23T14:30:00',
        status: 'CONFIRMED',
        note: 'Khám tổng quát, cần tư vấn thêm1',
        userId: 4,
        userFullName: 'nguyen hoan bao',
        userEmail: 'phuc22.9.1@gmail.com',
        userPhone: '0999999999',
        doctorId: 1,
        doctorFullName: 'Ngô Quang Trường',
        doctorDepartmentName: 'Khoa Nội',
        doctorImageUrl: null,
        doctorExperienceYears: 5
      },
      {
        id: 4,
        appointmentDateTime: '2025-09-22T14:30:00',
        status: 'CONFIRMED',
        note: 'Khám tổng quát, cần tư vấn thêm1',
        userId: 4,
        userFullName: 'nguyen hoan bao',
        userEmail: 'phuc22.9.1@gmail.com',
        userPhone: '0999999999',
        doctorId: 1,
        doctorFullName: 'Ngô Quang Trường',
        doctorDepartmentName: 'Khoa Nội',
        doctorImageUrl: null,
        doctorExperienceYears: 5
      }
    ],
    size: 4,
    totalElements: 4,
    totalPages: 1,
    page: 0,
    pageSize: 10
  }

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Lịch hẹn khám bệnh</h1>
        <p className='text-gray-600'>Quản lý và theo dõi tất cả lịch hẹn khám của bạn</p>
      </div>

      {/* Filter và Search */}
      <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
        <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center'>
          {/* Search */}
          <div className='flex-1 w-full md:w-auto'>
            <div className='bg-gray-50 rounded-lg p-2 flex items-center border border-gray-200'>
              <input
                type='text'
                className='text-gray-800 px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='Tìm kiếm lịch hẹn...'
              />
              <button className='rounded-lg p-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className='flex flex-wrap gap-2'>
            <button className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm'>
              Tất cả trạng thái
            </button>
            <button className='px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm'>
              Đã xác nhận
            </button>
            <button className='px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors duration-200 text-sm'>
              Chờ xác nhận
            </button>
            <button className='px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm'>
              Theo ngày
            </button>
          </div>
        </div>
      </div>

      {/* Thống kê */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500'>
          <div className='text-sm text-gray-600'>Tổng số lịch hẹn</div>
          <div className='text-2xl font-bold text-gray-900'>{appointmentsData.totalElements}</div>
        </div>
        <div className='bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500'>
          <div className='text-sm text-gray-600'>Đã xác nhận</div>
          <div className='text-2xl font-bold text-gray-900'>
            {appointmentsData.data.filter((item) => item.status === 'CONFIRMED').length}
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500'>
          <div className='text-sm text-gray-600'>Chờ xác nhận</div>
          <div className='text-2xl font-bold text-gray-900'>
            {appointmentsData.data.filter((item) => item.status === 'PENDING').length}
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm p-4 border-l-4 border-gray-500'>
          <div className='text-sm text-gray-600'>Trang hiện tại</div>
          <div className='text-2xl font-bold text-gray-900'>
            {appointmentsData.page + 1}/{appointmentsData.totalPages}
          </div>
        </div>
      </div>

      {/* Danh sách lịch hẹn */}
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>Danh sách lịch hẹn</h2>
          <p className='text-gray-600 text-sm mt-1'>Tìm thấy {appointmentsData.totalElements} lịch hẹn</p>
        </div>

        <div className='divide-y divide-gray-200'>
          <AppointmentItem />
        </div>
      </div>
    </div>
  )
}
