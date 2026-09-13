"use client";

import React, { useState } from 'react';
import { Camera, Save, Shield, Bell, User, Key } from 'lucide-react';

export default function ProfileEditPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="relative border border-[#1C1C1C] bg-[#0A0A0A] p-8 overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ms-blue opacity-5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="relative w-24 h-24 bg-[#111] border border-[#333] group-hover:border-ms-blue transition-colors flex items-center justify-center cursor-pointer overflow-hidden">
            <span className="font-orbitron text-3xl font-bold text-ms-white-30">ST</span>
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={24} className="text-ms-white mb-1" />
              <span className="text-[10px] font-jetbrains uppercase tracking-widest text-ms-white">Upload</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-ms-white mb-2 uppercase tracking-wide">
              ACCOUNT <span className="text-ms-blue">SETTINGS</span>
            </h1>
            <p className="text-ms-white-60 font-inter text-sm">Manage your profile, preferences, and security.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Nav */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          {[
            { id: 'general', label: 'General', icon: <User size={18} /> },
            { id: 'security', label: 'Security', icon: <Shield size={18} /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
            { id: 'game-accounts', label: 'Game IDs', icon: <Key size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 p-4 border-l-2 transition-all duration-300 font-jetbrains text-xs uppercase tracking-widest ${
                activeTab === tab.id 
                  ? 'border-ms-blue bg-ms-blue/10 text-ms-white shadow-[inset_4px_0_15px_rgba(36,99,255,0.15)]'
                  : 'border-transparent bg-[#050505] text-ms-white-60 hover:bg-[#111] hover:text-ms-white hover:border-[#333]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-[#0A0A0A] border border-[#1C1C1C] p-8 relative overflow-hidden">
          
          {activeTab === 'general' && (
            <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-orbitron text-xl font-bold text-ms-white uppercase tracking-wide border-b border-[#1C1C1C] pb-4">
                General Profile
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-jetbrains text-[10px] uppercase text-ms-white-60 tracking-widest">Username</label>
                  <input type="text" defaultValue="Striker_01" className="w-full bg-[#050505] border border-[#333] p-3 text-ms-white font-inter focus:border-ms-blue focus:shadow-[0_0_10px_rgba(36,99,255,0.2)] transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="font-jetbrains text-[10px] uppercase text-ms-white-60 tracking-widest">Email Address</label>
                  <input type="email" defaultValue="player@example.com" disabled className="w-full bg-[#111] border border-[#222] p-3 text-ms-white-30 font-inter outline-none cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-jetbrains text-[10px] uppercase text-ms-white-60 tracking-widest">Bio / Signature</label>
                <textarea rows={4} defaultValue="I play to win. T3 Scrims daily." className="w-full bg-[#050505] border border-[#333] p-3 text-ms-white font-inter focus:border-ms-blue focus:shadow-[0_0_10px_rgba(36,99,255,0.2)] transition-all outline-none resize-none"></textarea>
              </div>

              <div className="space-y-2">
                <label className="font-jetbrains text-[10px] uppercase text-ms-white-60 tracking-widest">Social Links</label>
                <div className="flex gap-4">
                  <div className="flex-1 flex items-center bg-[#050505] border border-[#333] focus-within:border-ms-blue transition-all">
                    <span className="px-4 text-ms-white-30 border-r border-[#333]">X</span>
                    <input type="text" placeholder="twitter.com/username" className="w-full bg-transparent p-3 text-ms-white outline-none font-inter text-sm" />
                  </div>
                  <div className="flex-1 flex items-center bg-[#050505] border border-[#333] focus-within:border-ms-blue transition-all">
                    <span className="px-4 text-ms-white-30 border-r border-[#333]">YT</span>
                    <input type="text" placeholder="youtube.com/@channel" className="w-full bg-transparent p-3 text-ms-white outline-none font-inter text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-orbitron text-xl font-bold text-ms-white uppercase tracking-wide border-b border-[#1C1C1C] pb-4">
                Security Settings
              </h2>
              <p className="text-ms-white-60 text-sm font-inter">Update your password and secure your account.</p>
              
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label className="font-jetbrains text-[10px] uppercase text-ms-white-60 tracking-widest">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#050505] border border-[#333] p-3 text-ms-white font-inter outline-none focus:border-ms-blue transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-jetbrains text-[10px] uppercase text-ms-white-60 tracking-widest">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#050505] border border-[#333] p-3 text-ms-white font-inter outline-none focus:border-ms-blue transition-all" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-orbitron text-xl font-bold text-ms-white uppercase tracking-wide border-b border-[#1C1C1C] pb-4">
                Notification Preferences
              </h2>
              
              <div className="space-y-4">
                {[
                  { title: "Tournament Updates", desc: "Get notified when a tournament you joined starts." },
                  { title: "Team Invites", desc: "Receive alerts when someone invites you to a team." },
                  { title: "Match Disputes", desc: "Critical alerts for match dispute resolutions." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#050505] border border-[#111] hover:border-[#333] transition-colors">
                    <div>
                      <h4 className="font-orbitron text-sm font-bold text-ms-white uppercase tracking-wide">{item.title}</h4>
                      <p className="text-xs text-ms-white-60 font-inter mt-1">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#222] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ms-blue shadow-[0_0_10px_rgba(36,99,255,0.2)_inset]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'game-accounts' && (
            <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-orbitron text-xl font-bold text-ms-white uppercase tracking-wide border-b border-[#1C1C1C] pb-4">
                Game Accounts
              </h2>
              <p className="text-ms-white-60 text-sm font-inter">Link your game IDs to verify your identity for tournaments.</p>
              
              <div className="space-y-4">
                {[
                  { game: "Free Fire MAX", id: "1234567890", verified: true },
                  { game: "BGMI", id: "512398746", verified: false },
                ].map((acc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#050505] border border-[#111]">
                    <div>
                      <h4 className="font-orbitron text-sm font-bold text-ms-white tracking-wide">{acc.game}</h4>
                      <p className="text-xs text-ms-white-60 font-jetbrains mt-1">UID: {acc.id}</p>
                    </div>
                    {acc.verified ? (
                      <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 font-jetbrains text-[10px] uppercase tracking-widest">Verified</span>
                    ) : (
                      <button className="px-3 py-1 bg-ms-blue/10 text-ms-blue border border-ms-blue/20 hover:bg-ms-blue hover:text-black font-jetbrains text-[10px] uppercase tracking-widest transition-colors">
                        Verify Now
                      </button>
                    )}
                  </div>
                ))}
                
                <button className="w-full p-4 border border-dashed border-[#333] text-ms-white-60 hover:text-ms-white hover:border-ms-blue hover:bg-ms-blue/5 transition-all font-jetbrains text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                  + Add Game Account
                </button>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-12 pt-6 border-t border-[#1C1C1C] flex items-center justify-end gap-4 relative z-10">
            <button className="px-6 py-3 font-jetbrains text-xs uppercase tracking-widest text-ms-white-60 hover:text-ms-white transition-colors">
              Cancel
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-ms-blue text-black font-jetbrains text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(36,99,255,0.4)] transition-all">
              <Save size={16} />
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
