import ItemDoctor from './ItemDoctor'
import useQueryParam from 'src/hooks/useQueryParam'
import { useQuery } from '@tanstack/react-query'
import DoctersApi from 'src/apis/docter.api'
import JobDoctor from 'src/DOCTOR/APIS/job.api'
import { useForm } from 'react-hook-form'
import { SchemaSeach, type SchemaDepartment } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import DePartMentsApi from 'src/apis/department.api'
import { useState, useEffect, useMemo } from 'react'

type FormData = SchemaDepartment

const nameSearch = SchemaSeach
export default function AllDoctors() {
  const navigate = useNavigate()
  const queryParams = useQueryParam()

  // Lấy các tham số từ URL
  const keyword = queryParams.keyword || ''
  const deptParam = queryParams.dept // Lấy tham số dept từ URL

  // State cho selected department
  const [selectedDept, setSelectedDept] = useState<number | null>(null)

  // Effect để sync selectedDept với URL param
  useEffect(() => {
    if (deptParam) {
      const deptId = Number(deptParam)
      if (!isNaN(deptId)) {
        setSelectedDept(deptId)
      }
    }
  }, [deptParam])

  // API calls
  const { data: searchData } = useQuery({
    queryKey: ['/JobDoctor/doctors/search', keyword],
    queryFn: () => JobDoctor.GetDoctorsSearch(keyword),
    enabled: keyword !== ''
  })

  const { data: allDoctorsData } = useQuery({
    queryKey: ['api/doctors'],
    queryFn: () => DoctersApi.getDocters()
  })

  const { data: allDepartment } = useQuery({
    queryKey: ['api/departments'],
    queryFn: DePartMentsApi.getDepartment
  })

  const { data: doctorsByDept } = useQuery({
    queryKey: ['doctors-by-dept', selectedDept],
    queryFn: () => DePartMentsApi.getdoctorDepartment(String(selectedDept)),
    enabled: !!selectedDept
  })

  // Form
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(nameSearch)
  })

  // const handleSubmitSearch = handleSubmit((data) => {
  //   const keyword = data.search.trim()

  //   if (keyword === '') {
  //     navigate('/user/AllDoctor')
  //   } else {
  //     navigate(`?keyword=${keyword}`)
  //   }

  //   // Clear department filter khi search
  //   setSelectedDept(null)
  // })
  const handleSubmitSearch = handleSubmit((data) => {
    const keyword = data.search.trim()

    if (keyword === '') {
      navigate('/user/AllDoctor')
    } else {
      // Clear khoa khi search
      setSelectedDept(null)
      navigate(`?keyword=${keyword}`)
    }
  })

  const handleAll = () => {
    setSelectedDept(null)
    navigate('/user/AllDoctor')
  }

  // Xử lý khi chọn khoa từ dropdown
  // const handleDepartmentSelect = (deptId: number | null) => {
  //   setSelectedDept(deptId)

  //   // Cập nhật URL với query param mới
  //   if (deptId) {
  //     navigate(`?dept=${deptId}`)
  //   } else {
  //     navigate('/user/AllDoctor')
  //   }
  // }
  const handleDepartmentSelect = (deptId: number | null) => {
    setSelectedDept(deptId)

    if (deptId) {
      navigate(`?dept=${deptId}`)
    } else {
      navigate('/user/AllDoctor')
    }
  }

  // QUYẾT ĐỊNH HIỂN THỊ DỮ LIỆU NÀO
  // const displayData = useMemo(() => {
  //   // ƯU TIÊN 1: Nếu có từ khóa search
  //   if (keyword !== '') {
  //     return searchData?.data?.data || []
  //   }

  //   // ƯU TIÊN 2: Nếu có selected department
  //   if (selectedDept) {
  //     return doctorsByDept?.data?.data || []
  //   }

  //   // MẶC ĐỊNH: Hiển thị tất cả bác sĩ
  //   return allDoctorsData?.data?.data || []
  // }, [keyword, selectedDept, searchData, doctorsByDept, allDoctorsData])
  const displayData = useMemo(() => {
    // ƯU TIÊN: Nếu có từ khóa search (bỏ qua khoa khi có keyword)
    if (keyword !== '') {
      return searchData?.data?.data || []
    }

    // Nếu có selected department
    if (selectedDept) {
      return doctorsByDept?.data?.data || []
    }

    // MẶC ĐỊNH: Hiển thị tất cả bác sĩ
    return allDoctorsData?.data?.data || []
  }, [keyword, selectedDept, searchData, doctorsByDept, allDoctorsData])

  // Hiển thị message tùy trạng thái
  const statusMessage = useMemo(() => {
    if (keyword !== '') {
      return `Tìm thấy ${displayData.length} bác sĩ cho từ khóa "${keyword}"`
    }

    if (selectedDept) {
      const deptName = allDepartment?.data.data?.find((d) => d.id === selectedDept)?.name || 'chuyên khoa'
      return `Bác sĩ thuộc ${deptName} (${displayData.length} bác sĩ)`
    }

    return `Tất cả bác sĩ (${displayData.length} bác sĩ)`
  }, [keyword, selectedDept, displayData.length, allDepartment])

  // Lấy danh sách khoa cho dropdown
  const departments = allDepartment?.data.data || []

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Tìm Bác Sĩ Phù Hợp</h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Khám phá đội ngũ bác sĩ chuyên nghiệp với nhiều năm kinh nghiệm
          </p>
        </div>

        {/* Search and Filters */}
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100'>
          {/* Search Form */}
          <form className='mb-6' onSubmit={handleSubmitSearch}>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </div>
              <input
                {...register('search')}
                type='text'
                className='w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 bg-white shadow-sm transition-all duration-200'
                placeholder='Tìm kiếm bác sĩ theo tên, chuyên khoa...'
                defaultValue={keyword}
              />
            </div>
          </form>

          {/* Filter Buttons */}
          <div className='flex flex-wrap items-center justify-center gap-3'>
            {/* Dropdown chọn chuyên khoa */}
            <select
              value={selectedDept ?? ''}
              onChange={(e) => handleDepartmentSelect(e.target.value ? Number(e.target.value) : null)}
              className='px-6 py-3 bg-white border-2 border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md font-medium cursor-pointer min-w-[200px]'
            >
              <option value=''>Chọn chuyên khoa</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAll}
              className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
              </svg>
              <span className='font-semibold'>Xem Tất Cả</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
          <div className='p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'>
            <h2 className='text-2xl font-bold text-gray-900'>Kết Quả Tìm Kiếm</h2>
            <div className='text-gray-600 mt-1'>{statusMessage}</div>
          </div>

          <div className='p-6'>
            {displayData.length > 0 ? (
              <div className='space-y-6'>
                {displayData.map((doctor) => (
                  <div key={doctor.id} className='transform transition-all duration-300 hover:scale-[1.02]'>
                    <ItemDoctor doctor={doctor} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <svg
                  className='w-16 h-16 mx-auto text-gray-400 mb-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='text-gray-500 text-lg'>Không tìm thấy bác sĩ nào phù hợp</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
