// import { yupResolver } from '@hookform/resolvers/yup'
// import { useQuery } from '@tanstack/react-query'
// import { useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
// import userAPI from 'src/apis/profile.api'
// import { profileSchema } from 'src/utils/rules'

// type FormData = {
//   fullName: string
//   email: string
//   phone: string
//   userName: string
//   address: string
//   dateOfBirth: Date
// }
// export default function ProfileAppointmen() {
//   //   const { setProfile: setProfileUser } = useContext(AppContext)
//   const navigate = useNavigate()
//   const { setValue } = useForm<FormData>({
//     defaultValues: {
//       fullName: '',
//       phone: '',
//       address: '',
//       userName: '',
//       email: '',
//       dateOfBirth: new Date(1990, 0, 1) //tháng bắt đầu số 0
//     },
//     resolver: yupResolver(profileSchema)
//   })

//   const { data: profileData } = useQuery({
//     queryKey: ['profile'],
//     queryFn: userAPI.getProfile //()=> userAPI.getProfile()
//   })

//   const profile = profileData?.data.data

//   useEffect(() => {
//     console.log('useEffect chạy, profile:', profile)
//     if (profile) {
//       setValue('fullName', profile.fullName || '')
//       setValue('address', profile.address || '')
//       setValue('email', profile.email || '')
//       setValue('phone', profile.phone || '')
//       setValue('userName', profile.userName || '')
//       setValue('dateOfBirth', profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date(1990, 0, 1))
//     }
//   }, [profile, setValue])

//   //   const handleNavigate = () => {
//   //     navigate('/user/user-profile')
//   //   }

//   const handleNavigateNext = () => {
//     navigate('/user/editHoSo')
//   }

//   // return (
//   //   <section className='bg-white p-6 rounded-lg shadow-sm'>
//   //     {/* Header */}
//   //     <div className='mb-6'>
//   //       <h1 className='text-2xl font-bold text-gray-900'>
//   //         <span>Chọn hồ sơ bệnh nhân</span>
//   //       </h1>
//   //     </div>

//   //     {/* Patient Card */}
//   //     <div className='mb-6'>
//   //       <div className='border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow'>
//   //         {/* Patient Name */}
//   //         <div className='flex items-center gap-3 mb-4'>
//   //           <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
//   //             <svg width='18' height='18' viewBox='0 0 20 20' fill='#3B82F6'>
//   //               <path
//   //                 opacity='0.8'
//   //                 d='M17.8506 17.5387V15.6248C17.8506 14.6095 17.4473 13.6359 16.7295 12.918C16.0116 12.2002 15.038 11.7969 14.0227 11.7969H6.36695C5.35173 11.7969 4.37809 12.2002 3.66023 12.918C2.94236 13.6359 2.53906 14.6095 2.53906 15.6248V17.5387'
//   //                 fill='#3B82F6'
//   //               />
//   //               <path
//   //                 opacity='0.8'
//   //                 d='M10.1951 10.1948C12.3092 10.1948 14.023 8.48104 14.023 6.36695C14.023 4.25287 12.3092 2.53906 10.1951 2.53906C8.08099 2.53906 6.36719 4.25287 6.36719 6.36695C6.36719 8.48104 8.08099 10.1948 10.1951 10.1948Z'
//   //                 fill='#3B82F6'
//   //               />
//   //             </svg>
//   //           </div>
//   //           <span className='text-sm text-gray-600'>Họ và tên:</span>
//   //           <span className='text-lg font-semibold text-gray-900'>{profile?.fullName}</span>
//   //         </div>

//   //         {/* email */}
//   //         <div className='flex items-center gap-3 mb-4'>
//   //           <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
//   //             <svg width='18' height='18' viewBox='0 0 20 20' fill='#3B82F6'>
//   //               <path
//   //                 opacity='0.8'
//   //                 d='M17.8506 17.5387V15.6248C17.8506 14.6095 17.4473 13.6359 16.7295 12.918C16.0116 12.2002 15.038 11.7969 14.0227 11.7969H6.36695C5.35173 11.7969 4.37809 12.2002 3.66023 12.918C2.94236 13.6359 2.53906 14.6095 2.53906 15.6248V17.5387'
//   //                 fill='#3B82F6'
//   //               />
//   //               <path
//   //                 opacity='0.8'
//   //                 d='M10.1951 10.1948C12.3092 10.1948 14.023 8.48104 14.023 6.36695C14.023 4.25287 12.3092 2.53906 10.1951 2.53906C8.08099 2.53906 6.36719 4.25287 6.36719 6.36695C6.36719 8.48104 8.08099 10.1948 10.1951 10.1948Z'
//   //                 fill='#3B82F6'
//   //               />
//   //             </svg>
//   //           </div>
//   //           <span className='text-sm text-gray-600'>Email:</span>
//   //           <span className='text-lg text-gray-900'>{profile?.email}</span>
//   //         </div>

