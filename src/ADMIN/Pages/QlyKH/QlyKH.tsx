import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
// import Paginate from 'src/components/Paginate'
import { omitBy, isUndefined } from 'lodash'
import useQueryParam from 'src/hooks/useQueryParam'
import type { paginate } from 'src/types/user.type'
import Paginate from 'src/components/Paginate'

import { toast } from 'react-toastify'
// import Paginate from 'src/components/Paginate'

export type QueryConfig = {
  [key in keyof paginate]?: string
}

export default function QlyKH() {
  const queryClient = useQueryClient()
  const deleteUser = useMutation({
    mutationFn: (id: string | number) => AllUserAPI.deleteUserAPI(id),
    onSuccess: (_, id) => {
      toast.success(`xóa user có Userid:${id}`)
      queryClient.invalidateQueries({
        queryKey: ['/api/users']
      })
    },
    onError: () => {
      // console.error('Delete error:', error)
      toast.error('Xóa user thất bại')
    }
    // Làm mới danh sách user
  })

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

  const Users = allUser.filter((u) => u.role === 'USER')

  const handleDelete = (id: number) => {
    deleteUser.mutate(id)
  }

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
          <p className='text-gray-600 ml-3 mt-2'>Quản lý thông tin và trạng thái của khách hàng trong hệ thống</p>
        </div>
        <Link
          to='/admin/add'
          className='bg-gradient-to-r from-blue-500 to-cyan-200 hover:from-blue-500 hover:to-cyan-300 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:scale-110'
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
            <thead className='table-fixed text-xs text-gray-700 uppercase bg-gradient-to-r from-blue-200 to-cyan-200'>
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
              {Users.length > 0 ? (
                Users.map((user, index) => (
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
                    <td className='px-6 py-4 text-center text-gray-800'>{user.fullName}</td>
                    <td className='px-6 py-4 text-center max-w-[200px] truncate '>{user.email}</td>
                    <td className='px-6 py-4 text-center '>{user.phone}</td>
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
                        {user.active ? 'Không hoạt động' : 'Đang hoạt động'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <div className='flex justify-center space-x-2'>
                        <Link
                          // to={`edit/:id${user.userId}`}
                          to={`/admin/edit/${user.userId}`}
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
                          onClick={() => handleDelete(user?.userId)}
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
