import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import AllUserAPI from 'src/ADMIN/api/Admin.api'

export default function QlyBacSi() {
  const queryclient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['api/doctors'],
    queryFn: AllUserAPI.getAllDoctorAdmin
  })

  const patchStatusMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: { isActive: boolean } }) => AllUserAPI.patchSatus(id, body),
    onSuccess: () => {
      toast.success(`cập nhập trạng thái thành công`)
      queryclient.invalidateQueries({
        queryKey: ['api/doctors']
      })
    },
    onError: () => {
      toast.error(`tắt thất bại id`)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: AllUserAPI.deleteDoctorAdmin,
    onSuccess: (_, id) => {
      toast.success(`xóa thành công id:${id}`)
      queryclient.invalidateQueries({
        queryKey: ['api/doctors']
      })
    },
    onError: (_, id) => {
      toast.error(`xóa thất bại id:${id}`)
    }
  })
  const handleClickDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleActive = (id: number, active: boolean) => {
    patchStatusMutation.mutate({
      id,
      body: { isActive: !active }
    })
  }

  const dataDoctor = data?.data.data
  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-2'>
        <h1 className='text-2xl font-bold mb-4'>Quản lý Bác sĩ</h1>
        <Link
          to='/admin/add'
          className='bg-gradient-to-r from-blue-500 to-cyan-200 hover:from-blue-500 hover:to-cyan-300 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:scale-110'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
          <span className='font-semibold'>Thêm Bác Sĩ</span>
        </Link>
      </div>

      <table className='min-w-full bg-white shadow-xl rounded-lg overflow-hidden border'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-3 border'>ID</th>
            <th className='px-4 py-3 border'>Họ tên</th>
            <th className='px-4 py-3 border'>Email</th>
            <th className='px-4 py-3 border'>Số điện thoại</th>
            <th className='px-4 py-3 border'>Khoa</th>
            <th className='px-4 py-3 border'>Kinh nghiệm</th>
            <th className='px-4 py-3 border'>Mô tả</th>
            <th className='px-4 py-3 border'>Trạng thái</th>
            <th className='px-4 py-3 border text-center'>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {dataDoctor?.map((doctor) => (
            <tr className='hover:bg-gray-50 transition ' key={doctor.id}>
              <td className='px-4 py-3 border font-medium'>{doctor.id}</td>
              <td className='px-4 py-3 border font-medium'>{doctor.fullName}</td>
              <td className='px-4 py-3 border max-w-[200px] truncate '>{doctor.email}</td>
              <td className='px-4 py-3 border'>{doctor.phone}</td>
              <td className='px-4 py-3 border text-gray-500 italic'>
                {doctor.departmentName ? doctor.departmentName : 'chưa có'}
              </td>
              <td className='px-4 py-3 border'>{doctor.experienceYears}</td>
              <td className='px-4 py-3 border text-gray-500 italic'>
                {doctor.description ? doctor.description : 'chưa có'}
              </td>
              <td className='px-4 py-3 border'>
                <span
                  className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${doctor.active}
                    ? 'bg-green text-green-800  border-green'
                    : 'bg-red-100 text-red-800  border-red-200' `}
                >
                  {doctor.active ? 'không hoạt động' : 'Đang hoạt động'}
                </span>
              </td>
              <td className='px-4 py-3 border text-center'>
                <div className='flex items-center justify-center gap-2'>
                  <button
                    onClick={() => handleActive(doctor.id, doctor.active)}
                    className='px-3 py-1 rounded-lg text-sm 
               bg-blue-500 text-white 
               hover:bg-blue-600 
               transition-all duration-200 shadow-md'
                  >
                    Tắt
                  </button>

                  <Link
                    to={`/admin/UpdateDoctor/${doctor.id}`}
                    className='px-3 py-1 rounded-lg text-sm 
               bg-amber-400 text-white 
               hover:bg-amber-500 
               transition-all duration-200 shadow-md'
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleClickDelete(doctor.id)}
                    className='px-3 py-1 rounded-lg text-sm 
               bg-red-500 text-white 
               hover:bg-red-600 
               transition-all duration-200 shadow-md'
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