//   //         {/* Date of Birth */}
//   //         <div className='flex items-center gap-3 mb-3'>
//   //           <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
//   //             <svg width='16' height='16' viewBox='0 0 16 16' fill='#3B82F6'>
//   //               <path
//   //                 opacity='0.8'
//   //                 fillRule='evenodd'
//   //                 clipRule='evenodd'
//   //                 d='M11.7067 0.643545C11.7984 0.725394 12.1536 1.3776 12.301 1.73493C12.3976 1.96917 12.4108 2.03057 12.4118 2.25029C12.4128 2.47368 12.4038 2.51635 12.325 2.65886C12.1563 2.96397 11.8023 3.15611 11.4717 3.12195C10.9259 3.06557 10.5499 2.55544 10.68 2.04762C10.7774 1.66675 11.2913 0.669048 11.4203 0.610207C11.5305 0.559965 11.6254 0.571 11.7067 0.643545ZM8.17432 0.658219C8.2785 0.754535 8.67024 1.50162 8.79275 1.83755C8.90983 2.15867 8.9108 2.37504 8.79626 2.61739C8.64235 2.94296 8.36729 3.11482 8 3.11482C7.63398 3.11482 7.37357 2.9535 7.20969 2.62528C7.03502 2.27541 7.09698 1.98109 7.51628 1.16906C7.75546 0.705878 7.86043 0.577515 8 0.577515C8.05425 0.577515 8.11993 0.607918 8.17432 0.658219ZM4.58837 0.612027C4.71516 0.67342 5.25486 1.74397 5.33092 2.08489C5.39314 2.36374 5.27802 2.69439 5.04843 2.89613C4.86948 3.0534 4.7027 3.11473 4.45205 3.1154C4.09406 3.1164 3.82835 2.95276 3.65356 2.62364C3.60026 2.52324 3.58776 2.4524 3.58774 2.25029C3.58774 2.01771 3.59715 1.97898 3.72672 1.67802C3.90295 1.26872 4.19866 0.729502 4.29407 0.643545C4.37169 0.573612 4.48422 0.56155 4.58837 0.612027ZM12.2205 3.91798C12.2755 3.94748 12.3446 4.01662 12.374 4.07162C12.4241 4.16503 12.4276 4.27921 12.4276 5.80813V7.44469H11.5479H10.6683L10.6684 5.79393C10.6685 4.20843 10.6708 4.13944 10.7258 4.04922C10.8294 3.8791 10.8943 3.86437 11.5396 3.86437C12.0463 3.86437 12.1334 3.87123 12.2205 3.91798ZM8.66649 3.90789C8.71859 3.93054 8.78782 3.99276 8.82034 4.04611C8.87775 4.14037 8.87945 4.19056 8.87954 5.79393L8.87966 7.44469H8H7.12035L7.12046 5.79393C7.12055 4.18997 7.12225 4.1404 7.17975 4.04602C7.27821 3.88435 7.37043 3.86422 8.00639 3.86551C8.4252 3.86636 8.59632 3.87734 8.66649 3.90789ZM5.14701 3.92189C5.33693 4.03778 5.33171 3.9846 5.33171 5.7998V7.44469H4.45205H3.5724V5.80813C3.5724 4.27921 3.57592 4.16503 3.62597 4.07162C3.7266 3.8838 3.80548 3.86437 4.46625 3.86448C4.99662 3.86457 5.06219 3.87009 5.14701 3.92189ZM13.6033 8.50129C13.8467 8.54297 14.0571 8.68967 14.1662 8.89372C14.2278 9.00888 14.2309 9.04894 14.2309 9.71907C14.2309 10.4159 14.2301 10.4248 14.1576 10.5543C14.1107 10.638 14.0323 10.7172 13.94 10.7744C13.8109 10.8542 13.7722 10.8633 13.5734 10.861C13.3875 10.8588 13.2384 10.8246 12.6587 10.6508C11.8373 10.4046 11.6364 10.3685 11.0935 10.3693C10.5929 10.37 10.375 10.4096 9.57974 10.6441C8.6968 10.9045 8.59688 10.9221 8 10.9221C7.40312 10.9221 7.30319 10.9045 6.42026 10.6441C5.62502 10.4096 5.4071 10.37 4.90654 10.3693C4.3628 10.3685 4.15482 10.4059 3.33788 10.6513C2.76106 10.8246 2.61255 10.8588 2.42656 10.861C2.22773 10.8633 2.18914 10.8542 2.06004 10.7744C1.9677 10.7172 1.8893 10.638 1.84241 10.5543C1.7699 10.4248 1.76911 10.4159 1.76911 9.71907C1.76911 9.04894 1.77224 9.00888 1.83379 8.89372C1.91096 8.74931 2.04362 8.63162 2.22359 8.5479L2.35554 8.4865L7.91203 8.48237C10.9681 8.48008 13.5292 8.48859 13.6033 8.50129ZM11.4941 11.2622C11.7067 11.2882 12.0273 11.3737 12.8674 11.6283C13.1892 11.7258 13.2724 11.7396 13.5491 11.7417L13.8643 11.744V13.0866L13.8644 14.4293H14.5002C15.0761 14.4293 15.1474 14.4348 15.2572 14.4879C15.5793 14.644 15.5814 15.1097 15.2606 15.262C15.1689 15.3056 14.5457 15.3097 8 15.3097C1.45431 15.3097 0.831071 15.3056 0.739351 15.262C0.4186 15.1097 0.420682 14.644 0.742841 14.4879C0.852563 14.4348 0.923903 14.4293 1.49981 14.4293H2.13563V13.0845V11.7399L2.37753 11.7515C2.64398 11.7643 2.69093 11.7539 3.70696 11.4565C4.73199 11.1564 5.03407 11.1629 6.24755 11.5112C7.17629 11.7778 7.5193 11.831 8.16127 11.8082C8.71707 11.7884 8.95492 11.7446 9.70067 11.5247C10.0313 11.4272 10.3941 11.3285 10.507 11.3054C10.787 11.2481 11.2231 11.229 11.4941 11.2622Z'
//   //                 fill='#3B82F6'
//   //               />
//   //             </svg>
//   //           </div>
//   //           <div>
//   //             <span className='text-sm text-gray-600'>Ngày sinh:</span>
//   //             <span className='text-gray-900 ml-2'>
//   //               {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : 'Chưa cập nhật'}
//   //             </span>
//   //           </div>
//   //         </div>

