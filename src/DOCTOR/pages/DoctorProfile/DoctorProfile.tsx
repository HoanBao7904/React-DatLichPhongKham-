// import { yupResolver } from '@hookform/resolvers/yup'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useEffect, useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'
// import JobDoctor from 'src/DOCTOR/APIS/job.api'
// import { ProfileDoctor, type DoctorProfile } from 'src/utils/rules'

// type FormData = {
//   fullName: string
//   email: string
//   phone: string
//   experienceYears: number
//   description: string
//   departmentName: string
// }

// export default function DoctorProfile() {
//   const [isEditing, setIsEditing] = useState(false)
//   const queryClient = useQueryClient()
//   const { setValue, handleSubmit, control } = useForm<FormData>({
//     defaultValues: {
//       departmentName: '',
//       description: '',
//       email: '',
//       experienceYears: 0,
//       fullName: '',
//       phone: ''
//     },
//     resolver: yupResolver(ProfileDoctor)
//   })

//   const { data } = useQuery({
//     queryKey: ['api/doctors/me'],
//     queryFn: JobDoctor.GetProfileDoctor
//   })

//   // Mutation để cập nhật profile
//   const updateProfileMutation = useMutation({
//     mutationFn: (data: DoctorProfile) => JobDoctor.updateProfileDoctor(data),
//     onSuccess: () => {
//       toast.success('Cập nhật thông tin thành công!')
//       queryClient.invalidateQueries({ queryKey: ['doctorProfile'] })
//       setIsEditing(false)
//     },
//     onError: (error) => {
//       toast.error(error.message || 'Cập nhật thất bại!')
//     }
//   })

//   const dataProfile = data?.data.data
//   useEffect(() => {
//     setValue('phone', dataProfile?.phone || '')
//     setValue('departmentName', dataProfile?.departmentName || '')
//     setValue('description', dataProfile?.description || '')
//     setValue('email', dataProfile?.email || '')
//     setValue('fullName', dataProfile?.fullName || '')
//     setValue('experienceYears', Number(dataProfile?.email) || 0)
//   }, [dataProfile, setValue])

//   const onSubmit = (formData: FormData) => {
//     const updateData: DoctorProfile = {
//       fullName: formData.fullName,
//       email: formData.email,
//       phone: formData.phone,
//       experienceYears: formData.experienceYears,
//       description: formData.description,
//       departmentName: formData.departmentName
//       // departmentId: formData.departmentId,
//       // address: formData.address,
//       // dateOfBirth: formData.dateOfBirth
//     }
//     updateProfileMutation.mutate(updateData)
//   }

//   // if (dataProfile) {
//   //   return (
//   //     <div className='min-h-screen bg-gray-50 py-8'>
//   //       <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
//   //         {/* Header */}
//   //         <div className='mb-8'>
//   //           <h1 className='text-3xl font-bold text-gray-900'>Thông tin cá nhân</h1>
//   //           <p className='mt-2 text-sm text-gray-600'>Quản lý thông tin hồ sơ bác sĩ</p>
//   //         </div>

//   //         <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
//   //           {/* Profile Header */}
//   //           <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
//   //             <div className='flex items-center'>
//   //               <div className='flex-shrink-0 h-20 w-20 bg-gray-300 rounded-full flex items-center justify-center'>
//   //                 {dataProfile.imageUrl ? (
//   //                   <img className='h-20 w-20 rounded-full' src={dataProfile.imageUrl} alt={dataProfile.fullName} />
//   //                 ) : (
//   //                   <span className='text-2xl font-bold text-gray-600'>{dataProfile.fullName.charAt(0)}</span>
//   //                 )}
//   //               </div>
//   //               <div className='ml-6'>
//   //                 <h3 className='text-2xl font-bold text-gray-900'>{dataProfile.fullName}</h3>
//   //                 <p className='text-sm text-gray-500 mt-1'>{dataProfile.departmentName}</p>
//   //                 <div className='flex items-center mt-2 space-x-4'>
//   //                   <span
//   //                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dataProfile.active ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
//   //                   >
//   //                     {dataProfile.active ? 'Ngừng hoạt động' : 'Đang hoạt động'}
//   //                   </span>
//   //                   {dataProfile.isFeatured && (
//   //                     <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
//   //                       Nổi bật
//   //                     </span>
//   //                   )}
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </div>

