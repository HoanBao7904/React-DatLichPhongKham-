// src/components/HomePageWrapper.tsx
import React from 'react'
import ChatbotWidget from 'src/Page/ChatbotWidget'

interface Props {
  children: React.ReactNode
}

export default function HomePageWrapper({ children }: Props) {
  return (
    <div className='relative'>
      {children}

      {/* Chatbot Widget chỉ hiển thị trên trang chủ */}
      <div className='fixed bottom-6 right-6 z-50'>
        {/* Nội dung widget của bạn ở đây */}
        <ChatbotWidget />
        {/* Hoặc import ChatbotWidget component */}
      </div>
    </div>
  )
}