//   //         {/* Phone Number */}
//   //         <div className='flex items-center gap-3 mb-3'>
//   //           <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
//   //             <svg width='18' height='18' viewBox='0 0 20 21' fill='#3B82F6'>
//   //               <g opacity='0.8'>
//   //                 <path
//   //                   d='M17.5 16.6429V15.2713C17.5 14.5898 17.0851 13.9769 16.4523 13.7238L14.7572 13.0458C13.9524 12.7239 13.0352 13.0726 12.6475 13.8479L12.5 14.1429C12.5 14.1429 10.4167 13.7262 8.75 12.0596C7.08333 10.3929 6.66667 8.30957 6.66667 8.30957L6.96168 8.16206C7.73698 7.77441 8.08571 6.85718 7.76379 6.05237L7.08574 4.35725C6.83263 3.72449 6.21979 3.30957 5.53828 3.30957H4.16667C3.24619 3.30957 2.5 4.05576 2.5 4.97624C2.5 12.34 8.46954 18.3096 15.8333 18.3096C16.7538 18.3096 17.5 17.5634 17.5 16.6429Z'
//   //                   fill='#3B82F6'
//   //                 />
//   //               </g>
//   //             </svg>
//   //           </div>
//   //           <div>
//   //             <span className='text-sm text-gray-600'>Số điện thoại:</span>
//   //             <span className='text-gray-900 ml-2'>{profile?.phone}</span>
//   //           </div>
//   //         </div>

//   //         {/* Address */}
//   //         <div className='flex items-center gap-3 mb-3'>
//   //           <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
//   //             <svg width='18' height='18' viewBox='0 0 20 20' fill='#3B82F6'>
//   //               <path
//   //                 fillRule='evenodd'
//   //                 clipRule='evenodd'
//   //                 d='M10 18.3337C12.8125 18.3337 17.5 13.1654 17.5 9.0744C17.5 4.9834 14.1421 1.66699 10 1.66699C5.85786 1.66699 2.5 4.9834 2.5 9.0744C2.5 13.1654 7.1875 18.3337 10 18.3337ZM10 11.667C11.3807 11.667 12.5 10.5477 12.5 9.16699C12.5 7.78628 11.3807 6.66699 10 6.66699C8.61929 6.66699 7.5 7.78628 7.5 9.16699C7.5 10.5477 8.61929 11.667 10 11.667Z'
//   //                 fill='#3B82F6'
//   //               />
//   //             </svg>
//   //           </div>
//   //           <div>
//   //             <span className='text-sm text-gray-600'>Địa chỉ:</span>
//   //             <span className='text-gray-500 italic ml-2'>{profile?.address}</span>
//   //           </div>
//   //         </div>

//   //         {/* Action Buttons */}
//   //         <div className='flex justify-between items-center'>
//   //           <div className='flex gap-2'>
//   //             <button className='flex items-center gap-2 px-4 py-2 text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-colors'>
//   //               <span>Quay lại</span>
//   //               <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
//   //                 <path d='M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z' />
//   //               </svg>
//   //             </button>
//   //             <button
//   //               onClick={handleNavigateNext}
//   //               className='flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors'
//   //             >
//   //               <svg width='15' height='15' viewBox='0 0 512 512' fill='currentColor'>
//   //                 <path d='M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z' />
//   //               </svg>
//   //               <span>Sửa</span>
//   //             </button>
//   //           </div>
//   //           <button className='flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
//   //             <span>Tiếp tục</span>
//   //             <svg width='15' height='15' viewBox='0 0 448 512' fill='currentColor'>
//   //               <path d='M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z' />
//   //             </svg>
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //     <div className='bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8'>
//   //       <div className='p-6 border-b border-gray-200'>
//   //         <h2 className='text-xl font-semibold text-gray-900'>Tóm tắt lịch hẹn</h2>
//   //       </div>

//   //       <div className='p-6 space-y-4'>
//   //         {/* Bác sĩ */}
//   //         <div className='flex items-start space-x-3'>
//   //           <div className='flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
//   //             <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//   //               <path
//   //                 strokeLinecap='round'
//   //                 strokeLinejoin='round'
//   //                 strokeWidth={2}
//   //                 d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//   //               />
//   //             </svg>
//   //           </div>
//   //           <div>
//   //             <h4 className='font-semibold text-gray-900 text-sm'>Bác sĩ</h4>
//   //             <p className='text-gray-700 mt-1'>{profile?.fullName}</p>
//   //             {/* <p className='text-gray-600 text-xs mt-1'>{profile.}</p> */}
//   //           </div>
//   //         </div>

//   //         {/* Thời gian - Hiển thị khi chọn */}
//   //         <div className='flex items-start space-x-3'>
//   //           <div className='flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
//   //             <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//   //               <path
//   //                 strokeLinecap='round'
//   //                 strokeLinejoin='round'
//   //                 strokeWidth={2}
//   //                 d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
//   //               />
//   //             </svg>
//   //           </div>
//   //           <div>
//   //             <h4 className='font-semibold text-gray-900 text-sm'>Thời gian</h4>
//   //             <p className='text-gray-700 mt-1'>Chưa chọn giờ</p>
//   //             <p className='text-blue-600 text-xs mt-1'>Vui lòng chọn khung giờ phù hợp</p>
//   //           </div>
//   //         </div>