//   //           {/* Profile Details */}
//   //           <div className='px-4 py-5 sm:p-6'>
//   //             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//   //               {/* Thông tin cá nhân */}
//   //               <div className='space-y-4'>
//   //                 <h4 className='text-lg font-medium text-gray-900'>Thông tin cá nhân</h4>

//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Họ và tên</label>
//   //                   <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
//   //                     {dataProfile.fullName}
//   //                   </div>
//   //                 </div>

//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Email</label>
//   //                   <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>{dataProfile.email}</div>
//   //                 </div>

//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Số điện thoại</label>
//   //                   <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>{dataProfile.phone}</div>
//   //                 </div>
//   //               </div>

//   //               {/* Thông tin chuyên môn */}
//   //               <div className='space-y-4'>
//   //                 <h4 className='text-lg font-medium text-gray-900'>Thông tin chuyên môn</h4>

//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Khoa</label>
//   //                   <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
//   //                     {dataProfile.departmentName}
//   //                   </div>
//   //                 </div>

//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Số năm kinh nghiệm</label>
//   //                   <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
//   //                     {dataProfile.experienceYears} năm
//   //                   </div>
//   //                 </div>

//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Mô tả</label>
//   //                   <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border min-h-[80px]'>
//   //                     {dataProfile.description || 'Chưa có mô tả'}
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>

//   //             {/* Thông tin hệ thống */}
//   //             <div className='mt-8 pt-6 border-t border-gray-200'>
//   //               <h4 className='text-lg font-medium text-gray-900 mb-4'>Thông tin hệ thống</h4>
//   //               <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Mã bác sĩ</label>
//   //                   <div className='mt-1 text-sm text-gray-900'>#{dataProfile.id}</div>
//   //                 </div>
//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Mã người dùng</label>
//   //                   <div className='mt-1 text-sm text-gray-900'>#{dataProfile.userId}</div>
//   //                 </div>
//   //                 <div>
//   //                   <label className='block text-sm font-medium text-gray-500'>Mã khoa</label>
//   //                   <div className='mt-1 text-sm text-gray-900'>#{dataProfile.departmentId}</div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </div>

//   //           {/* Footer với thời gian cập nhật */}
//   //           {/* <div className='px-4 py-4 bg-gray-50 border-t border-gray-200'>
//   //             <div className='text-sm text-gray-500 text-center'>
//   //               Dữ liệu được cập nhật lúc: {profileData['thời gian']}
//   //             </div>
//   //           </div> */}
//   //         </div>

//   //         {/* Action Buttons */}
//   //         <div className='mt-6 flex justify-end space-x-3'>
//   //           <button className='bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors'>
//   //             Chỉnh sửa
//   //           </button>
//   //           <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
//   //             Lưu thay đổi
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   )
//   // }

//   return (
//     <div className='min-h-screen bg-gray-50 py-8'>
//       <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
//         {/* Header */}
//         <div className='mb-8'>
//           <h1 className='text-3xl font-bold text-gray-900'>Thông tin cá nhân</h1>
//           <p className='mt-2 text-sm text-gray-600'>Quản lý thông tin hồ sơ bác sĩ</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
//             {/* Profile Header */}
//             <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
//               <div className='flex items-center justify-between'>
//                 <div className='flex items-center'>
//                   <div className='ml-6'>
//                     {isEditing ? (
//                       <Controller
//                         name='fullName'
//                         control={control}
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             className='text-2xl font-bold text-gray-900 border border-gray-300 rounded px-3 py-2'
//                             placeholder='Họ và tên'
//                           />
//                         )}
//                       />
//                     ) : (
//                       <h3 className='text-2xl font-bold text-gray-900'>{dataProfile?.fullName}</h3>
//                     )}
//                     <p className='text-sm text-gray-500 mt-1'>{dataProfile?.departmentName}</p>
//                     <div className='flex items-center mt-2 space-x-4'>
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dataProfile?.active ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
//                       >
//                         {dataProfile?.active ? 'Ngừng hoạt động' : 'Đang hoạt động'}
//                       </span>
//                       {dataProfile?.isFeatured && (
//                         <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
//                           Nổi bật
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Profile Details */}
//             <div className='px-4 py-5 sm:p-6'>
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                 {/* Thông tin cá nhân */}
//                 <div className='space-y-4'>
//                   <h4 className='text-lg font-medium text-gray-900'>Thông tin cá nhân</h4>

