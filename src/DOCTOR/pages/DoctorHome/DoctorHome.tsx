export default function DoctorHome1() {
  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Welcome Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Xin chào, Bác sĩ Hải!</h1>
          <p className='mt-2 text-gray-600'>Hôm nay là Thứ Tư, 27/11/2025</p>
        </div>

        {/* Thống kê nhanh */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-blue-100 rounded-lg'>{/* <Calendar className='w-6 h-6 text-blue-600' /> */}</div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Lịch hẹn hôm nay</p>
                <p className='text-2xl font-bold text-gray-900'>8</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-green-100 rounded-lg'>{/* <Clock className='w-6 h-6 text-green-600' /> */}</div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Đang chờ khám</p>
                <p className='text-2xl font-bold text-gray-900'>3</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-orange-100 rounded-lg'>{/* <Users className='w-6 h-6 text-orange-600' /> */}</div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Bệnh nhân tháng</p>
                <p className='text-2xl font-bold text-gray-900'>45</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-3 bg-purple-100 rounded-lg'>{/* <Star className='w-6 h-6 text-purple-600' /> */}</div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Đánh giá</p>
                <p className='text-2xl font-bold text-gray-900'>4.8/5</p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Lịch hẹn sắp tới */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-xl font-semibold text-gray-900'>Lịch hẹn sắp tới</h2>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  {/* Appointment items */}
                  <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center'>
                        <span className='font-semibold'>NB</span>
                      </div>
                      <div>
                        <p className='font-medium text-gray-900'>Nguyễn Văn A</p>
                        <p className='text-sm text-gray-500'>Khám tổng quát</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-gray-900'>14:30</p>
                      <p className='text-sm text-green-600'>Đã xác nhận</p>
                    </div>
                  </div>

                  {/* More appointments... */}
                </div>
                <button className='w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200'>
                  Xem tất cả lịch hẹn
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions & Thông báo */}
          <div className='space-y-6'>
            {/* Quick Actions */}
            <div className='bg-white rounded-lg shadow'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-xl font-semibold text-gray-900'>Thao tác nhanh</h2>
              </div>
              <div className='p-6'>
                <div className='grid grid-cols-2 gap-4'>
                  <button className='p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'>
                    {/* <Calendar className='w-6 h-6 text-blue-600 mx-auto mb-2' /> */}
                    <span className='text-sm font-medium text-gray-900'>Lịch làm việc</span>
                  </button>
                  <button className='p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'>
                    {/* <Users className='w-6 h-6 text-green-600 mx-auto mb-2' /> */}
                    <span className='text-sm font-medium text-gray-900'>Bệnh nhân</span>
                  </button>
                  <button className='p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors'>
                    {/* <FileText className='w-6 h-6 text-orange-600 mx-auto mb-2' /> */}
                    <span className='text-sm font-medium text-gray-900'>Hồ sơ</span>
                  </button>
                  <button className='p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors'>
                    {/* <Settings className='w-6 h-6 text-purple-600 mx-auto mb-2' /> */}
                    <span className='text-sm font-medium text-gray-900'>Cài đặt</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Thông báo mới */}
            <div className='bg-white rounded-lg shadow'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-xl font-semibold text-gray-900'>Thông báo</h2>
              </div>
              <div className='p-6'>
                <div className='space-y-3'>
                  <div className='p-3 bg-blue-50 rounded-lg'>
                    <p className='text-sm font-medium text-gray-900'>Lịch hẹn mới</p>
                    <p className='text-xs text-gray-500'>Bệnh nhân Nguyễn Văn B đặt lịch lúc 15:00</p>
                  </div>
                  <div className='p-3 bg-yellow-50 rounded-lg'>
                    <p className='text-sm font-medium text-gray-900'>Nhắc nhở</p>
                    <p className='text-xs text-gray-500'>Cập nhật lịch làm việc tuần tới</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lịch làm việc tuần */}
        <div className='mt-8 bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>Lịch làm việc tuần này</h2>
          </div>
          <div className='p-6'>
            {/* Weekly schedule view */}
            <div className='grid grid-cols-7 gap-4 text-center'>
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                <div key={day} className='p-3 border border-gray-200 rounded-lg'>
                  <p className='font-medium text-gray-900'>{day}</p>
                  <p className='text-sm text-gray-500'>8h-17h</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