//   //         {/* Thông báo quan trọng */}
//   //         <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
//   //           <div className='flex'>
//   //             <svg
//   //               className='w-5 h-5 text-yellow-600 flex-shrink-0'
//   //               fill='none'
//   //               stroke='currentColor'
//   //               viewBox='0 0 24 24'
//   //             >
//   //               <path
//   //                 strokeLinecap='round'
//   //                 strokeLinejoin='round'
//   //                 strokeWidth={2}
//   //                 d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
//   //               />
//   //             </svg>
//   //             <div className='ml-3'>
//   //               <h3 className='text-sm font-medium text-yellow-800'>Lưu ý quan trọng</h3>
//   //               <div className='mt-2 text-sm text-yellow-700'>
//   //                 <ul className='list-disc list-inside space-y-1'>
//   //                   <li>Chỉ hiển thị khung giờ trống</li>
//   //                   <li>Vui lòng đến trước 15 phút</li>
//   //                   <li>Mang theo CMND/CCCD và thẻ BHYT</li>
//   //                 </ul>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>

//   //     {/* Footer Buttons */}
//   //     <div className='flex justify-start items-center'></div>
//   //   </section>
//   // )
//   return (
//     <section className='bg-white p-6 rounded-lg shadow-sm'>
//       {/* Header */}
//       <div className='mb-8'>
//         <h1 className='text-2xl font-bold text-gray-900'>Chọn hồ sơ bệnh nhân</h1>
//       </div>

//       <div className='grid grid-cols-3 gap-8'>
//         {/* Left Column - Patient Information */}
//         <div className='col-span-2'>
//           {/* Patient Card */}
//           <div className='border border-gray-200 rounded-xl p-8 bg-white hover:shadow-lg transition-all duration-300'>
//             {/* Patient Information Grid */}
//             <div className='grid gap-6 mb-8'>
//               {/* Name */}
//               <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-lg'>
//                 <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
//                   <div className='w-5 h-5 bg-blue-500 rounded-full'></div>
//                 </div>
//                 <div>
//                   <span className='text-sm font-medium text-gray-600'>Họ và tên</span>
//                   <p className='text-lg font-semibold text-gray-900 mt-1'>{profile?.fullName}</p>
//                 </div>
//               </div>

//               {/* Email */}
//               <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
//                 <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
//                   <div className='w-5 h-5 bg-blue-500 rounded-full'></div>
//                 </div>
//                 <div>
//                   <span className='text-sm font-medium text-gray-600'>Email</span>
//                   <p className='text-gray-900 mt-1'>{profile?.email}</p>
//                 </div>
//               </div>

//               {/* Date of Birth */}
//               <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
//                 <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
//                   <div className='w-5 h-5 bg-blue-500 rounded-full'></div>
//                 </div>
//                 <div>
//                   <span className='text-sm font-medium text-gray-600'>Ngày sinh</span>
//                   <p className='text-gray-900 mt-1'>
//                     {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : 'Chưa cập nhật'}
//                   </p>
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
//                 <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
//                   <div className='w-5 h-5 bg-blue-500 rounded-full'></div>
//                 </div>
//                 <div>
//                   <span className='text-sm font-medium text-gray-600'>Số điện thoại</span>
//                   <p className='text-gray-900 mt-1'>{profile?.phone}</p>
//                 </div>
//               </div>

//               {/* Address */}
//               <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
//                 <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
//                   <div className='w-5 h-5 bg-blue-500 rounded-full'></div>
//                 </div>
//                 <div>
//                   <span className='text-sm font-medium text-gray-600'>Địa chỉ</span>
//                   <p className='text-gray-600 italic mt-1'>{profile?.address}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className='flex justify-between items-center pt-6 border-t border-gray-200'>
//               <div className='flex gap-3'>
//                 <button className='flex items-center gap-3 px-5 py-3 text-blue-700 font-semibold hover:bg-blue-50 rounded-xl transition-all duration-200'>
//                   <div className='w-5 h-5 bg-blue-100 rounded'></div>
//                   <span>Quay lại</span>
//                 </button>
//                 <button
//                   onClick={handleNavigateNext}
//                   className='flex items-center gap-3 px-5 py-3 border-2 border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold'
//                 >
//                   <div className='w-5 h-5 bg-blue-100 rounded'></div>
//                   <span>Sửa</span>
//                 </button>
//               </div>
//               <button className='flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl'>
//                 <span>Tiếp tục</span>
//                 <div className='w-5 h-5 bg-white rounded-full'></div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Appointment Summary */}
//         <div className='col-span-1'>
//           <div className='bg-white rounded-xl shadow-lg border border-gray-200 sticky top-8'>
//             {/* Header */}
//             <div className='p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl'>
//               <h2 className='text-xl font-bold text-gray-900'>Tóm tắt lịch hẹn</h2>
//             </div>

//             {/* Content */}
//             <div className='p-6 space-y-6'>
//               {/* Doctor Info */}
//               <div className='flex items-start gap-4 p-4 bg-blue-50 rounded-lg'>
//                 <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                   <div className='w-6 h-6 bg-blue-500 rounded-full'></div>
//                 </div>
//                 <div>
//                   <h4 className='font-bold text-gray-900 text-sm'>Bác sĩ</h4>
//                   <p className='text-gray-700 mt-2 font-medium'>{profile?.fullName}</p>
//                   <p className='text-blue-600 text-xs mt-2'>Thông tin bác sĩ</p>
//                 </div>
//               </div>

//               {/* Time Info */}
//               <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-lg'>
//                 <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0'>
//                   <div className='w-6 h-6 bg-gray-500 rounded-full'></div>
//                 </div>
//                 <div>
//                   <h4 className='font-bold text-gray-900 text-sm'>Thời gian</h4>
//                   <p className='text-gray-700 mt-2 font-medium'>Chưa chọn giờ</p>
//                   <p className='text-blue-600 text-xs mt-2 font-medium'>Vui lòng chọn khung giờ phù hợp</p>
//                 </div>
//               </div>

