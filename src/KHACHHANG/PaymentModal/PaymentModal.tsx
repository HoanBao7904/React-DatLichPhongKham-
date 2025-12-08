import React from 'react'

import type { PaymentModalProps } from 'src/types/viewAppointmentKH.type'
import { formatDate } from 'src/utils/helpers'

const PaymentModal: React.FC<PaymentModalProps> = ({
  show,
  paymentData,
  qrCodeUrl,
  paymentAmount,
  checkingStatus,
  checkMessage,
  isCreating,
  onClose,
  onCreatePayment
}) => {
  if (!show || !paymentData) return null

  const { date, time } = formatDate(paymentData.appointmentDateTime)

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
      <div className='relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white'>
        <div className='mt-3'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Thanh toán cho cuộc hẹn với BS. {paymentData.doctorName}
            </h3>
            <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
              <span className='text-2xl'>×</span>
            </button>
          </div>

          <div className='mb-6'>
            <div className='bg-gray-50 p-4 rounded-lg mb-4'>
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <div className='text-gray-600'>Mã cuộc hẹn:</div>
                <div className='font-semibold'>#{paymentData.appointmentId}</div>
                <div className='text-gray-600'>Ngày khám:</div>
                <div className='font-semibold'>{date}</div>
                <div className='text-gray-600'>Giờ khám:</div>
                <div className='font-semibold'>{time}</div>
              </div>
            </div>

            {qrCodeUrl ? (
              <div className='text-center'>
                <div className='mb-4'>
                  <h4 className='text-md font-medium text-gray-700 mb-2'>Quét mã QR để thanh toán</h4>
                  <div className='inline-block p-4 bg-white border border-gray-200 rounded-lg'>
                    <img src={qrCodeUrl} alt='QR Code Thanh toán' className='w-64 h-64 mx-auto' />
                  </div>
                </div>

                <div className='mb-4 text-sm text-gray-600'>
                  <p className='mb-1'>
                    <span className='font-medium'>Số tiền:</span> {paymentAmount.toLocaleString('vi-VN')} VNĐ
                  </p>
                  <p className='mb-1'>
                    <span className='font-medium'>Nội dung CK:</span> COCLK{paymentData.appointmentId}
                  </p>
                </div>

                {checkingStatus !== 'waiting' && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      checkingStatus === 'success'
                        ? 'bg-green-50 border border-green-200'
                        : checkingStatus === 'checking'
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-yellow-50 border border-yellow-200'
                    }`}
                  >
                    <div className='flex items-center'>
                      {checkingStatus === 'success' && (
                        <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3'>
                          <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                          </svg>
                        </div>
                      )}
                      {checkingStatus === 'checking' && (
                        <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                          <svg className='w-6 h-6 text-blue-600 animate-spin' fill='none' viewBox='0 0 24 24'>
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            />
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            />
                          </svg>
                        </div>
                      )}
                      {checkingStatus === 'failed' && (
                        <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3'>
                          <svg
                            className='w-6 h-6 text-yellow-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                        </div>
                      )}

                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-900'>
                          {checkingStatus === 'success'
                            ? 'Thanh toán thành công!'
                            : checkingStatus === 'checking'
                              ? 'Đang kiểm tra thanh toán...'
                              : 'Đã dừng kiểm tra'}
                        </h4>
                        <p
                          className={`text-sm ${
                            checkingStatus === 'success'
                              ? 'text-green-700'
                              : checkingStatus === 'checking'
                                ? 'text-blue-700'
                                : 'text-yellow-700'
                          }`}
                        >
                          {checkMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='text-center py-8'>
                <div className='mb-4'>
                  <svg
                    className='w-16 h-16 mx-auto text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                </div>
                <p className='text-gray-600 mb-4'>Nhấn nút bên dưới để tạo mã QR thanh toán</p>
                <button
                  onClick={onCreatePayment}
                  disabled={isCreating}
                  className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                    isCreating
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  }`}
                >
                  {isCreating ? 'Đang tạo mã QR...' : 'Tạo mã QR thanh toán'}
                </button>
              </div>
            )}
          </div>

          <div className='flex justify-end space-x-3 pt-4 border-t'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
            >
              {qrCodeUrl ? 'Đóng' : 'Hủy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
