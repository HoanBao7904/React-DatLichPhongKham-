import { useContext, useEffect } from 'react'
import Input from '../Inputs'
import Button from 'src/components/button'
import { AppContext } from 'src/contexts/app.context'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import userAPI from 'src/apis/profile.api'
import DateSelect from './DateSelect'
import InputNumber from 'src/components/InputNumber'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from 'src/utils/rules'
import { setProfile } from 'src/utils/auth'
import { toast } from 'react-toastify'
import UserSideNav from './UserSideNav'
import { Link } from 'react-router-dom'
import { path } from 'src/contanis/path'

type FormData = {
  fullName: string
  email: string
  phone: string
  userName: string
  address: string
  dateOfBirth: Date
}

export default function Profile() {
  const { setProfile: setProfileUser } = useContext(AppContext)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      address: '',
      userName: '',
      email: '',
      dateOfBirth: new Date(1990, 0, 1) //tháng bắt đầu số 0
    },
    resolver: yupResolver(profileSchema)
  })

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile //()=> userAPI.getProfile()
  })

  const profile = profileData?.data.data

  useEffect(() => {
    console.log('useEffect chạy, profile:', profile)
    if (profile) {
      setValue('fullName', profile.fullName || '')
      setValue('address', profile.address || '')
      setValue('email', profile.email || '')
      setValue('phone', profile.phone || '')
      setValue('userName', profile.userName || '')
      setValue('dateOfBirth', profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile
  })
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    const res = await updateProfileMutation.mutateAsync({ ...data, dateOfBirth: data.dateOfBirth?.toISOString() })
    if (res.data.data) {
      setProfileUser(res.data.data)
      setProfile(res.data.data)
    }

    refetch()
    toast.success(res.data.message)
  })

  // return (
  //   <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
  //     <div className='md:col-span-3 lg:col-span-2'>
  //       <UserSideNav />
  //     </div>
  //     <div className='md:col-span-9 lg:col-span-10'>
  //       <div className='rounded-sm bg-white px-7 pb-20 shadow'>
  //         <div className='border-b border-b-gray-400 py-5'>
  //           <h1 className='text-lg font-medium text-black capitalize'>Hồ Sơ Của Tôi</h1>
  //           <div className='text-sm text-gray-300 mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
  //         </div>
  //         <form
  //           className='mt-8 flex flex-col-reverse md:flex-row md:items-start'
  //           key={profile?.userId}
  //           onSubmit={onSubmit}
  //         >
  //           <div className='mt-6 flex-grow pr-12 md:mt:0'>
  //             <div className='flex flex-wrap'>
  //               <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
  //               <div className='w-[80%] pl-5'>
  //                 <Input
  //                   classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
  //                   register={register}
  //                   errorsMessage={errors.email?.message}
  //                   placeholder='email'
  //                   name='email'
  //                 />
  //               </div>
  //             </div>
  //             <div className='flex flex-wrap mt-6'>
  //               <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên Đăng Nhập</div>
  //               <div className='w-[80%] pl-5'>
  //                 <Input
  //                   classNameInput='pointer-events-none p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
  //                   register={register}
  //                   errorsMessage={errors.userName?.message}
  //                   placeholder='Tên đăng nhập'
  //                   name='userName'
  //                 />
  //               </div>
  //             </div>
  //             <div className='flex flex-wrap mt-6'>
  //               <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
  //               <div className='w-[80%] pl-5'>
  //                 <Input
  //                   classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
  //                   register={register}
  //                   errorsMessage={errors.fullName?.message}
  //                   placeholder='họ và tên'
  //                   name='fullName'
  //                 />
  //               </div>
  //             </div>

  //             <div className='flex flex-wrap mt-6'>
  //               <div className='w-[20%] truncate pt-3 text-right capitalize'>số điện thoại</div>
  //               <div className='w-[80%] pl-5'>
  //                 <Controller
  //                   control={control}
  //                   name='phone'
  //                   render={({ field }) => (
  //                     <InputNumber
  //                       classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
  //                       placeholder='số điện thoại'
  //                       errorMassage={errors.phone?.message}
  //                       {...field}
  //                       onChange={field.onChange}
  //                     />
  //                   )}
  //                 />
  //               </div>
  //             </div>
  //             <div className='flex flex-wrap mt-6'>
  //               <div className='w-[20%] truncate pt-3 text-right capitalize'>địa chỉ</div>
  //               <div className='w-[80%] pl-5'>
  //                 <Input
  //                   classNameInput='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
  //                   register={register}
  //                   errorsMessage={errors.address?.message}
  //                   placeholder='địa chỉ'
  //                   name='address'
  //                 />
  //               </div>
  //             </div>
  //             <Controller
  //               control={control}
  //               name='dateOfBirth'
  //               render={({ field }) => <DateSelect value={field.value} onChange={field.onChange} />}
  //             />

  //             <div className='flex flex-wrap mt-6'>
  //               <div className='w-[20%] truncate pt-3 text-right capitalize' />
  //               <div className='w-[80%] pl-5'>
  //                 <Button
  //                   className='flex items-center bg-blue-500 text-sm text-white hover:bg-blue-600 rounded-sm capitalize h-10 px-6'
  //                   type='submit'
  //                 >
  //                   lưu
  //                 </Button>
  //               </div>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-12'>
          {/* Sidebar */}
          <div className='md:col-span-3 lg:col-span-3'>
            <UserSideNav />
          </div>

          {/* Main Content */}
          <div className='md:col-span-9 lg:col-span-9'>
            <div className='rounded-2xl bg-white shadow-2xl overflow-hidden'>
              {/* Header */}
              <div className='bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] px-8 py-6'>
                <h1 className='text-2xl font-bold text-white'>Hồ Sơ Của Tôi</h1>

                <p className='text-white/80 mt-2'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              </div>

              {/* Form Content */}
              <form className='p-8' key={profile?.userId} onSubmit={onSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                  {/* Left Column */}
                  <div className='space-y-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-1/3 text-right'>
                        <label className='font-semibold text-gray-700'>Email</label>
                      </div>
                      <div className='w-2/3'>
                        <Input
                          classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50'
                          register={register}
                          errorsMessage={errors.email?.message}
                          placeholder='your@email.com'
                          name='email'
                        />
                      </div>
                    </div>

                    <div className='flex items-center space-x-4'>
                      <div className='w-1/3 text-right'>
                        <label className='font-semibold text-gray-700'>Tên Đăng Nhập</label>
                      </div>
                      <div className='w-2/3'>
                        <Input
                          classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-100 cursor-not-allowed'
                          register={register}
                          errorsMessage={errors.userName?.message}
                          placeholder='Tên đăng nhập'
                          name='userName'
                        />
                      </div>
                    </div>

                    <div className='flex items-center space-x-4'>
                      <div className='w-1/3 text-right'>
                        <label className='font-semibold text-gray-700'>Họ và Tên</label>
                      </div>
                      <div className='w-2/3'>
                        <Input
                          classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50'
                          register={register}
                          errorsMessage={errors.fullName?.message}
                          placeholder='Nguyễn Văn A'
                          name='fullName'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className='space-y-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-1/3 text-right'>
                        <label className='font-semibold text-gray-700'>Số Điện Thoại</label>
                      </div>
                      <div className='w-2/3'>
                        <Controller
                          control={control}
                          name='phone'
                          render={({ field }) => (
                            <InputNumber
                              classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50'
                              placeholder='0987 654 321'
                              errorMassage={errors.phone?.message}
                              {...field}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className='flex items-center space-x-4'>
                      <div className='w-1/3 text-right'>
                        <label className='font-semibold text-gray-700'>Địa Chỉ</label>
                      </div>
                      <div className='w-2/3'>
                        <Input
                          classNameInput='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50'
                          register={register}
                          errorsMessage={errors.address?.message}
                          placeholder='Số nhà, đường, quận/huyện, thành phố'
                          name='address'
                        />
                      </div>
                    </div>

                    <div className='flex items-center space-x-4'>
                      <div className='w-1/3 text-right'>
                        <label className='font-semibold text-gray-700'>Ngày Sinh</label>
                      </div>
                      <div className='w-2/3'>
                        <Controller
                          control={control}
                          name='dateOfBirth'
                          render={({ field }) => (
                            <DateSelect
                              value={field.value}
                              onChange={field.onChange}
                              errorMessage={errors.dateOfBirth?.message}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='flex justify-between mt-8 pt-6 border-t border-gray-200'>
                  <Link
                    to={path.home}
                    className='bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2'
                    type='submit'
                  >
                    <div className='flex items-start justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5 mr-2'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
                      </svg>

                      <span>Quayy Lại</span>
                    </div>
                  </Link>
                  <Button
                    className='bg-gradient-to-r from-[#2D5A3D] to-[#FF6B6B] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2'
                    type='submit'
                  >
                    <div className='flex items-start justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke='currentColor'
                        className='w-5 h-5 mr-2'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                      </svg>
                      <span>Lưu Thay Đổi</span>
                    </div>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
