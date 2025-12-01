// export default function BookingAppointment() {
//   // State giả lập
//   const selectedDoctor = {
//     id: 1,
//     name: 'BS. Ngô Quang Trường',
//     department: 'Khoa Nội',
//     experience: 5,
//     image: null
//   }

//   const availableSlots = [
//     { date: '2025-07-22', time: '08:00', available: true },
//     { date: '2025-07-22', time: '08:30', available: true },
//     { date: '2025-07-22', time: '09:00', available: false },
//     { date: '2025-07-22', time: '09:30', available: true },
//     { date: '2025-07-22', time: '10:00', available: false },
//     { date: '2025-07-22', time: '14:00', available: true },
//     { date: '2025-07-22', time: '14:30', available: false }, // Giờ này đã bận
//     { date: '2025-07-22', time: '15:00', available: true },
//     { date: '2025-07-22', time: '15:30', available: true },
//     { date: '2025-07-22', time: '16:00', available: true }
//   ]

//   return (
//     <div className='min-h-screen bg-gray-50 py-8'>
//       <div className='max-w-6xl mx-auto px-4'>
//         {/* Header */}
//         <div className='text-center mb-8'>
//           <h1 className='text-3xl font-bold text-gray-900 mb-2'>Đặt lịch khám bệnh</h1>
//           <p className='text-gray-600'>Chọn bác sĩ và khung giờ phù hợp với bạn</p>
//         </div>

//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
//           {/* Phần chính - Form đặt lịch */}
//           <div className='lg:col-span-2'>
//             <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
//               {/* Bước 1: Chọn bác sĩ */}
//               <div className='p-6 border-b border-gray-200'>
//                 <div className='flex items-center mb-4'>
//                   <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm'>
//                     1
//                   </div>
//                   <h2 className='text-xl font-semibold text-gray-900 ml-3'>Chọn bác sĩ</h2>
//                 </div>

//                 <div className='space-y-4'>
//                   {/* Bác sĩ đã chọn */}
//                   <div className='flex items-center p-4 border-2 border-blue-500 rounded-lg bg-blue-50'>
//                     <div className='flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
//                       <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                         <path
//                           strokeLinecap='round'
//                           strokeLinejoin='round'
//                           strokeWidth={2}
//                           d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//                         />
//                       </svg>
//                     </div>
//                     <div className='ml-4 flex-1'>
//                       <div className='flex items-center justify-between'>
//                         <h3 className='font-semibold text-gray-900 text-lg'>{selectedDoctor.name}</h3>
//                         <span className='bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full'>
//                           {selectedDoctor.department}
//                         </span>
//                       </div>
//                       <p className='text-gray-600 mt-1'>{selectedDoctor.experience} năm kinh nghiệm</p>
//                     </div>
//                     <button className='ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium'>Thay đổi</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Bước 2: Chọn khung giờ */}
//               <div className='p-6 border-b border-gray-200'>
//                 <div className='flex items-center mb-6'>
//                   <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm'>
//                     2
//                   </div>
//                   <h2 className='text-xl font-semibold text-gray-900 ml-3'>Chọn khung giờ</h2>
//                 </div>

//                 {/* Chọn ngày */}
//                 <div className='mb-6'>
//                   <label className='block text-sm font-medium text-gray-700 mb-3'>Chọn ngày khám</label>
//                   <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
//                     {['2025-07-22', '2025-07-23', '2025-07-24', '2025-07-25'].map((date) => (
//                       <button
//                         key={date}
//                         className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
//                           date === '2025-07-22'
//                             ? 'border-blue-500 bg-blue-50 text-blue-700'
//                             : 'border-gray-300 hover:border-blue-500 text-gray-700'
//                         }`}
//                       >
//                         <div className='font-medium'>
//                           {new Date(date).toLocaleDateString('vi-VN', { weekday: 'short' })}
//                         </div>
//                         <div className='text-lg font-semibold'>{new Date(date).getDate()}</div>
//                         <div className='text-xs text-gray-500'>
//                           {new Date(date).toLocaleDateString('vi-VN', { month: 'short' })}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Khung giờ có sẵn */}
//                 <div>
//                   <label className='block text-sm font-medium text-gray-700 mb-3'>
//                     Khung giờ có sẵn - <span className='text-green-600'>22/07/2025</span>
//                   </label>

