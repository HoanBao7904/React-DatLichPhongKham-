import React from 'react'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  children?: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  // return (
  //   <div className='grid min-h-screen grid-cols-5'>
  //     <aside className='col-span-1' aria-label='Sidebar'>
  //       <div className='flex h-full flex-col overflow-y-auto bg-gray-100 px-3 py-4 shadow-lg'>
  //         <div className='mb-8'>
  //           <h1 className='text-xl font-bold text-blue-600 uppercase'>Hệ thống y tế</h1>
  //           <p className='text-sm text-gray-500'>Admin Dashboard</p>
  //         </div>

  //         <ul className='space-y-2'>
  //           <li>
  //             <NavLink
  //               to='qlyKhachHang'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Quản lý Khách hàng</span>}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to='quan-ly-bac-si'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Quản lý Bác sĩ</span>}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to='quan-ly-lich-hen'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Xem báo cáo thống kê</span>}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to='/quan-ly-lich-hen'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Quản lý thanh toán</span>}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to='/quan-ly-lich-hen'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Quản lý thông báo</span>}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to='/quan-ly-lich-hen'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Quản lý cuộc hẹn</span>}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to='/quan-ly-lich-hen'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Quản lý Lịch làm việc</span>}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to='/quan-ly-lich-hen'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Quản lý khoa</span>}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to='/quan-ly-lich-hen'
  //               className={({ isActive }) => {
  //                 const activeClass = isActive ? 'bg-gray-300' : ''
  //                 return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
  //               }}
  //             >
  //               {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Quản lý chuyên khoa</span>}
  //             </NavLink>
  //           </li>
  //         </ul>
  //       </div>
  //     </aside>
  //     <main className='col-span-4 h-full px-3 py-4'>{children}</main>
  //   </div>
  // )
  // return (
  //   <div className='grid min-h-screen grid-cols-5 bg-gray-50 shadow-sm rounded-sm'>
  //     {/* Sidebar */}
  //     <aside className='col-span-1' aria-label='Sidebar'>
  //       <div className='flex h-full flex-col overflow-y-auto bg-gradient-to-b from-[#2D5A3D] to-[#233f2e] px-4 py-6 shadow-2xl'>
  //         {/* Logo */}
  //         <div className='mb-8 px-2'>
  //           <h1 className='text-xl font-bold text-white uppercase'>MEDPRO ADMIN</h1>
  //           {/* <p className='text-sm text-white mt-1'>Hệ thống quản lý y tế</p> */}
  //         </div>
  //         {/* Navigation Menu */}
  //         <ul className='space-y-1'>
  //           {[
  //             { to: 'qlyKhachHang', label: 'Quản lý Khách hàng', icon: '👥' },
  //             { to: 'quan-ly-bac-si', label: 'Quản lý Bác sĩ', icon: '👨‍⚕️' },
  //             { to: 'quan-ly-lich-hen', label: 'Xem báo cáo thống kê', icon: '📊' },
  //             { to: '/quan-ly-thanh-toan', label: 'Quản lý thanh toán', icon: '💳' },
  //             { to: '/quan-ly-thong-bao', label: 'Quản lý thông báo', icon: '🔔' },
  //             { to: '/quan-ly-cuoc-hen', label: 'Quản lý cuộc hẹn', icon: '📅' },
  //             { to: '/quan-ly-lich-lam-viec', label: 'Quản lý Lịch làm việc', icon: '⏰' },
  //             { to: '/quan-ly-khoa', label: 'Quản lý khoa', icon: '🏥' },
  //             { to: '/quan-ly-chuyen-khoa', label: 'Quản lý chuyên khoa', icon: '🎯' }
  //           ].map((item) => (
  //             <li key={item.to}>
  //               <NavLink
  //                 to={item.to}
  //                 className={({ isActive }) => {
  //                   const activeClass = isActive
  //                     ? 'bg-white text-[#2D5A3D] shadow-lg'
  //                     : 'text-green-100 hover:bg-white/10 hover:text-white'
  //                   return `flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${activeClass}`
  //                 }}
  //               >
  //                 {({ isActive }) => (
  //                   <>
  //                     <span className='text-lg mr-3'>{item.icon}</span>
  //                     <span className={`${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
  //                   </>
  //                 )}
  //               </NavLink>
  //             </li>
  //           ))}
  //         </ul>
  //         {/* User Info Footer */}
  //         <div className='mt-auto pt-6 border-t border-green-700/30'>
  //           <div className='flex items-center space-x-3 px-2'>
  //             <div className='w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFAAAC] flex items-center justify-center text-white font-bold'>
  //               A
  //             </div>
  //             <div>
  //               <p className='text-white text-sm font-medium'>Admin User</p>
  //               <p className='text-green-200 text-xs'>Quản trị viên</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </aside>

  //     {/* Main Content */}
  //     <main className='col-span-4 h-full px-6 py-6'>{children}</main>
  //   </div>
  // )
  return (
    <div className='grid min-h-screen grid-cols-5 bg-gray-50 shadow-sm rounded-sm'>
      {/* Sidebar */}
      <aside className='col-span-1' aria-label='Sidebar'>
        <div className='flex h-full flex-col overflow-y-auto bg-gradient-to-b from-[#3a7a4f] to-[#2D5A3D] px-4 py-6 shadow-2xl'>
          {/* Logo */}
          <div className='mb-8 px-2'>
            <h1 className='text-xl font-bold text-white uppercase'>MEDPRO ADMIN</h1>
            {/* <p className='text-sm text-white mt-1'>Hệ thống quản lý y tế</p> */}
          </div>
          {/* Navigation Menu */}
          <ul className='space-y-1'>
            {[
              { to: 'qlyKhachHang', label: 'Quản lý Khách hàng', icon: '👥' },
              { to: 'quan-ly-bac-si', label: 'Quản lý Bác sĩ', icon: '👨‍⚕️' },
              { to: 'quan-ly-lich-hen', label: 'Xem báo cáo thống kê', icon: '📊' },
              { to: '/quan-ly-thanh-toan', label: 'Quản lý thanh toán', icon: '💳' },
              { to: '/quan-ly-thong-bao', label: 'Quản lý thông báo', icon: '🔔' },
              { to: '/quan-ly-cuoc-hen', label: 'Quản lý cuộc hẹn', icon: '📅' },
              { to: '/quan-ly-lich-lam-viec', label: 'Quản lý Lịch làm việc', icon: '⏰' },
              { to: '/quan-ly-khoa', label: 'Quản lý khoa', icon: '🏥' },
              { to: '/quan-ly-chuyen-khoa', label: 'Quản lý chuyên khoa', icon: '🎯' }
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => {
                    const activeClass = isActive
                      ? 'bg-white text-[#2D5A3D] shadow-lg'
                      : 'text-white hover:bg-white/20 hover:text-white'
                    return `flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${activeClass}`
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span className='text-lg mr-3'>{item.icon}</span>
                      <span className={`${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* User Info Footer */}
          <div className='mt-auto pt-6 border-t border-white/20'>
            <div className='flex items-center space-x-3 px-2'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFAAAC] flex items-center justify-center text-white font-bold'>
                A
              </div>
              <div>
                <p className='text-white text-sm font-medium'>Admin User</p>
                <p className='text-white/70 text-xs'>Quản trị viên</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className='col-span-4 h-full px-6 py-6'>{children}</main>
    </div>
  )
}

export default Sidebar