//                   <div>
//                     <label className='block text-sm font-medium text-gray-500'>Họ và tên</label>
//                     {isEditing ? (
//                       <>
//                         <Controller
//                           name='fullName'
//                           control={control}
//                           render={({ field }) => (
//                             <input
//                               {...field}
//                               className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
//                             />
//                           )}
//                         />
//                         {errors.fullName && <p className='text-red-500 text-sm mt-1'>{errors.fullName.message}</p>}
//                       </>
//                     ) : (
//                       <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
//                         {dataProfile?.fullName}
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className='block text-sm font-medium text-gray-500'>Email</label>
//                     {isEditing ? (
//                       <>
//                         <Controller
//                           name='email'
//                           control={control}
//                           render={({ field }) => (
//                             <input
//                               {...field}
//                               className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
//                               type='email'
//                             />
//                           )}
//                         />
//                         {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
//                       </>
//                     ) : (
//                       <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
//                         {dataProfile?.email}
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className='block text-sm font-medium text-gray-500'>Số điện thoại</label>
//                     {isEditing ? (
//                       <>
//                         <Controller
//                           name='phone'
//                           control={control}
//                           render={({ field }) => (
//                             <input
//                               {...field}
//                               className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
//                             />
//                           )}
//                         />
//                         {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>}
//                       </>
//                     ) : (
//                       <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
//                         {dataProfile?.phone}
//                       </div>
//                     )}
//                   </div>

//                   {isEditing && (
//                     <>
//                       <div>
//                         <label className='block text-sm font-medium text-gray-500'>Địa chỉ</label>
//                         <Controller
//                           name='address'
//                           control={control}
//                           render={({ field }) => (
//                             <input
//                               {...field}
//                               className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
//                             />
//                           )}
//                         />
//                       </div>

//                       <div>
//                         <label className='block text-sm font-medium text-gray-500'>Ngày sinh</label>
//                         <Controller
//                           name='dateOfBirth'
//                           control={control}
//                           render={({ field }) => (
//                             <input
//                               {...field}
//                               type='date'
//                               className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
//                             />
//                           )}
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 {/* Thông tin chuyên môn */}
//                 <div className='space-y-4'>
//                   <h4 className='text-lg font-medium text-gray-900'>Thông tin chuyên môn</h4>

