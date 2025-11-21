export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <div className='flex-1 p-6 bg-blue-50'>
        <h1 className='text-2xl font-bold mb-6 text-blue-800'>Doctor Panel</h1>
        {children}
      </div>
    </div>
  )
}
