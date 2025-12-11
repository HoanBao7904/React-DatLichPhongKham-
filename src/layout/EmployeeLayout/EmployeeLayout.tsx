import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthApi from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const { SetIsAuthenticated, setProfile } = useContext(AppContext)
  // const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: () => AuthApi.Logout(),
    onSuccess: () => {
      localStorage.removeItem('token') // hoặc sessionStorag
      SetIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='grid min-h-screen grid-cols-5 bg-gray-50'>
      {/* Sidebar */}
      <aside className='col-span-1' aria-label='Sidebar'>
        <div className='flex h-full flex-col overflow-y-auto bg-gradient-to-b from-blue-600 to-blue-400 px-4 py-6 shadow-xl'>
          {/* Logo */}
          <div className='mb-8 px-2 flex flex-row items-center justify-between'>
            <div>
              <h1 className='text-xl font-bold text-white uppercase'>MEDPRO EMPLOYEE</h1>
              <p className='text-sm text-blue-100 mt-1'>Hệ thống quản lý y tế</p>
            </div>
            <div>
              <button onClick={handleLogout}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className='space-y-2'>
            {[
              { to: 'quan-ly-lich-lam-viec', label: 'Quản lý Lịch làm việc' },
              { to: 'ViewAppointmentAdmin', label: 'Quản lý cuộc hẹn' },
              { to: 'quan-ly-khoa', label: 'Quản lý khoa' },
              { to: 'quan-ly-danh-gia', label: 'Quản lý đánh giá' }
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => {
                    const baseClass =
                      'flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 group'
                    const activeClass = isActive
                      ? 'bg-white text-blue-700 shadow-md transform scale-[1.02]'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white hover:shadow-md'
                    return `${baseClass} ${activeClass}`
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                      {isActive && <div className='ml-auto w-2 h-2 bg-blue-600 rounded-full'></div>}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className='col-span-4 h-full px-8 py-6 overflow-auto'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 min-h-full'>{children}</div>
      </main>
    </div>
  )
}
