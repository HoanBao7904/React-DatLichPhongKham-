import React from 'react'

interface ReviewModalProps {
  show: boolean
  reviewData: {
    doctorName: string
  } | null
  rating: number
  comment: string
  isSubmitting: boolean
  onClose: () => void
  onRatingChange: (rating: number) => void
  onCommentChange: (comment: string) => void
  onSubmit: () => void
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  show,
  reviewData,
  rating,
  comment,
  isSubmitting,
  onClose,
  onRatingChange,
  onCommentChange,
  onSubmit
}) => {
  if (!show || !reviewData) return null

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
      <div className='relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
        <div className='mt-3'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>Đánh giá bác sĩ {reviewData.doctorName}</h3>
            <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
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
                    onClick={() => onRatingChange(star)}
                    className='text-xl focus:outline-none transition-transform hover:scale-110'
                  >
                    <span className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                  </button>
                ))}
                <span className='ml-2 text-lg font-semibold text-gray-700'>{rating}/5</span>
              </div>
            </div>

            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Nội dung đánh giá:</label>
              <textarea
                value={comment}
                onChange={(e) => onCommentChange(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                rows={4}
                placeholder='Chia sẻ trải nghiệm của bạn với bác sĩ...'
                maxLength={500}
              />
              <div className='flex justify-between mt-1'>
                <p className='text-xs text-gray-500'>Tối thiểu 10 ký tự</p>
                <p className='text-xs text-gray-500'>{comment.length}/500</p>
              </div>
            </div>
          </div>

          <div className='flex justify-end space-x-3'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
            >
              Hủy
            </button>
            <button
              onClick={onSubmit}
              disabled={isSubmitting || comment.trim().length < 10}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                isSubmitting || comment.trim().length < 10
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600'
              }`}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Gửi đánh giá'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
