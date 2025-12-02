import { Link } from 'react-router-dom'

interface Props {
  departMent: {
    id: number
    name: string
  }
}

export default function ItemKhoa({ departMent }: Props) {
  return (
    <Link to={`/user/AllDoctor?dept=${departMent.id}`} className='block w-full'>
      <div className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center transform hover:-translate-y-1 w-32 h-32 flex flex-col items-center justify-center'>
        {/* Icon hoặc hình ảnh */}
        <div className='mb-3'>
          <svg className='w-12 h-12 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
            {/* Icon của khoa */}
          </svg>
        </div>
        <span className='text-sm font-semibold text-gray-800 line-clamp-2'>{departMent.name}</span>
      </div>
    </Link>
  )
}
