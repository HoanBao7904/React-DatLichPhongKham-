import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import apiRating from 'src/apis/rating.api'
import ProductRating from 'src/components/ProductRating'
import { useNavigate } from 'react-router-dom'

// Định nghĩa interface cho đánh giá
interface Review {
  id: number
  rating: number
  comment: string
  createAt: string
  active: boolean
  userName: string
  doctorName: string
}

interface props {
  doctorId: number
}

export default function ReviewDoctor({ doctorId }: props) {
  //   const doctorId = 1
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['/api/reviews/doctor', doctorId],
    queryFn: () => apiRating.getAllReviewByDoctorId(doctorId)
  })

  // Lấy dữ liệu từ response API
  const dataReview: Review[] = data?.data?.data || []

  // Lọc đánh giá theo rating được chọn
  const filteredReviews = selectedRating ? dataReview.filter((review) => review.rating === selectedRating) : dataReview

  // Hàm tính trung bình rating
  const getAverageRating = (list: Review[]): number => {
    if (!list || list.length === 0) return 0
    const total = list.reduce((sum, item) => sum + item.rating, 0)
    return Number((total / list.length).toFixed(1))
  }

  // Hàm đếm số lượng theo rating
  const countRatings = (list: Review[], star: number): number => {
    return list.filter((item) => item.rating === star).length
  }

  const handleViewAllReviews = () => {
    navigate(`/user/doctors/${doctorId}/reviews`) // Điều hướng đến trang tất cả đánh giá
  }

  // Hàm định dạng ngày tháng
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const average = getAverageRating(dataReview)
  const totalReviews = dataReview.length
  const filteredReviewsCount = filteredReviews.length

  if (isLoading) {
    return (
      <div className='bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto'>
        <div className='text-center py-10'>Đang tải đánh giá...</div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
      <h1 className='text-2xl font-bold text-gray-800 text-center mb-6'>ĐÁNH GIÁ BÁC SĨ</h1>
      <div className='border-b border-gray-200 mb-6'></div>

      {/* Thông tin tổng quan đánh giá */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
        <div className='mb-6 md:mb-0'>
          <div className='flex items-center mb-2'>
            <span className='text-4xl font-bold text-gray-800 mr-3'>{average}</span>
            <div className='flex flex-col'>
              {/* <ProductRating rating={average} activeClassName='w-5 h-3 fill-yellow-400 text-yellow-400' /> */}
              <span className='text-gray-600 mt-1'>trên 5</span>
            </div>
          </div>
          <p className='text-gray-600'>Dựa trên {totalReviews} đánh giá</p>
        </div>

        <div className='w-full md:w-auto'>
          <div className='flex flex-wrap gap-2 mb-4'>
            <button
              onClick={() => setSelectedRating(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedRating === null ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
            >
              Tất Cả ({totalReviews})
            </button>
            <button
              onClick={() => setSelectedRating(5)}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${selectedRating === 5 ? 'bg-yellow-600 text-white' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}
            >
              ★ 5 Sao ({countRatings(dataReview, 5)})
            </button>
            <button
              onClick={() => setSelectedRating(4)}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${selectedRating === 4 ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
            >
              ★ 4 Sao ({countRatings(dataReview, 4)})
            </button>
            <button
              onClick={() => setSelectedRating(3)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedRating === 3 ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}
            >
              3 Sao ({countRatings(dataReview, 3)})
            </button>
            <button
              onClick={() => setSelectedRating(2)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedRating === 2 ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
            >
              2 Sao ({countRatings(dataReview, 2)})
            </button>
            <button
              onClick={() => setSelectedRating(1)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedRating === 1 ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              1 Sao ({countRatings(dataReview, 1)})
            </button>
          </div>

          <div className='flex space-x-4'>
            <div className='flex items-center text-gray-600'>
              <span className='mr-2 text-blue-500'>💬</span>
              <span>Có Bình Luận ({totalReviews})</span>
            </div>
          </div>
        </div>
      </div>

      <div className='border-b border-gray-300 mb-6'></div>

      {/* Hiển thị thông tin lọc */}
      {selectedRating !== null && (
        <div className='mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-blue-700 font-medium'>
              Đang hiển thị đánh giá {selectedRating} sao ({filteredReviewsCount} đánh giá)
            </span>
          </div>
          <button
            onClick={() => setSelectedRating(null)}
            className='text-blue-600 hover:text-blue-800 text-sm font-medium'
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Danh sách Review */}
      <div className='space-y-6'>
        {filteredReviews.slice(0, 10).map((review) => (
          <div key={review.id} className='border-b border-gray-100 pb-6 last:border-b-0'>
            <div className='flex justify-between items-start mb-3'>
              <div className='flex items-center'>
                <div className='flex mr-3'>
                  <ProductRating
                    rating={review.rating}
                    activeClassName='w-4 h-4 fill-yellow-400 text-yellow-400'
                    nonActiveClassName='w-4 h-4 fill-current text-gray-300'
                  />
                </div>
                <span className='text-gray-800 font-medium'>{review.userName}</span>
              </div>
              <span className='text-gray-500 text-sm'>{formatDate(review.createAt)}</span>
            </div>

            <p className='text-gray-700 mb-2 font-medium'>{review.doctorName}</p>

            <p className='text-gray-600 mb-4'>{review.comment}</p>

            <div className='flex justify-between items-center'>
              <div className='flex space-x-4'>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-1'>💬</span> Đã bình luận
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredReviews.length === 0 && (
          <div className='text-center py-10 text-gray-500'>
            {selectedRating !== null
              ? `Không có đánh giá ${selectedRating} sao nào.`
              : 'Chưa có đánh giá nào cho bác sĩ này.'}
          </div>
        )}
      </div>

      {/* Nút xem thêm */}
      <div className='text-center mt-8'>
        <button
          onClick={handleViewAllReviews}
          className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300'
        >
          Xem Thêm Đánh Giá
        </button>
      </div>
    </div>
  )
}
