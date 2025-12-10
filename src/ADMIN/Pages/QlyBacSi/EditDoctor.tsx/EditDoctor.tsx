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
  departmentId: number
}

export default function EditDoctor() {
  const { id } = useParams()
  const doctorId = id ? Number(id) : undefined

  const { data: dataDetailsDoctor } = useQuery({
    queryKey: ['api/doctors', doctorId],
    queryFn: () => AllUserAPI.getDetailsDoctor(doctorId as number),
    enabled: !!doctorId
  })

  const doctor = dataDetailsDoctor?.data.data

  const { data: dataDepartments } = useQuery({
    queryKey: ['api/departments'],
    queryFn: () => AllUserAPI.getDepartment({ page: '1', size: '50' })
  })

  const departments = dataDepartments?.data.data || []

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      active: false,
      departmentId: 0,
      description: '',
      email: '',
      experienceYears: 0,
      fullName: '',
      phone: ''
    }
  })

  useEffect(() => {
    if (doctor) {
      setValue('active', doctor.active)
      setValue('departmentId', doctor.departmentId)
      setValue('description', doctor.description)
      setValue('email', doctor.email)
      setValue('experienceYears', doctor.experienceYears)
      setValue('fullName', doctor.fullName)
      setValue('phone', doctor.phone)
    }
  }, [doctor, setValue])

  // ==================== UPDATE ====================
  const updateDoctorMutation = useMutation({
    mutationFn: (body: FormData) => AllUserAPI.putupdateDoctor(doctorId!, body),
    onSuccess: () => {
      toast.success('Cập nhật bác sĩ thành công!')
    },
    onError: () => {
      toast.error('Cập nhật thất bại!')
    }
  })

  const onSubmit = handleSubmit((formData) => {
    updateDoctorMutation.mutate(formData)
  })

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* HEADER */}
      <div className='mb-8'>
        <div className='flex items-center space-x-4 mb-4'>
          <Link
            to='/admin/quan-ly-bac-si'
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2'
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
            {/* FULLNAME */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Họ và tên</label>
              <input
                {...register('fullName', { required: 'Họ tên là bắt buộc' })}
                className='w-full px-4 py-3 border rounded-xl'
              />
              <p className='text-red-500 text-sm'>{errors.fullName?.message}</p>
            </div>

            {/* EMAIL */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Email</label>
              <input
                {...register('email', { required: 'Email là bắt buộc' })}
                type='email'
                className='w-full px-4 py-3 border rounded-xl'
              />
              <p className='text-red-500 text-sm'>{errors.email?.message}</p>
            </div>

            {/* PHONE */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Số điện thoại</label>
              <input {...register('phone')} className='w-full px-4 py-3 border rounded-xl' />
            </div>

            {/* EXP */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Số năm kinh nghiệm</label>
              <input {...register('experienceYears')} type='number' className='w-full px-4 py-3 border rounded-xl' />
            </div>

            {/* ACTIVE */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Trạng thái</label>
              <Controller
                name='active'
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className='w-full px-4 py-3 border rounded-xl'
                    value={field.value ? 'true' : 'false'}
                    onChange={(e) => field.onChange(e.target.value === 'true')}
                  >
                    <option value='false'>Đang hoạt động</option>
                    <option value='true'>Không hoạt động</option>
                  </select>
                )}
              />
            </div>

            {/* DEPARTMENT DROPDOWN */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Khoa</label>
              <select
                {...register('departmentId', { required: 'Vui lòng chọn khoa' })}
                className='w-full px-4 py-3 border rounded-xl'
              >
                <option value=''>-- Chọn khoa --</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <p className='text-red-500 text-sm'>{errors.departmentId?.message}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className='block text-sm font-semibold mb-2'>Mô tả</label>
            <textarea {...register('description')} className='w-full px-4 py-3 border h-32 rounded-xl' />
          </div>

          <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl'>
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  )
}
