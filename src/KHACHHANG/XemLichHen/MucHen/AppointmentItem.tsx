export default function AppointmentItem() {
  // const formatDateTime = (dateTimeString) => {
  //   const date = new Date(dateTimeString)
  //   return {
  //     date: date.toLocaleDateString('vi-VN'),
  //     time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  //   }
  // }

  // const getStatusBadge = (status) => {
  //   const statusConfig = {
  //     CONFIRMED: { color: 'bg-green-100 text-green-800 border-green-200', text: 'Đã xác nhận' },
  //     PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Chờ xác nhận' },
  //     CANCELLED: { color: 'bg-red-100 text-red-800 border-red-200', text: 'Đã hủy' },
  //     COMPLETED: { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Đã hoàn thành' }
  //   }

  //   const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800 border-gray-200', text: status }

  //   return <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>{config.text}</span>
  // }

  // const datetime = formatDateTime(appointment.appointmentDateTime)

  return (
    <div className='p-6 hover:bg-gray-50 transition-colors duration-200'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        {/* Thông tin chính */}
        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-3'>
            <h3 className='text-lg font-semibold text-gray-900'>Lịch hẹn #</h3>
            {/* {getStatusBadge(appointment.status)} */}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm'>
            {/* Thời gian */}
            <div className='flex items-center gap-2 text-gray-600'>
              <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <span className='font-medium'>Thời gian:</span>
              <span>{/* {datetime.date} lúc {datetime.time} */}</span>
            </div>

            {/* Bác sĩ */}
            <div className='flex items-center gap-2 text-gray-600'>
              <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              <span className='font-medium'>Bác sĩ:</span>
              {/* <span>{appointment.doctorFullName || 'Chưa phân công'}</span> */}
            </div>

            {/* Chuyên khoa */}
            <div className='flex items-center gap-2 text-gray-600'>
              <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                />
              </svg>
              <span className='font-medium'>Chuyên khoa:</span>
              {/* <span>{appointment.doctorDepartmentName || 'Chưa xác định'}</span> */}
            </div>

            {/* Bệnh nhân */}
            <div className='flex items-center gap-2 text-gray-600'>
              <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              <span className='font-medium'>Bệnh nhân:</span>
              {/* <span>{appointment.userFullName}</span> */}
            </div>

            {/* Số điện thoại */}
            <div className='flex items-center gap-2 text-gray-600'>
              <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                />
              </svg>
              <span className='font-medium'>Điện thoại:</span>
              {/* <span>{appointment.userPhone}</span> */}
            </div>

            {/* Email */}
            <div className='flex items-center gap-2 text-gray-600'>
              <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
              <span className='font-medium'>Email:</span>
              {/* <span className='truncate'>{appointment.userEmail}</span> */}
            </div>
          </div>

          {/* Ghi chú */}

          <div className='mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200'>
            <div className='flex items-start gap-2'>
              <svg
                className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                />
              </svg>
              <div>
                <span className='text-sm font-medium text-blue-800'>Ghi chú:</span>
                {/* <p className='text-sm text-blue-700 mt-1'>{appointment.note}</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex flex-col gap-2 lg:w-48'>
          <button className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium'>
            Xem chi tiết
          </button>
          {/* {appointment.status === 'PENDING' && ( */}
          <button className='w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium'>
            Hủy lịch hẹn
          </button>
          {/* )} */}
        </div>
      </div>
    </div>
  )
}
