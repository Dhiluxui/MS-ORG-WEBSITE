"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Trophy, CreditCard, CheckCircle, AlertCircle, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { registerForTournament } from '@/actions/tournament.actions';
import { getUserSquads } from '@/actions/squad.actions';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: any;
  user: any;
}

export default function RegistrationModal({ isOpen, onClose, tournament, user }: RegistrationModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [squads, setSquads] = useState<any[]>([]);
  const [selectedSquadId, setSelectedSquadId] = useState<string>('');

  React.useEffect(() => {
    if (user && isOpen) {
      getUserSquads(user.id).then((data) => {
        setSquads(data);
        if (data.length > 0) {
          const matchingSquad = data.find(s => s.game === tournament?.game);
          if (matchingSquad) {
            setSelectedSquadId(matchingSquad.id);
          } else {
            setSelectedSquadId(data[0].id);
          }
        }
      });
    }
  }, [user, isOpen, tournament]);

  const [proofFile, setProofFile] = useState<File | null>(null);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!proofFile) {
        throw new Error("Social Media Proof screenshot is required.");
      }
      if (!selectedSquadId) {
        throw new Error("You must select a squad to register.");
      }

      const supabase = createClient();
      const fileExt = proofFile.name.split('.').pop();
      const fileName = `${user?.id || 'anon'}-${Date.now()}.${fileExt}`;
      const filePath = `social-proofs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, proofFile, {
          upsert: true,
          contentType: proofFile.type
        });

      if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError);
        throw new Error("Failed to upload proof screenshot: " + uploadError.message);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const res = await registerForTournament({
        tournamentId: tournament.id,
        userId: user?.id || 'anonymous',
        squadId: selectedSquadId,
        proofUrl: publicUrl,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || "Failed to register.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#050505] border border-ms-blue/30 shadow-[0_0_50px_rgba(36,99,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#1C1C1C] bg-[#0A0A0A]">
            <h2 className="text-xl font-orbitron font-bold text-ms-white flex items-center gap-3">
              <Shield className="text-ms-blue" /> 
              SQUAD REGISTRATION
            </h2>
            <button onClick={onClose} className="text-ms-white-60 hover:text-ms-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto custom-scrollbar p-6">
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
                <div className="w-20 h-20 bg-ms-blue/10 rounded-full flex items-center justify-center border border-ms-blue shadow-[0_0_30px_rgba(36,99,255,0.3)]">
                  <CheckCircle size={40} className="text-ms-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-orbitron font-bold text-ms-white mb-2">REGISTRATION PENDING</h3>
                  <p className="text-ms-white-60 font-jetbrains text-sm">Your squad has been successfully registered for {tournament.name}. An admin will review your details shortly.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="mt-4 bg-ms-blue text-black font-orbitron font-bold tracking-widest px-8 py-3 uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(36,99,255,0.6)] transition-all"
                >
                  RETURN TO DASHBOARD
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 font-jetbrains text-sm flex items-start gap-3">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="bg-[#111] p-4 border border-[#222] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest mb-1">Tournament</div>
                    <div className="text-ms-white font-orbitron font-bold truncate max-w-[300px]">{tournament.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest mb-1">Entry Fee</div>
                    <div className="text-ms-blue font-orbitron font-bold flex items-center gap-2 justify-end">
                      <Trophy size={16} />
                      FREE
                    </div>
                  </div>
                </div>

                {squads.length === 0 ? (
                  <div className="bg-[#111] border border-[#333] p-6 text-center space-y-4 rounded-xl">
                    <Shield size={32} className="mx-auto text-ms-white-60" />
                    <div>
                      <h3 className="text-lg font-orbitron font-bold text-ms-white mb-2">NO SQUAD FOUND</h3>
                      <p className="text-ms-white-60 font-jetbrains text-sm">You must create or join a Squad before registering for a tournament.</p>
                    </div>
                    <Link href="/team" onClick={onClose} className="inline-block bg-ms-blue text-black font-orbitron font-bold tracking-widest px-6 py-3 uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(36,99,255,0.6)] transition-all">
                      CREATE SQUAD
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-ms-white font-orbitron text-sm tracking-widest border-b border-[#1C1C1C] pb-2 uppercase">Select Squad</h3>
                    
                    <div className="space-y-2">
                      <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">Active Squad *</label>
                      <select 
                        required 
                        value={selectedSquadId} 
                        onChange={(e) => setSelectedSquadId(e.target.value)} 
                        className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-3 text-ms-white focus:border-ms-blue focus:shadow-[0_0_10px_rgba(36,99,255,0.1)] transition-all outline-none font-jetbrains"
                      >
                        {squads.map(s => (
                          <option key={s.id} value={s.id}>[{s.tag}] {s.name} ({s.game || 'Global'})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  <h3 className="text-ms-white font-orbitron text-sm tracking-widest border-b border-[#1C1C1C] pb-2 uppercase flex items-center gap-2">
                    <UploadCloud size={16} className="text-ms-blue" />
                    Social Media Proof
                  </h3>
                  
                  <div className="bg-[#111] border border-[#333] p-4 text-center space-y-2">
                    <p className="text-ms-white-60 font-jetbrains text-sm">To keep our tournaments free, you must follow our official <strong>Instagram</strong> or <strong>Discord</strong>. Please upload a screenshot proving you are subscribed!</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest">Screenshot Upload *</label>
                    <div className="relative border-2 border-dashed border-[#333] rounded-sm p-6 text-center hover:border-ms-blue/50 transition-colors bg-[#0A0A0A]">
                      <input 
                        type="file" 
                        accept="image/*" 
                        required
                        onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <div className="flex flex-col items-center justify-center space-y-2 text-ms-white-60 pointer-events-none">
                        {proofFile ? (
                          <>
                            <ImageIcon size={24} className="text-ms-blue" />
                            <span className="font-jetbrains text-sm text-ms-white">{proofFile.name}</span>
                            <span className="font-jetbrains text-xs text-ms-blue">Click to change</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud size={24} />
                            <span className="font-jetbrains text-sm">Click or drag a screenshot here</span>
                            <span className="font-jetbrains text-xs">PNG, JPG up to 5MB</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={onClose} className="flex-1 bg-transparent border border-[#333] text-ms-white-60 font-orbitron font-bold tracking-widest py-4 uppercase hover:bg-[#111] hover:text-ms-white transition-colors">
                    CANCEL
                  </button>
                  <button type="submit" disabled={loading || squads.length === 0} className="flex-1 bg-ms-blue text-black font-orbitron font-bold tracking-widest py-4 uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(36,99,255,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'PROCESSING...' : 'CONFIRM & REGISTER'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
