export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <div className='flex-1 p-6 bg-green-50'>
        <h1 className='text-2xl font-bold mb-6 text-green-800'>Employee Panel</h1>
        {children}
      </div>
    </div>
  )
}