//               {/* Important Notice */}
//               <div className='bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-5'>
//                 <div className='flex items-start gap-4'>
//                   <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
//                     <div className='w-5 h-5 bg-yellow-500 rounded-full'></div>
//                   </div>
//                   <div>
//                     <h3 className='text-sm font-bold text-yellow-800'>Lưu ý quan trọng</h3>
//                     <div className='mt-3 space-y-2'>
//                       <div className='flex items-center gap-2'>
//                         <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
//                         <span className='text-sm text-yellow-700'>Chỉ hiển thị khung giờ trống</span>
//                       </div>
//                       <div className='flex items-center gap-2'>
//                         <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
//                         <span className='text-sm text-yellow-700'>Vui lòng đến trước 15 phút</span>
//                       </div>
//                       <div className='flex items-center gap-2'>
//                         <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
//                         <span className='text-sm text-yellow-700'>Mang theo CMND/CCCD và thẻ BHYT</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
// import { useQuery } from '@tanstack/react-query'
// import { useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate, useLocation } from 'react-router-dom'
// import userAPI from 'src/apis/profile.api'
// import { profileSchema } from 'src/utils/rules'
// import { yupResolver } from '@hookform/resolvers/yup'

// type FormData = {
//   fullName: string
//   email: string
//   phone: string
//   userName: string
//   address: string
//   dateOfBirth: Date
// }

// interface AppointmentData {
//   doctorName: string
//   department: string
//   appointmentDate: string
//   appointmentTime: string
//   doctorImage?: string
// }

// export default function ProfileAppointment() {
//   const navigate = useNavigate()
//   const location = useLocation()

//   // Lấy dữ liệu đặt lịch từ state navigation
//   const appointmentData = location.state as AppointmentData

//   const { setValue } = useForm<FormData>({
//     defaultValues: {
//       fullName: '',
//       phone: '',
//       address: '',
//       userName: '',
//       email: '',
//       dateOfBirth: new Date(1990, 0, 1)
//     },
//     resolver: yupResolver(profileSchema)
//   })

//   const { data: profileData } = useQuery({
//     queryKey: ['profile'],
//     queryFn: userAPI.getProfile
//   })

//   const profile = profileData?.data.data

//   useEffect(() => {
//     if (profile) {
//       setValue('fullName', profile.fullName || '')
//       setValue('address', profile.address || '')
//       setValue('email', profile.email || '')
//       setValue('phone', profile.phone || '')
//       setValue('userName', profile.userName || '')
//       setValue('dateOfBirth', profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date(1990, 0, 1))
//     }
//   }, [profile, setValue])

//   const handleGoBack = () => {
//     navigate(-1)
//   }

//   const handleEditProfile = () => {
//     navigate('/user/editHoSo')
//   }

//   const handleContinue = () => {
//     // Xử lý tiếp tục đặt lịch
//     navigate('/user/payment', { state: { profile, appointmentData } })
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('vi-VN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     })
//   }

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8'>
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//         {/* Header */}
//         <div className='text-center mb-8'>
//           <h1 className='text-4xl font-bold text-gray-900 mb-4'>Xác Nhận Thông Tin Đặt Lịch</h1>
//           <p className='text-lg text-gray-600'>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận</p>
//         </div>

//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
//           {/* Thông tin bệnh nhân */}
//           <div className='lg:col-span-2 space-y-6'>
//             {/* Card thông tin cá nhân */}
//             <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
//               <div className='bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4'>
//                 <h2 className='text-xl font-bold text-white flex items-center gap-3'>
//                   <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
//                     <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
//                       <path
//                         fillRule='evenodd'
//                         d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
//                         clipRule='evenodd'
//                       />
//                     </svg>
//                   </div>
//                   Thông Tin Bệnh Nhân
//                 </h2>
//               </div>

//               <div className='p-6 space-y-6'>
//                 {/* Họ tên */}
//                 <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100'>
//                   <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                     <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//                       />
//                     </svg>
//                   </div>
//                   <div className='flex-1'>
//                     <label className='block text-sm font-medium text-gray-500 mb-1'>Họ và tên</label>
//                     <p className='text-lg font-semibold text-gray-900'>{profile?.fullName || 'Chưa cập nhật'}</p>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
//                   <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                     <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
//                       <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
//                       <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
//                     </svg>
//                   </div>
//                   <div className='flex-1'>
//                     <label className='block text-sm font-medium text-gray-500 mb-1'>Email</label>
//                     <p className='text-lg text-gray-900'>{profile?.email || 'Chưa cập nhật'}</p>
//                   </div>
//                 </div>

//                 {/* Ngày sinh */}
//                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
//                   <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                     <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
//                       />
//                     </svg>
//                   </div>
//                   <div className='flex-1'>
//                     <label className='block text-sm font-medium text-gray-500 mb-1'>Ngày sinh</label>
//                     <p className='text-lg text-gray-900'>
//                       {profile?.dateOfBirth
//                         ? new Date(profile.dateOfBirth).toLocaleDateString('vi-VN')
//                         : 'Chưa cập nhật'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Số điện thoại */}
//                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
//                   <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                     <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
//                       <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
//                     </svg>
//                   </div>
//                   <div className='flex-1'>
//                     <label className='block text-sm font-medium text-gray-500 mb-1'>Số điện thoại</label>
//                     <p className='text-lg text-gray-900'>{profile?.phone || 'Chưa cập nhật'}</p>
//                   </div>
//                 </div>

//                 {/* Địa chỉ */}
//                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
//                   <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                     <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
//                       <path
//                         fillRule='evenodd'
//                         d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
//                         clipRule='evenodd'
//                       />
//                     </svg>
//                   </div>
//                   <div className='flex-1'>
//                     <label className='block text-sm font-medium text-gray-500 mb-1'>Địa chỉ</label>
//                     <p className='text-gray-600 italic'>{profile?.address || 'Chưa cập nhật'}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className='px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center'>
//                 <button
//                   onClick={handleGoBack}
//                   className='flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors'
//                 >
//                   <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                     <path
//                       strokeLinecap='round'
//                       strokeLinejoin='round'
//                       strokeWidth={2}
//                       d='M10 19l-7-7m0 0l7-7m-7 7h18'
//                     />
//                   </svg>
//                   Quay lại
//                 </button>

//                 <button
//                   onClick={handleEditProfile}
//                   className='flex items-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors'
//                 >
//                   <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                     <path
//                       strokeLinecap='round'
//                       strokeLinejoin='round'
//                       strokeWidth={2}
//                       d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
//                     />
//                   </svg>
//                   Chỉnh sửa hồ sơ
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar - Tóm tắt lịch hẹn */}
//           <div className='space-y-6'>
//             {/* Card tóm tắt lịch hẹn */}
//             <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-8'>
//               <div className='bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4'>
//                 <h2 className='text-xl font-bold text-white flex items-center gap-3'>
//                   <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
//                     <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
//                       />
//                     </svg>
//                   </div>
//                   Tóm Tắt Lịch Hẹn
//                 </h2>
//               </div>

