import React, { useState, useRef, useEffect } from 'react'

type MessageType = 'user' | 'bot'
// type QuickAction = 'appointment' | 'registration' | 'payment' | 'emergency' | 'contact'

interface Message {
  id: number
  type: MessageType
  content: string
  timestamp: Date
}

interface FAQItem {
  id: number
  title: string
  content: string
  keywords: string[]
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Xin chào! Tôi là trợ lý ảo của phòng khám. Tôi có thể giúp gì cho bạn?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Danh sách câu hỏi thường gặp
  const faqList: FAQItem[] = [
    {
      id: 1,
      title: '📋 Cách đặt lịch khám',
      content: `Để đặt lịch khám, bạn thực hiện theo các bước sau:\n\n1. Truy cập trang chủ và chọn "Đặt lịch khám góc phải màn hình"\n2. Chọn đặt khám theo bác sĩ hoặc chuyên khoa\n3. Chọn bác sĩ muốn đặt khám\n4. chọn khung giờ còn trống\n5.đặt lịch và xem lại thông tin bác sĩ và thông tin cá nhân\n6.xác nhận đặt lịch\n7.xem lại lịch hẹn ở góc phải màn hình
      8.thanh toán bằng QRPay và chờ gửi thông báo xác nhận \n\nBạn cần hỗ trợ thêm về bước nào không?`,
      keywords: ['đặt lịch', 'đặt khám', 'booking', 'schedule', 'appointment']
    },
    {
      id: 2,
      title: '👤 Đăng ký tài khoản',
      content: `Hướng dẫn đăng ký tài khoản:\n\n1. Nhấn nút "Đăng ký" ở góc trên bên phải\n2. Điền thông tin trên form đăng ký\n3. Hoàn thiện thông tin cá nhân\n4.đăng ký\nTài khoản giúp bạn theo dõi lịch sử khám và nhận ưu đãi.`,
      keywords: ['đăng ký', 'register', 'tạo tài khoản', 'signup']
    },
    {
      id: 3,
      title: '💰 Thanh toán trực tuyến',
      content: `Chúng tôi hỗ trợ nhiều phương thức thanh toán:\n\n• Chuyển khoản ngân hàng\n• Thanh toán tại phòng khám\n\nCÁC BƯỚC THANH TOÁN:\n1.vào trang xem lịch hẹn góc phải màn hình("phải đặt lịch khám mới có lịch hẹn")\n2.chọn lịch hẹn đã đặt\n3.bấm thanh toán\n4.hiển thị QRPay\n5.quét mã QRPay và đợi nhân viên xác nhận và gửi thông báo   \nLưu ý: Giữ lại mã đặt khám để đối chiếu khi cần.`,
      keywords: ['thanh toán', 'payment', 'tiền', 'phí', 'giá']
    },
    {
      id: 4,
      title: '🚨 Cấp cứu/Khẩn cấp',
      content: `TRƯỜNG HỢP KHẨN CẤP:\n\n📞 Gọi ngay: 115 (Cấp cứu Quốc gia)\n📞 Hotline chúng tôi: 1900 1234\n\nKHÔNG sử dụng chatbot hỏi linh tinh cho trường hợp khẩn cấp!`,
      keywords: ['cấp cứu', 'khẩn cấp', 'emergency', 'nguy hiểm', 'tai nạn']
    },
    {
      id: 5,
      title: '📞 Liên hệ hỗ trợ',
      content: `Thông tin liên hệ:\n\n• Hotline: 0378686654 (24/7)\n• Email: nguyenhoanbao4@gmail.com\n• Địa chỉ: 123 Đường ABC, TP.DN\n• Giờ làm việc: 7:00 - 20:00 hàng ngày\n\nĐội ngũ hỗ trợ sẽ phản hồi trong 15 phút.`,
      keywords: ['liên hệ', 'contact', 'hỗ trợ', 'support', 'help']
    },
    {
      id: 6,
      title: '🏥 Danh sách chuyên khoa',
      content: `Các chuyên khoa hiện có:\n\n1. Nội tổng quát\n2. Nhi khoa\n3. Sản phụ khoa\n4. Da liễu\n5. Răng hàm mặt\n6. Mắt\n7. Tai mũi họng\n8. Xét nghiệm\n9. Chẩn đoán hình ảnh\n\nBạn muốn đặt lịch chuyên khoa nào?`,
      keywords: ['chuyên khoa', 'khoa', 'specialty', 'department']
    }
  ]

  // Các quick actions (nút nhanh)
  const quickActions = [
    { id: 'appointment', icon: '📅', label: 'Đặt lịch' },
    { id: 'registration', icon: '👤', label: 'Đăng ký' },
    { id: 'payment', icon: '💰', label: 'Thanh toán' },
    { id: 'emergency', icon: '🚨', label: 'Cấp cứu' },
    { id: 'contact', icon: '📞', label: 'Liên hệ' },
    { id: 'departments', icon: '🏥', label: 'Chuyên khoa' }
  ]

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find((a) => a.id === actionId)
    if (!action) return