//                   <div>
//                     <label className='block text-sm font-medium text-gray-500'>Khoa</label>
//                     {isEditing ? (
//                       <>
//                         <Controller
//                           name='departmentId'
//                           control={control}
//                           render={({ field }) => (
//                             <select
//                               {...field}
//                               className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
//                               onChange={(e) => field.onChange(Number(e.target.value))}
//                             >
//                               <option value={0}>Chọn khoa</option>
//                               {/* Bạn cần fetch danh sách khoa và map vào đây */}
//                             </select>
//                           )}
//                         />
//                         {errors.departmentId && (
//                           <p className='text-red-500 text-sm mt-1'>{errors.departmentId.message}</p>
//                         )}
//                       </>
//                     ) : (
//                       <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
//                         {dataProfile?.departmentName}
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className='block text-sm font-medium text-gray-500'>Số năm kinh nghiệm</label>
//                     {isEditing ? (
//                       <>
//                         <Controller
//                           name='experienceYears'
//                           control={control}
//                           render={({ field }) => (
//                             <input
//                               {...field}
//                               type='number'
//                               className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
//                               onChange={(e) => field.onChange(Number(e.target.value))}
//                             />
//                           )}
//                         />
//                         {errors.experienceYears && (
//                           <p className='text-red-500 text-sm mt-1'>{errors.experienceYears.message}</p>
//                         )}
//                       </>
//                     ) : (
//                       <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
//                         {dataProfile?.experienceYears} năm
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className='block text-sm font-medium text-gray-500'>Mô tả</label>
//                     {isEditing ? (
//                       <>
//                         <Controller
//                           name='description'
//                           control={control}
//                           render={({ field }) => (
//                             <textarea
//                               {...field}
//                               rows={3}
//                               className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
//                             />
//                           )}
//                         />
//                         {errors.description && (
//                           <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>
//                         )}
//                       </>
//                     ) : (
//                       <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border min-h-[80px]'>
//                         {dataProfile?.description || 'Chưa có mô tả'}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Thông tin hệ thống - Chỉ hiển thị khi không chỉnh sửa */}
//               {!isEditing && dataProfile && (
//                 <div className='mt-8 pt-6 border-t border-gray-200'>
//                   <h4 className='text-lg font-medium text-gray-900 mb-4'>Thông tin hệ thống</h4>
//                   <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//                     <div>
//                       <label className='block text-sm font-medium text-gray-500'>Mã bác sĩ</label>
//                       <div className='mt-1 text-sm text-gray-900'>#{dataProfile.id}</div>
//                     </div>
//                     <div>
//                       <label className='block text-sm font-medium text-gray-500'>Mã người dùng</label>
//                       <div className='mt-1 text-sm text-gray-900'>#{dataProfile.userId}</div>
//                     </div>
//                     <div>
//                       <label className='block text-sm font-medium text-gray-500'>Mã khoa</label>
//                       <div className='mt-1 text-sm text-gray-900'>#{dataProfile.departmentId}</div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className='mt-6 flex justify-end space-x-3'>
//             {isEditing ? (
//               <>
//                 <button
//                   type='button'
//                   onClick={() => {
//                     setIsEditing(false)
//                     reset()
//                   }}
//                   className='bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors'
//                   disabled={updateProfileMutation.isPending}
//                 >
//                   Hủy
//                 </button>
//                 <button
//                   type='submit'
//                   className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
//                   disabled={updateProfileMutation.isPending}
//                 >
//                   {updateProfileMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
//                 </button>
//               </>
//             ) : (
//               <button
//                 type='button'
//                 onClick={() => setIsEditing(true)}
//                 className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
//               >
//                 Chỉnh sửa
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ProfileDoctor, type DoctorProfile } from 'src/utils/rules'

import InputNumber from 'src/components/InputNumber'
import JobDoctor from 'src/DOCTOR/APIS/job.api'
import Input from 'src/Page/Inputs'
import AllUserAPI from 'src/ADMIN/api/Admin.api'