//               <div className='p-6 space-y-6'>
//                 {/* Thông tin bác sĩ */}
//                 {appointmentData && (
//                   <div className='bg-blue-50 rounded-xl p-4 border border-blue-200'>
//                     <div className='flex items-center gap-3 mb-3'>
//                       <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                         <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                           <path
//                             strokeLinecap='round'
//                             strokeLinejoin='round'
//                             strokeWidth={2}
//                             d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//                           />
//                         </svg>
//                       </div>
//                       <div>
//                         <h3 className='font-semibold text-gray-900'>Bác sĩ {appointmentData.doctorName}</h3>
//                         <p className='text-sm text-blue-600'>{appointmentData.department}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Thời gian hẹn */}
//                 {appointmentData && (
//                   <div className='bg-green-50 rounded-xl p-4 border border-green-200'>
//                     <div className='flex items-center gap-3'>
//                       <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                         <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                           <path
//                             strokeLinecap='round'
//                             strokeLinejoin='round'
//                             strokeWidth={2}
//                             d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
//                           />
//                         </svg>
//                       </div>
//                       <div>
//                         <h3 className='font-semibold text-gray-900'>Thời gian hẹn</h3>
//                         <p className='text-lg text-green-700 font-bold'>{appointmentData.appointmentTime}</p>
//                         <p className='text-sm text-gray-600'>{formatDate(appointmentData.appointmentDate)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Lưu ý quan trọng */}
//                 <div className='bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200'>
//                   <div className='flex items-start gap-3'>
//                     <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
//                       <svg className='w-5 h-5 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                         <path
//                           strokeLinecap='round'
//                           strokeLinejoin='round'
//                           strokeWidth={2}
//                           d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
//                         />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className='font-bold text-yellow-800 text-sm mb-3'>Lưu ý quan trọng</h3>
//                       <ul className='space-y-2 text-sm text-yellow-700'>
//                         <li className='flex items-center gap-2'>
//                           <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
//                           Vui lòng đến trước 15 phút
//                         </li>
//                         <li className='flex items-center gap-2'>
//                           <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
//                           Mang theo CMND/CCCD và thẻ BHYT
//                         </li>
//                         <li className='flex items-center gap-2'>
//                           <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
//                           Chuẩn bị sẵn triệu chứng và câu hỏi
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Nút xác nhận */}
//                 <button
//                   onClick={handleContinue}
//                   className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3'
//                 >
//                   <span>Xác Nhận Đặt Lịch</span>
//                   <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// src/pages/ConfirmAppointment.tsx
// import { useQuery } from '@tanstack/react-query'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useLocation, useNavigate } from 'react-router-dom'
// import userAPI from 'src/apis/profile.api'
// import DoctersApi from 'src/apis/docter.api'
// import { toast } from 'react-toastify'

// interface AppointmentData {
//   doctorName: string
//   department: string
//   appointmentDate: string
//   appointmentTime: string
//   doctorImage?: string
//   doctorId: number
//   doctorUserId: number
// }

// export default function ConfirmAppointment() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const queryClient = useQueryClient()
//   const appointmentData = location.state as AppointmentData

//   // Lấy thông tin user
//   const { data: profileData } = useQuery({
//     queryKey: ['profile'],
//     queryFn: userAPI.getProfile
//   })

//   const profile = profileData?.data.data

//   // Mutation để đặt lịch (chỉ gọi khi bấm xác nhận)
//   const createAppointmentMutation = useMutation({
//     mutationFn: DoctersApi.postAppointmentUser,
//     onSuccess: () => {
//       toast.success('Đặt lịch thành công!')
//       queryClient.invalidateQueries({ queryKey: ['api/doctors', appointmentData.doctorId] })
//       navigate('/user/thongtindatkham')
//     },
//     onError: () => {
//       toast.error('Đặt lịch thất bại')
//     }
//   })

//   const handleConfirm = () => {
//     if (!profile) {
//       toast.error('Không tìm thấy thông tin người dùng')
//       return
//     }

//     const appointmentRequest = {
//       appointmentDateTime: `${appointmentData.appointmentDate}T${appointmentData.appointmentTime}:00`,
//       note: 'Khám tổng quát',
//       doctorId: appointmentData.doctorId,
//       userId: appointmentData.doctorUserId
//     }

//     createAppointmentMutation.mutate(appointmentRequest)
//   }

