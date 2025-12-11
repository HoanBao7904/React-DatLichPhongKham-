import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import Paginate from 'src/components/Paginate'
import ProductRating from 'src/components/ProductRating'
import useQueryParam from 'src/hooks/useQueryParam'
import type { paginate } from 'src/types/user.type'

export type QueryConfig = {
  [key in keyof paginate]?: string
}

export default function AllReviewAdmin() {
  const queryClient = useQueryClient()
  const deleteReview = useMutation({
    mutationFn: (id: number) => AllUserAPI.deleteReview(id),
    onSuccess: (_, id) => {
      toast.success(`xóa user có Userid:${id}`)
      queryClient.invalidateQueries({
        queryKey: ['api/reviews']
      })
    },
    onError: () => {
      toast.error('Xóa user thất bại')
    }
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

  const { data } = useQuery({
    queryKey: ['api/reviews', queryConfig],
    queryFn: () => AllUserAPI.getAllReview(queryConfig)
  })

  const reviewsData = data?.data.data || []
  const totalPages = data?.data.totalPages

  console.log()
  // Format ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  const handleDelete = (id: number) => {
    deleteReview.mutate(id)
  }

  const stats = useMemo(
    () => ({
      total: reviewsData.length,
      active: reviewsData.filter((r) => r.active).length,
      inactive: reviewsData.filter((r) => !r.active).length,
      averageRating: (reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length).toFixed(1),
      ratingDistribution: {
        5: reviewsData.filter((r) => r.rating === 5).length,
        4: reviewsData.filter((r) => r.rating === 4).length,
        3: reviewsData.filter((r) => r.rating === 3).length,
        2: reviewsData.filter((r) => r.rating === 2).length,
        1: reviewsData.filter((r) => r.rating === 1).length
      }
    }),
    [reviewsData]
  )

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Quản lý đánh giá</h1>
            <p className='text-gray-600'>Quản lý và kiểm duyệt đánh giá từ người dùng</p>
          </div>
        </div>

        {/* Thống kê nhanh */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
          <div className='bg-white rounded-xl p-4 shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Tổng đánh giá</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
              </div>
              <div className='p-3 bg-blue-100 rounded-lg'></div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-4 shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Đang hoạt động</p>
                <p className='text-2xl font-bold text-green-600'>{stats.active}</p>
              </div>
              <div className='p-3 bg-green-100 rounded-lg'></div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-4 shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Đã ẩn</p>
                <p className='text-2xl font-bold text-red-600'>{stats.inactive}</p>
              </div>
              <div className='p-3 bg-red-100 rounded-lg'></div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-4 shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Điểm TB</p>
                <p className='text-2xl font-bold text-yellow-600'>{stats.averageRating}/5</p>
              </div>
              <div className='p-3 bg-yellow-100 rounded-lg'></div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-4 shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Đánh giá 5 sao</p>
                <p className='text-2xl font-bold text-purple-600'>{stats.ratingDistribution[5]}</p>
              </div>
              <div className='p-3 bg-purple-100 rounded-lg'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className='bg-white rounded-xl shadow-sm border overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'>
                  <div className='flex items-center'>
                    ID
                    {/* {sortField === 'id' &&
                      (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)} */}
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'>
                  <div className='flex items-center'>
                    Đánh giá
                    {/* {sortField === 'rating' &&
                      (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)} */}
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Nội dung
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'>
                  <div className='flex items-center'>
                    Bác sĩ
                    {/* {sortField === 'doctorName' &&
                      (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)} */}
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'>
                  <div className='flex items-center'>
                    Người dùng
                    {/* {sortField === 'userName' &&
                      (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)} */}
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'>
                  <div className='flex items-center'>
                    Thời gian
                    {/* {sortField === 'createAt' &&
                      (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)} */}
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'>
                  <div className='flex items-center'>
                    Trạng thái
                    {/* {sortField === 'active' &&
                      (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)} */}
                  </div>
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {reviewsData &&
                reviewsData.map((review) => (
                  <tr
                    key={review.id}
                    // className={`hover:bg-gray-50 transition-colors ${selectedRows.includes(review.id) ? 'bg-blue-50' : ''}`}
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>#{review.id}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <ProductRating rating={review.rating} />
                    </td>
                    <td className='px-6 py-4'>
                      <div className='max-w-xs'>
                        <p className='text-sm text-gray-900 line-clamp-2'>{review.comment}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <span className='text-sm text-gray-900'>{review.doctorName}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-2'></div>
                        <span className='text-sm text-gray-900'>{review.userName}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center text-sm text-gray-500'>{formatDate(review.createAt)}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          review.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {review.active ? <>Hoạt động</> : <>Đã ẩn</>}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex justify-center space-x-2'>
                        <button
                          title='Xóa'
                          //   onClick={() => handleDelete(user?.userId)}
                          onClick={() => handleDelete(review.id)}
                          className='p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:scale-110 transition-all duration-200 border border-red-200'
                        >
                          <svg className='size-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                        <button
                          title='Ẩn'
                          //   onClick={() => handleDelete(user?.userId)}
                          // onClick={() => handleDelete(review.id)}
                          className='p-2 text-yellow-400 bg-yellow-50 rounded-lg hover:bg-yellow-300 hover:scale-110 transition-all duration-200 border border-yellow-500'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
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
    </div>
  )
}
