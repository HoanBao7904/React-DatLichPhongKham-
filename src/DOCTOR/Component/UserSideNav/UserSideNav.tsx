import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
// import { path } from 'src/contexts/path'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  // return (
  //   <div>
  //     <div className='flex items-center py-4 border-b border-b-gray-200'>
  //       <Link to='' className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black'>
  //         {/* <img src={profile?. || Userimg} alt='' /> */}
  //       </Link>
  //       <div className='flex-grow pl-4'>
  //         <div className='text-black mb-1 truncate text-left'>{profile?.fullName}</div>
  //         <Link to='' className='flex items-center capitalize text-gray-500'>
  //           Sửa hồ sơ
  //         </Link>
  //       </div>
  //     </div>
  //     <div className='mt-7'>
  //       <Link
  //         to='/doctor/doctorprofile'
  //         className='flex items-center capitalize text-black hover:text-orange transition-colors'
  //       >
  //         <div className='h-[22px] w-[22px] mr-3'>
  //           <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
  //         </div>
  //         <div>tài khoản của tôi</div>
  //       </Link>

  //       <Link
  //         to='/doctor/viewword'
  //         className='flex items-center capitalize text-black hover:text-orange transition-colors mt-4'
  //       >
  //         <div className='h-[22px] w-[22px] mr-3'>
  //           <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
  //         </div>
  //         <div>Xem lịch làm việc</div>
  //       </Link>
  //       <Link
  //         to='/doctor/appointment'
  //         className='flex items-center capitalize text-black hover:text-orange transition-colors mt-4'
  //       >
  //         <div className='h-[22px] w-[22px] mr-3'>
  //           <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
  //         </div>
  //         <div>Xem cuộc hẹn</div>
  //       </Link>

  //       <Link to='' className='flex items-center capitalize text-black hover:text-orange transition-colors mt-4'>
  //         <div className='h-[22px] w-[22px] mr-3'>
  //           <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
  //         </div>
  //         <div>Xem thông báo lịch hẹn</div>
  //       </Link>

  //       <Link to='' className='flex items-center capitalize text-black hover:text-orange transition-colors mt-4'>
  //         <div className='h-[22px] w-[22px] mr-3'>
  //           <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
  //         </div>
  //         <div>Xem thông tin khách hàng</div>
  //       </Link>
  //     </div>
  //   </div>
  // )
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
      {/* Profile Section */}
      <div className='flex items-center pb-6 border-b border-gray-200'>
        <div className='h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center'>
          <span className='text-blue-600 font-semibold text-lg'>{profile?.fullName?.charAt(0) || 'U'}</span>
        </div>
        <div className='flex-grow pl-4'>
          <div className='text-gray-900 font-semibold text-lg mb-1 truncate'>{profile?.fullName || 'Người dùng'}</div>
          <Link
            to='/doctor/profile/edit'
            className='flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium'
          >
            <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className='mt-6 space-y-3'>
        <Link
          to='/doctor/doctorprofile'
          className='flex items-center px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group'
        >
          <div className='h-6 w-6 mr-3 flex items-center justify-center text-blue-500'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </div>
          <span className='font-medium'>Tài khoản của tôi</span>
          <svg
            className='w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 transition-colors'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>

        <Link
          to='/doctor/viewword'
          className='flex items-center px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group'
        >
          <div className='h-6 w-6 mr-3 flex items-center justify-center text-blue-500'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </div>
          <span className='font-medium'>Xem lịch làm việc</span>
          <svg
            className='w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 transition-colors'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>

        <Link
          to='/doctor/appointment'
          className='flex items-center px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group'
        >
          <div className='h-6 w-6 mr-3 flex items-center justify-center text-blue-500'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </div>
          <span className='font-medium'>Xem cuộc hẹn</span>
          <svg
            className='w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 transition-colors'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>

        <Link
          to='/doctor/notifications'
          className='flex items-center px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group'
        >
          <div className='h-6 w-6 mr-3 flex items-center justify-center text-blue-500'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
          </div>
          <span className='font-medium'>Thông báo lịch hẹn</span>
          <svg
            className='w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 transition-colors'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>

        <Link
          to='/doctor/customers'
          className='flex items-center px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group'
        >
          <div className='h-6 w-6 mr-3 flex items-center justify-center text-blue-500'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
              />
            </svg>
          </div>
          <span className='font-medium'>Thông tin khách hàng</span>
          <svg
            className='w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 transition-colors'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>
      </div>

      {/* Active State Indicator (optional) */}
      <div className='mt-8 pt-6 border-t border-gray-200'>
        <div className='flex items-center text-sm text-gray-500'>
          <div className='w-2 h-2 bg-green-400 rounded-full mr-2'></div>
          <span>Trạng thái: Đang hoạt động</span>
        </div>
      </div>
    </div>
  )
}
