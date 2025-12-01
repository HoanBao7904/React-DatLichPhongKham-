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
          {/* {appointmentsData.data.map((appointment) => (
            <AppointmentItem key={appointment.id} appointment={appointment} />
          ))} */}
          <AppointmentItem />
        </div>
      </div>

      {/* Phân trang */}
      {/* <div className='mt-6 flex justify-between items-center'>
        <div className='text-sm text-gray-600'>
          Hiển thị {appointmentsData.size} trong tổng số {appointmentsData.totalElements} lịch hẹn
        </div>
        <div className='flex gap-2'>
          <button className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm'>
            Trước
          </button>
          <button className='px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm'>
            1
          </button>
          <button className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm'>
            Sau
          </button>
        </div>
      </div> */}
    </div>
  )
}

// function AppointmentItem({ appointment }) {
//   const formatDateTime = (dateTimeString) => {
//     const date = new Date(dateTimeString)
//     return {
//       date: date.toLocaleDateString('vi-VN'),
//       time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
//     }
//   }

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       CONFIRMED: { color: 'bg-green-100 text-green-800 border-green-200', text: 'Đã xác nhận' },
//       PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Chờ xác nhận' },
//       CANCELLED: { color: 'bg-red-100 text-red-800 border-red-200', text: 'Đã hủy' },
//       COMPLETED: { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Đã hoàn thành' }
//     }

//     const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800 border-gray-200', text: status }

//     return <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>{config.text}</span>
//   }

//   const datetime = formatDateTime(appointment.appointmentDateTime)

//   return (
//     <div className='p-6 hover:bg-gray-50 transition-colors duration-200'>
//       <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
//         {/* Thông tin chính */}
//         <div className='flex-1'>
//           <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-3'>
//             <h3 className='text-lg font-semibold text-gray-900'>Lịch hẹn #{appointment.id}</h3>
//             {getStatusBadge(appointment.status)}
//           </div>

//           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm'>
//             {/* Thời gian */}
//             <div className='flex items-center gap-2 text-gray-600'>
//               <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
//                 />
//               </svg>
//               <span className='font-medium'>Thời gian:</span>
//               <span>
//                 {datetime.date} lúc {datetime.time}
//               </span>
//             </div>

//             {/* Bác sĩ */}
//             <div className='flex items-center gap-2 text-gray-600'>
//               <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//                 />
//               </svg>
//               <span className='font-medium'>Bác sĩ:</span>
//               <span>{appointment.doctorFullName || 'Chưa phân công'}</span>
//             </div>

//             {/* Chuyên khoa */}
//             <div className='flex items-center gap-2 text-gray-600'>
//               <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
//                 />
//               </svg>
//               <span className='font-medium'>Chuyên khoa:</span>
//               <span>{appointment.doctorDepartmentName || 'Chưa xác định'}</span>
//             </div>

//             {/* Bệnh nhân */}
//             <div className='flex items-center gap-2 text-gray-600'>
//               <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//                 />
//               </svg>
//               <span className='font-medium'>Bệnh nhân:</span>
//               <span>{appointment.userFullName}</span>
//             </div>

//             {/* Số điện thoại */}
//             <div className='flex items-center gap-2 text-gray-600'>
//               <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
//                 />
//               </svg>
//               <span className='font-medium'>Điện thoại:</span>
//               <span>{appointment.userPhone}</span>
//             </div>

//             {/* Email */}
//             <div className='flex items-center gap-2 text-gray-600'>
//               <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
//                 />
//               </svg>
//               <span className='font-medium'>Email:</span>
//               <span className='truncate'>{appointment.userEmail}</span>
//             </div>
//           </div>

//           {/* Ghi chú */}
//           {appointment.note && (
//             <div className='mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200'>
//               <div className='flex items-start gap-2'>
//                 <svg
//                   className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0'
//                   fill='none'
//                   stroke='currentColor'
//                   viewBox='0 0 24 24'
//                 >
//                   <path
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth={2}
//                     d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
//                   />
//                 </svg>
//                 <div>
//                   <span className='text-sm font-medium text-blue-800'>Ghi chú:</span>
//                   <p className='text-sm text-blue-700 mt-1'>{appointment.note}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Actions */}
//         <div className='flex flex-col gap-2 lg:w-48'>
//           <button className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium'>
//             Xem chi tiết
//           </button>
//           {appointment.status === 'PENDING' && (
//             <button className='w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium'>
//               Hủy lịch hẹn
//             </button>
//           )}
//           <button className='w-full px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-sm font-medium'>
//             In phiếu hẹn
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
