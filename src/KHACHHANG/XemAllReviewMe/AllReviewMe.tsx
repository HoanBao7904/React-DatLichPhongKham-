import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import apiRating from 'src/apis/rating.api'
import ProductRating from 'src/components/ProductRating'

interface UserReview {
  id: number
  rating: number
  comment: string
  createAt: string
  active: boolean
  userName: string
  doctorName: string
  doctorDepartmentName?: string
  doctorImageUrl?: string
  appointmentId?: number
}

export default function AllReviewMe() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editReview, setEditReview] = useState<UserReview | null>(null)
  const [editRating, setEditRating] = useState(5)
  const [editComment, setEditComment] = useState('')
  const [reviewToDelete, setReviewToDelete] = useState<UserReview | null>(null)

  // LẤY DANH SÁCH ĐÁNH GIÁ CỦA USER
  const { data } = useQuery({
    queryKey: ['api/reviews/me'],
    queryFn: () => apiRating.getAllReviewMe(),
    enabled: true
  })

  const queryClient = useQueryClient()
  const reviewsData: UserReview[] = data?.data?.data || []

  // Hàm đếm số lượng đánh giá theo rating
  const countRatings = (rating: number) => {
    return reviewsData.filter((review) => review.rating === rating).length
  }

  // Tính tổng số đánh giá
  const totalReviews = reviewsData.length

  // Tính điểm trung bình
  const averageRating =
    totalReviews > 0 ? (reviewsData.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1) : '0.0'

  // Lọc đánh giá theo rating được chọn
  const filteredReviews = selectedRating
    ? reviewsData.filter((review) => review.rating === selectedRating)
    : reviewsData

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

  // Hàm mở modal chỉnh sửa
  const handleOpenEditModal = (review: UserReview) => {
    setEditReview(review)
    setEditRating(review.rating)
    setEditComment(review.comment)
    setShowEditModal(true)
  }

  // Hàm mở modal xác nhận xóa
  const handleOpenDeleteConfirm = (review: UserReview) => {
    setReviewToDelete(review)
    setShowDeleteConfirm(true)
  }

  // MUTATION CẬP NHẬT ĐÁNH GIÁ
  const updateReview = useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: number; data: { rating: number; comment: string } }) =>
      apiRating.updateReviewUSer(data, reviewId),
    onSuccess: () => {
      toast.success('Cập nhật đánh giá thành công!')
      setShowEditModal(false)
      queryClient.invalidateQueries({
        queryKey: ['api/reviews/me']
      })
    },
    onError: () => {
      toast.error('Cập nhật đánh giá thất bại')
    }
  })

  // MUTATION XÓA ĐÁNH GIÁ
  const deleteReview = useMutation({
    mutationFn: (reviewId: number) => apiRating.deleteReview(reviewId),
    onSuccess: () => {
      toast.success('Xóa đánh giá thành công!')
      setShowDeleteConfirm(false)
      queryClient.invalidateQueries({
        queryKey: ['api/reviews/me']
      })
    },
    onError: () => {
      toast.error('Xóa đánh giá thất bại')
    }
  })

  // Hàm xử lý cập nhật đánh giá
  const handleUpdateReview = () => {
    if (!editReview) return

    if (editRating < 1 || editRating > 5) {
      toast.error('Vui lòng chọn số sao từ 1 đến 5')
      return
    }

    if (!editComment.trim()) {
      toast.error('Vui lòng nhập nội dung đánh giá')
      return
    }

    if (editComment.trim().length < 10) {
      toast.error('Nội dung đánh giá phải có ít nhất 10 ký tự')
      return
    }

    updateReview.mutate({
      reviewId: editReview.id,
      data: { rating: editRating, comment: editComment.trim() }
    })
  }

  // Hàm xóa đánh giá
  const handleDeleteReview = () => {
    if (reviewToDelete) {
      deleteReview.mutate(reviewToDelete.id)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Đánh giá của tôi</h1>
          <p className='mt-2 text-sm text-gray-600'>Tổng số: {totalReviews} đánh giá</p>
        </div>

        {/* Thống kê nhanh */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>Điểm trung bình</div>
            <div className='text-2xl font-bold text-yellow-600'>{averageRating}/5</div>
            <div className='mt-1'>
              <ProductRating
                rating={parseFloat(averageRating)}
                activeClassName='w-4 h-4 fill-yellow-400'
                nonActiveClassName='w-4 h-4 fill-gray-300'
              />
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>5 Sao</div>
            <div className='text-2xl font-bold text-green-600'>{countRatings(5)}</div>
            <div className='text-xs text-gray-500 mt-1'>
              {totalReviews > 0 ? Math.round((countRatings(5) / totalReviews) * 100) : 0}% tổng số
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>3-4 Sao</div>
            <div className='text-2xl font-bold text-blue-600'>{countRatings(4) + countRatings(3)}</div>
            <div className='text-xs text-gray-500 mt-1'>
              {totalReviews > 0 ? Math.round(((countRatings(4) + countRatings(3)) / totalReviews) * 100) : 0}% tổng số
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <div className='text-sm font-medium text-gray-500'>1-2 Sao</div>
            <div className='text-2xl font-bold text-red-600'>{countRatings(2) + countRatings(1)}</div>
            <div className='text-xs text-gray-500 mt-1'>
              {totalReviews > 0 ? Math.round(((countRatings(2) + countRatings(1)) / totalReviews) * 100) : 0}% tổng số
            </div>
          </div>
        </div>

        {/* Bộ lọc đánh giá */}
        <div className='bg-white shadow rounded-lg p-4 mb-6'>
          <div className='flex flex-wrap gap-2 mb-4'>
            <button
              onClick={() => setSelectedRating(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRating === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất Cả ({totalReviews})
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
                  selectedRating === rating
                    ? rating === 5
                      ? 'bg-yellow-600 text-white'
                      : rating === 4
                        ? 'bg-green-600 text-white'
                        : rating === 3
                          ? 'bg-orange-600 text-white'
                          : rating === 2
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-600 text-white'
                    : rating === 5
                      ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                      : rating === 4
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : rating === 3
                          ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                          : rating === 2
                            ? 'bg-red-50 text-red-700 hover:bg-red-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className='mr-1'>★</span> {rating} Sao ({countRatings(rating)})
              </button>
            ))}
          </div>

          {selectedRating !== null && (
            <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg'>
              <span className='text-blue-700 font-medium'>
                Đang hiển thị đánh giá {selectedRating} sao ({filteredReviews.length} đánh giá)
              </span>
              <button
                onClick={() => setSelectedRating(null)}
                className='text-blue-600 hover:text-blue-800 text-sm font-medium'
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Danh sách đánh giá */}
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Danh sách đánh giá</h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>Tất cả đánh giá của bạn cho các bác sĩ</p>
          </div>

          <div className='divide-y divide-gray-200'>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <div key={review.id} className='px-4 py-5 sm:px-6 hover:bg-gray-50 transition-colors duration-150'>
                  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                    {/* Thông tin chính */}
                    <div className='flex-1'>
                      <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center space-x-3'>
                          <div className='flex items-center'>
                            <ProductRating
                              rating={review.rating}
                              activeClassName='w-4 h-4 fill-yellow-400'
                              nonActiveClassName='w-4 h-4 fill-gray-300'
                            />
                            <span className='ml-2 text-sm font-medium text-gray-900'>{review.rating}/5</span>
                          </div>
                          <span className='text-sm text-gray-500'>ID: #{review.id}</span>
                        </div>
                        <div className='text-right'>
                          <div className='text-sm text-gray-500'>{formatDate(review.createAt)}</div>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Thông tin bác sĩ */}
                        <div className='space-y-2'>
                          <h4 className='text-sm font-medium text-gray-900'>Bác sĩ được đánh giá</h4>
                          <div className='space-y-1 text-sm text-gray-600'>
                            <div className='flex items-center'>
                              <span className='font-medium w-20'>Bác sĩ:</span>
                              <span className='font-semibold text-blue-600'>{review.doctorName}</span>
                            </div>
                            {review.doctorDepartmentName && (
                              <div className='flex items-center'>
                                <span className='font-medium w-20'>Khoa:</span>
                                <span>{review.doctorDepartmentName}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Nội dung đánh giá */}
                        <div className='space-y-2'>
                          <h4 className='text-sm font-medium text-gray-900'>Nội dung đánh giá</h4>
                          <div className='text-sm text-gray-600'>
                            <p className='whitespace-pre-line'>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Avatar bác sĩ */}
                    <div className='mt-4 lg:mt-0 lg:ml-6 flex-shrink-0'>
                      <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-2'>
                          {review.doctorImageUrl ? (
                            <img
                              src={review.doctorImageUrl}
                              alt={review.doctorName}
                              className='w-16 h-16 rounded-full object-cover'
                            />
                          ) : (
                            <span className='text-2xl font-semibold text-gray-500'>
                              {review.doctorName?.charAt(0) ?? 'BS'}
                            </span>
                          )}
                        </div>
                        <span className='text-xs text-gray-500 text-center'>Bác sĩ</span>
                      </div>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className='mt-4 flex flex-wrap gap-2 justify-end'>
                    <button
                      onClick={() => handleOpenEditModal(review)}
                      className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors'
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleOpenDeleteConfirm(review)}
                      className='px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors'
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className='px-4 py-12 text-center'>
                <div className='text-gray-400 mb-4'>
                  <svg className='w-16 h-16 mx-auto' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                </div>
                <p className='text-gray-500'>
                  {selectedRating !== null
                    ? `Bạn chưa có đánh giá ${selectedRating} sao nào`
                    : 'Bạn chưa có đánh giá nào'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL CHỈNH SỬA ĐÁNH GIÁ */}
      {showEditModal && editReview && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Chỉnh sửa đánh giá cho {editReview.doctorName}
                </h3>
                <button onClick={() => setShowEditModal(false)} className='text-gray-400 hover:text-gray-600'>
                  <span className='text-2xl'>×</span>
                </button>
              </div>

              <div className='mt-4 mb-6'>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Số sao đánh giá:</label>
                  <div className='flex items-center space-x-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setEditRating(star)}
                        className='text-xl focus:outline-none transition-transform hover:scale-110'
                      >
                        <span className={star <= editRating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                      </button>
                    ))}
                    <span className='ml-2 text-lg font-semibold text-gray-700'>{editRating}/5</span>
                  </div>
                </div>

                <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Nội dung đánh giá:</label>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    rows={4}
                    placeholder='Chia sẻ trải nghiệm của bạn...'
                    maxLength={500}
                  />
                  <div className='flex justify-between mt-1'>
                    <p className='text-xs text-gray-500'>Tối thiểu 10 ký tự</p>
                    <p className='text-xs text-gray-500'>{editComment.length}/500</p>
                  </div>
                </div>

                {/* Hiển thị đánh giá cũ */}
                <div className='mb-4 p-3 bg-blue-50 rounded-md'>
                  <p className='text-sm text-blue-700'>
                    <span className='font-medium'>Đánh giá cũ:</span> {editReview.rating} sao
                  </p>
                  {editReview.comment && <p className='text-sm text-blue-600 mt-1'>"{editReview.comment}"</p>}
                </div>
              </div>

              <div className='flex justify-end space-x-3'>
                <button
                  onClick={() => setShowEditModal(false)}
                  disabled={updateReview.isPending}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateReview}
                  disabled={updateReview.isPending || editComment.trim().length < 10}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                    updateReview.isPending || editComment.trim().length < 10
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {updateReview.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      {showDeleteConfirm && reviewToDelete && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <div className='text-center'>
                <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4'>
                  <svg className='h-6 w-6 text-red-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-medium leading-6 text-gray-900 mb-2'>Xóa đánh giá</h3>
                <div className='mt-2 px-4 py-3'>
                  <p className='text-sm text-gray-500 mb-3'>Bạn có chắc chắn muốn xóa đánh giá này?</p>
                  <div className='bg-red-50 border border-red-100 rounded-md p-3 mb-4'>
                    <div className='flex justify-center mb-2'>
                      <ProductRating
                        rating={reviewToDelete.rating}
                        activeClassName='w-4 h-4 fill-yellow-400'
                        nonActiveClassName='w-4 h-4 fill-gray-300'
                      />
                    </div>
                    <p className='text-sm text-gray-700 text-center'>"{reviewToDelete.comment}"</p>
                    <p className='text-xs text-gray-500 text-center mt-1'>Đánh giá cho: {reviewToDelete.doctorName}</p>
                    <p className='text-xs text-gray-500 text-center'>Ngày: {formatDate(reviewToDelete.createAt)}</p>
                  </div>
                </div>
              </div>

              <div className='flex justify-center space-x-3 mt-6'>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleteReview.isPending}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteReview}
                  disabled={deleteReview.isPending}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                    deleteReview.isPending ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {deleteReview.isPending ? 'Đang xóa...' : 'Xóa đánh giá'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
