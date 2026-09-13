import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Admin Portal - Magadh Striker',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  )
}