//                   {/* Thông báo lỗi nếu chọn giờ đã bận */}
//                   <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4 hidden' id='errorMessage'>
//                     <div className='flex items-center'>
//                       <svg
//                         className='w-5 h-5 text-red-600 flex-shrink-0'
//                         fill='none'
//                         stroke='currentColor'
//                         viewBox='0 0 24 24'
//                       >
//                         <path
//                           strokeLinecap='round'
//                           strokeLinejoin='round'
//                           strokeWidth={2}
//                           d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
//                         />
//                       </svg>
//                       <div className='ml-3'>
//                         <h3 className='text-sm font-medium text-red-800'>Bác sĩ đã có lịch hẹn tại khung giờ này</h3>
//                         <p className='text-sm text-red-700 mt-1'>Vui lòng chọn khung giờ khác</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
//                     {availableSlots.map((slot, index) => (
//                       <button
//                         key={index}
//                         className={`p-3 border rounded-lg text-center transition-all duration-200 ${
//                           !slot.available
//                             ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
//                             : slot.time === '14:30'
//                               ? 'border-red-300 bg-red-50 text-red-700 hover:border-red-400'
//                               : 'border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50'
//                         }`}
//                         disabled={!slot.available}
//                         onClick={() => {
//                           if (slot.time === '14:30') {
//                             document.getElementById('errorMessage').classList.remove('hidden')
//                           } else {
//                             document.getElementById('errorMessage').classList.add('hidden')
//                           }
//                         }}
//                       >
//                         <div className='font-medium text-sm'>{slot.time}</div>
//                         {!slot.available && <div className='text-xs text-gray-500 mt-1'>Đã đặt</div>}
//                         {slot.available && slot.time === '14:30' && (
//                           <div className='text-xs text-red-600 mt-1'>Đã bận</div>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Bước 3: Thông tin & Ghi chú */}
//               <div className='p-6'>
//                 <div className='flex items-center mb-6'>
//                   <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm'>
//                     3
//                   </div>
//                   <h2 className='text-xl font-semibold text-gray-900 ml-3'>Thông tin bổ sung</h2>
//                 </div>

//                 <div className='space-y-6'>
//                   {/* Thông tin bệnh nhân */}
//                   <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                     <div>
//                       <label className='block text-sm font-medium text-gray-700 mb-2'>Họ và tên *</label>
//                       <input
//                         type='text'
//                         className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                         placeholder='Nhập họ và tên'
//                         defaultValue='nguyen hoan bao'
//                       />
//                     </div>
//                     <div>
//                       <label className='block text-sm font-medium text-gray-700 mb-2'>Số điện thoại *</label>
//                       <input
//                         type='tel'
//                         className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                         placeholder='Nhập số điện thoại'
//                         defaultValue='0999999999'
//                       />
//                     </div>
//                     <div className='md:col-span-2'>
//                       <label className='block text-sm font-medium text-gray-700 mb-2'>Email *</label>
//                       <input
//                         type='email'
//                         className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                         placeholder='Nhập địa chỉ email'
//                         defaultValue='phuc22.9.1@gmail.com'
//                       />
//                     </div>
//                   </div>

//                   {/* Ghi chú */}
//                   <div>
//                     <label className='block text-sm font-medium text-gray-700 mb-2'>Ghi chú cho bác sĩ</label>
//                     <textarea
//                       rows={3}
//                       className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                       placeholder='Mô tả triệu chứng hoặc ghi chú cho bác sĩ...'
//                       defaultValue='Khám tổng quát, cần tư vấn thêm1'
//                     ></textarea>
//                   </div>

//                   {/* Nút đặt lịch */}
//                   <div className='pt-4'>
//                     <button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 shadow-sm'>
//                       Xác nhận đặt lịch
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar - Thông tin xác nhận */}
//           <div className='lg:col-span-1'>
//             <div className='bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8'>
//               <div className='p-6 border-b border-gray-200'>
//                 <h2 className='text-xl font-semibold text-gray-900'>Tóm tắt lịch hẹn</h2>
//               </div>

//               <div className='p-6 space-y-4'>
//                 {/* Bác sĩ */}
//                 <div className='flex items-start space-x-3'>
//                   <div className='flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
//                     <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className='font-semibold text-gray-900 text-sm'>Bác sĩ</h4>
//                     <p className='text-gray-700 mt-1'>{selectedDoctor.name}</p>
//                     <p className='text-gray-600 text-xs mt-1'>{selectedDoctor.department}</p>
//                   </div>
//                 </div>

//                 {/* Thời gian - Hiển thị khi chọn */}
//                 <div className='flex items-start space-x-3'>
//                   <div className='flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
//                     <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className='font-semibold text-gray-900 text-sm'>Thời gian</h4>
//                     <p className='text-gray-700 mt-1'>Chưa chọn giờ</p>
//                     <p className='text-blue-600 text-xs mt-1'>Vui lòng chọn khung giờ phù hợp</p>
//                   </div>
//                 </div>

//                 {/* Thông báo quan trọng */}
//                 <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
//                   <div className='flex'>
//                     <svg
//                       className='w-5 h-5 text-yellow-600 flex-shrink-0'
//                       fill='none'
//                       stroke='currentColor'
//                       viewBox='0 0 24 24'
//                     >
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
//                       />
//                     </svg>
//                     <div className='ml-3'>
//                       <h3 className='text-sm font-medium text-yellow-800'>Lưu ý quan trọng</h3>
//                       <div className='mt-2 text-sm text-yellow-700'>
//                         <ul className='list-disc list-inside space-y-1'>
//                           <li>Chỉ hiển thị khung giờ trống</li>
//                           <li>Vui lòng đến trước 15 phút</li>
//                           <li>Mang theo CMND/CCCD và thẻ BHYT</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
