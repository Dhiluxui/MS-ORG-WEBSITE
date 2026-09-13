import { createClient } from '@/lib/supabase/server'
import { ShieldAlert, Edit, Trash2 } from 'lucide-react'

export const metadata = {
  title: 'User Management - Admin',
}

export default async function AdminUsersPage() {
  const supabase = await createClient()

  // In a real app, we'd fetch users from auth.users joined with public.users for roles
  const { data: users } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">ADMIN & STAFF USERS</h1>
          <p className="font-mono text-xs text-[#999]">Manage platform access levels and permissions.</p>
        </div>
        
        <button className="bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 transition-colors whitespace-nowrap">
          + ADD_ADMIN_USER
        </button>
      </div>

      <div className="bg-[#070C1A] border border-[#111]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
              <tr>
                <th className="px-4 py-3 font-normal">USER</th>
                <th className="px-4 py-3 font-normal">EMAIL / CONTACT</th>
                <th className="px-4 py-3 font-normal">ROLE</th>
                <th className="px-4 py-3 font-normal">STATUS</th>
                <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(u => (
                <tr key={u.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                  <td className="px-4 py-3 font-bold text-white">{u.ign || 'Unknown'}</td>
                  <td className="px-4 py-3 text-[#999]">{u.email || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 border rounded-full text-[10px] ${
                      u.role === 'super_admin' ? 'border-[#2463FF] text-[#2463FF]' :
                      'border-[#4A4A4A] text-[#999]'
                    }`}>
                      {u.role?.toUpperCase() || 'USER'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-green-400">ACTIVE</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-[#999] hover:text-[#2463FF] transition-colors" title="Edit Role">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-[#999] hover:text-red-400 transition-colors" title="Deactivate">
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#4A4A4A]">
                    &gt; NO_ADMINS_FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
