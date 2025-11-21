import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
// import Paginate from 'src/components/Paginate'
import { omitBy, isUndefined } from 'lodash'
import useQueryParam from 'src/hooks/useQueryParam'
import type { paginate } from 'src/types/user.type'
import Paginate from 'src/components/Paginate'
import { path } from 'src/contanis/path'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import AuthApi from 'src/apis/auth.api'
// import Paginate from 'src/components/Paginate'

export type QueryConfig = {
  [key in keyof paginate]?: string
}

export default function QlyKhachHang() {
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
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      totalElements: queryParams.totalElements,
      totalPages: queryParams.totalPages,
      size: queryParams.size || '10'
    },
    isUndefined
  )
  // console.log('queryConfig', queryConfig)
  const { data } = useQuery({
    queryKey: ['/api/users', queryConfig],
    queryFn: () => {
      return AllUserAPI.getAllUser(queryConfig)
    }
  })

  const totalPages = data?.data.totalPages
  const responseData = data?.data
  const allUser = responseData?.data || []

  // return (
  //   <div>
  //     {!responseData && (
  //       <div>
  //         <h1 className='text-2xl font-bold text-gray-800'>Quản lý Khách Hàng</h1>
  //         <div role='status' className='mt-6 animate-pulse'>
  //           <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
  //           <span className='sr-only'>Loading...</span>
  //         </div>
  //       </div>
  //     )}
  //     {/* Header với nút Add */}
  //     <div className='flex justify-between items-center mb-6'>
  //       <h1 className='text-2xl font-bold text-gray-800'>Quản lý Khách Hàng</h1>
  //       <Link
  //         to='/qlyKhachHang/add'
  //         className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'
  //       >
  //         <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  //           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
  //         </svg>
  //         <span>Thêm khách hàng</span>
  //       </Link>
  //     </div>

  //     {/* Bảng */}
  //     <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
  //       <table className='w-full text-sm text-left text-gray-500'>
  //         <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
  //           <tr>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               ID
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Họ tên
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Email
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Số điện thoại
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Tên đăng nhập
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Địa chỉ
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Ngày sinh
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Ngày tạo
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Vai trò
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Trạng thái
  //             </th>
  //             <th scope='col' className='px-6 py-3 text-center'>
  //               Thao tác
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {allUser.length > 0 ? (
  //             allUser.map((user) => (
  //               <tr key={user.userId} className='bg-white border-b hover:bg-gray-50'>
  //                 <td className='px-6 py-4 text-center font-medium text-gray-900'>{user.userId}</td>
  //                 <td className='px-6 py-4 text-center font-medium text-gray-900'>{user.fullName}</td>
  //                 <td className='px-6 py-4 text-center'>{user.email}</td>
  //                 <td className='px-6 py-4 text-center'>{user.phone}</td>
  //                 <td className='px-6 py-4 text-center'>{user.userName}</td>
  //                 <td className='px-6 py-4 text-center'>{user.address || <span className='text-gray-400'>-</span>}</td>
  //                 <td className='px-6 py-4 text-center'>
  //                   {user.dateOfBirth || <span className='text-gray-400'>-</span>}
  //                 </td>
  //                 <td className='px-6 py-4 text-center'>
  //                   {user.createdAt || <span className='text-gray-400'>-</span>}
  //                 </td>
  //                 <td className='px-6 py-4 text-center'>
  //                   <span
  //                     className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
  //                       user.role === 'ADMIN'
  //                         ? 'bg-purple-100 text-purple-800'
  //                         : user.role === 'DOCTOR'
  //                           ? 'bg-orange-100 text-orange-800'
  //                           : 'bg-blue-100 text-blue-800'
  //                     }`}
  //                   >
  //                     {user.role}
  //                   </span>
  //                 </td>
  //                 <td className='px-6 py-4 text-center'>
  //                   <span
  //                     className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
  //                       user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  //                     }`}
  //                   >
  //                     {user.active ? 'Đang hoạt động' : 'Không hoạt động'}
  //                   </span>
  //                 </td>
  //                 <td className='px-6 py-4 text-center'>
  //                   <div className='flex justify-center space-x-1'>
  //                     <button className='p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'>
  //                       <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  //                         <path
  //                           strokeLinecap='round'
  //                           strokeLinejoin='round'
  //                           strokeWidth={2}
  //                           d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  //                         />
  //                       </svg>
  //                     </button>
  //                     <button className='p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors'>
  //                       <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  //                         <path
  //                           strokeLinecap='round'
  //                           strokeLinejoin='round'
  //                           strokeWidth={2}
  //                           d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
  //                         />
  //                       </svg>
  //                     </button>
  //                     <button className='p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'>
  //                       <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
  //                         <path
  //                           strokeLinecap='round'
  //                           strokeLinejoin='round'
  //                           strokeWidth={2}
  //                           d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  //                         />
  //                         <path
  //                           strokeLinecap='round'
  //                           strokeLinejoin='round'
  //                           strokeWidth={2}
  //                           d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
  //                         />
  //                       </svg>
  //                     </button>
  //                   </div>
  //                 </td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan={11} className='px-6 py-4 text-center text-gray-500'>
  //                 Không có dữ liệu
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>

  //     {totalPages && <Paginate queryConfig={queryConfig} totalPages={totalPages} />}

  //     {/* Phân trang */}
  //   </div>
  // )
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* Loading Skeleton */}
      {!responseData && (
        <div className='space-y-4'>
          <div className='h-8 bg-gray-200 rounded w-1/4 animate-pulse'></div>
          <div className='grid gap-4'>
            {[...Array(10)].map((_, index) => (
              <div key={index} className='h-16 bg-gray-200 rounded animate-pulse'></div>
            ))}
          </div>
        </div>
      )}

      {/* Header với nút Add */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Quản lý Khách Hàng</h1>
          <div className='flex items-center'>
            <Link onClick={handleLogout} to={path.login} className='mt-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 text-black font-bold'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
                />
              </svg>
            </Link>
            <p className='text-gray-600 ml-3 mt-2'>Quản lý thông tin và trạng thái của khách hàng trong hệ thống</p>
          </div>
        </div>
        <Link
          to='add'
          className='bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] hover:from-[#1e3e2a] hover:to-[#e05555] text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:scale-105'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
          <span className='font-semibold'>Thêm khách hàng</span>
        </Link>
      </div>

      {/* Bảng */}
      <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gradient-to-r from-[#DCEDC2] to-[#FFDBB5]'>
              <tr>
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  ID
                </th>
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Họ tên
                </th>
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Email
                </th>
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Số điện thoại
                </th>
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Tên đăng nhập
                </th>
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Vai trò
                </th>
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Trạng thái
                </th>
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser.length > 0 ? (
                allUser.map((user, index) => (
                  <tr
                    key={user.userId}
                    className={`border-b hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className='px-6 py-4 text-center font-medium text-gray-900'>
                      <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium'>
                        #{user.userId}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center font-semibold text-gray-800'>{user.fullName}</td>
                    <td className='px-6 py-4 text-center'>{user.email}</td>
                    <td className='px-6 py-4 text-center font-medium'>{user.phone}</td>
                    <td className='px-6 py-4 text-center text-gray-600'>{user.userName}</td>
                    <td className='px-6 py-4 text-center'>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : user.role === 'DOCTOR'
                              ? 'bg-orange-100 text-orange-800 border border-orange-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                          user.active
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                      >
                        {/* <span
                            className={`w-2 h-2 rounded-full mr-2 ${user.active ? 'bg-green-500' : 'bg-red-500'}`}
                          ></span> */}
                        {user.active ? 'Đang hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <div className='flex justify-center space-x-2'>
                        <button
                          title='Xem chi tiết'
                          className='p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:scale-110 transition-all duration-200 border border-blue-200'
                        >
                          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            />
                          </svg>
                        </button>
                        <Link
                          to='edit'
                          title='Chỉnh sửa'
                          className='p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 hover:scale-110 transition-all duration-200 border border-green-200'
                        >
                          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                            />
                          </svg>
                        </Link>
                        <button
                          title='Xóa'
                          className='p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:scale-110 transition-all duration-200 border border-red-200'
                        >
                          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className='px-6 py-8 text-center'>
                    <div className='flex flex-col items-center justify-center text-gray-500'>
                      <svg
                        className='w-16 h-16 mb-4 text-gray-300'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1}
                          d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      <p className='text-lg font-medium'>Không có dữ liệu</p>
                      <p className='text-sm'>Hãy thêm khách hàng đầu tiên của bạn</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phân trang */}
      {totalPages && (
        <div className='mt-6'>
          <Paginate queryConfig={queryConfig} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