    // Thêm message user
    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      content: action.label,
      timestamp: new Date()
    }
    setMessages((prev) => [...prev, userMsg])

    // Bot phản hồi
    setIsTyping(true)
    setTimeout(() => {
      let response = ''

      switch (actionId) {
        case 'appointment':
          response = faqList.find((f) => f.id === 1)?.content || 'Xin lỗi, tôi chưa có thông tin về việc này.'
          break
        case 'registration':
          response = faqList.find((f) => f.id === 2)?.content || 'Xin lỗi, tôi chưa có thông tin về việc này.'
          break
        case 'payment':
          response = faqList.find((f) => f.id === 3)?.content || 'Xin lỗi, tôi chưa có thông tin về việc này.'
          break
        case 'emergency':
          response = faqList.find((f) => f.id === 4)?.content || 'Xin lỗi, tôi chưa có thông tin về việc này.'
          break
        case 'contact':
          response = faqList.find((f) => f.id === 5)?.content || 'Xin lỗi, tôi chưa có thông tin về việc này.'
          break
        case 'departments':
          response = faqList.find((f) => f.id === 6)?.content || 'Xin lỗi, tôi chưa có thông tin về việc này.'
          break
        default:
          response = 'Tôi có thể giúp gì thêm cho bạn?'
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1000)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Thêm message user
    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }
    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')

    // Bot phản hồi
    setIsTyping(true)
    setTimeout(() => {
      const userInput = inputMessage.toLowerCase()
      let response = ''

      // Tìm câu trả lời phù hợp từ FAQ
      const matchedFAQ = faqList.find((faq) => faq.keywords.some((keyword) => userInput.includes(keyword)))

      if (matchedFAQ) {
        response = matchedFAQ.content
      } else if (userInput.includes('xin chào') || userInput.includes('hello') || userInput.includes('hi')) {
        response = 'Xin chào! Tôi có thể giúp gì cho bạn?'
      } else if (userInput.includes('cảm ơn') || userInput.includes('thanks')) {
        response = 'Không có gì! Nếu cần thêm hỗ trợ, đừng ngần ngại hỏi tôi nhé! 😊'
      } else {
        response = `Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể:\n1. Sử dụng các nút bên dưới\n2. Liên hệ hotline: 1900 1234\n3. Hỏi về: đặt lịch, đăng ký, thanh toán, v.v.`
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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

      {/* Chat Popup */}
      {isOpen && (
        <div className='fixed sm:absolute bottom-6 right-0 w-full sm:w-96  min-h-[600px] sm:h-[500px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-200/80 backdrop-blur-sm flex flex-col'>
          {/* Header với gradient đẹp */}
          <div className='bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 p-4 text-white '>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm'>
                    <span className='text-xl sm:text-2xl'>
                      <img src='/src/imgs/chatbot.png' alt='ảnh chatbot' />
                    </span>
                  </div>
                  <div className='absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 border-2 border-white rounded-full animate-pulse'></div>
                </div>
                <div>
                  <h3 className='font-bold text-base sm:text-lg tracking-tight'>Trợ lý ảo MEDLATEC</h3>
                  <div className='flex items-center gap-2 text-sm text-blue-100'>
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                    <span>Trực tuyến • Phản hồi ngay</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='
    w-15 h-15
    rounded-full
    flex items-center justify-center
    bg-white/30 hover:bg-white/50

  '
                aria-label='Đóng chat'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5  text-black'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages - Clean design */}
          <div className='flex-1 min-h-[300px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white'>
            <div className='space-y-3'>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                >
                  <div className='max-w-[85%]'>
                    <div className={`flex ${message.type === 'user' ? 'flex-row-reverse' : ''} items-end gap-2 mb-1`}>
                      <div className={`text-xs text-gray-500 ${message.type === 'user' ? 'text-right' : ''}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    <div
                      className={`rounded-2xl p-3 sm:p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm'
                      }`}
                    >
                      <div className='whitespace-pre-line text-sm sm:text-base leading-relaxed'>{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator hiện đại */}
              {isTyping && (
                <div className='flex justify-start'>
                  <div className='max-w-[70%]'>
                    <div className='text-xs text-gray-500 mb-1'>Trợ lý ảo đang nhập...</div>
                    <div className='bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm'>
                      <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                          <div className='w-2 h-2 bg-gray-300 rounded-full animate-typing'></div>
                          <div
                            className='w-2 h-2 bg-gray-300 rounded-full animate-typing'
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                          <div
                            className='w-2 h-2 bg-gray-300 rounded-full animate-typing'
                            style={{ animationDelay: '0.4s' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Actions - Dạng thẻ đẹp */}

          <div className='p-3 border-t border-gray-100 bg-white/95'>
            <div className='text-xs font-medium text-gray-600 mb-2'>Câu hỏi nhanh:</div>
            <div className='flex flex-wrap gap-1.5'>
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg text-xs font-medium transition-all duration-150 border border-gray-200 hover:border-blue-300 active:scale-95'
                >
                  <span className='text-sm'>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area - Clean và hiện đại */}
          <div className='p-4 border-t border-gray-100 bg-white'>
            <div className='flex gap-2'>
              <div className='flex-1 relative'>
                <input
                  ref={inputRef}
                  type='text'
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder='Nhập câu hỏi của bạn...'
                  className='w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-500 transition-all'
                  disabled={isTyping}
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`relative overflow-hidden px-5 py-3 rounded-full font-medium transition-all duration-200 active:scale-95 ${
                  !inputMessage.trim() || isTyping
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                {isTyping ? (
                  <div className='flex items-center'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  </div>
                ) : (
                  <span className='flex items-center gap-2'>
                    Gửi
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                      />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
