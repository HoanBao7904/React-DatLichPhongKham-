import { useNavigate } from 'react-router-dom'
import type { Doctor } from 'src/types/docter.type'

interface Props {
  docter: Doctor
}

export default function ItemsBacSi({ docter }: Props) {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/user/${docter.id}`)
  }
  return (
    <div className='bg-white rounded-2xl border border-gray-200 flex flex-col items-center p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 max-w-[280px] w-full group cursor-pointer'>
      {/* Ảnh bác sĩ với hiệu ứng */}
      <div className='relative mb-4'>
        {docter.imageUrl ? (
          <img
            src={docter.imageUrl}
            alt={`Bác sĩ ${docter.fullName}`}
            className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-cyan-200 transition-colors duration-300'
          />
        ) : (
          <div className='rounded-full w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-white shadow-lg flex items-center justify-center'>
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

        <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-200 rounded-full flex items-center justify-center'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='w-4 h-4'>
            <path d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
        </div>
      </div>

      {/* Thông tin bác sĩ */}
      <div className='text-center space-y-2 w-full'>
        <h3 className='font-bold text-lg text-gray-800 group-hover:text-blue-500 transition-colors duration-300 line-clamp-1'>
          {docter.fullName}
        </h3>

        <span className='text-sm font-medium text-blue-400 bg-cyan-200 px-3 py-1 rounded-full inline-block'>
          {docter.departmentName}
        </span>

        <p className='text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[40px]'>{docter.description}</p>
      </div>

      {/* Nút Đặt lịch khám */}
      <button
        onClick={handleNavigate}
        className='w-full bg-gradient-to-r from-blue-400 to-cyan-200 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group-hover:from-[#DCEDC2] group-hover:to-cyan-200 group-hover:text-gray-400 flex items-center justify-center space-x-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
          />
        </svg>
        <span>Đặt Lịch Khám</span>
      </button>
    </div>
  )
}
