import { useQuery } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Link } from 'react-router-dom'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import { path } from 'src/contanis/path'
import useQueryParam from 'src/hooks/useQueryParam'

export type QueryConfig1 = {
  page?: string
  size?: string
}

export default function AllDoctor() {
  const queryParams: QueryConfig1 = useQueryParam()
  const queryconfig: QueryConfig1 = omit({
    page: queryParams.page || '1',
    size: queryParams.size || '10'
  })
  const { data } = useQuery({
    queryKey: ['api/doctors'],
    queryFn: () => AllUserAPI.getAllDoctor(queryconfig)
  })

  const allDoctor = data?.data.data || []

  console.log(data)

  if (allDoctor) {
    return (
      <div className='min-h-screen bg-gray-50 p-6'>
        {/* Loading Skeleton */}
        {/* {!responseData && (
        <div className='space-y-4'>
          <div className='h-8 bg-gray-200 rounded w-1/4 animate-pulse'></div>
          <div className='grid gap-4'>
            {[...Array(10)].map((_, index) => (
              <div key={index} className='h-16 bg-gray-200 rounded animate-pulse'></div>
            ))}
          </div>
        </div>
      )} */}

        {/* Header với nút Add */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800 '>Quản lý Lịch Làm việc</h1>
            <div className='flex items-center'>
              <Link to={path.login} className='mt-2'>
                {/* //onClick={handleLogout} */}
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
              <p className='text-gray-600 ml-3 mt-2'>Quản lý thông tin và lịch làm việc của bác sĩ trong hệ thống</p>
            </div>
          </div>
          <Link
            to='add'
            className='bg-gradient-to-r from-blue-500 to-cyan-200 hover:from-blue-500 hover:to-cyan-300 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:scale-110'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
            {/* <span className='font-semibold'>Thê</span> */}
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
                  {/* <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  USER ID
                </th> */}
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
                    Số năm kinh nghiệm
                  </th>
                  <th scope='col' className='px-6 py-4 text-center font-semibold'>
                    Chuyên khoa
                  </th>
                  {/* <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Vai trò
                </th> */}
                  <th scope='col' className='px-6 py-4 text-center font-semibold'>
                    Trạng thái
                  </th>
                  <th scope='col' className='px-6 py-4 text-center font-semibold'>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {allDoctor.length > 0 ? (
                  allDoctor.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b hover:bg-gray-50 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className='px-6 py-4 text-center font-medium text-gray-900'>
                        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium'>
                          #{item.id}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center  text-gray-800'>{item.fullName}</td>
                      <td className='px-6 py-4 text-center w-[40px]'>{item.email}</td>
                      <td className='px-6 py-4 text-center '>{item.phone}</td>
                      <td className='px-6 py-4 text-center text-gray-600'>{item.experienceYears}</td>
                      <td className='px-6 py-4 text-center'>{item.departmentName}</td>
                      <td className='px-6 py-4 text-center'>
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                            item.active
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-red-100 text-red-800 border border-red-200'
                          }`}
                        >
                          {item.active ? 'Không hoạt động' : 'Đang hoạt động'}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <div className='flex justify-center space-x-2'>
                          <button
                            title='tắt trạng thái hoạt động'
                            className='p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:scale-110 transition-all duration-200 border border-blue-200'
                          >
                            <svg
                              fill='#000000'
                              width='16px'
                              height='16px'
                              viewBox='0 0 38.4 38.4'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M12.842 19.206c0 -3.506 2.853 -6.358 6.358 -6.358 1.369 0 2.609 0.473 3.645 1.214L14.056 22.851c-0.742 -1.036 -1.214 -2.276 -1.214 -3.645ZM34.345 2.56l1.501 1.501 -11.475 11.472 -8.844 8.844 -11.472 11.475 -1.501 -1.501 5.676 -5.674c-0.536 -0.345 -1.083 -0.718 -1.643 -1.142C3.985 25.507 1.793 22.792 0.237 19.681L0 19.208l0.235 -0.475C3.989 11.182 11.256 6.489 19.2 6.489c2.228 0 4.406 0.371 6.477 1.1 0.846 0.265 1.71 0.64 2.573 1.068zm-2.428 8.423C34.46 12.973 36.622 15.667 38.169 18.74l0.231 0.466 -0.231 0.464c-3.754 7.568 -11.021 12.252 -18.969 12.252 -2.225 0 -4.408 -0.36 -6.485 -1.102l-0.466 -0.17 5.324 -5.326c0.521 0.142 1.06 0.239 1.628 0.239 3.506 0 6.358 -2.853 6.358 -6.358 0 -0.568 -0.098 -1.106 -0.237 -1.628Z'
                                fill-rule='evenodd'
                              />
                            </svg>
                          </button>
                          <Link
                            // to=''
                            // to={`edit/:id${user.userId}`}
                            to={`/admin/lich-lam-viec-cu-the/${item.id}`}
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
                            //   onClick={() => handleDelete(user?.userId)}
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
        {/* {totalPages && (
        <div className='mt-6'>
          <Paginate queryConfig={queryConfig} totalPages={totalPages} />
        </div>
      )} */}
      </div>
    )
  }
}
