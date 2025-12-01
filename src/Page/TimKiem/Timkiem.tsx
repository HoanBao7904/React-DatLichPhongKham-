export default function Timkiem() {
  // return (
  //   <div className='bg-[url("/src/imgs/banner.jpg")] h-[500px] bg-center  '>
  //     <div className='items-center py-10  '>
  //       <h1 className='font-bold text-gray-800 font-montserrat'>Kết nối Người Dân với Cơ sở & Dịch vụ Y tế hàng đầu</h1>
  //     </div>
  //     <div className='flex justify-end'>
  //       <input type='text' placeholder='tìm kiếm' className='px-4 py-4 w-1/3 rounded-full shadow mr-40 bg-slate-100 ' />
  //     </div>
  //   </div>
  // )
  //   return (
  //     <div className='bg-[url("/src/imgs/banner.jpg")] h-[600px] bg-cover bg-center relative'>
  //       {/* Overlay gradient để text dễ đọc hơn */}
  //       <div className='absolute inset-0 bg-gradient-to-r from-[#2D5A3D]/70 to-[#FF6B6B]/50'></div>

  //       <div className='relative z-10 container mx-auto px-4 h-full flex flex-col justify-center'>
  //         {/* Main Heading */}
  //         <div className='text-center mb-12'>
  //           <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-montserrat drop-shadow-lg'>
  //             Kết Nối Với
  //             <span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#DCEDC2] to-[#FFDBB5] mt-2'>
  //               Dịch Vụ Y Tế Chất Lượng
  //             </span>
  //           </h1>
  //           <p className='text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md'>
  //             Tìm kiếm bác sĩ, đặt lịch khám và nhận tư vấn sức khỏe từ các chuyên gia hàng đầu
  //           </p>
  //         </div>

  //         {/* Search Section */}
  //         <div className='max-w-4xl mx-auto w-full'>
  //           {/* Search Box */}
  //           <div className='relative group'>
  //             <div className='absolute -inset-1 bg-gradient-to-r from-[#DCEDC2] to-[#FFAAAC] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200'></div>
  //             <div className='relative'>
  //               <input
  //                 type='text'
  //                 placeholder='Tìm kiếm bác sĩ, chuyên khoa, bệnh viện...'
  //                 className='w-full px-8 py-5 text-lg rounded-2xl border-2 border-white/30 bg-white/95 backdrop-blur-sm shadow-2xl focus:outline-none focus:border-[#2D5A3D] focus:bg-white transition-all duration-300 placeholder-gray-500 pr-16'
  //               />
  //               <button className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] text-white p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105'>
  //                 <svg
  //                   xmlns='http://www.w3.org/2000/svg'
  //                   fill='none'
  //                   viewBox='0 0 24 24'
  //                   strokeWidth={2.5}
  //                   stroke='currentColor'
  //                   className='w-6 h-6'
  //                 >
  //                   <path
  //                     strokeLinecap='round'
  //                     strokeLinejoin='round'
  //                     d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
  //                   />
  //                 </svg>
  //               </button>
  //             </div>
  //           </div>

  //           {/* Quick Search Tags */}
  //           <div className='flex flex-wrap justify-center gap-3 mt-6'>
  //             {['Bác sĩ tim mạch', 'Nha khoa', 'Da liễu', 'Nhi khoa', 'Khám tổng quát', 'Xét nghiệm'].map(
  //               (tag, index) => (
  //                 <button
  //                   key={index}
  //                   className='px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-medium hover:bg-white hover:text-[#2D5A3D] hover:shadow-lg transition-all duration-300 border border-white/30 hover:border-[#DCEDC2]'
  //                 >
  //                   {tag}
  //                 </button>
  //               )
  //             )}
  //           </div>
  //         </div>

  //         {/* Stats Section */}
  //         <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16'>
  //           <div className='text-center text-white'>
  //             <div className='text-3xl font-bold mb-2 drop-shadow-md'>500+</div>
  //             <div className='text-white/80 font-medium'>Bác Sĩ Chuyên Khoa</div>
  //           </div>
  //           <div className='text-center text-white'>
  //             <div className='text-3xl font-bold mb-2 drop-shadow-md'>100+</div>
  //             <div className='text-white/80 font-medium'>Bệnh Viện & Phòng Khám</div>
  //           </div>
  //           <div className='text-center text-white'>
  //             <div className='text-3xl font-bold mb-2 drop-shadow-md'>50K+</div>
  //             <div className='text-white/80 font-medium'>Bệnh Nhân Hài Lòng</div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Scroll Indicator */}
  //       <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
  //         <div className='w-6 h-10 border-2 border-white rounded-full flex justify-center'>
  //           <div className='w-1 h-3 bg-white rounded-full mt-2'></div>
  //         </div>
  //       </div>
  //     </div>
  //   )
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
          {/* Search Box - ĐÃ SỬA */}
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-200 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200'></div>
            <div className='relative'>
              <input
                type='text'
                placeholder='Tìm kiếm bác sĩ, chuyên khoa, bệnh viện...'
                className='w-full px-8 py-5 text-lg rounded-2xl border-2 border-white/30 bg-white shadow-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500 pr-16'
                // ĐÃ XÓA: backdrop-blur-sm và bg-white/95
              />
              <button className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-200 text-white p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105'>
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
          </div>

          {/* Quick Search Tags - ĐÃ SỬA */}
          <div className='flex flex-wrap justify-center gap-3 mt-6'>
            {['Bác sĩ tim mạch', 'Nha khoa', 'Da liễu', 'Nhi khoa', 'Khám tổng quát', 'Xét nghiệm'].map(
              (tag, index) => (
                <button
                  key={index}
                  className='px-4 py-2 bg-white rounded-full text-gray-700 font-medium hover:bg-white hover:text-[#2D5A3D] hover:shadow-lg transition-all duration-300 border border-white/30 hover:border-[#DCEDC2]'
                  // ĐÃ XÓA: backdrop-blur-sm
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16'>
          <div className='text-center text-white'>
            <div className='text-3xl font-bold mb-2 drop-shadow-md'>500+</div>
            <div className='text-white/80 font-medium'>Bác Sĩ Chuyên Khoa</div>
          </div>
          <div className='text-center text-white'>
            <div className='text-3xl font-bold mb-2 drop-shadow-md'>100+</div>
            <div className='text-white/80 font-medium'>Bệnh Viện & Phòng Khám</div>
          </div>
          <div className='text-center text-white'>
            <div className='text-3xl font-bold mb-2 drop-shadow-md'>50K+</div>
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
