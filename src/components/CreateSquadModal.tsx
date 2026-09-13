"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';
import { createSquad } from '@/actions/squad.actions';
import { useAuth } from '@/contexts/AuthContext';

interface CreateSquadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateSquadModal({ isOpen, onClose, onSuccess }: CreateSquadModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    game: 'BGMI', // Default game
    captainDiscord: '',
    captainPhone: '',
    captainEmail: user?.email || '',
    ign: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError(null);

    const res = await createSquad({
      ...formData,
      userId: user.id,
    });

    setLoading(false);
    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || "Failed to create squad.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0A0A0A] border border-[#1C1C1C] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#1C1C1C] bg-[#111]">
            <div className="flex items-center gap-3">
              <Shield className="text-[#10b981]" size={28} />
              <div>
                <h2 className="text-xl font-orbitron font-bold text-white tracking-wider uppercase">Create Squad</h2>
                <p className="text-ms-white-60 text-xs font-jetbrains mt-1">Form your roster and conquer tournaments.</p>
              </div>
            </div>
            <button onClick={onClose} className="text-ms-white-60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">Squad Name *</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#111] border border-[#1C1C1C] p-3 text-ms-white focus:border-ms-blue transition-all outline-none" placeholder="Magadh Strikers" />
                </div>
                <div className="space-y-2">
                  <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">Squad Tag *</label>
                  <input required name="tag" value={formData.tag} onChange={handleChange} className="w-full bg-[#111] border border-[#1C1C1C] p-3 text-ms-white focus:border-ms-blue transition-all outline-none" placeholder="MS" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">Select Game *</label>
                  <select required name="game" value={formData.game} onChange={handleChange} className="w-full bg-[#111] border border-[#1C1C1C] p-3 text-ms-white focus:border-ms-blue transition-all outline-none appearance-none">
                    <option value="BGMI">Battlegrounds Mobile India (BGMI)</option>
                    <option value="Free Fire">Free Fire</option>
                    <option value="Valorant">Valorant</option>
                    <option value="CS2">Counter-Strike 2</option>
                    <option value="Call of Duty: Mobile">Call of Duty: Mobile</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">Your In-Game Name *</label>
                  <input required name="ign" value={formData.ign} onChange={handleChange} className="w-full bg-[#111] border border-[#1C1C1C] p-3 text-ms-white focus:border-[#10b981] transition-all outline-none" placeholder="PlayerOne" />
                </div>
                <div className="space-y-2">
                  <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">Discord ID *</label>
                  <input required name="captainDiscord" value={formData.captainDiscord} onChange={handleChange} className="w-full bg-[#111] border border-[#1C1C1C] p-3 text-ms-white focus:border-[#10b981] transition-all outline-none" placeholder="Username#0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">WhatsApp Number *</label>
                  <input required name="captainPhone" value={formData.captainPhone} onChange={handleChange} className="w-full bg-[#111] border border-[#1C1C1C] p-3 text-ms-white focus:border-[#10b981] transition-all outline-none" placeholder="+91 00000 00000" />
                </div>
                <div className="space-y-2">
                  <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">Email Address *</label>
                  <input required type="email" name="captainEmail" value={formData.captainEmail} onChange={handleChange} className="w-full bg-[#111] border border-[#1C1C1C] p-3 text-ms-white focus:border-[#10b981] transition-all outline-none" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button type="button" onClick={onClose} className="flex-1 bg-transparent border border-[#333] text-ms-white-60 font-orbitron font-bold tracking-widest py-4 uppercase hover:bg-[#111] hover:text-ms-white transition-colors">
                CANCEL
              </button>
              <button type="submit" disabled={loading} className="flex-1 bg-ms-blue text-black font-orbitron font-bold tracking-widest py-4 uppercase hover:bg-white transition-all disabled:opacity-50">
                {loading ? 'CREATING...' : 'CREATE SQUAD'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
