import Sidebar from 'src/ADMIN/Layout/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-6'>Admin Panel</h1>
        {children}
      </div>
    </div>
  )
}
