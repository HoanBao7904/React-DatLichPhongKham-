// export default function AllReview() {
//   return <div>AllReview</div>
// }
// src/pages/AllReviewsPage.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import apiRating from 'src/apis/rating.api'
import ProductRating from 'src/components/ProductRating'
import { FaArrowLeft, FaComment } from 'react-icons/fa'

interface Review {
  id: number
  rating: number
  comment: string
  createAt: string
  active: boolean
  userName: string
  doctorName: string
}

export default function AllReview() {
  const { doctorId } = useParams<{ doctorId: string }>()
  const navigate = useNavigate()
  const id = Number(doctorId)

  const { data, isLoading } = useQuery({
    queryKey: ['/api/reviews/doctor', id],
    queryFn: () => apiRating.getAllReviewByDoctorId(id)
  })

  const dataReview: Review[] = data?.data?.data || []

  const getAverageRating = (list: Review[]): number => {
    if (!list || list.length === 0) return 0
    const total = list.reduce((sum, item) => sum + item.rating, 0)
    return Number((total / list.length).toFixed(1))
  }

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <button onClick={() => navigate(-1)} className='flex items-center text-blue-600 hover:text-blue-800 mb-4'>
            <FaArrowLeft className='mr-2' /> Quay lại
          </button>

          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>Tất Cả Đánh Giá Bác Sĩ</h1>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <span className='text-3xl font-bold text-gray-800 mr-3'>{average}</span>
                <div>
                  <p className='text-gray-600 mt-1'>{dataReview.length} đánh giá</p>
                </div>
              </div>

              <div className='text-gray-600'>
                <FaComment className='inline mr-2' />
                <span className='font-medium'>{dataReview.length} bình luận</span>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách tất cả đánh giá */}
        <div className='space-y-6'>
          {dataReview.map((review) => (
            <div key={review.id} className='bg-white rounded-2xl shadow p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div className='flex items-start'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mr-4'>
                    <span className='text-blue-600 font-bold text-lg'>{review.userName.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className='flex items-center mb-1'>
                      <span className='text-gray-800 font-semibold mr-3'>{review.userName}</span>
                      <div className='flex'>
                        <ProductRating
                          rating={review.rating}
                          activeClassName='w-4 h-4 fill-yellow-400 text-yellow-400'
                          nonActiveClassName='w-4 h-4 fill-current text-gray-300'
                        />
                      </div>
                    </div>
                    <p className='text-gray-500 text-sm'>{formatDate(review.createAt)}</p>
                  </div>
                </div>
              </div>

              <p className='text-gray-700 mb-4 leading-relaxed'>{review.comment}</p>

              <div className='pt-4 border-t border-gray-100'>
                <p className='text-gray-600 text-sm'>
                  Bác sĩ: <span className='font-medium'>{review.doctorName}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
