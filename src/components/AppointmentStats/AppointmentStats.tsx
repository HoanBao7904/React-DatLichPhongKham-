import React from 'react'
import type { AppointmentStatsProps } from 'src/types/viewAppointmentKH.type'

const AppointmentStats: React.FC<AppointmentStatsProps> = ({ data, userReviewsCount }) => {
  const confirmedCount = data.filter((item) => item.status === 'CONFIRMED').length
  const pendingCount = data.filter((item) => item.status === 'PENDING').length
  const completedCount = data.filter((item) => item.status === 'COMPLETED').length

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='text-sm font-medium text-gray-500'>Đã xác nhận</div>
        <div className='text-2xl font-bold text-green-600'>{confirmedCount}</div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='text-sm font-medium text-gray-500'>Chờ thanh toán</div>
        <div className='text-2xl font-bold text-yellow-600'>{pendingCount}</div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='text-sm font-medium text-gray-500'>Đã hoàn thành</div>
        <div className='text-2xl font-bold text-blue-600'>{completedCount}</div>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='text-sm font-medium text-gray-500'>Đã đánh giá</div>
        <div className='text-2xl font-bold text-purple-600'>{userReviewsCount}</div>
        <div className='text-xs text-gray-500 mt-1'>
          {userReviewsCount} / {completedCount} hoàn thành
        </div>
      </div>
    </div>
  )
}

export default AppointmentStats
