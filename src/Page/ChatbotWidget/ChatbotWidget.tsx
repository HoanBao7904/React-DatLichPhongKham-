// ChatbotWidget.tsx (Tailwind version)
import React, { useState } from 'react'

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-3 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-pulse'
      >
        <span className='absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full animate-bounce'>
          HOT
        </span>
        <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path d='M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z' fill='white' />
          </svg>
        </div>
        <span className='font-semibold text-sm'>Hỗ trợ nhanh</span>
      </button>

      {/* Popup */}
      {isOpen && (
        <div className='absolute bottom-16 right-0 w-96 bg-white rounded-xl shadow-2xl overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5'>
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Đặt lịch khám trước có bề đến trước</h3>
                <div className='flex items-baseline gap-2'>
                  <span className='text-2xl font-bold text-yellow-300'>Giảm đến 30%</span>
                  <span className='text-sm opacity-90'>(Tối đa 50K)</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className='text-2xl hover:opacity-80'>
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='p-5'>
            {/* Promo code */}
            <div className='mb-6'>
              <div className='text-sm text-gray-600 mb-2'>Nhập mã</div>
              <div className='flex gap-3 mb-2'>
                <input
                  type='text'
                  value='BAKIKOPRO'
                  readOnly
                  className='flex-1 px-4 py-3 border-2 border-dashed border-blue-500 rounded-lg bg-white text-blue-500 font-semibold text-center tracking-wide'
                />
                <button className='px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors'>
                  Copy
                </button>
              </div>
              <div className='text-xs text-gray-500 text-center'>Sao chép và sử dụng khi đặt lịch</div>
            </div>

            {/* Divider */}
            <hr className='my-6' />

            {/* Featured clinics */}
            <div className='mb-6'>
              <h4 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <span>🏥</span>
                CƠ SỞ Y TẾ NỔI BẬT TRONG THÁNG
              </h4>

              {/* Clinic list - bạn có thể map data ở đây */}
              <div className='space-y-3'>
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className='border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all'
                  >
                    <div className='font-semibold text-gray-800 mb-1'>Bệnh viện Đa khoa MEDLATEC</div>
                    <div className='text-sm text-gray-600 mb-3'>Đa khoa</div>
                    <button className='w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors'>
                      Đặt lịch ngay
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex gap-3'>
              <button className='flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2'>
                📞 Gọi tư vấn ngay
              </button>
              <button className='flex-1 py-3 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2'>
                💬 Chat với bác sĩ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatbotWidget
