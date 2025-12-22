import React from 'react'
import Footer from 'src/components/Footer'
import HeaderMain from 'src/components/HeaderMainUsers'
import SnowEffect from 'src/components/SnowEffect'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  // Nội dung chính của trang sẽ được chèn ở đây của {children}
  //vì sao là props: vì ta truyền nội dung chính của trang từ component cha vào MainLayout thông qua props children
  return (
    <div>
      <SnowEffect />
      <HeaderMain />
      {children}
      <Footer />
    </div>
  )
}
