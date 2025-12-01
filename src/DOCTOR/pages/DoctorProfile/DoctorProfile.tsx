import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import JobDoctor from 'src/DOCTOR/APIS/job.api'
import { ProfileDoctor } from 'src/utils/rules'

type FormData = {
  fullName: string
  email: string
  phone: string
  experienceYears: number
  description: string
  departmentName: string
}

export default function DoctorProfile() {
  const { setValue } = useForm<FormData>({
    defaultValues: {
      departmentName: '',
      description: '',
      email: '',
      experienceYears: 0,
      fullName: '',
      phone: ''
    },
    resolver: yupResolver(ProfileDoctor)
  })

  const { data } = useQuery({
    queryKey: ['api/doctors/me'],
    queryFn: JobDoctor.GetProfileDoctor
  })

  const dataProfile = data?.data.data
  useEffect(() => {
    setValue('phone', dataProfile?.phone || '')
    setValue('departmentName', dataProfile?.departmentName || '')
    setValue('description', dataProfile?.description || '')
    setValue('email', dataProfile?.email || '')
    setValue('fullName', dataProfile?.fullName || '')
    setValue('experienceYears', Number(dataProfile?.email) || 0)
  }, [dataProfile, setValue])

  if (dataProfile) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Thông tin cá nhân</h1>
            <p className='mt-2 text-sm text-gray-600'>Quản lý thông tin hồ sơ bác sĩ</p>
          </div>

          <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
            {/* Profile Header */}
            <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
              <div className='flex items-center'>
                <div className='flex-shrink-0 h-20 w-20 bg-gray-300 rounded-full flex items-center justify-center'>
                  {dataProfile.imageUrl ? (
                    <img className='h-20 w-20 rounded-full' src={dataProfile.imageUrl} alt={dataProfile.fullName} />
                  ) : (
                    <span className='text-2xl font-bold text-gray-600'>{dataProfile.fullName.charAt(0)}</span>
                  )}
                </div>
                <div className='ml-6'>
                  <h3 className='text-2xl font-bold text-gray-900'>{dataProfile.fullName}</h3>
                  <p className='text-sm text-gray-500 mt-1'>{dataProfile.departmentName}</p>
                  <div className='flex items-center mt-2 space-x-4'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dataProfile.active ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                    >
                      {dataProfile.active ? 'Ngừng hoạt động' : 'Đang hoạt động'}
                    </span>
                    {dataProfile.isFeatured && (
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                        Nổi bật
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className='px-4 py-5 sm:p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Thông tin cá nhân */}
                <div className='space-y-4'>
                  <h4 className='text-lg font-medium text-gray-900'>Thông tin cá nhân</h4>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Họ và tên</label>
                    <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
                      {dataProfile.fullName}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Email</label>
                    <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>{dataProfile.email}</div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Số điện thoại</label>
                    <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>{dataProfile.phone}</div>
                  </div>
                </div>

                {/* Thông tin chuyên môn */}
                <div className='space-y-4'>
                  <h4 className='text-lg font-medium text-gray-900'>Thông tin chuyên môn</h4>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Khoa</label>
                    <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
                      {dataProfile.departmentName}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Số năm kinh nghiệm</label>
                    <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
                      {dataProfile.experienceYears} năm
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Mô tả</label>
                    <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border min-h-[80px]'>
                      {dataProfile.description || 'Chưa có mô tả'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin hệ thống */}
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <h4 className='text-lg font-medium text-gray-900 mb-4'>Thông tin hệ thống</h4>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Mã bác sĩ</label>
                    <div className='mt-1 text-sm text-gray-900'>#{dataProfile.id}</div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Mã người dùng</label>
                    <div className='mt-1 text-sm text-gray-900'>#{dataProfile.userId}</div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Mã khoa</label>
                    <div className='mt-1 text-sm text-gray-900'>#{dataProfile.departmentId}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer với thời gian cập nhật */}
            {/* <div className='px-4 py-4 bg-gray-50 border-t border-gray-200'>
              <div className='text-sm text-gray-500 text-center'>
                Dữ liệu được cập nhật lúc: {profileData['thời gian']}
              </div>
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className='mt-6 flex justify-end space-x-3'>
            <button className='bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors'>
              Chỉnh sửa
            </button>
            <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    )
  }
}
