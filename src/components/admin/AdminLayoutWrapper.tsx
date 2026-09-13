'use client'

import { usePathname, useRouter } from 'next/navigation'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { role, user, isLoading } = useAuth()
  
  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else if (user && pathname !== '/admin/login') {
        // Very permissive check since the user role string might be "Gamer, org, admin"
        const roleStr = String(role).toLowerCase()
        if (!roleStr.includes('admin') && !roleStr.includes('super_admin')) {
          router.push('/home') // Redirect unauthorized players back to their dashboard
        }
      }
    }
  }, [user, role, isLoading, pathname, router])

  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-[#03060F] text-white">
        {children}
      </div>
    )
  }

  // Show a loading state while we verify their admin role on the client
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#03060F] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-ms-blue border-t-transparent animate-spin" />
          <span className="font-ascii text-xs text-ms-white-60 tracking-widest">&gt; VERIFYING_ADMIN_CREDENTIALS...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#03060F] text-white">
      <AdminSidebar />
      <AdminTopbar />
      
      {/* Main content area, offset by sidebar and topbar */}
      <div className="pl-64 pt-16 min-h-screen">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
