// import { useQuery } from '@tanstack/react-query'
// import { useState } from 'react'
// import DePartMentsApi from 'src/apis/department.api'
// import ItemKhoa from 'src/components/ItemsKhoa'
// // import useQueryParam from 'src/hooks/useQueryParam'

// export default function XemKhoa() {
//   // const queryParams = useQueryParam()
//   const [count, setCount] = useState<number>(1)
//   const { data } = useQuery({
//     queryKey: ['api/departments'],
//     //truyền lên key khi URL thay đổi usequery mới nhận biết
//     queryFn: () => {
//       return DePartMentsApi.getDepartment()
//     }
//   })
//   // console.log(data)
//   const departMent = data?.data.data

//   const handleShowMore = () => {
//     setCount(Number(departMent?.length))
//   }

//   const handleShow = () => {
//     setCount(1)
//   }

//   return (
//     <div className='py-16 bg-gradient-to-b from-[#f8fafc] to-white'>
//       <div className='container mx-auto px-4'>
//         {/* Header Section */}
//         <div className='text-center mb-12'>
//           <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-montserrat'>
//             Đặt Lịch Theo{' '}
//             <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200'>
//               Chuyên Khoa
//             </span>
//           </h2>
//           <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
//             Khám phá danh sách bác sĩ, bệnh viện, phòng khám theo từng chuyên khoa y tế
//           </p>
//         </div>

//         {/* Department Grid */}
//         <div className='max-w-7xl mx-auto'>
//           <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
//             {departMent &&
//               departMent.slice(0, count).map((departMent) => (
//                 <div key={departMent.id} className='flex justify-center'>
//                   <ItemKhoa departMent={departMent} />
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         {departMent && count < departMent.length ? (
//           <div className='text-center mt-12'>
//             <button
//               onClick={handleShowMore}
//               className='bg-gradient-to-r from-blue-500 to-cyan-300 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto'
//             >
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 strokeWidth={2}
//                 stroke='currentColor'
//                 className='w-5 h-5'
//               >
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
//                 />
//               </svg>
//               <span>Xem thêm</span>
//             </button>
//           </div>
//         ) : (
//           <div className='text-center mt-12'>
//             <button
//               onClick={handleShow}
//               className='bg-gradient-to-r from-blue-500 to-cyan-300 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto'
//             >
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 strokeWidth={2}
//                 stroke='currentColor'
//                 className='w-5 h-5'
//               >
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
//                 />
//               </svg>
//               <span>Thu gọn</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import DePartMentsApi from 'src/apis/department.api'
import ItemKhoa from 'src/components/ItemsKhoa'
import { useNavigate } from 'react-router-dom'

export default function XemKhoa() {
  const navigate = useNavigate()
  const [count, setCount] = useState<number>(1)

  const { data } = useQuery({
    queryKey: ['api/departments'],
    queryFn: () => DePartMentsApi.getDepartment()
  })

  const departMent = data?.data.data

  const handleShowMore = () => {
    setCount(Number(departMent?.length))
  }

  const handleShow = () => {
    setCount(1)
  }

  // Hàm xử lý khi click vào khoa
  const handleDepartmentClick = (departmentId: number) => {
    // Điều hướng đến trang AllDoctors với ID khoa
    navigate(`/user/AllDoctor?dept=${departmentId}`)

    // Hoặc nếu bạn muốn dùng route với params:
    // navigate(`/user/AllDoctor/dept/${departmentId}`)
  }

  return (
    <div className='py-16 bg-gradient-to-b from-[#f8fafc] to-white'>
      <div className='container mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-montserrat'>
            Đặt Lịch Theo{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200'>
              Chuyên Khoa
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Khám phá danh sách bác sĩ, bệnh viện, phòng khám theo từng chuyên khoa y tế
          </p>
        </div>

        {/* Department Grid */}
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
            {departMent &&
              departMent.slice(0, count).map((departMent) => (
                <div
                  key={departMent.id}
                  className='flex justify-center cursor-pointer'
                  onClick={() => handleDepartmentClick(departMent.id)}
                >
                  <ItemKhoa departMent={departMent} />
                </div>
              ))}
          </div>
        </div>

        {/* CTA Section */}
        {departMent && count < departMent.length ? (
          <div className='text-center mt-12'>
            <button
              onClick={handleShowMore}
              className='bg-gradient-to-r from-blue-500 to-cyan-300 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
              <span>Xem thêm</span>
            </button>
          </div>
        ) : (
          <div className='text-center mt-12'>
            <button
              onClick={handleShow}
              className='bg-gradient-to-r from-blue-500 to-cyan-300 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
              <span>Thu gọn</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
