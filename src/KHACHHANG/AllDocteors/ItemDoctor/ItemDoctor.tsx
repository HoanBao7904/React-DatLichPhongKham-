import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/contanis/path'
import { AppContext } from 'src/contexts/app.context'
import type { Doctor } from 'src/types/docter.type'

interface Props {
  doctor: Doctor
}

export default function ItemDoctor({ doctor }: Props) {
  // const { id } = useParams()
  const { isAuthenticated } = useContext(AppContext)
  const context = useContext(AppContext)
  console.log(context)
  const navigate = useNavigate()
  const handleNavigate = () => {
    if (!isAuthenticated) {
      navigate(path.login)
    }
    navigate(`/user/${doctor.id}`)
  }

  return (
    <div className='bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 rounded-2xl p-8 grid grid-cols-12 gap-8 items-center hover:shadow-2xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-1'>
      {/* Avatar */}
      <div className='col-span-2 flex justify-center'>
        <div className='relative'>
          {doctor.imageUrl ? (
            <img
              src={doctor.imageUrl}
              alt={doctor.fullName}
              className='rounded-2xl w-24 h-24 object-cover border-4 border-white shadow-lg'
            />
          ) : (
            <div className='rounded-2xl w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-white shadow-lg flex items-center justify-center'>
              <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </div>
          )}

          {/* Online Status Badge */}
          <div
            className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white ${
              doctor.active ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></div>

          {/* Featured Badge */}
          {doctor.isFeatured && (
            <div className='absolute -top-2 -left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold'>
              ★ Nổi bật
            </div>
          )}
        </div>
      </div>

      {/* Doctor Info */}
      <div className='col-span-7'>
        <div className='flex items-center gap-3 mb-3'>
          <h3 className='font-bold text-2xl text-gray-900'>{doctor.fullName}</h3>
          {doctor.isFeatured && (
            <svg
              className='w-6 h-6 text-yellow-500 transform hover:scale-110 transition-transform'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
          )}
        </div>

        <div className='flex flex-wrap items-center gap-2 mb-4'>
          <span className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg'>
            {doctor.departmentName}
          </span>
          <span className='bg-gradient-to-r from-blue-500 to-cyan-300 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg'>
            {doctor.experienceYears} năm kinh nghiệm
          </span>
        </div>

        {/* Mô tả */}
        {doctor.description && (
          <p className='text-gray-600 text-sm mb-4 leading-relaxed bg-white/50 rounded-lg p-3 border border-gray-200'>
            {doctor.description}
          </p>
        )}

        {/* Thông tin liên hệ */}
        <div className='flex flex-wrap items-center gap-4 text-sm'>
          <div className='flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200'>
            <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
              />
            </svg>
            <span className='text-gray-700 font-medium'>{doctor.phone}</span>
          </div>

          <div className='flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200'>
            <svg className='w-4 h-4 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
            <span className='text-gray-700 font-medium  '>{doctor.email}</span>
          </div>

          {/* Chuyên môn */}
          {doctor.specializations && doctor.specializations.length > 0 && (
            <div className='flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200'>
              <svg className='w-4 h-4 text-purple-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                />
              </svg>
              <span className='text-gray-700 font-medium'>{doctor.specializations.length} chuyên môn</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='col-span-3 flex flex-col gap-4'>
        <button
          onClick={handleNavigate}
          type='button'
          className='bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed group'
          // disabled={!doctor.active}
        >
          <span className='flex items-center justify-center gap-2'>
            Đặt Khám
            <svg
              className='w-4 h-4 group-hover:translate-x-1 transition-transform'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
            </svg>
          </span>
        </button>

        {/* <button
        type='button'
        className='border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md'
      >
        Xem Hồ Sơ
      </button> */}
      </div>
    </div>
  )
}
