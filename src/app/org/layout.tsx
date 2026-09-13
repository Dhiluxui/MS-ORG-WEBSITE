"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, ArrowLeft, Search, Trophy, User, Users, Activity, MessageSquare, Settings, Shield, ChevronDown, Zap
} from 'lucide-react';

type MenuState = 'main' | 'tournaments' | 'ops';

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, dbUser, role, signOut } = useAuth();
  
  const [activeMenu, setActiveMenu] = useState<MenuState>('main');
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const username = dbUser?.discord_username || user?.user_metadata?.custom_claims?.global_name || user?.email?.split('@')[0] || 'EXTERNAL_ORG';

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
    <div className="flex h-screen bg-[#050505] text-ms-white overflow-hidden selection:bg-[#10b981]/30 selection:text-white">
      
      {/* FULL-HEIGHT SIDEBAR */}
      <aside className="w-[300px] flex-shrink-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col hidden md:flex relative z-20">
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Fixed Top Section: User Profile & Search */}
          <div className="p-6 border-b border-white/5">
            <div 
              className="flex items-center justify-between mb-6 cursor-pointer hover:bg-[#0A0A0A] border border-transparent hover:border-[#1C1C1C] p-3 -mx-3 transition-all relative group"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0A0A0A] border border-[#10b981]/30 flex items-center justify-center text-[#10b981] font-orbitron font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  ORG
                </div>
                <div className="flex flex-col">
                  <span className="font-jetbrains font-bold text-sm text-ms-white max-w-[120px] truncate uppercase">{username}</span>
                  <span className="text-[10px] font-jetbrains tracking-widest text-[#10b981] uppercase">Organization</span>
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
                      <span className="flex items-center gap-2"><User size={16} className="text-[#0099ff]" /> Player</span>
                      {(pathname.includes('/compete') || pathname.includes('/profile') || pathname.includes('/team')) && <div className="w-1.5 h-1.5 rounded-full bg-[#0099ff]" />}
                    </Link>
                    <Link href="/org" onClick={() => setShowRoleMenu(false)} className="p-3 text-sm font-medium text-ms-white hover:bg-white/5 transition-colors border-t border-white/5 flex items-center justify-between">
                      <span className="flex items-center gap-2"><Trophy size={16} className="text-[#10b981]" /> Organizer</span>
                      {pathname.includes('/org') && <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />}
                    </Link>
                    <Link href="/admin" onClick={() => setShowRoleMenu(false)} className="p-3 text-sm font-medium text-ms-white hover:bg-white/5 transition-colors border-t border-white/5 flex items-center justify-between">
                      <span className="flex items-center gap-2"><Shield size={16} className="text-[#10b981]" /> Admin</span>
                      {pathname.includes('/admin') && <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 bg-[#0A0A0A] border border-[#1C1C1C] p-2 focus-within:border-[#10b981] focus-within:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all">
              <span className="shrink-0 text-[#10b981] font-courier pl-1">{'>'}</span>
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full bg-transparent border-none outline-none text-ms-white font-courier text-sm placeholder:text-ms-white-30"
              />
              <div className="flex items-center justify-center bg-black border border-[#1C1C1C] px-1.5 py-0.5 text-[10px] font-jetbrains text-ms-white-60 font-bold tracking-widest">
                ⌘K
              </div>
            </div>
          </div>

          {/* Animated Menu Container */}
          <div className="flex-1 relative bg-[#0a0a0a]">
            <AnimatePresence initial={false} custom={activeMenu === 'main' ? -1 : 1}>
              
              {/* MAIN MENU */}
              {activeMenu === 'main' && (
                <motion.nav 
                  key="main"
                  custom={-1}
                  variants={menuVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-y-auto p-4 space-y-1.5 custom-scrollbar"
                >
                  <div className="text-xs text-ms-white-30 font-medium px-3 mb-2 mt-2 uppercase tracking-wider">
                    Overview
                  </div>
                  
                  <NavItem href="/org" label="Dashboard" icon={<Activity size={18} />} active={pathname === '/org'} color="#10b981" />
                  <NavItem href="/org/upgrade" label="Upgrade Plan" icon={<Zap size={18} />} active={pathname === '/org/upgrade'} color="#f59e0b" badge="PRO" />

                  <div className="text-xs text-ms-white-30 font-medium px-3 mt-6 mb-2 uppercase tracking-wider">
                    Management
                  </div>

                  <MenuButton onClick={() => { setActiveMenu('tournaments'); router.push('/org/tournaments'); }} label="Tournaments" icon={<Trophy size={18} />} hoverColor="#10b981" />
                  <MenuButton onClick={() => { setActiveMenu('ops'); router.push('/org/teams'); }} label="Operations" icon={<Users size={18} />} hoverColor="#10b981" />

                  <div className="text-xs text-ms-white-30 font-medium px-3 mt-6 mb-2 uppercase tracking-wider">
                    Support
                  </div>

                  <NavItem href="/org/support" label="Support Desk" icon={<MessageSquare size={18} />} active={pathname === '/org/support'} color="#10b981" />
                </motion.nav>
              )}

              {/* TOURNAMENTS SUB-MENU */}
              {activeMenu === 'tournaments' && (
                <motion.nav key="tournaments" custom={1} variants={menuVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
                  <BackButton onClick={() => setActiveMenu('main')} hoverColor="#10b981" />
                  <div className="text-xs text-ms-white-30 font-medium px-3 mb-2 mt-4 uppercase tracking-wider">Tournaments</div>
                  <NavItem href="/org/tournaments" label="Active Events" active={pathname === '/org/tournaments'} color="#10b981" />
                  <NavItem href="/org/tournaments/create" label="Host New Event" active={pathname === '/org/tournaments/create'} color="#10b981" />
                </motion.nav>
              )}

              {/* OPS SUB-MENU */}
              {activeMenu === 'ops' && (
                <motion.nav key="ops" custom={1} variants={menuVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
                  <BackButton onClick={() => setActiveMenu('main')} hoverColor="#10b981" />
                  <div className="text-xs text-ms-white-30 font-medium px-3 mb-2 mt-4 uppercase tracking-wider">Operations</div>
                  <NavItem href="/org/teams" label="Registered Teams" active={pathname === '/org/teams'} color="#10b981" />
                </motion.nav>
              )}

            </AnimatePresence>
          </div>

          {/* Fixed Bottom Section: Sign Out */}
          <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
            <button onClick={() => signOut()} className="flex items-center justify-center gap-3 w-full p-3 rounded-lg text-ms-white-60 hover:bg-white/5 hover:text-white transition-all group">
              <LogOut size={16} className="group-hover:text-red-400 transition-colors" />
              <span className="text-sm font-medium">Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#050505]">
        <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:px-12 custom-scrollbar relative z-10">
          {children}
        </main>
      </div>

    </div>
  );
}

function MenuButton({ onClick, label, icon, hoverColor = "#0099ff" }: { onClick: () => void, label: string, icon: React.ReactNode, hoverColor?: string }) {
  const safeId = label.replace(/[^a-zA-Z0-9]/g, '');
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center justify-between w-full p-3 rounded-none bg-transparent hover:bg-white/5 transition-all duration-300 group btn-${safeId}`}
    >
      <style dangerouslySetInnerHTML={{ __html: `.btn-${safeId}:hover .icon-${safeId} { color: ${hoverColor} !important; }` }} />
      <div className="flex items-center gap-3 text-ms-white-60 group-hover:text-white transition-colors">
        <div className={`text-ms-white-30 transition-colors icon-${safeId}`}>
           {icon}
        </div>
        <span className="text-sm font-medium">
          {label}
        </span>
      </div>
      <ChevronDown size={16} className="text-ms-white-30 -rotate-90 group-hover:text-white transition-colors" />
    </button>
  );
}

function BackButton({ onClick, hoverColor = "#0099ff" }: { onClick: () => void, hoverColor?: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 p-3 w-full rounded-none hover:bg-white/5 transition-colors text-ms-white-60 hover:text-white group mb-2">
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">Back to Menu</span>
    </button>
  );
}

function NavItem({ href, label, active, badge, icon, color = "#0099ff" }: { href: string, label: string, active: boolean, badge?: string, icon?: React.ReactNode, color?: string }) {
  return (
    <Link 
      href={href}
      className={`
        flex items-center justify-between p-3 rounded-none transition-all duration-300
        ${active 
          ? 'text-[#10b981] border-l-2 border-[#10b981]' 
          : 'bg-transparent text-ms-white-60 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
        }
      `}
      style={{
        backgroundColor: active ? `${color}0A` : 'transparent',
      }}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="transition-colors" style={{ color: active ? color : undefined }}>{icon}</div>}
        <span className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}>
          {label}
        </span>
      </div>
      {badge && (
        <span 
          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: active ? color : 'rgba(255,255,255,0.1)', boxShadow: active ? `0 0 10px ${color}66` : 'none' }}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
