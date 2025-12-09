import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
export type FormData = {
  fullName: string
  email: string
  phone: string
  experienceYears: number
  description: string
  active: boolean
  departmentName: string
}

export default function EditDoctor() {
  const { id } = useParams() //trả về object,{ id: "1" }
  const idDoctor = id ? Number(id) : undefined

  const { data: dataDetailsdoctor } = useQuery({
    queryKey: ['api/doctors', idDoctor],
    queryFn: () => AllUserAPI.getDetailsDoctor(idDoctor as number),
    enabled: !!idDoctor && !isNaN(idDoctor)
  })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      active: false,
      departmentName: '',
      description: '',
      email: '',
      experienceYears: 0,
      fullName: '',
      phone: ''
    }
  })

  const dataDetailsBS = dataDetailsdoctor?.data.data

  useEffect(() => {
    if (dataDetailsBS) {
      setValue('active', dataDetailsBS.active || false)
      setValue('departmentName', dataDetailsBS.departmentName)
      setValue('description', dataDetailsBS.description)
      setValue('email', dataDetailsBS.email)
      setValue('experienceYears', dataDetailsBS.experienceYears)
      setValue('fullName', dataDetailsBS.fullName)
      setValue('phone', dataDetailsBS.phone)
    }
  }, [dataDetailsBS, setValue])

  // -- UPDATE DOCTOR
  const updateDoctorMutation = useMutation({
    mutationFn: (body: FormData) => AllUserAPI.putupdateDoctor(idDoctor!, body)
  })

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await updateDoctorMutation.mutateAsync(formData)
      toast.success('Cập nhật bác sĩ thành công!')
    } catch (error) {
      console.log(error)
      toast.error('Cập nhật thất bại!')
    }
  })

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* HEADER */}
      <div className='mb-8'>
        <div className='flex items-center space-x-4 mb-4'>
          <Link
            to='/admin/quan-ly-bac-si'
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            <span>Quay lại</span>
          </Link>

          <h1 className='text-3xl font-bold text-gray-800'>Chỉnh sửa thông tin bác sĩ</h1>
        </div>
        <p className='text-gray-600'>Cập nhật thông tin bác sĩ trong hệ thống</p>
      </div>

      {/* FORM */}
      <div className='bg-white rounded-2xl shadow-xl p-8'>
        <form onSubmit={onSubmit} className='space-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Họ và tên */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Họ và tên</label>
              <input
                {...register('fullName', { required: 'Họ tên là bắt buộc' })}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200'
                placeholder='Nhập họ tên'
              />
              <div className='text-red-500 text-sm'>{errors.fullName?.message}</div>
            </div>

            {/* Email */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
              <input
                {...register('email', { required: 'Email là bắt buộc' })}
                type='email'
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200'
                placeholder='example@email.com'
              />
              <div className='text-red-500 text-sm'>{errors.email?.message}</div>
            </div>

            {/* Phone */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Số điện thoại</label>
              <input
                {...register('phone')}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200'
                placeholder='0987 654 321'
              />
            </div>

            {/* Exp Years */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Số năm kinh nghiệm</label>
              <input
                {...register('experienceYears')}
                type='number'
                min={0}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200'
              />
            </div>

            {/* Active */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Trạng thái</label>

              <Controller
                name='active'
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value ? 'true' : 'false'}
                    onChange={(e) => field.onChange(e.target.value === 'true')}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl'
                  >
                    <option value='false'>Đang hoạt động</option>
                    <option value='true'>Không hoạt động</option>
                  </select>
                )}
              />
            </div>

            {/* Department */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Khoa</label>
              <input
                {...register('departmentName')}
                readOnly
                className='w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-xl'
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Mô tả</label>
            <textarea
              {...register('description')}
              className='w-full px-4 py-3 border h-32 border-gray-300 rounded-xl focus:ring focus:ring-blue-200'
            />
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold'
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  )
}
