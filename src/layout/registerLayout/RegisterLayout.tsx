import type React from 'react'
import Footer from 'src/components/Footer'
import HeaderMain from 'src/components/HeaderMainUsers'
// import RegisterHeader from 'src/components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <HeaderMain />
      {children}
      <Footer />
    </div>
  )
}
