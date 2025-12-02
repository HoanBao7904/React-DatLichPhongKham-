export default function Footer() {
  return (
    <footer className='bg-gradient-to-r from-blue-500 to-cyan-200 py-12 text-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-2 space-y-4'>
            <h3 className='text-xl font-bold mb-4'>MEDPRO - Hệ Thống Y Tế</h3>
            <div className='space-y-2 text-sm'>
              <div className='flex items-start space-x-3'>
                <span className='mt-1'>📍</span>
                <p>236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM</p>
              </div>
              <div className='flex items-center space-x-3'>
                <span>🌐</span>
                <p>https://medpro.vn</p>
              </div>
              <div className='flex items-center space-x-3'>
                <span>📧</span>
                <p>cskh@medpro.vn</p>
              </div>
              <div className='flex items-center space-x-3'>
                <span>📞</span>
                <p className='font-bold text-lg'>(028) 710 78098</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className='space-y-4'>
            <h4 className='text-lg font-bold border-b border-white/40 pb-2'>Dịch vụ Y tế</h4>
            <ul className='space-y-2 text-sm'>
              {[
                'Đặt khám',
                'Đặt khám chuyên khoa',
                'Gọi video với bác sĩ',
                'Tư vấn sức khỏe',
                'Xét nghiệm tại nhà'
              ].map((service, index) => (
                <li key={index}>
                  <a href='#' className='text-While hover:text-blue-200 transition-colors block py-1'>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Facilities */}
          <div className='space-y-4'>
            <h4 className='text-lg font-bold border-b border-white/40 pb-2'>Cơ sở y tế</h4>
            <ul className='space-y-2 text-sm'>
              {['Bệnh viện công', 'Phòng khám', 'Tiêm chủng', 'Nha khoa', 'Phòng xét nghiệm'].map((facility, index) => (
                <li key={index}>
                  <a href='#' className='hover:text-blue-200 transition-colors block py-1'>
                    {facility}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div className='space-y-4'>
            <h4 className='text-lg font-bold border-b border-white/40 pb-2'>Hướng dẫn</h4>
            <ul className='space-y-2 text-sm'>
              {[
                'Cài đặt ứng dụng',
                'Đặt lịch khám',
                'Tư vấn khám bệnh qua video',
                'Thanh toán trực tuyến',
                'Hỏi đáp'
              ].map((guide, index) => (
                <li key={index}>
                  <a href='#' className='hover:text-blue-200 transition-colors block py-1'>
                    {guide}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-white/40 mt-12 pt-8 text-center text-sm'>
          <h5 className='font-bold text-lg mb-2'>Công ty TNHH BTTGH</h5>
          <p className='opacity-90'>
            Các thông tin trên YouMed chỉ dành cho mục đích tham khảo, tra cứu và không thay thế cho việc chẩn đoán hoặc
            điều trị y khoa.
          </p>
          <p className='opacity-90 mt-1'>Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.</p>
          <p className='mt-3 font-medium opacity-95'>Copyright © 2018 - 2025 Công ty TNHH BTTGH Việt Nam.</p>
          <p className='font-bold mt-1'>© 2025 - Bản quyền thuộc về Công ty TNHH BTTGH</p>
        </div>
      </div>
    </footer>
  )
}
