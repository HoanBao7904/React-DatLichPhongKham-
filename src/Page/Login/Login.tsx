import { Loginschema, type loginSchema } from 'src/utils/rules'
import Input from '../Inputs'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import AuthApi from 'src/apis/auth.api'
import { isAxios401 } from 'src/utils/utils'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/button'
import type { ErrorResponseAPI } from 'src/types/utils.type'
import { path } from 'src/contanis/path'

export default function Login() {
  const { SetIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<loginSchema>({
    resolver: yupResolver(Loginschema)
  })

  const LoginMutation = useMutation({
    mutationFn: (body: loginSchema) => AuthApi.LoginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    LoginMutation.mutate(data, {
      onSuccess: (data) => {
        // console.log(data)
        SetIsAuthenticated(true)
        setProfile(data.data.data!.user)
        navigate('/')
      },
      onError: (error) => {
        console.log(error)
        if (isAxios401<ErrorResponseAPI>(error)) {
          const errorData = error.response?.data
          if (errorData?.message === 'Username or password is incorrect' && errorData.operationType === 'Failure') {
            setError('userName', {
              type: 'server',
              message: 'Sai tên đăng nhập hoặc mật khẩu'
            })
          }
          //   if (errorData?.message === 'Username or password is incorrect' && errorData.operationType === 'Failure') {
          //     setError('password', {
          //       type: 'server',
          //       message: 'Sai tên đăng nhập hoặc mật khẩu'
          //     })
          //   }
        }
      }
    })
  })

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-cyan-100 rounded-[12px] w-full'>
      <div className='flex max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl'>
        {/* Left side - Form */}
        <div className='flex-1 p-12 flex flex-col justify-center'>
          <div className='text-center mb-8'>
            <h2 className='text-4xl font-bold text-blue-600 mb-3'>Chào Mừng Trở Lại</h2>
            <p className='text-gray-500 text-lg'>Rất vui được gặp lại bạn tại không gian đặc biệt này</p>
          </div>

          <form className='space-y-6' onSubmit={onSubmit} noValidate>
            <Input
              name='userName'
              type='text'
              placeholder='Tên Đăng Nhập'
              register={register}
              errorsMessage={errors.userName?.message}
            />

            <Input
              name='password'
              type='password'
              placeholder='••••••••'
              register={register}
              autoComplete='on'
              errorsMessage={errors.password?.message}
            />

            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center space-x-2 text-gray-700'>
                <input type='checkbox' className='rounded text-[#2D5A3D] focus:ring-[#2D5A3D]' />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a href='#' className='text-cyan-400 hover:text-[#ff5252] font-medium transition-colors'>
                Quên mật khẩu?
              </a>
            </div>

            <Button
              className='w-full py-4 bg-gradient-to-r from-blue-400 to-cyan-200 text-white rounded-xl hover:from-blue-600 hover:to-cyan-400 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg'
              type='submit'
              isLoding={LoginMutation.isPending}
              disabled={LoginMutation.isPending}
            >
              Đăng Nhập
            </Button>
          </form>

          <div className='text-center mt-8'>
            <p className='text-gray-600'>
              Chưa có tài khoản?{' '}
              <a
                href={path.register}
                className='text-blue-700 font-semibold hover:text-[#245232] transition-colors underline'
              >
                Đăng ký ngay
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
            <h3 className='text-2xl font-bold text-white'>Hệ Thống Y Tế MedPro</h3>
            <p className='text-slate-400 mt-2'>Chăm sóc sức khỏe toàn diện</p>
          </div>
        </div>
      </div>
    </div>
  )
}
