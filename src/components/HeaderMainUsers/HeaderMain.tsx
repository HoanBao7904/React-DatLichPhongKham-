// import { dimensionValueTypes } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Popover from '../Popover'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import { path } from 'src/contanis/path'
import AuthApi from 'src/apis/auth.api'

export default function HeaderMain() {
  const navigate = useNavigate()
  const { SetIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  // const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: () => AuthApi.Logout(),
    onSuccess: () => {
      localStorage.removeItem('token') // hoặc sessionStorag
      SetIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const handleDatKham = () => {
    navigate('/user/AllDoctor')
  }

  return (
    <div className='py-3 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo và Hotline */}
        <div className='flex items-center space-x-8'>
          <Link to='/' className='flex items-center space-x-3'>
            <img
              src='/src/imgs/logo3.png'
              alt='MedPro Logo'
              className='h-16 w-16 transition-transform hover:scale-105 rounded-[5px]'
            />
            <span className='text-xl font-bold text-white hidden md:block'>MEDPRO</span>
          </Link>

          <div className='flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-white/30'>
            <img src='/src/imgs/help-desk.png' alt='Hỗ trợ' className='w-8 h-8 mr-3' />
            <div>
              <p className='text-xs text-blue-100 font-medium'>Hỗ Trợ Đặt Khám</p>
              <p className='text-lg font-bold text-white'>1900 2115</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className='flex items-center space-x-4'>
          {/* Đặt Lịch Khám Dropdown */}
          <Popover
            className='flex items-center cursor-pointer transition-colors'
            renderPopover={
              <div className='bg-white shadow-xl rounded-lg border border-gray-100 min-w-48'>
                <div className='flex flex-col py-2'>
                  <button
                    onClick={handleDatKham}
                    className='py-3 px-4 hover:bg-blue-50 text-gray-700 font-medium transition-colors text-left'
                  >
                    Đặt Khám Theo Bác Sĩ
                  </button>
                  <button
                    onClick={handleDatKham}
                    className='py-3 px-4 hover:bg-blue-50 text-gray-700 font-medium transition-colors text-left'
                  >
                    Đặt Khám Theo Khoa
                  </button>
                </div>
              </div>
            }
          >
            <div className='flex items-center space-x-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-shadow'>
              <span className='font-semibold text-white'>Đặt Lịch Khám</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='size-5 text-white'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
          </Popover>

          {/* Thông báo */}
          <Popover
            className='flex items-center cursor-pointer transition-colors'
            renderPopover={
              <div className='bg-white shadow-xl rounded-lg border border-gray-100 min-w-48'>
                <div className='p-4 text-center text-gray-500'>Không có thông báo mới</div>
              </div>
            }
          >
            <div className='p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-shadow relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='size-6 text-white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                />
              </svg>
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white'></div>
            </div>
          </Popover>

          {/* User Section */}
          {isAuthenticated ? (
            <Popover
              className='flex items-center cursor-pointer transition-colors'
              renderPopover={
                <div className='bg-white shadow-xl rounded-lg border border-gray-100 min-w-48 py-2'>
                  <Link
                    to='/user/user-profile'
                    className='block py-3 px-4 hover:bg-blue-50 text-gray-700 font-medium transition-colors'
                  >
                    👤 Tài Khoản của tôi
                  </Link>
                  <Link
                    to='/user/viewappointmentkh'
                    className='block py-3 px-4 hover:bg-blue-50 text-gray-700 font-medium transition-colors'
                  >
                    ✒ Xem lịch hẹn
                  </Link>
                  <Link
                    onClick={handleLogout}
                    to={path.login}
                    className='block py-3 px-4 hover:bg-red-50 text-gray-700 font-medium transition-colors'
                  >
                    🚪 Đăng xuất
                  </Link>
                </div>
              }
            >
              <div className='flex items-center space-x-3 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-shadow'>
                <img
                  src='https://getwallpapers.com/wallpaper/full/8/8/5/700363-large-cr7-2018-wallpaper-3840x2160-for-mobile-hd.jpg'
                  alt='avatar'
                  className='w-10 h-10 rounded-full border-2 border-white/50'
                />
                <span className='font-semibold text-white max-w-24 truncate'>{profile?.userName}</span>
              </div>
            </Popover>
          ) : (
            <div className='flex items-center space-x-4'>
              <Link
                to={path.register}
                className='font-semibold text-white hover:text-blue-100 transition-colors px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:shadow-sm'
              >
                Đăng ký
              </Link>
              <div className='border-r-2 border-white/30 h-6' />
              <Link
                to={path.login}
                className='font-semibold text-white hover:text-blue-100 transition-colors px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md hover:bg-white/30'
              >
                Đăng Nhập
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
