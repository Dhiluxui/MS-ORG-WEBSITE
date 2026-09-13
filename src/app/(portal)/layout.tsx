"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, ArrowLeft, Search, Trophy, User, Users, Activity, MessageSquare, Settings, Shield, ChevronDown
} from 'lucide-react';

  // No longer need accordion menu state, using a flat navigation design

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, dbUser, role, signOut } = useAuth();
  
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const username = dbUser?.discord_username || user?.user_metadata?.custom_claims?.global_name || user?.email?.split('@')[0] || 'Striker';

  // Smooth, premium animations
  const menuVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      scale: 0.98
    })
  };

  return (
    <div className="flex h-screen bg-[#000000] text-ms-white overflow-hidden selection:bg-[#2463FF]/30 selection:text-white">
      
      {/* FULL-HEIGHT SIDEBAR */}
      <aside className="w-[300px] flex-shrink-0 bg-[#0A0A0A]/50 backdrop-blur-md border-r border-[#1C1C1C] flex flex-col hidden md:flex relative z-20">
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Fixed Top Section: User Profile & Search */}
          <div className="p-6 border-b border-[#1C1C1C]">
            <div 
              className="flex items-center justify-between mb-6 cursor-pointer hover:bg-white/[0.03] p-3 -mx-3 rounded-xl transition-all relative group"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2463FF]/20 to-[#2463FF]/5 border border-[#2463FF]/30 flex items-center justify-center text-white font-semibold shadow-[0_0_15px_rgba(36,99,255,0.15)]">
                  {username.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-white">{username}</span>
                  <span className="text-xs text-ms-white-60">{role === 'org' ? 'Organization' : 'Verified Player'}</span>
                </div>
              </div>
              <ChevronDown size={16} className={`text-ms-white-30 group-hover:text-ms-white transition-transform duration-300 ${showRoleMenu ? 'rotate-180' : ''}`} />
              
              <AnimatePresence>
                {showRoleMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-[#111] border border-white/10 rounded-xl z-50 shadow-2xl flex flex-col overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 border-b border-white/5 text-xs text-ms-white-60 font-medium bg-black/20">
                      Switch Workspace
                    </div>
                    <Link href="/compete/browse" onClick={() => setShowRoleMenu(false)} className="p-3 text-sm font-medium text-ms-white hover:bg-white/5 transition-colors flex items-center justify-between">
                      <span className="flex items-center gap-2"><User size={16} className="text-[#2463FF]" /> Player</span>
                      {(pathname.includes('/compete') || pathname.includes('/profile') || pathname.includes('/team')) && <div className="w-1.5 h-1.5 rounded-full bg-[#2463FF]" />}
                    </Link>
                    <Link href="/org" onClick={() => setShowRoleMenu(false)} className="p-3 text-sm font-medium text-ms-white hover:bg-white/5 transition-colors border-t border-white/5 flex items-center justify-between">
                      <span className="flex items-center gap-2"><Trophy size={16} className="text-purple-400" /> Organizer</span>
                      {pathname.includes('/org') && <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                    </Link>
                    <Link href="/admin" onClick={() => setShowRoleMenu(false)} className="p-3 text-sm font-medium text-ms-white hover:bg-white/5 transition-colors border-t border-white/5 flex items-center justify-between">
                      <span className="flex items-center gap-2"><Shield size={16} className="text-red-400" /> Admin</span>
                      {pathname.includes('/admin') && <div className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 bg-[#0A0A0A] border border-[#1C1C1C] rounded-lg p-2.5 focus-within:border-[#2463FF]/50 focus-within:ring-1 focus-within:ring-[#2463FF]/20 transition-all">
              <Search className="text-ms-white-30" size={16} />
              <input 
                type="text" 
                placeholder="Search tournaments..." 
                className="w-full bg-transparent border-none outline-none text-ms-white text-sm placeholder:text-ms-white-30"
              />
              <div className="flex items-center justify-center bg-white/5 rounded px-1.5 py-0.5 border border-white/10 text-[10px] text-ms-white-60 font-medium">
                ⌘K
              </div>
            </div>
          </div>

          {/* FLAT PREMIUM NAVIGATION */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar relative z-10">
            
            {/* COMPETE */}
            <div className="space-y-1">
              <div className="text-[10px] text-ms-white-30 font-bold px-3 mb-3 uppercase tracking-widest flex items-center gap-2">
                 Compete
              </div>
              <NavItem href="/compete/browse" label="Tournaments" icon={<Trophy size={18} />} active={pathname === '/compete/browse'} badge="Live" />
              <NavItem href="/compete/matches" label="My Matches" icon={<Activity size={18} />} active={pathname === '/compete/matches'} />
            </div>

            {/* SQUADS */}
            <div className="space-y-1">
              <div className="text-[10px] text-ms-white-30 font-bold px-3 mb-3 uppercase tracking-widest flex items-center gap-2">
                 Squads
              </div>
              <NavItem href="/team" label="Current Roster" icon={<Users size={18} />} active={pathname === '/team'} />
              <NavItem href="/team/invites" label="Pending Invites" icon={<MessageSquare size={18} />} active={pathname === '/team/invites'} />
              <NavItem href="/team/free-agents" label="Free Agents" icon={<Search size={18} />} active={pathname === '/team/free-agents'} />
            </div>

            {/* IDENTITY */}
            <div className="space-y-1">
              <div className="text-[10px] text-ms-white-30 font-bold px-3 mb-3 uppercase tracking-widest flex items-center gap-2">
                 Identity
              </div>
              <NavItem href="/profile" label="Overview & Stats" icon={<User size={18} />} active={pathname === '/profile'} />
              <NavItem href="/profile/history" label="Match History" icon={<Activity size={18} />} active={pathname === '/profile/history'} />
              <NavItem href="/leaderboards/global" label="Global Rankings" icon={<Trophy size={18} />} active={pathname === '/leaderboards/global'} />
            </div>

            {/* SYSTEM */}
            <div className="space-y-1 pt-4 border-t border-white/5">
              <NavItem href="/profile/settings" label="Account Settings" icon={<Settings size={18} />} active={pathname === '/profile/settings'} />
            </div>
            
          </nav>

          {/* Fixed Bottom Section: Sign Out */}
          <div className="p-4 border-t border-[#1C1C1C] bg-transparent">
            <button onClick={() => signOut()} className="flex items-center justify-center gap-3 w-full p-3 rounded-lg text-ms-white-60 hover:bg-white/5 hover:text-white transition-all group">
              <LogOut size={16} className="group-hover:text-red-400 transition-colors" />
              <span className="text-sm font-medium">Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#000000]">
        <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:px-12 custom-scrollbar relative z-10">
          {children}
        </main>
      </div>

    </div>
  );
}

function NavItem({ href, label, active, badge, icon }: { href: string, label: string, active: boolean, badge?: string, icon?: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className={`
        group relative flex items-center justify-between p-3 rounded-xl transition-all duration-300 overflow-hidden
        ${active 
          ? 'bg-gradient-to-r from-ms-blue/10 to-transparent text-white' 
          : 'bg-transparent text-ms-white-60 hover:bg-white/[0.02] hover:text-white'
        }
      `}
    >
      {/* Animated Edge Indicator */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] transition-all duration-300 rounded-r-md shadow-[0_0_10px_rgba(36,99,255,0.8)] bg-ms-blue ${active ? 'h-3/5 opacity-100' : 'h-0 opacity-0 group-hover:h-2/5 group-hover:opacity-100'}`} />

      <div className={`flex items-center gap-3 relative z-10 transition-transform duration-300 ${active ? 'translate-x-2' : 'group-hover:translate-x-1'}`}>
        {icon && (
          <div className={`transition-all duration-300 ${active ? 'text-ms-blue scale-110 drop-shadow-[0_0_8px_rgba(36,99,255,0.5)]' : 'text-ms-white-30 group-hover:text-ms-blue'}`}>
            {icon}
          </div>
        )}
        <span className={`text-[13px] tracking-wide ${active ? 'font-bold' : 'font-medium'}`}>
          {label}
        </span>
      </div>
      
      {badge && (
        <span className={`relative z-10 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${active ? 'bg-ms-blue text-black shadow-[0_0_10px_rgba(36,99,255,0.4)]' : 'bg-white/10 text-ms-white'}`}>
          {badge}
        </span>
      )}
    </Link>
  );
}

