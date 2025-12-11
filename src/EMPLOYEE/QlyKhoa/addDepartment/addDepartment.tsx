import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AllUserAPI from 'src/ADMIN/api/Admin.api'
import Input from 'src/Page/Inputs'

type FormData = {
  name: string
  description: string
}

export default function AddDepartmentEmployee() {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const addDepartmentMutation = useMutation({
    mutationFn: (body: FormData) => AllUserAPI.addDepartments(body),
    onSuccess: () => {
      toast.success('thêm khoa thành công')
    },
    onError: (error) => {
      console.log(error)
      toast.error('thêm khoa thất bại')
    }
  })

  const onSubmit = (data: FormData) => {
    addDepartmentMutation.mutate(data)
  }

  return (
    <div className='items-center p-6 max-w-xl mt-6 mx-auto bg-white rounded-2xl shadow-lg border'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold ml-3'>Thêm Khoa</h2>
        <Link
          to='/employee/quan-ly-khoa'
          className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
          </svg>
          <span>Quay lại</span>
        </Link>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label className='font-medium'>Tên khoa</label>
          <Input register={register} name='name' placeholder='Nhập tên khoa' />
        </div>

        {/* Description */}
        <div>
          <label className='font-medium'>Mô tả</label>
          <textarea
            {...register('description')}
            className='w-full p-2 mt-1 border rounded-lg h-24 focus:outline-blue-500'
            placeholder='Nhập mô tả...'
          />
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={addDepartmentMutation.isPending}
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {addDepartmentMutation.isPending ? 'Đang thêm...' : 'Thêm khoa'}
        </button>
      </form>
    </div>
  )
}