type FormData = {
  fullName: string
  email: string
  phone: string
  experienceYears: number
  description: string
  departmentId: number // Đổi từ departmentName sang departmentId
}

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()

  const { data: dataDepartments } = useQuery({
    queryKey: ['api/departments'],
    queryFn: () => AllUserAPI.getDepartment({ page: '1', size: '50' })
  })

  const departments = dataDepartments?.data.data || []

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      departmentId: 0,
      description: '',
      email: '',
      experienceYears: 0,
      fullName: '',
      phone: ''
    },
    resolver: yupResolver(ProfileDoctor)
  })

  const { data, isLoading } = useQuery({
    queryKey: ['api/doctors/me'],
    queryFn: JobDoctor.GetProfileDoctor
  })

  // Mutation để cập nhật profile
  const updateProfileMutation = useMutation({
    mutationFn: (data: FormData) => JobDoctor.updateProfileDoctor(data),
    onSuccess: () => {
      toast.success('Cập nhật thông tin thành công!')
      queryClient.invalidateQueries({ queryKey: ['api/doctors/me'] })
      setIsEditing(false)
    },
    onError: (error) => {
      console.error('Update error:', error)

      toast.error('cập nhập thất bại!')
    }
  })

  const dataProfile = data?.data.data

  useEffect(() => {
    if (dataProfile) {
      console.log('Data profile:', dataProfile)
      reset({
        phone: dataProfile?.phone || '',
        departmentId: dataProfile?.departmentId || 0,
        description: dataProfile?.description || '',
        email: dataProfile?.email || '',
        fullName: dataProfile?.fullName || '',
        experienceYears: dataProfile?.experienceYears || 0
      })
    }
  }, [dataProfile, reset])

  const onSubmit = (formData: FormData) => {
    console.log('Form data:', formData)

    const updateData: FormData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      experienceYears: formData.experienceYears,
      description: formData.description,
      departmentId: formData.departmentId ?? 0
      // Thêm các field khác nếu API cần
    }

    console.log('Update data:', updateData)
    updateProfileMutation.mutate(updateData)
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-lg'>Đang tải thông tin...</div>
      </div>
    )
  }

  if (!dataProfile) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-lg'>Không tìm thấy thông tin bác sĩ</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Thông tin cá nhân</h1>
          <p className='mt-2 text-sm text-gray-600'>Quản lý thông tin hồ sơ bác sĩ</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                  <h2 className='font-medium text-2xl'>{dataProfile.fullName}</h2>

                  <p className='text-sm text-gray-500 mt-1'>{dataProfile.departmentName}</p>

                  <div className='flex items-center mt-2 space-x-4'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        dataProfile.active ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                      }`}
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
                    {isEditing ? (
                      <Input
                        register={register}
                        name='fullName'
                        errorsMessage={errors.fullName?.message}
                        classNameInput='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
                      />
                    ) : (
                      <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
                        {dataProfile.fullName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Email</label>
                    {isEditing ? (
                      <Input
                        register={register}
                        name='email'
                        type='email'
                        errorsMessage={errors.email?.message}
                        classNameInput='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
                      />
                    ) : (
                      <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
                        {dataProfile.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Số điện thoại</label>
                    {isEditing ? (
                      <InputNumber
                        {...register('phone')}
                        type='number'
                        errorMassage={errors.phone?.message}
                        classNameInput='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
                      />
                    ) : (
                      <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
                        {dataProfile.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Thông tin chuyên môn */}
                <div className='space-y-4'>
                  <h4 className='text-lg font-medium text-gray-900'>Thông tin chuyên môn</h4>

                  <div>
                    <label className='block text-sm font-semibold mb-2'>Khoa</label>
                    {isEditing ? (
                      <select
                        {...register('departmentId', { required: 'Vui lòng chọn khoa' })}
                        className='w-full px-4 py-3 border rounded-xl bg-white'
                      >
                        <option value=''>Chọn khoa</option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className='w-full px-4 py-3 border rounded-xl bg-gray-100 text-gray-700'>
                        {departments.find((d) => d.id === dataProfile.departmentId)?.name || 'Chưa chọn khoa'}
                      </div>
                    )}
                    <p className='text-red-500 text-sm'>{errors.departmentId?.message}</p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Số năm kinh nghiệm</label>
                    {isEditing ? (
                      <InputNumber
                        {...register('experienceYears')}
                        type='number'
                        errorMassage={errors.experienceYears?.message}
                        classNameInput='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
                      />
                    ) : (
                      <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border'>
                        {dataProfile.experienceYears} năm
                      </div>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500'>Mô tả</label>
                    {isEditing ? (
                      <div>
                        <textarea
                          {...register('description')}
                          rows={3}
                          className='mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded px-3 py-2'
                        />
                        {errors.description && (
                          <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>
                        )}
                      </div>
                    ) : (
                      <div className='mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded border min-h-[80px]'>
                        {dataProfile.description || 'Chưa có mô tả'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Thông tin hệ thống */}
              {!isEditing && (
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
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='mt-6 flex justify-end space-x-3'>
            {isEditing ? (
              <>
                <button
                  type='button'
                  onClick={() => {
                    setIsEditing(false)
                    reset({
                      departmentId: dataProfile.departmentId,
                      description: dataProfile.description,
                      email: dataProfile.email,
                      experienceYears: dataProfile.experienceYears,
                      fullName: dataProfile.fullName,
                      phone: dataProfile.phone
                    })
                  }}
                  className='bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors'
                  disabled={updateProfileMutation.isPending}
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={() => setIsEditing(true)}
                className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
