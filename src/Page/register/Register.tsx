import { useForm } from 'react-hook-form'
import { schema, type Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../Inputs'
import { useMutation } from '@tanstack/react-query'
import AuthApi from 'src/apis/auth.api'
import { isAxios409 } from 'src/utils/utils'
import type { ErrorResponseAPI } from 'src/types/utils.type'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/button'
import { toast } from 'react-toastify'
import { path } from 'src/contanis/path'
// import type { RegisterResponse } from 'src/types/auth.type'
// import type { AxiosResponse } from 'axios'

// type ConflictError = ErrorResponseApi<{ field: string }>
export default function Register() {
  // const { SetIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Schema) => AuthApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: () => {
        navigate(path.login)
        toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
      },
      onError: (error) => {
        // console.log(error)
        if (isAxios409<ErrorResponseAPI>(error)) {
          const errorData = error.response?.data.details
          // Object.keys(errorData).forEach((key)=>{
          //    setError(key  , {
          //     message: errorData[key],
          //     type: 'Server'
          //   })
          // })
          if (errorData?.email) {
            setError('email', {
              message: 'Email đã tồn tại',
              type: 'Server'
            })
          }
          if (errorData?.userName) {
            setError('userName', {
              message: 'UserName đã tồn tại',
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200 rounded-[12px] w-full'>
      <div className='flex max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl'>
        {/* Left side - Form */}
        <div className='flex-1 p-8 flex flex-col justify-center'>
          <div className='text-center mb-6'>
            <h2 className='text-4xl font-bold text-[#2D5A3D] mb-2'>Tạo Tài Khoản Mới</h2>
            <p className='text-gray-600 text-lg'>Chào mừng bạn đến với dịch vụ của chúng tôi</p>
          </div>

          <form className='space-y-5' onSubmit={onSubmit} noValidate>
            {/* Grid container for 2 columns */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {/* Họ và tên */}
              <div className='md:col-span-2'>
                <Input
                  name='fullName'
                  placeholder='Họ và tên'
                  register={register}
                  errorsMessage={errors.fullName?.message}
                />
              </div>

              {/* Email */}
              <Input
                name='email'
                type='email'
                placeholder='Email'
                register={register}
                errorsMessage={errors.email?.message}
              />

              {/* Số điện thoại */}
              <Input
                name='phone'
                placeholder='Số điện thoại'
                register={register}
                errorsMessage={errors.phone?.message}
              />

              {/* Tên đăng nhập */}
              <Input
                name='userName'
                placeholder='Tên đăng nhập'
                register={register}
                errorsMessage={errors.userName?.message}
              />

              {/* Mật khẩu */}
              <Input
                name='password'
                type='password'
                placeholder='Mật khẩu'
                autoComplete='on'
                register={register}
                errorsMessage={errors.password?.message}
              />
            </div>

            <Button
              type='submit'
              className='w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-200 text-white rounded-xl hover:from-blue-600 hover:to-cyan-300
               transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg'
              isLoding={registerAccountMutation.isPending}
              disabled={registerAccountMutation.isPending}
            >
              Đăng Ký
            </Button>
          </form>

          <div className='text-center mt-6'>
            <p className='text-gray-600'>
              Đã có tài khoản?{' '}
              <a
                href={path.login}
                className='text-blue-600 font-semibold hover:text-cyan-400 transition-colors underline'
              >
                Đăng Nhập
              </a>
            </p>
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className='hidden md:flex flex-1 bg-gradient-to-br from-blue-300 to-cyan-200 justify-center items-center p-8 relative'>
          <div className='absolute inset-0 bg-black/5'></div>
          <div className='text-center z-10'>
            <img
              src='/src/imgs/bacsi.png'
              alt='Medical illustration'
              className='w-full h-64 object-contain rounded-md transform hover:scale-105 transition-transform duration-500 mb-4'
            />
            <h3 className='text-2xl font-bold text-[#2D5A3D]'>Tham Gia Cùng MedPro</h3>
            <p className='text-gray-700 mt-2'>Bắt đầu hành trình chăm sóc sức khỏe của bạn</p>
          </div>
        </div>
      </div>
    </div>
  )
}