//   const handleGoBack = () => {
//     navigate(-1)
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('vi-VN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     })
//   }

//   if (!appointmentData) {
//     return (
//       <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
//         <div className='text-center'>
//           <h2 className='text-2xl font-bold text-gray-900 mb-4'>Thông tin không hợp lệ</h2>
//           <button
//             onClick={() => navigate('/')}
//             className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
//           >
//             Quay về trang chủ
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8'>
//       <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
//         {/* Header */}
//         <div className='text-center mb-8'>
//           <h1 className='text-4xl font-bold text-gray-900 mb-4'>Xác Nhận Thông Tin Đặt Lịch</h1>
//           <p className='text-lg text-gray-600'>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận</p>
//         </div>

//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
//           {/* Thông tin bệnh nhân */}
//           <div className='lg:col-span-2 space-y-6'>
//             {/* Card thông tin cá nhân */}
//             <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
//               <div className='bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4'>
//                 <h2 className='text-xl font-bold text-white flex items-center gap-3'>
//                   <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
//                     <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
//                       <path
//                         fillRule='evenodd'
//                         d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
//                         clipRule='evenodd'
//                       />
//                     </svg>
//                   </div>
//                   Thông Tin Bệnh Nhân
//                 </h2>
//               </div>

//               <div className='p-6 space-y-6'>
//                 {/* Các thông tin bệnh nhân (giữ nguyên từ code trước) */}
//                 <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100'>
//                   <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                     <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//                       />
//                     </svg>
//                   </div>
//                   <div className='flex-1'>
//                     <label className='block text-sm font-medium text-gray-500 mb-1'>Họ và tên</label>
//                     <p className='text-lg font-semibold text-gray-900'>{profile?.fullName || 'Chưa cập nhật'}</p>
//                   </div>
//                 </div>

//                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
//                   <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                     <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
//                       <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
//                       <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
//                     </svg>
//                   </div>
//                   <div className='flex-1'>
//                     <label className='block text-sm font-medium text-gray-500 mb-1'>Email</label>
//                     <p className='text-lg text-gray-900'>{profile?.email || 'Chưa cập nhật'}</p>
//                   </div>
//                 </div>

//                 <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
//                   <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                     <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
//                       <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
//                     </svg>
//                   </div>
//                   <div className='flex-1'>
//                     <label className='block text-sm font-medium text-gray-500 mb-1'>Số điện thoại</label>
//                     <p className='text-lg text-gray-900'>{profile?.phone || 'Chưa cập nhật'}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar - Tóm tắt lịch hẹn */}
//           <div className='space-y-6'>
//             <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-8'>
//               <div className='bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4'>
//                 <h2 className='text-xl font-bold text-white flex items-center gap-3'>
//                   <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
//                     <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
//                       />
//                     </svg>
//                   </div>
//                   Thông Tin Lịch Hẹn
//                 </h2>
//               </div>

//               <div className='p-6 space-y-6'>
//                 {/* Thông tin bác sĩ */}
//                 <div className='bg-blue-50 rounded-xl p-4 border border-blue-200'>
//                   <div className='flex items-center gap-3 mb-3'>
//                     <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                       {appointmentData.doctorImage ? (
//                         <img
//                           src={appointmentData.doctorImage}
//                           alt={appointmentData.doctorName}
//                           className='w-10 h-10 rounded-full object-cover'
//                         />
//                       ) : (
//                         <div className='w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center'>
//                           <span className='text-blue-600 font-bold text-sm'>
//                             {appointmentData.doctorName.charAt(0)}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <h3 className='font-semibold text-gray-900'>Bác sĩ {appointmentData.doctorName}</h3>
//                       <p className='text-sm text-blue-600'>{appointmentData.department}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Thời gian hẹn */}
//                 <div className='bg-green-50 rounded-xl p-4 border border-green-200'>
//                   <div className='flex items-center gap-3'>
//                     <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
//                       <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                         <path
//                           strokeLinecap='round'
//                           strokeLinejoin='round'
//                           strokeWidth={2}
//                           d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
//                         />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className='font-semibold text-gray-900'>Thời gian hẹn</h3>
//                       <p className='text-lg text-green-700 font-bold'>{appointmentData.appointmentTime}</p>
//                       <p className='text-sm text-gray-600'>{formatDate(appointmentData.appointmentDate)}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Lưu ý quan trọng */}
//                 <div className='bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200'>
//                   <div className='flex items-start gap-3'>
//                     <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
//                       <svg className='w-5 h-5 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                         <path
//                           strokeLinecap='round'
//                           strokeLinejoin='round'
//                           strokeWidth={2}
//                           d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
//                         />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className='font-bold text-yellow-800 text-sm mb-3'>Lưu ý quan trọng</h3>
//                       <ul className='space-y-2 text-sm text-yellow-700'>
//                         <li className='flex items-center gap-2'>
//                           <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
//                           Vui lòng đến trước 15 phút
//                         </li>
//                         <li className='flex items-center gap-2'>
//                           <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
//                           Mang theo CMND/CCCD và thẻ BHYT
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Nút hành động */}
//                 <div className='space-y-3'>
//                   <button
//                     onClick={handleConfirm}
//                     disabled={createAppointmentMutation.isPending}
//                     className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3'
//                   >
//                     {createAppointmentMutation.isPending ? (
//                       <>
//                         <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
//                         <span>Đang đặt lịch...</span>
//                       </>
//                     ) : (
//                       <>
//                         <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
//                         </svg>
//                         <span>Xác Nhận Đặt Lịch</span>
//                       </>
//                     )}
//                   </button>

//                   <button
//                     onClick={handleGoBack}
//                     className='w-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-3 px-6 rounded-xl transition-colors'
//                   >
//                     Quay Lại Chỉnh Sửa
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react' // Thêm useState
import userAPI from 'src/apis/profile.api'
import DoctersApi from 'src/apis/docter.api'
import { toast } from 'react-toastify'

