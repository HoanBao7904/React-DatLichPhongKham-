import { useQuery } from '@tanstack/react-query'
import DePartMentsApi from 'src/apis/department.api'
import ItemKhoa from 'src/components/ItemsKhoa'
import useQueryParam from 'src/hooks/useQueryParam'

export default function XemKhoa() {
  const queryParams = useQueryParam()
  const { data } = useQuery({
    queryKey: ['api/departments', queryParams],
    //truyền lên key khi URL thay đổi usequery mới nhận biết
    queryFn: () => {
      return DePartMentsApi.getDepartment(queryParams)
    }
  })
  // console.log(data)
  const departMent = data?.data.data
  return (
    <div className='py-16 bg-gradient-to-b from-[#f8fafc] to-white'>
      <div className='container mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-montserrat'>
            Đặt Lịch Theo{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B]'>
              Chuyên Khoa
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Khám phá danh sách bác sĩ, bệnh viện, phòng khám theo từng chuyên khoa y tế
          </p>
        </div>

        {/* Department Grid */}
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
            {departMent &&
              departMent.map((departMent) => (
                <div key={departMent.id} className='flex justify-center'>
                  <ItemKhoa departMent={departMent} />
                </div>
              ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center mt-12'>
          <button className='bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto'>
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
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
            <span>Xem Tất Cả Chuyên Khoa</span>
          </button>
        </div>
      </div>
    </div>
  )
}
