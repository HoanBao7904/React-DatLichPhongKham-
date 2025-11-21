import { useQuery } from '@tanstack/react-query'
import DoctersApi from 'src/apis/docter.api'
import ItemsBacSi from 'src/components/ItemsBacSi/ItemsBacSi'
import useQueryParam from 'src/hooks/useQueryParam'

export default function XemBacSi() {
  const queryParams = useQueryParam()
  const { data } = useQuery({
    queryKey: ['api/doctors', queryParams],
    //truyền lên key khi URL thay đổi usequery mới nhận biết
    queryFn: () => {
      return DoctersApi.getDocters(queryParams)
    }
  })
  // console.log(data)
  const doctors = data?.data.data
  // return (
  //   <div className='py-6'>
  //     <div className='items-center'>
  //       <h1>Đặt lịch khám trực tuyến</h1>
  //       <p>Tìm Bác sĩ chính xác - Đặt lịch khám dễ dàng</p>
  //     </div>
  //     <div className='flex justify-between'>
  //       <div className='text-left p-[4px]'>
  //         <h2>Đặt Khám Bác Sỹ</h2>
  //         <p>Phiếu khám kèm số thứ tự và thời gian của bạn được xác nhận.</p>
  //       </div>
  //       <div>
  //         <button className=''>Xem Thêm</button>
  //       </div>
  //     </div>

  //     <div className='mt-6 grid grid-cols-5 gap-1'>
  //       {doctors &&
  //         doctors.map((docter) => (
  //           <div className='col-span-1' key={docter.id}>
  //             <ItemsBacSi docter={docter} />
  //           </div>
  //         ))}
  //     </div>
  //   </div>
  // )
  return (
    <div className='py-16 bg-gradient-to-b from-white to-[#f8fafc]'>
      <div className='container mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-montserrat'>
            Đặt Lịch Khám{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B]'>
              Trực Tuyến
            </span>
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Tìm Bác sĩ chính xác - Đặt lịch khám dễ dàng - Tiết kiệm thời gian chờ đợi
          </p>
        </div>

        {/* Info Card */}
        <div className='bg-gradient-to-r from-[#DCEDC2] to-[#FFDBB5] rounded-2xl p-8 mb-12 shadow-xl'>
          <div className='flex flex-col lg:flex-row justify-between items-center'>
            <div className='text-left lg:w-2/3'>
              <h2 className='text-3xl font-bold text-gray-800 mb-4 flex items-center'>
                <span className='w-3 h-3 bg-[#FF6B6B] rounded-full mr-3'></span>
                Đặt Khám Bác Sỹ Chuyên Khoa
              </h2>
              <p className='text-lg text-gray-700 leading-relaxed mb-4'>
                Phiếu khám kèm số thứ tự và thời gian của bạn được xác nhận ngay lập tức. Nhận thông báo trước khi đến
                khám và hướng dẫn chi tiết.
              </p>
              <div className='flex flex-wrap gap-3 mt-4'>
                <span className='flex items-center text-sm text-gray-600'>
                  <span className='w-2 h-2 bg-[#2D5A3D] rounded-full mr-2'></span>
                  Xác nhận tức thì
                </span>
                <span className='flex items-center text-sm text-gray-600'>
                  <span className='w-2 h-2 bg-[#2D5A3D] rounded-full mr-2'></span>
                  Nhắc lịch thông minh
                </span>
                <span className='flex items-center text-sm text-gray-600'>
                  <span className='w-2 h-2 bg-[#2D5A3D] rounded-full mr-2'></span>
                  Hỗ trợ 24/7
                </span>
              </div>
            </div>
            <div className='mt-6 lg:mt-0'>
              <button className='bg-white text-[#2D5A3D] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#2D5A3D] flex items-center space-x-2'>
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
            Đội Ngũ Bác Sĩ <span className='text-[#FF6B6B]'>Chuyên Nghiệp</span>
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
        <div className='text-center mt-12'>
          <button className='bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
            Tìm Kiếm Thêm Bác Sĩ
          </button>
        </div>
      </div>
    </div>
  )
}
