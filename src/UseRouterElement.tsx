/* eslint-disable react-refresh/only-export-components */
// src/useRouteElements.tsx
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './Page/Login'
import Register from './Page/register'
import MainLayout from './layout/MainLayout'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './contanis/path'
import QlyKhachHang from './ADMIN/Pages/QlyKhachHang'
import DoctorLayout from './layout/DoctorLayout/DoctorLayout'
import EmployeeLayout from './layout/EmployeeLayout/EmployeeLayout'
import DoctorHome from './Page/UserHome'
import Profile from './Page/Profile'
import Sidebar from './ADMIN/Layout/Sidebar'
import AddKhachHang from './ADMIN/Pages/AddKhachHang/AddKhachHang'
import EditKhachHang from './ADMIN/Pages/EditKhachHang/EditKhachHang'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'ADMIN' | 'USER' | 'DOCTOR' | 'EMPLOYEE'
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, profile } = useContext(AppContext)

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  // Check role nếu có requirement
  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to='/unauthorized' />
  }

  return <>{children}</>
}

function RejectedRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

// Component cho trang chủ public/private
function HomePage() {
  const { isAuthenticated, profile } = useContext(AppContext)

  // Chưa login: hiển thị trang chủ public
  if (!isAuthenticated) {
    return (
      <MainLayout>
        <DoctorHome />
      </MainLayout>
    )
  }

  // Đã login: check role để redirect
  if (profile) {
    switch (profile.role) {
      case 'ADMIN':
        return <Navigate to='/admin' replace />
      case 'DOCTOR':
        return <Navigate to='/doctor' replace />
      case 'EMPLOYEE':
        return <Navigate to='/employee' replace />
      case 'USER':
        // USER role vẫn ở lại trang chủ
        return (
          <MainLayout>
            <DoctorHome />
          </MainLayout>
        )
      default:
        return <Navigate to='/unauthorized' replace />
    }
  }

  // Đang loading profile
  return (
    <MainLayout>
      <div>Loading...</div>
    </MainLayout>
  )
}

// Tạo trang Unauthorized tạm thời
function Unauthorized() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-red-600'>Unauthorized</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    </div>
  )
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    // TRANG CHỦ - Public cho guest, Private cho USER role
    {
      path: '/',
      element: <HomePage />
    },

    // Unauthorized page
    {
      path: '/unauthorized',
      element: <Unauthorized />
    },

    // PUBLIC: login, register (chỉ cho guest)
    {
      path: '',
      element: <RejectedRouter />,
      children: [
        { path: path.login, element: <Login /> },
        { path: path.register, element: <Register /> }
      ]
    },

    // PROTECTED ROUTES (đã login mới vào)
    {
      path: '',
      element: (
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        // ADMIN
        {
          path: '/admin',
          element: (
            <ProtectedRoute requiredRole='ADMIN'>
              <Sidebar>
                <Outlet />
              </Sidebar>
            </ProtectedRoute>
          ),
          children: [
            // { path: '', element: <Navigate to='dashboard' replace /> },
            // { path: 'dashboard', element: <div>Admin Dashboard</div> },
            { path: '', element: <QlyKhachHang /> },
            { path: 'qlyKhachHang', element: <QlyKhachHang /> },
            { path: 'qlyKhachHang', element: <Outlet /> },
            {
              children: [
                { path: 'add', element: <AddKhachHang /> },
                { path: 'edit', element: <EditKhachHang /> }
              ]
            },
            { path: 'quan-ly-bac-si', element: <div>quan-ly-bac-si</div> },
            { path: 'quan-ly-lich-hen', element: <div>quan-ly-lich-hen</div> }
          ]
        },

        // DOCTOR
        {
          path: '/doctor',
          element: (
            <ProtectedRoute requiredRole='DOCTOR'>
              <DoctorLayout>
                <Outlet />
              </DoctorLayout>
            </ProtectedRoute>
          ),
          children: [
            { path: '', element: <div>Doctor Home</div> },
            { path: 'appointments', element: <div>Doctor Appointments</div> }
          ]
        },

        // EMPLOYEE
        {
          path: '/employee',
          element: (
            <ProtectedRoute requiredRole='EMPLOYEE'>
              <EmployeeLayout>
                <Outlet />
              </EmployeeLayout>
            </ProtectedRoute>
          ),
          children: [{ path: '', element: <div>Employee Home</div> }]
        },

        // USER có thể có thêm protected routes nếu cần
        {
          path: '/user-profile',
          element: (
            <ProtectedRoute requiredRole='USER'>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          )
        }
      ]
    },

    // Fallback - 404
    {
      path: '*',
      element: <Navigate to='/' replace />
    }
  ])

  return routeElements
}

// export default function useRouteElements() {
//   const routeElements = useRoutes([
//     {
//       path: '/',
//       index: true,
//       element: (
//         <MainLayout>
//           <DoctorHome />
//         </MainLayout>
//       )
//     },
//     {
//       path: '',
//       element: (
//         <ProtectedRoute>
//           <Outlet />
//         </ProtectedRoute>
//       ),
//        children: [
//         // ADMIN Routes - chỉ ADMIN được truy cập
//         {
//           path: '/admin',
//           element: (
//             <ProtectedRoute requiredRole='ADMIN'>
//               <AdminLayout>
//                 <Outlet />
//               </AdminLayout>
//             </ProtectedRoute>
//           ),
//           children: [
//             {
//               path: '',
//               element: <Navigate to='users' replace />
//             },
//             {
//               path: 'users',
//               element: <QlyKhachHang />
//             },
//             {
//               path: 'dashboard',
//               element: <div>Admin Dashboard</div>
//             }
//           ]
//         },

//         // DOCTOR Routes - chỉ DOCTOR được truy cập
//         {
//           path: '/doctor',
//           element: (
//             <ProtectedRoute requiredRole='DOCTOR'>
//               <DoctorLayout>
//                 <Outlet />
//               </DoctorLayout>
//             </ProtectedRoute>
//           ),
//           children: [
//             {
//               path: '',
//               element: <div>Doctor Homepage</div>
//             },
//             {
//               path: 'appointments',
//               element: <div>Doctor Appointments</div>
//             }
//           ]
//         },

//         // EMPLOYEE Routes - chỉ EMPLOYEE được truy cập
//         {
//           path: '/employee',
//           element: (
//             <ProtectedRoute requiredRole='EMPLOYEE'>
//               <EmployeeLayout>
//                 <Outlet />
//               </EmployeeLayout>
//             </ProtectedRoute>
//           ),
//           children: [
//             {
//               path: '',
//               element: <div>Employee Homepage</div>
//             }
//           ]
//         },

//     {
//       path: '',
//       element: <RejectedRouter />,
//       children: [
//         {
//           path: path.login,
//           element: <Login />
//         },
//         {
//           path: path.register,
//           element: <Register />
//         }
//       ]
//     }
//   ])
//   return routeElements
// }
