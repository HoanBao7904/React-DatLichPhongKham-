import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import DoctersApi from 'src/apis/docter.api'
import ItemsBacSi from 'src/components/ItemsBacSi/ItemsBacSi'
// import useQueryParam from 'src/hooks/useQueryParam'

export default function XemBacSi() {
  const navigate = useNavigate()
  // const queryParams = useQueryParam()
  const { data } = useQuery({
    queryKey: ['api/doctors'],
    //truyền lên key khi URL thay đổi usequery mới nhận biết
    queryFn: () => {
      return DoctersApi.getDocters()
    }
  })
  // console.log(data)
  const doctors = data?.data.data

  const handleToAllDoctor = () => {
    navigate('/user/AllDoctor')
  }

  return (
    <div className='py-16 bg-gradient-to-b from-blue-50 to-cyan-100'>
      <div className='container mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-montserrat'>
            Đặt Lịch Khám{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200'>Trực Tuyến</span>
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Tìm Bác sĩ chính xác - Đặt lịch khám dễ dàng - Tiết kiệm thời gian chờ đợi
          </p>
        </div>

        {/* Info Card */}
        <div className='bg-gradient-to-r from-blue-300 to-cyan-100 rounded-2xl p-8 mb-12 shadow-xl'>
          <div className='flex flex-col lg:flex-row justify-between items-center'>
            <div className='text-left lg:w-2/3'>
              <h2 className='text-3xl font-bold text-gray-800 mb-4 flex items-center'>
                <span className='w-3 h-3 bg-cyan-200 rounded-full mr-3'></span>
                Đặt Khám Bác Sỹ Chuyên Khoa
              </h2>
              <p className='text-lg text-gray-700 leading-relaxed mb-4'>
                Phiếu khám kèm số thứ tự và thời gian của bạn được xác nhận ngay lập tức. Nhận thông báo trước khi đến
                khám và hướng dẫn chi tiết.
              </p>
              <div className='flex flex-wrap gap-3 mt-4'>
                <span className='flex items-center text-sm text-gray-600'>
                  <span className='w-2 h-2 bg-blue-400 rounded-full mr-2'></span>
                  Xác nhận tức thì
                </span>
                <span className='flex items-center text-sm text-gray-600'>
                  <span className='w-2 h-2 bg-blue-400 rounded-full mr-2'></span>
                  Nhắc lịch thông minh
                </span>
                <span className='flex items-center text-sm text-gray-600'>
                  <span className='w-2 h-2 bg-blue-400 rounded-full mr-2'></span>
                  Hỗ trợ 24/7
                </span>
              </div>
            </div>
            <div className='mt-6 lg:mt-0'>
              <button
                onClick={handleToAllDoctor}
                className='bg-white text-blue-400 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-cyan-300 flex items-center space-x-2'
              >
                <span>Xem Tất Cả Bác Sĩ</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className='mt-12'>
          <h3 className='text-2xl font-bold text-gray-800 mb-8 text-center'>
            Đội Ngũ Bác Sĩ <span className='text-blue-400'>Chuyên Nghiệp</span>
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {doctors &&
              doctors.map((docter) => (
                <div key={docter.id} className='flex justify-center'>
                  <ItemsBacSi docter={docter} />
                </div>
              ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className='text-center mt-12'>
          <button className='bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
            Tìm Kiếm Thêm Bác Sĩ
          </button>
        </div> */}
      </div>
    </div>
  )
}
