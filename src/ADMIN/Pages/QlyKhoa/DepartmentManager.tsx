import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import Paginate from 'src/components/Paginate'
import useQueryParam from 'src/hooks/useQueryParam'
import type { paginate } from 'src/types/user.type'

export type QueryConfig = {
  [key in keyof paginate]?: string
}

export default function DepartmentManager() {
  //   const { id } = useParams()
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
  const queryclient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['api/departments', queryConfig],
    queryFn: () => AllUserAPI.getDepartment(queryConfig)
  })
  const dataDepartments = data?.data.data
  const totalPages = data?.data.totalPages
  //   console.log(dataDepartments)

  const deleteDepartMentMutation = useMutation({
    mutationFn: (id: number) => AllUserAPI.deleteDepartment(id),
    onSuccess: (_, id) => {
      toast.success(`xóa thành công khoa id:${id}`)
      queryclient.invalidateQueries({
        queryKey: ['api/departments', queryConfig]
      })
    },
    onError: (_, id) => {
      toast.error(`xóa thất bại khoa id:${id}`)
    }
  })

  const handleDelete = (id: number) => {
    deleteDepartMentMutation.mutate(id)
  }

  if (dataDepartments) {
    return (
      <div className='p-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
          <h1 className='text-2xl font-bold mb-4'>Danh sách Khoa</h1>
          <Link
            to='/admin/AddDepartment'
            className='bg-gradient-to-r from-blue-500 to-cyan-200 hover:from-blue-500 hover:to-cyan-300 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:scale-110'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
            <span className='font-semibold'>Thêm Khoa</span>
          </Link>
        </div>

        <div className='overflow-hidden rounded-xl shadow-lg border'>
          <table className='w-full border-collapse text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='p-3 border'>ID</th>
                <th className='p-3 border'>Tên khoa</th>
                <th className='p-3 border'>Mô tả</th>
                <th className='p-3 border text-center'>Trạng thái</th>
                {/* <th className='p-3 border'>Ngày tạo</th>
                <th className='p-3 border'>Ngày cập nhật</th> */}
                <th scope='col' className='px-6 py-4 text-center font-semibold'>
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody>
              {dataDepartments.map((item) => (
                <tr key={item.id} className='hover:bg-gray-50'>
                  <td className='p-3 border'>{item.id}</td>
                  <td className='p-3 border font-medium'>{item.name}</td>
                  <td className='p-3 border'>{item.description}</td>

                  <td className='p-3 border text-center'>
                    {item.active ? (
                      <span className='px-3 py-1 rounded-lg bg-red-100 text-red-700 text-sm'>Không hoạt động</span>
                    ) : (
                      <span className='px-3 py-1 rounded-lg bg-green text-green-700 text-sm'>Đang hoạt động</span>
                    )}
                  </td>

                  <td className='p-3 border text-center'>
                    <div className='flex justify-center space-x-2'>
                      <Link
                        to={`/admin/UpdateDepartment/${item.id}`}
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
                        onClick={() => handleDelete(item.id)}
                        // onClick={() => handleDelete(user?.userId)}
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
              ))}
            </tbody>
          </table>
        </div>
        {totalPages && (
          <div className='mt-6'>
            <Paginate queryConfig={queryConfig} totalPages={totalPages} />
          </div>
        )}
      </div>
    )
  }
}
