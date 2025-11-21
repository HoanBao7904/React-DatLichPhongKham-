// /* eslint-disable @typescript-eslint/no-unused-expressions */
// import { range } from 'lodash'
// import { useState } from 'react'

// interface Props {
//   onChange?: (value: Date) => void
//   value?: Date
//   errorMessage?: string
// }

// export default function DateSelect({ errorMessage, onChange, value }: Props) {
//   const [date, setDate] = useState({
//     day: value?.getDate() || 1,
//     month: value?.getMonth() || 0,
//     year: value?.getFullYear() || 1990
//   })

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const { value: ValueFormSelect, name } = event.target
//     const newDay = {
//       day: value?.getDate() || date.day,
//       month: value?.getMonth() || date.month,
//       year: value?.getFullYear() || date.year,
//       [name]: ValueFormSelect
//     }
//     setDate(newDay)
//     onChange && onChange(new Date(newDay.year, newDay.month, newDay.day))
//   }

//   return (
//     <div className='flex flex-wrap mt-6'>
//       <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
//       <div className='w-[80%] pl-5'>
//         <div className='flex justify-between'>
//           <select
//             onChange={handleChange}
//             name='day'
//             value={value?.getDate() || date.day}
//             className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange '
//           >
//             <option disabled className='bg-blue-600 text-white rounded-sm font-medium text-lg'>
//               ngày
//             </option>
//             {range(1, 32).map((item) => (
//               <option key={item} value={item}>
//                 {item}
//               </option>
//             ))}
//           </select>
//           <select
//             onChange={handleChange}
//             name='month'
//             value={value?.getMonth() || date.month}
//             className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange '
//           >
//             <option disabled className='bg-blue-600 text-white rounded-sm font-medium text-lg'>
//               tháng
//             </option>
//             {/* thang bat dau tu ko dinh nghia la nhu the  */}
//             {range(0, 12).map((item) => (
//               <option key={item} value={item}>
//                 {item + 1}
//               </option>
//             ))}
//           </select>
//           <select
//             onChange={handleChange}
//             name='year'
//             value={value?.getFullYear() || date.year}
//             className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange'
//           >
//             <option disabled className='bg-blue-600 text-white rounded-sm font-medium text-lg'>
//               năm
//             </option>
//             {range(1990, 2026).map((item) => (
//               <option key={item} value={item}>
//                 {item}
//               </option>
//             ))}
//             {/* <option value='năm'>năm</option>
//                   <option value='năm'>tháng</option> */}
//           </select>
//         </div>
//         <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
//       </div>
//     </div>
//   )
// }
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { range } from 'lodash'
import { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
  className?: string
}

export default function DateSelect({ errorMessage, onChange, value, className = '' }: Props) {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: ValueFormSelect, name } = event.target
    const newDay = {
      day: value?.getDate() || date.day,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(ValueFormSelect)
    }
    setDate(newDay)
    onChange && onChange(new Date(newDay.year, newDay.month, newDay.day))
  }

  // return (
  //   <div className={`flex items-center space-x-4 ${className}`}>
  //     {/* <div className='w-1/3 text-right'>
  //       <label className='font-semibold text-gray-700'>Ngày Sinh</label>
  //     </div> */}
  //     <div className='w-2/3'>
  //       <div className='flex space-x-3'>
  //         {/* Day Select */}
  //         <div className='flex-1'>
  //           <select
  //             onChange={handleChange}
  //             name='day'
  //             value={value?.getDate() || date.day}
  //             className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50 cursor-pointer appearance-none'
  //           >
  //             <option disabled value='' className='text-gray-400'>
  //               Ngày
  //             </option>
  //             {range(1, 32).map((item) => (
  //               <option key={item} value={item} className='text-gray-700'>
  //                 {item}
  //               </option>
  //             ))}
  //           </select>
  //         </div>

  //         {/* Month Select */}
  //         <div className='flex-1'>
  //           <select
  //             onChange={handleChange}
  //             name='month'
  //             value={value?.getMonth() || date.month}
  //             className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50 cursor-pointer appearance-none'
  //           >
  //             <option disabled value='' className='text-gray-400'>
  //               Tháng
  //             </option>
  //             {range(0, 12).map((item) => (
  //               <option key={item} value={item} className='text-gray-700'>
  //                 {item + 1}
  //               </option>
  //             ))}
  //           </select>
  //         </div>

  //         {/* Year Select */}
  //         <div className='flex-1'>
  //           <select
  //             onChange={handleChange}
  //             name='year'
  //             value={value?.getFullYear() || date.year}
  //             className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50 cursor-pointer appearance-none'
  //           >
  //             <option disabled value='' className='text-gray-400'>
  //               Năm
  //             </option>
  //             {range(1990, new Date().getFullYear() + 1).map((item) => (
  //               <option key={item} value={item} className='text-gray-700'>
  //                 {item}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //       </div>

  //       {/* Error Message */}
  //       {errorMessage && (
  //         <div className='mt-2 text-sm text-red-600 flex items-center space-x-1'>
  //           <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
  //             <path
  //               fillRule='evenodd'
  //               d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
  //               clipRule='evenodd'
  //             />
  //           </svg>
  //           <span>{errorMessage}</span>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className='w-full'>
        <div className='grid grid-cols-4 gap-3'>
          {/* Day Select - chiếm 1 cột */}
          <div className='col-span-1'>
            <select
              onChange={handleChange}
              name='day'
              value={value?.getDate() || date.day}
              className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50 cursor-pointer appearance-none'
            >
              <option disabled value='' className='text-gray-400'>
                Ngày
              </option>
              {range(1, 32).map((item) => (
                <option key={item} value={item} className='text-gray-700'>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Month Select - chiếm 1 cột */}
          <div className='col-span-1'>
            <select
              onChange={handleChange}
              name='month'
              value={value?.getMonth() || date.month}
              className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50 cursor-pointer appearance-none'
            >
              <option disabled value='' className='text-gray-400'>
                Tháng
              </option>
              {range(0, 12).map((item) => (
                <option key={item} value={item} className='text-gray-700'>
                  {item + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Year Select - chiếm 2 cột (gấp đôi + thêm 1) */}
          <div className='col-span-2'>
            <select
              onChange={handleChange}
              name='year'
              value={value?.getFullYear() || date.year}
              className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#DCEDC2] transition-all duration-300 bg-gray-50 cursor-pointer appearance-none'
            >
              <option disabled value='' className='text-gray-400'>
                Năm
              </option>
              {range(1990, new Date().getFullYear() + 1).map((item) => (
                <option key={item} value={item} className='text-gray-700'>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className='mt-2 text-sm text-red-600 flex items-center space-x-1'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
              <path
                fillRule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
                clipRule='evenodd'
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}
