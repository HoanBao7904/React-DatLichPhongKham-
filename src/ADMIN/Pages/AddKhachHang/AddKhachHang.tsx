// export default function AddKhachHang() {
//   return (
//     <div className='p-6'>
//       {/* Header */}
//       <div className='flex justify-between items-center mb-6'>
//         <h1 className='text-2xl font-bold text-gray-800'>Thêm Khách Hàng Mới</h1>
//         <button className='bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'>
//           <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
//           </svg>
//           <span>Quay lại</span>
//         </button>
//       </div>

//       {/* Form */}
//       <div className='bg-white shadow-lg rounded-lg p-6'>
//         <form className='space-y-6'>
//           <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//             {/* Họ tên */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>
//                 Họ tên <span className='text-red-500'>*</span>
//               </label>
//               <input
//                 type='text'
//                 className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                 placeholder='Nhập họ tên'
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>
//                 Email <span className='text-red-500'>*</span>
//               </label>
//               <input
//                 type='email'
//                 className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                 placeholder='Nhập email'
//               />
//             </div>

//             {/* Số điện thoại */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>
//                 Số điện thoại <span className='text-red-500'>*</span>
//               </label>
//               <input
//                 type='tel'
//                 className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                 placeholder='Nhập số điện thoại'
//               />
//             </div>

//             {/* Tên đăng nhập */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>
//                 Tên đăng nhập <span className='text-red-500'>*</span>
//               </label>
//               <input
//                 type='text'
//                 className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                 placeholder='Nhập tên đăng nhập'
//               />
//             </div>

//             {/* Địa chỉ */}
//             <div className='md:col-span-2'>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>Địa chỉ</label>
//               <input
//                 type='text'
//                 className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                 placeholder='Nhập địa chỉ'
//               />
//             </div>

//             {/* Ngày sinh */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>Ngày sinh</label>
//               <input
//                 type='date'
//                 className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//               />
//             </div>

//             {/* Vai trò */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>
//                 Vai trò <span className='text-red-500'>*</span>
//               </label>
//               <select className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
//                 <option value='USER'>USER</option>
//                 <option value='ADMIN'>ADMIN</option>
//               </select>
//             </div>

//             {/* Trạng thái */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>
//                 Trạng thái <span className='text-red-500'>*</span>
//               </label>
//               <select className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
//                 <option value='true'>Đang hoạt động</option>
//                 <option value='false'>Không hoạt động</option>
//               </select>
//             </div>

//             {/* Mật khẩu */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>
//                 Mật khẩu <span className='text-red-500'>*</span>
//               </label>
//               <input
//                 type='password'
//                 className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                 placeholder='Nhập mật khẩu'
//               />
//             </div>

//             {/* Xác nhận mật khẩu */}
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-2'>
//                 Xác nhận mật khẩu <span className='text-red-500'>*</span>
//               </label>
//               <input
//                 type='password'
//                 className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
//                 placeholder='Xác nhận mật khẩu'
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className='flex justify-end space-x-3 pt-6 border-t border-gray-200'>
//             <button
//               type='button'
//               className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
//             >
//               Hủy
//             </button>
//             <button
//               type='submit'
//               className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2'
//             >
//               <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
//               </svg>
//               <span>Thêm khách hàng</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import InputNumber from 'src/components/InputNumber'
import Input from 'src/Page/Inputs'

interface CustomerForm {
  fullName: string
  email: string
  phone: string
  userName: string
  password: string
}

export default function AddKhachHang() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CustomerForm>()

  const onSubmit = (data: CustomerForm) => {
    console.log('Form data:', data)
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='flex items-center space-x-4 mb-4'>
          <Link
            to='/admin/qlyKhachHang'
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            <span>Quay lại</span>
          </Link>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Thêm Mới Khách Hàng</h1>
            {/* <p className='text-gray-600 mt-1'>ID: </p> */}
          </div>
        </div>

        {/* Form đơn giản */}
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <Input
              register={register}
              name='fullName'
              rules={{ required: 'Họ và tên là bắt buộc' }}
              errorsMessage={errors.fullName?.message}
              placeholder='Họ và tên'
            />

            <Input
              register={register}
              name='email'
              type='email'
              rules={{ required: 'Email là bắt buộc' }}
              errorsMessage={errors.email?.message}
              placeholder='Email'
            />

            <InputNumber
              name='phone'
              // rules={{ required: 'Số điện thoại là bắt buộc' }}
              errorMassage={errors.phone?.message}
              placeholder='Số điện thoại'
              // label='Số điện thoại'
            />

            <Input
              register={register}
              name='userName'
              rules={{ required: 'Tên đăng nhập là bắt buộc' }}
              errorsMessage={errors.userName?.message}
              placeholder='Tên đăng nhập'
              // label='Tên đăng nhập'
            />

            <Input
              register={register}
              name='password'
              type='password'
              rules={{ required: 'Mật khẩu là bắt buộc' }}
              errorsMessage={errors.password?.message}
              placeholder='Mật khẩu'
              // label='Mật khẩu'
            />

            <div className='flex justify-end space-x-4 pt-6 border-t border-gray-200'>
              <Link
                to='/admin/qlyKhachHang'
                className='px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold'
              >
                Hủy bỏ
              </Link>
              <button
                type='submit'
                className='bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold'
              >
                Thêm Khách Hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