interface AppointmentData {
  doctorName: string
  department: string
  appointmentDate: string
  appointmentTime: string
  doctorImage?: string
  doctorId: number
  doctorUserId: number
}

export default function ConfirmAppointment() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const appointmentData = location.state as AppointmentData
  const [note, setNote] = useState('') // State cho note

  // Lấy thông tin user
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile
  })

  const profile = profileData?.data.data

  // Mutation để đặt lịch (chỉ gọi khi bấm xác nhận)
  const createAppointmentMutation = useMutation({
    mutationFn: DoctersApi.postAppointmentUser,
    onSuccess: () => {
      toast.success('Đặt lịch thành công!')
      queryClient.invalidateQueries({ queryKey: ['api/doctors', appointmentData.doctorId] })
      // navigate('/user/thongtindatkham')
    },
    onError: () => {
      toast.error('Đặt lịch thất bại')
    }
  })

  const handleConfirm = () => {
    if (!profile) {
      toast.error('Không tìm thấy thông tin người dùng')
      return
    }
    const processedNote = note.trim() ? note.trim() : 'không có ghi chú'

    const appointmentRequest = {
      appointmentDateTime: `${appointmentData.appointmentDate}T${appointmentData.appointmentTime}:00`,
      // note: note || 'Ko có ghi chú',
      note: processedNote,
      doctorId: appointmentData.doctorId,
      userId: appointmentData.doctorUserId
    }
    console.log('API Request:', appointmentRequest)
    createAppointmentMutation.mutate(appointmentRequest)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!appointmentData) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Thông tin không hợp lệ</h2>
          <button
            onClick={() => navigate('/')}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Xác Nhận Thông Tin Đặt Lịch</h1>
          <p className='text-lg text-gray-600'>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Thông tin bệnh nhân */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Card thông tin cá nhân */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
              <div className='bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4'>
                <h2 className='text-xl font-bold text-white flex items-center gap-3'>
                  <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                    <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  Thông Tin Bệnh Nhân
                </h2>
              </div>

              <div className='p-6 space-y-6'>
                {/* Các thông tin bệnh nhân */}
                <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Họ và tên</label>
                    <p className='text-lg font-semibold text-gray-900'>{profile?.fullName || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
                  <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Email</label>
                    <p className='text-lg text-gray-900'>{profile?.email || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
                  <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-6 h-6 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Số điện thoại</label>
                    <p className='text-lg text-gray-900'>{profile?.phone || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                {/* Thêm input cho note */}
                <div className='flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200'>
                  <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                    <svg className='w-6 h-6 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-500 mb-3'>
                      Ghi chú cho bác sĩ (tùy chọn)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder='Mô tả triệu chứng, câu hỏi hoặc thông tin cần tư vấn...'
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
                      rows={4}
                      maxLength={500}
                    />
                    <div className='flex justify-between items-center mt-2'>
                      <span className='text-xs text-gray-500'>{note.length}/500 ký tự</span>
                      {note.length > 0 && (
                        <button onClick={() => setNote('')} className='text-xs text-red-500 hover:text-red-700'>
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Tóm tắt lịch hẹn */}
          <div className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-8'>
              <div className='bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4'>
                <h2 className='text-xl font-bold text-white flex items-center gap-3'>
                  <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  Thông Tin Lịch Hẹn
                </h2>
              </div>

              <div className='p-6 space-y-6'>
                {/* Thông tin bác sĩ */}
                <div className='bg-blue-50 rounded-xl p-4 border border-blue-200'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                      {appointmentData.doctorImage ? (
                        <img
                          src={appointmentData.doctorImage}
                          alt={appointmentData.doctorName}
                          className='w-10 h-10 rounded-full object-cover'
                        />
                      ) : (
                        <div className='w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center'>
                          <span className='text-blue-600 font-bold text-sm'>
                            {appointmentData.doctorName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>Bác sĩ {appointmentData.doctorName}</h3>
                      <p className='text-sm text-blue-600'>{appointmentData.department}</p>
                    </div>
                  </div>
                </div>

                {/* Thời gian hẹn */}
                <div className='bg-green-50 rounded-xl p-4 border border-green-200'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>Thời gian hẹn</h3>
                      <p className='text-lg text-green-700 font-bold'>{appointmentData.appointmentTime}</p>
                      <p className='text-sm text-gray-600'>{formatDate(appointmentData.appointmentDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Hiển thị note nếu có */}
                {note && (
                  <div className='bg-purple-50 rounded-xl p-4 border border-purple-200'>
                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                        <svg className='w-5 h-5 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-900 text-sm mb-2'>Ghi chú của bạn</h3>
                        <p className='text-sm text-gray-700'>{note}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lưu ý quan trọng */}
                <div className='bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200'>
                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                      <svg className='w-5 h-5 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-bold text-yellow-800 text-sm mb-3'>Lưu ý quan trọng</h3>
                      <ul className='space-y-2 text-sm text-yellow-700'>
                        <li className='flex items-center gap-2'>
                          <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
                          Vui lòng đến trước 15 phút
                        </li>
                        <li className='flex items-center gap-2'>
                          <div className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></div>
                          Mang theo CMND/CCCD và thẻ BHYT
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className='space-y-3'>
                  <button
                    onClick={handleConfirm}
                    disabled={createAppointmentMutation.isPending}
                    className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3'
                  >
                    {createAppointmentMutation.isPending ? (
                      <>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        <span>Đang đặt lịch...</span>
                      </>
                    ) : (
                      <>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        <span>Xác Nhận Đặt Lịch</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleGoBack}
                    className='w-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-3 px-6 rounded-xl transition-colors'
                  >
                    Quay Lại Chỉnh Sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
