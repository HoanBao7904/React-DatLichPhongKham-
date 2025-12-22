import React, { useEffect, useRef } from 'react'

const SnowEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const flakesRef = useRef<
    Array<{
      element: HTMLDivElement
      x: number
      y: number
      speed: number
      sway: number
      angle: number
      size: number
      color: string
    }>
  >([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const SNOWFLAKE_SYMBOLS = ['❅', '❆', '❄', '❅', '❆', '❄', '❅', '❆', '❄', '⭐', '✦']
    const NUM_FLAKES = 35 // Giảm số lượng để bông tuyết to hơn

    // Màu sắc cho bông tuyết - chọn màu nổi bật trên nền trắng/xanh nhạt
    const SNOW_COLORS = [
      '#4A90E2', // Xanh dương đậm
      '#1E88E5', // Xanh dương
      '#039BE5', // Xanh dương sáng
      '#0288D1', // Xanh dương trung
      '#FFFFFF', // Trắng tinh
      '#E3F2FD', // Xanh nhạt phấn
      '#BBDEFB', // Xanh pastel
      '#90CAF9', // Xanh baby blue
      '#64B5F6' // Xanh sáng
    ]

    // Tạo bông tuyết
    const createFlake = () => {
      const flake = document.createElement('div')

      // Random size lớn hơn (từ 15-35px thay vì 10-20px)
      const size = Math.random() * 25 + 15
      const speed = Math.random() * 5 + 0.5 // Chậm hơn để dễ nhìn
      const sway = Math.random() * 1.5 - 0.75
      const color = SNOW_COLORS[Math.floor(Math.random() * SNOW_COLORS.length)]
      const opacity = Math.random() * 0.4 + 0.6 // Tăng opacity (0.6-1.0)

      flake.className = 'fixed pointer-events-none select-none'
      flake.innerHTML = SNOWFLAKE_SYMBOLS[Math.floor(Math.random() * SNOWFLAKE_SYMBOLS.length)]

      // Thêm hiệu ứng shadow để nổi bật hơn
      flake.style.textShadow = `
        0 0 10px rgba(255, 255, 255, 0.7),
        0 0 20px rgba(255, 255, 255, 0.5),
        0 0 30px rgba(255, 255, 255, 0.3)
      `

      flake.style.fontSize = `${size}px`
      flake.style.color = color
      flake.style.opacity = `${opacity}`

      // Thêm hiệu ứng xoay animation bằng CSS
      flake.style.animation = `spin ${Math.random() * 10 + 5}s linear infinite`

      const initialX = Math.random() * window.innerWidth
      const initialY = -size - Math.random() * 100

      flake.style.left = `${initialX}px`
      flake.style.top = `${initialY}px`

      container.appendChild(flake)

      return {
        element: flake,
        x: initialX,
        y: initialY,
        speed: speed,
        sway: sway,
        angle: Math.random() * 360,
        size: size,
        color: color
      }
    }

    // Thêm CSS animation keyframes
    const style = document.createElement('style')
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(180deg); }
      }
    `
    document.head.appendChild(style)

    // Khởi tạo các bông tuyết
    flakesRef.current = []
    for (let i = 0; i < NUM_FLAKES; i++) {
      flakesRef.current.push(createFlake())
    }

    // Animation loop
    let animationId: number
    const animateSnow = () => {
      flakesRef.current.forEach((flake) => {
        // Rơi xuống với tốc độ chậm hơn
        flake.y += flake.speed * 0.3

        // Lắc lư ngang nhiều hơn
        flake.x += flake.sway * Math.sin(flake.angle * 0.02)
        flake.angle += 0.8

        // Thêm hiệu ứng lên xuống nhẹ (float)
        const floatOffset = Math.sin(flake.angle * 0.1) * 2

        // Cập nhật vị trí
        flake.element.style.top = `${flake.y + floatOffset}px`
        flake.element.style.left = `${flake.x}px`

        // Thay đổi opacity nhẹ theo chuyển động
        const opacityChange = 0.2 * Math.sin(flake.angle * 0.05)
        flake.element.style.opacity = `${Math.max(0.3, 0.7 + opacityChange)}`

        // Tái tạo nếu rơi xuống dưới đáy
        if (flake.y > window.innerHeight) {
          flake.y = -flake.size - 50
          flake.x = Math.random() * window.innerWidth
          flake.speed = Math.random() * 2 + 0.5
          // Đổi màu khi tái tạo để đa dạng
          const newColor = SNOW_COLORS[Math.floor(Math.random() * SNOW_COLORS.length)]
          flake.element.style.color = newColor
          flake.color = newColor
        }
      })

      animationId = requestAnimationFrame(animateSnow)
    }

    // Bắt đầu animation
    animateSnow()

    // Xử lý resize window
    const handleResize = () => {
      flakesRef.current.forEach((flake) => {
        if (flake.x > window.innerWidth) {
          flake.x = window.innerWidth - 20
        }
      })
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      document.head.removeChild(style)

      // Xóa tất cả các bông tuyết
      flakesRef.current.forEach((flake) => {
        if (flake.element.parentNode === container) {
          container.removeChild(flake.element)
        }
      })
      flakesRef.current = []
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 w-full h-full pointer-events-none z-[9997] overflow-hidden'
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(173, 216, 230, 0.05) 100%)'
      }}
    />
  )
}

export default SnowEffect
