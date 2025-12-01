// import type { DepartMent } from 'src/types/department.type'

// interface Props {
//   departMent: DepartMent
// }
// export default function ItemKhoa({ departMent }: Props) {
//   return (
//     <div className='group relative bg-white rounded-2xl border border-gray-200 hover:border-transparent w-full max-w-[180px] h-[140px] cursor-pointer p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
//       {/* Background gradient on hover */}
//       <div className='absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

//       {/* Icon Container */}
//       <div className='relative mb-3'>
//         <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-200 flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all duration-300'>
//           <img
//             // src={departMent.imageUrl || '/src/imgs/timMach.png'}
//             alt={departMent.name}
//             className='w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110'
//           />
//         </div>

//         {/* Hover effect dot */}
//         <div className='absolute -top-1 -right-1 w-3 h-3 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
//       </div>

//       {/* Department Name */}
//       <p className='text-center font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 text-sm leading-tight line-clamp-2'>
//         {departMent.name}
//       </p>

//       {/* Doctor count badge (optional) */}
//       {/* <div className='absolute -bottom-2 px-2 py-1 bg-white rounded-full shadow-md text-xs text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//         {Math.floor(Math.random() * 50) + 10} bác sĩ
//       </div> */}

//       {/* Hover border effect */}
//       <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white group-hover:border-opacity-50 transition-all duration-300'></div>
//     </div>
//   )
// }
import { Link } from 'react-router-dom'

interface Props {
  departMent: {
    id: number
    name: string
    // ... các field khác
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
