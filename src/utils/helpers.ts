// Định dạng ngày giờ
export const formatDate = (dateTimeString: string) => {
  const date = new Date(dateTimeString)
  return {
    date: date.toLocaleDateString('vi-VN'),
    time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }
}

// Màu sắc cho trạng thái
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'CANCELLED':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'COMPLETED':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'PAID':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// Text cho trạng thái
export const getStatusText = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return 'Đã xác nhận'
    case 'PENDING':
      return 'Chờ thanh toán'
    case 'CANCELLED':
      return 'Đã hủy'
    case 'COMPLETED':
      return 'Đã hoàn thành'
    case 'PAID':
      return 'Đã thanh toán'
    default:
      return status
  }
}

// Kiểm tra xem có phải ngày trong quá khứ không
export const isPastDate = (dateTimeString: string): boolean => {
  const appointmentDate = new Date(dateTimeString)
  const now = new Date()
  return appointmentDate < now
}

// Format tiền tệ
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// Tính thời gian còn lại cho cuộc hẹn
export const getTimeRemaining = (dateTimeString: string): string => {
  const appointmentDate = new Date(dateTimeString)
  const now = new Date()
  const diffMs = appointmentDate.getTime() - now.getTime()

  if (diffMs < 0) return 'Đã qua'

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (diffDays > 0) {
    return `Còn ${diffDays} ngày ${diffHours} giờ`
  } else if (diffHours > 0) {
    return `Còn ${diffHours} giờ`
  } else {
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `Còn ${diffMinutes} phút`
  }
}
