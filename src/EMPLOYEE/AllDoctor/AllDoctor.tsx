import { useQuery } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Link } from 'react-router-dom'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import Paginate from 'src/components/Paginate'
import useQueryParam from 'src/hooks/useQueryParam'

export type QueryConfig1 = {
  page?: string
  size?: string
}

export default function AllDoctoreMPLOYEE() {
  const queryParams: QueryConfig1 = useQueryParam()
  const queryconfig: QueryConfig1 = omit({
    page: queryParams.page || '1',
    size: queryParams.size || '10'
  })
  const { data } = useQuery({
    queryKey: ['api/doctors', queryParams],
    queryFn: () => AllUserAPI.getAllDoctor(queryconfig)
  })
  const totalPages = data?.data.totalPages
  const allDoctor = data?.data.data || []

  console.log(data)

  if (allDoctor) {
    return (
      <div className='min-h-screen bg-gray-50 p-6'>
        {/* Header với nút Add */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800 '>Quản lý Lịch Làm việc</h1>

            <p className='text-gray-600 ml-3 mt-2'>Quản lý thông tin và lịch làm việc của bác sĩ trong hệ thống</p>
          </div>
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
                          <Link
                            to={`/employee/lich-lam-viec-cu-the/${item.id}`}
                            title='Chỉnh sửa'
                            className='p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 hover:scale-110 transition-all duration-200 border border-green-200'
                          >
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
                                d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
                              />
                            </svg>
                          </Link>
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
            <Paginate queryConfig={queryconfig} totalPages={totalPages} />
          </div>
        )}
      </div>
    )
  }
}
