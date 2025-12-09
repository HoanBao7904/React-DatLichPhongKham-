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
import { useState, useEffect, useMemo, useRef } from 'react'
import { debounce } from 'lodash'

type FormData = SchemaDepartment

const nameSearch = SchemaSeach

export default function AllDoctors() {
  const navigate = useNavigate()
  const queryParams = useQueryParam()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Lấy các tham số từ URL
  const keyword = queryParams.keyword || ''
  const deptParam = queryParams.dept

  // State cho selected department
  const [selectedDept, setSelectedDept] = useState<number | null>(null)
  // State cho search input value
  const [searchValue, setSearchValue] = useState(keyword)
  // State cho gợi ý tìm kiếm
  const [showSuggestions, setShowSuggestions] = useState(false)
  // State cho kết quả gợi ý
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [suggestions, setSuggestions] = useState<any[]>([])
  // State cho loading suggestions
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

  // Effect để sync selectedDept với URL param
  useEffect(() => {
    if (deptParam) {
      const deptId = Number(deptParam)
      if (!isNaN(deptId)) {
        setSelectedDept(deptId)
      }
    }
  }, [deptParam])

  // Effect để sync searchValue với URL khi có keyword
  useEffect(() => {
    if (keyword) {
      setSearchValue(keyword)
    }
  }, [keyword])

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
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: yupResolver(nameSearch),
    defaultValues: {
      search: keyword
    }
  })

  // Theo dõi giá trị search input
  const searchInputValue = watch('search')

  // Hàm fetch suggestions
  const fetchSuggestions = async (value: string) => {
    if (value.trim().length >= 2) {
      setIsLoadingSuggestions(true)
      try {
        const response = await JobDoctor.GetDoctorsSearch(value)
        if (response?.data?.data) {
          // Giới hạn số lượng suggestions
          setSuggestions(response.data.data.slice(0, 5))
          setShowSuggestions(true)
        } else {
          setSuggestions([])
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setIsLoadingSuggestions(false)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setIsLoadingSuggestions(false)
    }
  }

  // Hàm debounced để fetch suggestions
  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce((value: string) => {
        fetchSuggestions(value)
      }, 300),
    []
  )

  // Effect để gọi fetchSuggestions khi search input thay đổi
  useEffect(() => {
    if (searchInputValue !== undefined) {
      const value = searchInputValue.trim()
      setSearchValue(value)
      debouncedFetchSuggestions(value)
    }

    return () => {
      debouncedFetchSuggestions.cancel()
    }
  }, [searchInputValue, debouncedFetchSuggestions])

  // Click outside để đóng suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Xử lý submit form (khi nhấn Enter)
  const handleSubmitSearch = handleSubmit((data) => {
    const keyword = data.search.trim()

    if (keyword === '') {
      navigate('/user/AllDoctor')
    } else {
      // Clear khoa khi search
      setSelectedDept(null)
      navigate(`?keyword=${encodeURIComponent(keyword)}`)
    }
    setShowSuggestions(false)
  })

  // Xử lý khi nhập input (không cần submit)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue('search', value, { shouldValidate: true })
  }

  const handleAll = () => {
    setSelectedDept(null)
    setValue('search', '')
    setSearchValue('')
    setShowSuggestions(false)
    navigate('/user/AllDoctor')
  }

  const handleDepartmentSelect = (deptId: number | null) => {
    setSelectedDept(deptId)
    setValue('search', '')
    setSearchValue('')
    setShowSuggestions(false)

    if (deptId) {
      navigate(`?dept=${deptId}`)
    } else {
      navigate('/user/AllDoctor')
    }
  }

  // Xử lý khi click vào suggestion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuggestionClick = (doctor: any) => {
    setValue('search', doctor.fullName)
    setSearchValue(doctor.fullName)
    setShowSuggestions(false)
    // Tự động điều hướng khi click suggestion
    navigate(`?keyword=${encodeURIComponent(doctor.fullName)}`)
  }

  // Xử lý khi click vào xem tất cả kết quả
  const handleViewAllResults = () => {
    if (searchValue.trim()) {
      navigate(`?keyword=${encodeURIComponent(searchValue.trim())}`)
      setShowSuggestions(false)
    }
  }

  // QUYẾT ĐỊNH HIỂN THỊ DỮ LIỆU NÀO
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
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 relative'>
          {/* Search Form */}
          <div className='mb-6' ref={searchRef}>
            <form onSubmit={handleSubmitSearch} className='relative'>
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
                  ref={inputRef}
                  type='text'
                  onChange={handleInputChange}
                  className='w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 bg-white shadow-sm transition-all duration-200'
                  placeholder='Tìm kiếm bác sĩ theo tên, chuyên khoa...'
                  autoComplete='off'
                  onFocus={() => {
                    if (searchValue.trim().length >= 2 && suggestions.length > 0) {
                      setShowSuggestions(true)
                    }
                  }}
                />
              </div>
            </form>

            {/* Search Suggestions Dropdown - CHIỀU RỘNG BẰNG THANH TÌM KIẾM */}
            {showSuggestions && (
              <div
                className='absolute z-50 top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto'
                style={{ left: 0, right: 0 }}
              >
                <div className='py-2'>
                  {/* Loading state */}
                  {isLoadingSuggestions ? (
                    <div className='py-4 text-center'>
                      <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                      <p className='text-gray-500 mt-2'>Đang tìm kiếm...</p>
                    </div>
                  ) : suggestions.length > 0 ? (
                    <>
                      {suggestions.map((doctor) => (
                        <button
                          key={doctor.id}
                          type='button'
                          onClick={() => handleSuggestionClick(doctor)}
                          className='w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center gap-3 group border-b border-gray-100 last:border-b-0'
                        >
                          <div className='flex-shrink-0'>
                            {doctor.imageUrl ? (
                              <img
                                src={doctor.imageUrl}
                                alt={doctor.fullName}
                                className='w-12 h-12 rounded-full object-cover border-2 border-blue-100'
                              />
                            ) : (
                              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                                {doctor.fullName?.charAt(0) || 'B'}
                              </div>
                            )}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='font-semibold text-gray-900 truncate'>{doctor.fullName}</div>
                            <div className='text-sm text-gray-600 truncate'>{doctor.departmentName || 'Bác sĩ'}</div>
                            {doctor.experienceYears && (
                              <div className='text-xs text-gray-500'>{doctor.experienceYears} năm kinh nghiệm</div>
                            )}
                          </div>
                          <svg
                            className='w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                          </svg>
                        </button>
                      ))}

                      {/* Xem tất cả kết quả */}
                      <div className='border-t border-gray-100 mt-2 pt-2'>
                        <button
                          type='button'
                          onClick={handleViewAllResults}
                          className='w-full text-center px-4 py-4 text-blue-600 hover:bg-blue-50 transition-colors duration-150 font-semibold group'
                        >
                          <div className='flex items-center justify-center gap-2'>
                            <span className='text-base'>Xem tất cả kết quả cho "{searchValue}"</span>
                            <svg
                              className='w-5 h-5 transition-transform group-hover:translate-x-1'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </>
                  ) : searchValue.trim().length >= 2 ? (
                    <div className='px-4 py-8 text-center'>
                      <svg
                        className='w-12 h-12 mx-auto text-gray-300 mb-3'
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
                      <p className='text-gray-500 font-medium'>Không tìm thấy bác sĩ phù hợp</p>
                      <p className='text-gray-400 text-sm mt-1'>Thử tìm kiếm với từ khóa khác</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>

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
                {keyword && <p className='text-gray-400 mt-2'>Thử tìm kiếm với từ khóa khác</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
