"use client";

import React, { useState } from 'react';
import { useAuth, AppRole } from '@/contexts/AuthContext';
import { Shield, User, X } from 'lucide-react';

export function RoleSwitcher() {
  const { role, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // If not logged in, don't show the role switcher
  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-inter">
      {isOpen ? (
        <div className="bg-ms-panel-black border border-ms-border-dark shadow-2xl w-64 flex flex-col overflow-hidden">
          <div className="bg-ms-true-black border-b border-ms-border-dark p-3 flex justify-between items-center">
            <span className="font-ascii text-[10px] text-ms-white-60 tracking-widest">&gt; ACTIVE_ROLE</span>
            <button onClick={() => setIsOpen(false)} className="text-ms-white-60 hover:text-ms-white">
              <X size={14} />
            </button>
          </div>
          
          <div className="p-4 space-y-2">
            <p className="text-xs text-ms-white-60">Your current role synced from Discord:</p>
            <div className="w-full flex items-center gap-3 p-3 text-xs font-bold tracking-widest bg-ms-blue text-ms-white">
              {role === 'user' ? <User size={16} /> : <Shield size={16} />}
              {role.toUpperCase()}
            </div>
            <p className="text-[10px] text-ms-white-40 mt-2 leading-tight">
              To change your role, an Admin must update your Discord Server roles.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-ms-blue hover:bg-opacity-90 text-ms-white p-3 shadow-[0_0_12px_rgba(36,99,255,0.4)] flex items-center gap-2 group transition-all"
        >
          <Shield size={18} />
          <span className="font-ascii text-xs font-bold tracking-widest pr-1">ROLE: {role.toUpperCase()}</span>
        </button>
      )}
    </div>
  );
}
