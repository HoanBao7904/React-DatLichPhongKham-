import { Link } from 'react-router-dom'

export default function UserSideNav() {
  return (
    <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
      {/* User Info Header */}
      <div className='bg-gradient-to-r from-blue-200 to-cyan-100 p-6'>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <div className='w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-white'>
              <span className='text-2xl font-bold text-[#2D5A3D]'>B</span>
            </div>
            <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-300 rounded-full border-2 border-white flex items-center justify-center'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='w-3 h-3'>
                <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z' />
              </svg>
            </div>
          </div>
          <div className='flex-grow'>
            <div className='text-lg font-bold text-gray-800'>bão</div>
            <Link
              to=''
              className='text-sm text-gray-600 hover:text-[#2D5A3D] transition-colors duration-300 flex items-center space-x-1'
            >
              <span>Sửa hồ sơ</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className='p-6 space-y-4'>
        <Link
          to=''
          className='flex items-center space-x-4 p-3 rounded-xl bg-[#f8fafc] hover:bg-gradient-to-r hover:from-blue-200 to-cyan-100 transition-all duration-300 group'
        >
          <div className='w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center group-hover:bg-white transition-colors duration-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-4 h-4 text-white group-hover:text-[#2D5A3D] transition-colors duration-300'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
          </div>
          <span className='font-medium text-gray-700 group-hover:text-gray-900'>Tài khoản của tôi</span>
        </Link>

        <Link
          to=''
          className='flex items-center space-x-4 p-3 rounded-xl bg-[#f8fafc] hover:bg-gradient-to-r hover:from-blue-200 to-cyan-100 transition-all duration-300 group'
        >
          <div className='w-8 h-8 rounded-full bg-orange-300 flex items-center justify-center group-hover:bg-white transition-colors duration-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-4 h-4 text-white group-hover:text-[#FF6B6B] transition-colors duration-300'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
          </div>
          <span className='font-medium text-gray-700 group-hover:text-gray-900'>Đổi mật khẩu</span>
        </Link>

        {/* Thêm các menu khác nếu cần */}
        <Link
          to='/user/reviews/me'
          className='flex items-center space-x-4 p-3 rounded-xl bg-[#f8fafc] hover:bg-gradient-to-r hover:from-blue-200 to-cyan-100 transition-all duration-300 group'
        >
          <div className='w-8 h-8 rounded-full bg-cyan-300 flex items-center justify-center group-hover:bg-white transition-colors duration-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-4 h-4 text-white group-hover:text-[#2D5A3D] transition-colors duration-300'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
              />
            </svg>
          </div>
          <span className='font-medium text-gray-700 group-hover:text-gray-900'>Lịch sử đánh giá</span>
        </Link>
      </div>
    </div>
  )
}
