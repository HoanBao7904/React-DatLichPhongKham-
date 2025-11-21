import { Link } from 'react-router-dom'
import Input from 'src/Page/Inputs'
import InputNumber from 'src/components/InputNumber'

export default function EditKhachHang() {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* Header */}
      <div className='mb-8'>
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
            <h1 className='text-3xl font-bold text-gray-800'>Chỉnh Sửa Khách Hàng</h1>
            {/* <p className='text-gray-600 mt-1'>ID: </p> */}
          </div>
        </div>
        <p className='text-gray-600'>Cập nhật thông tin khách hàng trong hệ thống</p>
      </div>

      {/* Form */}
      <div className='bg-white rounded-2xl shadow-xl p-8'>
        <form className='space-y-8'>
          {/* Thông tin cơ bản */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Họ và tên */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Họ và tên <span className='text-red-500'>*</span>
              </label>
              <Input
                // register={register}
                name='fullName'
                rules={{ required: 'Họ và tên là bắt buộc' }}
                // errorsMessage={errors.fullName?.message}
                placeholder='Nhập họ và tên đầy đủ'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
              />
            </div>

            {/* Email */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Email <span className='text-red-500'>*</span>
              </label>
              <Input
                // register={register}
                name='email'
                type='email'
                rules={{
                  required: 'Email là bắt buộc',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ'
                  }
                }}
                // errorsMessage={errors.email?.message}
                placeholder='example@email.com'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Số điện thoại <span className='text-red-500'>*</span>
              </label>
              <InputNumber
                name='phone'
                // errorMassage={errors.phone?.message}
                placeholder='0987 654 321'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
              />
            </div>

            {/* Tên đăng nhập */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Tên đăng nhập <span className='text-red-500'>*</span>
              </label>
              <Input
                // register={register}
                name='userName'
                rules={{ required: 'Tên đăng nhập là bắt buộc' }}
                // errorsMessage={errors.userName?.message}
                placeholder='Nhập tên đăng nhập'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50 cursor-not-allowed'
                disabled
              />
              <p className='text-xs text-gray-500 mt-1'>Tên đăng nhập không thể thay đổi</p>
            </div>

            {/* Vai trò */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Vai trò <span className='text-red-500'>*</span>
              </label>
              <select
                // {...register('role', { required: 'Vai trò là bắt buộc' })}
                className='cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-white'
              >
                <option value=''>Chọn vai trò</option>
                <option value='USER'>USER</option>
                <option value='DOCTOR'>DOCTOR</option>
                <option value='ADMIN'>ADMIN</option>
                <option value='ADMIN'>EMPLOYY</option>
              </select>
              {/* {errors.role && (
                <div className='mt-1 text-red-600 text-sm'>{errors.role.message}</div>
              )} */}
            </div>

            {/* Trạng thái */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Trạng thái <span className='text-red-500'>*</span>
              </label>
              <select
                // {...register('active', { required: 'Trạng thái là bắt buộc' })}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-white'
              >
                <option value='true'>Đang hoạt động</option>
                <option value='false'>Không hoạt động</option>
              </select>
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Địa chỉ */}
            <div className='md:col-span-1'>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>Địa chỉ</label>
              <Input
                // register={register}
                name='address'
                placeholder='Nhập địa chỉ đầy đủ'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
              />
            </div>

            {/* Ngày sinh */}
            <div className='md:col-span-1'>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>Ngày sinh</label>
              <Input
                // register={register}
                name='dateOfBirth'
                type='date'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
              />
            </div>
          </div>

          {/* Thông tin hệ thống */}
          {/* <div className='bg-gray-50 rounded-xl p-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Thông tin hệ thống</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='text-gray-600'>ID khách hàng:</span>
                <span className='ml-2 font-medium'>#</span>
              </div>
              <div>
                <span className='text-gray-600'>Ngày tạo:</span> */}
          {/* <span className='ml-2 font-medium'>{customer?.createdAt || 'N/A'}</span> */}
          {/* </div>
            </div>
          </div> */}

          {/* Buttons */}
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
              Cập Nhật Thông Tin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
