'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, Trophy, Users, FileText, MessageSquare, BarChart2, Settings, ChevronDown, ChevronRight, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'

const NAV = [
  { label: '> DASHBOARD', href: '/admin', icon: LayoutDashboard },
  {
    label: '> TOURNAMENTS', icon: Trophy,
    children: [
      { label: '↳ ALL_TOURNAMENTS', href: '/admin/tournaments' },
      { label: '↳ CREATE_NEW', href: '/admin/tournaments/new' },
    ]
  },
  {
    label: '> TEAMS_&_PLAYERS', icon: Users,
    children: [
      { label: '↳ ALL_TEAMS', href: '/admin/teams' },
      { label: '↳ PLAYER_REGISTRY', href: '/admin/teams/players' },
      { label: '↳ BANNED_IGNs', href: '/admin/teams/banned' },
    ]
  },
  {
    label: '> CONTENT_CMS', icon: FileText,
    children: [
      { label: '↳ BLOG_POSTS', href: '/admin/cms/blog' },
      { label: '↳ ROSTER', href: '/admin/cms/roster' },
      { label: '↳ MERCHANDISE', href: '/admin/cms/merch' },
      { label: '↳ SPONSORS', href: '/admin/cms/sponsors' },
      { label: '↳ LAN_TICKETS', href: '/admin/cms/lan-tickets' },
      { label: '↳ MEDIA_LIBRARY', href: '/admin/cms/media' },
    ]
  },
  {
    label: '> COMMUNICATIONS', icon: MessageSquare,
    children: [
      { label: '↳ BROADCAST', href: '/admin/communications' },
      { label: '↳ TEMPLATES', href: '/admin/communications/templates' },
      { label: '↳ MESSAGE_LOG', href: '/admin/communications/log' },
    ]
  },
  { label: '> ANALYTICS', href: '/admin/analytics', icon: BarChart2 },
  {
    label: '> SETTINGS', icon: Settings,
    children: [
      { label: '↳ ADMIN_USERS', href: '/admin/settings/users' },
      { label: '↳ SITE_CONFIG', href: '/admin/settings/site' },
      { label: '↳ AUDIT_LOG', href: '/admin/settings/audit' },
    ]
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [supabase])

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="w-64 fixed top-0 left-0 h-screen bg-[#070C1A] border-r border-[#111] overflow-y-auto flex flex-col z-50">
      {/* Header */}
      <div className="px-4 py-5 border-b border-[#111]">
        <pre className="font-mono text-xs text-[#2463FF]">
{`╔═══════════╗
║ MS ADMIN  ║
╚═══════════╝`}
        </pre>
        <div className="font-mono text-xs text-[#4A4A4A] mt-1">
          &gt; PORTAL_V1.0
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {NAV.map((item) => {
          const Icon = item.icon
          const isActive = item.href ? pathname === item.href : false
          const hasChildren = !!item.children
          const isOpen = openMenus[item.label]

          return (
            <div key={item.label} className="mb-1">
              {hasChildren ? (
                <div>
                  <button 
                    onClick={() => toggleMenu(item.label)}
                    className="w-full flex items-center justify-between px-4 py-2 font-mono text-xs text-[#999] hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 group-hover:text-[#2463FF] transition-colors" />
                      <span>{item.label}</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {isOpen && (
                    <div className="pl-9 pr-4 mt-1 space-y-1">
                      {item.children?.map(child => {
                        const isChildActive = pathname === child.href
                        return (
                          <Link 
                            key={child.label} 
                            href={child.href}
                            className={`block font-mono text-xs py-1.5 px-3 transition-colors ${
                              isChildActive 
                                ? 'text-white border-l-2 border-[#2463FF] bg-[#0D1535]/40' 
                                : 'text-[#4A4A4A] hover:text-white hover:bg-[#111] border-l-2 border-transparent'
                            }`}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href={item.href!}
                  className={`flex items-center gap-3 px-4 py-2 font-mono text-xs transition-colors group ${
                    isActive ? 'text-white bg-[#0D1535]/40 border-r-2 border-[#2463FF]' : 'text-[#999] hover:text-white hover:bg-[#111]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2463FF]' : 'group-hover:text-[#2463FF]'}`} />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-[#111] p-4">
        {user && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full border border-[#1C1C1C] grayscale hover:grayscale-0" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#1C1C1C] border border-[#4A4A4A]" />
              )}
              <div className="overflow-hidden">
                <div className="font-mono text-xs text-white truncate max-w-[100px]">
                  {user.user_metadata?.full_name || user.email}
                </div>
                <div className="font-mono text-[10px] text-[#2463FF]">
                  ADMIN_ROLE
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="text-[#4A4A4A] hover:text-white transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
