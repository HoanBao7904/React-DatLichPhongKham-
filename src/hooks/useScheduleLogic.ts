// src/hooks/useScheduleLogic.ts
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { addWeeks, startOfWeek, addDays, format, isWithinInterval, parseISO, parse } from 'date-fns'
import { vi } from 'date-fns/locale'
import JobDoctor from 'src/DOCTOR/APIS/job.api' // Đảm bảo đường dẫn này là đúng

// --- INTERFACES CẦN THIẾT ---
interface Appointment {
  id: number
  appointmentDateTime: string // "2025-11-28T09:00:00"
  // Thêm các trường khác nếu cần
}

interface DoctorDetailData {
  id: number
  fullName: string
  departmentName: string
  experienceYears: number
  phone: string
  email: string
  description: string
  imageUrl: string | null
  // schedules format: "2025-11-28 08:00 - 2025-11-28 18:00"
  schedules: string[]
  appointments: Appointment[]
}

export interface TimeSlot {
  time: string // Giờ bắt đầu, ví dụ: "09:00"
  display: string // Giờ hiển thị, ví dụ: "09:00 - 09:30"
  isAvailable: boolean
}

export interface DateItem {
  date: string // "YYYY-MM-DD"
  display: string // "Thứ Hai, 26/11"
  availableSlots: number
}

// Cấu hình khung giờ khám
const SLOT_DURATION_MINUTES = 30

// Cần định nghĩa hàm addMinutes thủ công vì không phải tất cả các hàm date-fns đều export ra
const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000)
}

export const useScheduleLogic = (doctorId: number) => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [currentWeek, setCurrentWeek] = useState(0) // 0 là tuần hiện tại

  // 1. Lấy dữ liệu bác sĩ
  const { data: DoctorDetails, isLoading } = useQuery({
    queryKey: ['api/doctors', doctorId],
    queryFn: () => JobDoctor.getDetailsDoctor(doctorId)
  })

  const dataDoctorDetail: DoctorDetailData | undefined = DoctorDetails?.data.data
  const appointments: Appointment[] = dataDoctorDetail?.appointments || []

  // --- LOGIC CHÍNH: TẠO KHUNG GIỜ KHÁM ---
  const generateTimeSlots = (scheduleEntry: string, appointments: Appointment[], targetDate: string): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const parts = scheduleEntry.split(' ')
    if (parts.length < 5) return []

    // Lấy chuỗi thời gian (ví dụ: "08:00", "18:00")
    const startTimeStr = parts[1]
    const endTimeStr = parts[4]

    // Gộp ngày và giờ để tạo đối tượng Date cho startTime và endTime
    const startDateTimeStr = `${targetDate} ${startTimeStr}`
    const endDateTimeStr = `${targetDate} ${endTimeStr}`

    // Sử dụng parse để tạo Date object
    let currentSlot = parse(startDateTimeStr, 'yyyy-MM-dd HH:mm', new Date())
    const endTime = parse(endDateTimeStr, 'yyyy-MM-dd HH:mm', new Date())

    while (currentSlot < endTime) {
      const nextSlot = addMinutes(currentSlot, SLOT_DURATION_MINUTES)

      // Nếu khung giờ tiếp theo vượt quá thời gian kết thúc của schedule, dừng lại
      if (nextSlot > endTime) break

      const time = format(currentSlot, 'HH:mm')
      const endTimeDisplay = format(nextSlot, 'HH:mm')

      // Kiểm tra xem khung giờ này (bắt đầu từ currentSlot) đã bị đặt chưa
      const isBooked = appointments.some((appointment) => {
        const apptDate = parseISO(appointment.appointmentDateTime)

        // Kiểm tra xem thời gian cuộc hẹn có nằm trong khoảng [currentSlot, nextSlot) không
        return isWithinInterval(apptDate, { start: currentSlot, end: nextSlot })
      })

      slots.push({
        time: time,
        display: `${time} - ${endTimeDisplay}`,
        isAvailable: !isBooked
      })

      currentSlot = nextSlot // Chuyển sang khung giờ tiếp theo
    }

    return slots
  }

  // --- LOGIC: LẤY TẤT CẢ KHUNG GIỜ KHẢ DỤ CHO NGÀY ĐÃ CHỌN ---
  const getAvailableTimeSlots = (date: string): TimeSlot[] => {
    if (!dataDoctorDetail || !date) return []

    const daySchedules = dataDoctorDetail.schedules.filter((schedule) => schedule.split(' ')[0] === date)

    let allSlots: TimeSlot[] = []

    daySchedules.forEach((schedule) => {
      allSlots = allSlots.concat(generateTimeSlots(schedule, appointments, date))
    })

    // Loại bỏ trùng lặp và sắp xếp
    const uniqueSlots = allSlots
      .filter((slot, index, self) => index === self.findIndex((t) => t.time === slot.time))
      .sort((a, b) => a.time.localeCompare(b.time))

    return uniqueSlots
  }

  // --- LOGIC: CHIA KHUNG GIỜ THEO BUỔI ---
  const getTimeSlotsBySession = (date: string) => {
    const allSlots = getAvailableTimeSlots(date)

    const morningSlots = allSlots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0])
      return hour < 12
    })

    const afternoonSlots = allSlots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0])
      return hour >= 12
    })

    return { morningSlots, afternoonSlots }
  }

  // --- LOGIC: TÍNH TOÁN CÁC NGÀY TRONG TUẦN ---
  const weekDays: DateItem[] = useMemo(() => {
    const today = new Date()
    // Tìm ngày thứ 2 của tuần chứa ngày hiện tại + số tuần offset
    const startDateOfWeek = startOfWeek(addWeeks(today, currentWeek), { weekStartsOn: 1 })

    const dates: DateItem[] = []
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDateOfWeek, i)
      const dateString = format(date, 'yyyy-MM-dd')

      // Đếm số khung giờ khả dụng cho ngày này
      const availableSlots = getAvailableTimeSlots(dateString).filter((slot) => slot.isAvailable).length

      dates.push({
        date: dateString,
        // Định dạng hiển thị: "Thứ Hai, 26/11"
        display: `${format(date, 'EEEE', { locale: vi })}, ${format(date, 'dd/MM')}`,
        availableSlots: availableSlots
      })
    }
    return dates
  }, [currentWeek, dataDoctorDetail]) // Re-calculate khi tuần thay đổi hoặc data load xong

  // --- HANDLERS ---
  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime('') // Reset giờ khi chọn ngày mới
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const nextWeek = () => setCurrentWeek((prev) => prev + 1)
  const prevWeek = () => setCurrentWeek((prev) => Math.max(0, prev - 1))

  return {
    dataDoctorDetail,
    isLoading,
    selectedDate,
    selectedTime,
    weekDays,
    getTimeSlotsBySession,
    handleDateSelect,
    handleTimeSelect,
    nextWeek,
    prevWeek
  }
}
