export default function Footer() {
  // return (
  //   <footer className=' py-10 bg-neutral-100'>
  //     <div className='container'>
  //       <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
  //         <div className='lg:col-span-2'>
  //           <p>Địa chỉ: 236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM.</p>
  //           <p>Website: https://medpro.vn</p>
  //           <p>Email: cskh@medpro.vn</p>
  //           <p>Điện thoại: (028) 710 78098</p>
  //         </div>
  //         <div className='lg:col-span-1'>
  //           <p>Dịch vụ Y tế</p>
  //           <p>Đặt khám</p>
  //           <p>Đặt khám chuyên khoa</p>
  //           <p>Gọi video với bác sĩ</p>
  //           <p>Dịch vụ Y tế</p>
  //           <p>Dịch vụ Y tế</p>
  //           <p>Dịch vụ Y tế</p>
  //         </div>

  //         <div className='lg:col-span-1'>
  //           <p>Cơ sở y tế</p>
  //           <p>Bệnh viện công</p>
  //           <p>Phòng khám</p>
  //           <p>Tiêm chủng</p>
  //         </div>
  //         <div className='lg:col-span-1'>
  //           <p>Hướng dẫn</p>
  //           <p>Cài đặt ứng dụng</p>
  //           <p>Đặt lịch khám</p>
  //           <p>Tư vấn khám bệnh qua video</p>
  //         </div>
  //       </div>
  //       <div className='text-center text-sm mt-10'>
  //         <div>Công ty TNHH BTTGH</div>
  //         <div className='mt-2'>
  //           Các thông tin trên YouMed chỉ dành cho mục đích tham khảo, tra cứu và không thay thế cho việc chẩn đoán hoặc
  //           điều trị y khoa.
  //         </div>
  //         <div className='mt-2'>Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.</div>
  //         <div className='mt-2'>Copyright © 2018 - 2025 Công ty TNHH BTTGH Việt Nam.</div>

  //         <div className='mt-2  '>© 2025 - Bản quyền thuộc về Công ty TNHH BTTGH</div>
  //       </div>
  //     </div>
  //   </footer>
  // )
  return (
    <footer className='bg-gradient-to-b from-[#DCEDC2] to-[#FFDBB5] py-12 text-gray-700'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-2 space-y-4'>
            <h3 className='text-xl font-bold text-[#2D5A3D] mb-4'>MEDPRO - Hệ Thống Y Tế</h3>
            <div className='space-y-2'>
              <div className='flex items-start space-x-3'>
                <span className='text-[#FF6B6B] mt-1'>📍</span>
                <p className='font-medium'>236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM</p>
              </div>
              <div className='flex items-center space-x-3'>
                <span className='text-[#2D5A3D]'>🌐</span>
                <p className='font-medium'>https://medpro.vn</p>
              </div>
              <div className='flex items-center space-x-3'>
                <span className='text-[#FFAAAC]'>📧</span>
                <p className='font-medium'>cskh@medpro.vn</p>
              </div>
              <div className='flex items-center space-x-3'>
                <span className='text-[#FF6B6B]'>📞</span>
                <p className='font-bold text-lg text-[#2D5A3D]'>(028) 710 78098</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className='space-y-4'>
            <h4 className='text-lg font-bold text-[#2D5A3D] border-b-2 border-[#FFAAAC] pb-2'>Dịch vụ Y tế</h4>
            <ul className='space-y-2'>
              {[
                'Đặt khám',
                'Đặt khám chuyên khoa',
                'Gọi video với bác sĩ',
                'Tư vấn sức khỏe',
                'Xét nghiệm tại nhà'
              ].map((service, index) => (
                <li key={index}>
                  <a href='#' className='hover:text-[#2D5A3D] font-medium transition-colors block py-1'>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Facilities */}
          <div className='space-y-4'>
            <h4 className='text-lg font-bold text-[#2D5A3D] border-b-2 border-[#FFAAAC] pb-2'>Cơ sở y tế</h4>
            <ul className='space-y-2'>
              {['Bệnh viện công', 'Phòng khám', 'Tiêm chủng', 'Nha khoa', 'Phòng xét nghiệm'].map((facility, index) => (
                <li key={index}>
                  <a href='#' className='hover:text-[#2D5A3D] font-medium transition-colors block py-1'>
                    {facility}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div className='space-y-4'>
            <h4 className='text-lg font-bold text-[#2D5A3D] border-b-2 border-[#FFAAAC] pb-2'>Hướng dẫn</h4>
            <ul className='space-y-2'>
              {[
                'Cài đặt ứng dụng',
                'Đặt lịch khám',
                'Tư vấn khám bệnh qua video',
                'Thanh toán trực tuyến',
                'Hỏi đáp'
              ].map((guide, index) => (
                <li key={index}>
                  <a href='#' className='hover:text-[#2D5A3D] font-medium transition-colors block py-1'>
                    {guide}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-[#FFAAAC] mt-12 pt-8 text-center'>
          <div className='mb-4'>
            <h5 className='font-bold text-[#2D5A3D] text-lg'>Công ty TNHH BTTGH</h5>
          </div>
          <div className='space-y-2 text-sm max-w-4xl mx-auto'>
            <p className='text-gray-600 leading-relaxed'>
              Các thông tin trên YouMed chỉ dành cho mục đích tham khảo, tra cứu và không thay thế cho việc chẩn đoán
              hoặc điều trị y khoa.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.
            </p>
            <p className='font-medium text-gray-700'>Copyright © 2018 - 2025 Công ty TNHH BTTGH Việt Nam.</p>
            <p className='font-bold text-[#2D5A3D]'>© 2025 - Bản quyền thuộc về Công ty TNHH BTTGH</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
