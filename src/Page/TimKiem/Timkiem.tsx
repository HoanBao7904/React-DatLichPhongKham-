import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Timkiem() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Mapping giữa tên tag và ID khoa
  const departmentTags = [
    { name: 'Bác sĩ tim mạch', id: 1 }, // Giả sử ID tim mạch là 1
    { name: 'Nha khoa', id: 2 },
    { name: 'Da liễu', id: 3 },
    { name: 'Nhi khoa', id: 4 },
    { name: 'Khám tổng quát', id: 5 },
    { name: 'Xét nghiệm', id: 6 },
    { name: 'Khoa Nội', id: 1 } // "Khoa Nội" có ID là 1
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Kiểm tra nếu searchTerm là tên khoa thì chuyển thành ID
      const matchedDept = departmentTags.find((dept) => dept.name.toLowerCase() === searchTerm.trim().toLowerCase())

      if (matchedDept) {
        // Nếu là tên khoa: điều hướng bằng dept
        navigate(`/user/AllDoctor?dept=${matchedDept.id}`)
      } else {
        // Nếu là tên bác sĩ: điều hướng bằng keyword
        navigate(`/user/AllDoctor?keyword=${encodeURIComponent(searchTerm.trim())}`)
      }
    }
  }

  const handleQuickSearch = (tag: { name: string; id: number }) => {
    // Khi nhấn vào tag nhanh, điều hướng bằng ID khoa
    navigate(`/user/AllDoctor?dept=${tag.id}`)
  }

  return (
    <div className='bg-[url("/src/imgs/banner.jpg")] h-[600px] bg-cover bg-center relative'>
      {/* Overlay gradient để text dễ đọc hơn */}
      <div className='absolute inset-0 bg-gradient-to-r from-[#DCEDC2]/70 to-neutral-400/50'></div>
      <div className='relative container mx-auto px-4 h-full flex flex-col justify-center'>
        {/* Main Heading */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-montserrat drop-shadow-lg'>
            Kết Nối Với
            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#DCEDC2] to-[#FFDBB5] mt-2'>
              Dịch Vụ Y Tế Chất Lượng
            </span>
          </h1>
          <p className='text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md'>
            Tìm kiếm bác sĩ, đặt lịch khám và nhận tư vấn sức khỏe từ các chuyên gia hàng đầu
          </p>
        </div>
        {/* Search Section */}
        <div className='max-w-4xl mx-auto w-full'>
          {/* Search Box */}
          <form onSubmit={handleSearch} className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-200 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200'></div>
            <div className='relative'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Tìm kiếm bác sĩ, chuyên khoa, bệnh viện...'
                className='w-full px-8 py-5 text-lg rounded-2xl border-2 border-white/30 bg-white shadow-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500 pr-16'
              />
              <button
                type='submit'
                className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-200 text-white p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </form>
          {/* Quick Search Tags */}
          <div className='flex flex-wrap justify-center gap-3 mt-6'>
            {departmentTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(tag)}
                className='px-4 py-2 bg-white rounded-full text-gray-700 font-medium hover:bg-white hover:text-[#2D5A3D] hover:shadow-lg transition-all duration-300 border border-white/30 hover:border-[#DCEDC2] cursor-pointer'
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        {/* Stats Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16'>
          <div className='text-center text-white'>
            <div className='text-3xl font-bold mb-2 drop-shadow-md'>50</div>
            <div className='text-white/80 font-medium'>Bác Sĩ Chuyên Khoa</div>
          </div>
          <div className='text-center text-white'>
            <div className='text-3xl font-bold mb-2 drop-shadow-md'>2</div>
            <div className='text-white/80 font-medium'>Phòng Khám</div>
          </div>
          <div className='text-center text-white'>
            <div className='text-3xl font-bold mb-2 drop-shadow-md'>1000+</div>
            <div className='text-white/80 font-medium'>Bệnh Nhân Hài Lòng</div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-white rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white rounded-full mt-2'></div>
        </div>
      </div>
    </div>
  )
}
