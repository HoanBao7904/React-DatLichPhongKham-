import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import Input from 'src/Page/Inputs'
import InputNumber from 'src/components/InputNumber'
import type { User } from 'src/types/user.type'

type FormData = Omit<User, 'userId' | 'createdAt'>

const roleToIdMap: { [key: string]: number } = {
  ADMIN: 1,
  USER: 2,
  EMPLOYEE: 4,
  DOCTOR: 3
}

export default function EditKhachHang() {
  const { id: idParam } = useParams() // idParam: string | undefined
  const id = idParam ? parseInt(idParam, 10) : undefined

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      userName: '',
      role: 'USER',
      active: false,
      address: '',
      dateOfBirth: new Date(),
      password: ''
    }
  })

  const { data: userData } = useQuery({
    queryKey: ['user', id],
    queryFn: () => AllUserAPI.getUser(id!), // id đã chắc chắn là number
    enabled: id !== undefined && !isNaN(id) // chỉ chạy khi id hợp lệ
  })
  const dataUSER = userData?.data.data

  useEffect(() => {
    if (dataUSER) {
      setValue('fullName', dataUSER.fullName)
      setValue('email', dataUSER.email || '')
      setValue('phone', dataUSER.phone || '')
      setValue('userName', dataUSER.userName || '')
      setValue('role', dataUSER.role || '')
      setValue('active', dataUSER.active ?? false)

      setValue('address', dataUSER.address || '')
      setValue('dateOfBirth', dataUSER.dateOfBirth || '')
    }
  }, [dataUSER, setValue])

  const updateUserMutation = useMutation({
    mutationFn: (body: Omit<User, 'userId' | 'createdAt' | 'role' | 'active' | 'password'>) =>
      AllUserAPI.updateUserAPI(Number(id), body)
  })

  const CapNhapRole = useMutation({
    mutationFn: (body: { userId: number; roleId: number }) => AllUserAPI.CapNhapRole(body)
  })
  const CapNhapActionMutation = useMutation({
    mutationFn: (action: boolean) => AllUserAPI.CapNhapAction(action, Number(id))
  })

  const onsubmit = handleSubmit(async (data) => {
    try {
      // 1. Update thông tin cơ bản (trừ role và Active)
      const basicInfoData: Omit<User, 'userId' | 'createdAt' | 'role' | 'active' | 'password'> = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        userName: data.userName,
        address: data.address,
        dateOfBirth: data.dateOfBirth
      }

      await updateUserMutation.mutateAsync(basicInfoData)
      toast.success('Cập nhật thông tin thành công')

      // 2. Update role nếu có thay đổi
      if (dataUSER && data.role !== dataUSER.role) {
        const roleId = roleToIdMap[data.role]
        if (roleId && id) {
          await CapNhapRole.mutateAsync({
            userId: id,
            roleId: roleId
          })
          toast.success('Cập nhật vai trò thành công')
        }
      }

      // 3. Update status nếu có thay đổi
      if (dataUSER && data.active !== dataUSER.active) {
        await CapNhapActionMutation.mutateAsync(data.active)
        toast.success('Cập nhật trạng thái thành công')
      }
      // toast.success('cập nhập thông tin thành công')
    } catch (error) {
      console.log(error)
      toast.error('Có lỗi xảy ra')
    }
  })

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
        <form className='space-y-8' onSubmit={onsubmit} method='POST'>
          {/* Thông tin cơ bản */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Họ và tên */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Họ và tên <span className='text-red-500'>*</span>
              </label>
              <Input
                register={register}
                name='fullName'
                rules={{ required: 'Họ và tên là bắt buộc' }}
                errorsMessage={errors.fullName?.message}
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
                register={register}
                name='email'
                type='email'
                rules={{
                  required: 'Email là bắt buộc',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ'
                  }
                }}
                errorsMessage={errors.email?.message}
                placeholder='example@email.com'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Số điện thoại <span className='text-red-500'>*</span>
              </label>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    errorMassage={errors.phone?.message}
                    {...field}
                    placeholder='0987 654 321'
                    classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
                  />
                )}
              />
            </div>

            {/* Tên đăng nhập */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>Tên đăng nhập</label>
              <Input
                register={register}
                name='userName'
                rules={{ required: 'Tên đăng nhập là bắt buộc' }}
                errorsMessage={errors.userName?.message}
                placeholder='Nhập tên đăng nhập'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50 cursor-not-allowed'
                disabled
              />
            </div>

            {/* Vai trò */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Vai trò <span className='text-red-500'>*</span>
              </label>
              <select
                // {...register('role', { required: 'Vai trò là bắt buộc' })}
                {...register('role', { required: 'Vai trò là bắt buộc' })}
                className='cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-white'
              >
                <option value=''>Chọn vai trò</option>
                <option value='USER'>USER</option>
                <option value='DOCTOR'>DOCTOR</option>
                <option value='ADMIN'>ADMIN</option>
                <option value='EMPLOYEE'>EMPLOYEE</option>
              </select>

              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>--</div>
            </div>

            {/* Trạng thái - FIXED */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Trạng thái <span className='text-red-500'>*</span>
              </label>
              <Controller
                name='active'
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value === undefined ? 'false' : field.value.toString()}
                    onChange={(e) => {
                      const value = e.target.value === 'true'
                      field.onChange(value)
                    }}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-white'
                  >
                    <option value='false'>Đang hoạt động</option>
                    <option value='true'>Không hoạt động</option>
                  </select>
                )}
              />
              {errors.active && (
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.active.message}</div>
              )}
            </div>
            {/* Địa chỉ */}
            <div className='md:col-span-1'>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>Địa chỉ</label>
              <Input
                register={register}
                name='address'
                placeholder='Nhập địa chỉ đầy đủ'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
              />
            </div>

            {/* Ngày sinh */}
            <div className='md:col-span-1'>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>Ngày sinh</label>
              <Input
                register={register}
                name='dateOfBirth'
                // defaultValue={dataU?.dateOfBirth ? new Date(dataU.dateOfBirth).toISOString().split('T')[0] : ''}
                type='date'
                classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300'
              />
            </div>
          </div>

          <div className='flex justify-end space-x-4 pt-6 border-t border-gray-200'>
            <Link
              to='/admin/qlyKhachHang'
              className='px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold'
            >
              Hủy bỏ
            </Link>
            <button
              type='submit'
              className='bg-gradient-to-r from-blue-500 to-cyan-200 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold'
            >
              Cập Nhật Thông Tin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
