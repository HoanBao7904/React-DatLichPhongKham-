import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import InputNumber from 'src/components/InputNumber'
import Input from 'src/Page/Inputs'
import type { User } from 'src/types/user.type'
import type { ErrorResponseAPI1 } from 'src/types/utils.type'
import { AddSchema } from 'src/utils/rules'
import { isAxios400, isAxios409 } from 'src/utils/utils'

type FromData = Omit<User, 'userId' | 'address' | 'createdAt' | 'Active' | 'role'>

export default function AddKhachHang() {
  // const addMatch = useMatch('admin/add')
  // const isAddMode = Boolean(addMatch) //có data ở chế độ thêm ko có edit
  // console.log(isAddMode)
  const {
    register,
    control,
    formState: { errors },
    setError,
    handleSubmit,
    reset
  } = useForm<FromData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      userName: '',
      password: '',
      dateOfBirth: new Date()
    },
    resolver: yupResolver(AddSchema)
  })
  const addMutation = useMutation({
    mutationFn: (body: FromData) => {
      return AllUserAPI.AddUserAPI(body)
    }
  })
  const onSubmit = handleSubmit((_) => {
    addMutation.mutate(_, {
      onSuccess: () => {
        // console.log(data)
        reset()
        toast.success('thêm user thành công')
      },
      onError: (errors) => {
        console.log(errors)
        if (isAxios400<ErrorResponseAPI1>(errors) || isAxios409<ErrorResponseAPI1>(errors)) {
          const errorDT = errors.response?.data
          if (errorDT?.details.userName === 'Username already exists') {
            setError('userName', {
              type: 'server',
              message: 'Tên đăng nhập tồn tại'
            })
          }
          if (errorDT?.details.email === 'Email already exists') {
            setError('email', {
              type: 'server',
              message: 'email đã tồn tại'
            })
          }
        }
      } // <-- đóng onError
    }) // <-- đóng mutate
  }) // <-- đóng handleSubmit

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='flex items-center space-x-4 mb-4'>
          <Link
            to='/admin'
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            <span>Quay lại</span>
          </Link>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Add Khách Hàng</h1>
            {/* <p className='text-gray-600 mt-1'>ID: </p> */}
          </div>
        </div>

        {/* Form đơn giản */}
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <form className='space-y-6' onSubmit={onSubmit}>
            <Input
              register={register}
              name='fullName'
              errorsMessage={errors.fullName?.message}
              placeholder='Họ và tên'
            />

            <Input
              register={register}
              placeholder='your@email.com'
              name='email'
              errorsMessage={errors.email?.message}
              // classNameInput=''
            />
            <Input
              register={register}
              name='dateOfBirth'
              type='date'
              errorsMessage={errors.dateOfBirth?.message}
              // classNameInput=''
            />

            <Controller
              control={control}
              name='phone'
              render={({ field }) => (
                <InputNumber
                  // classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50'
                  placeholder='0987 654 321'
                  errorMassage={errors.phone?.message}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />

            <Input
              // register={register}
              name='userName'
              register={register}
              errorsMessage={errors.userName?.message}
              placeholder='Tên đăng nhập'
              // label='Tên đăng nhập'
            />

            <Input
              name='password'
              type='password'
              autoComplete='true'
              register={register}
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
