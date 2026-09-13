"use client";

import React, { useState } from 'react';
import { PremiumCard } from '@/components/portal/PremiumCard';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ApplyOrgPage() {
  const { user, role } = useAuth();
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [socials, setSocials] = useState('');
  const [documentsUrl, setDocumentsUrl] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // If already an org
  if (role === 'org' || role === 'super_admin') {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <PremiumCard className="text-center p-12">
          <CheckCircle2 size={48} className="text-st-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">You are already an Organizer</h2>
          <p className="text-ms-white-60 mb-6">Your account has been granted full Organization privileges.</p>
          <Link href="/org/dashboard" className="btn-primary-glow">
            Go to Org Dashboard
          </Link>
        </PremiumCard>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    setStatus('submitting');
    
    const supabase = createClient();
    
    try {
      const { error } = await supabase.from('org_verifications').insert([
        {
          user_id: user.id,
          org_name: orgName,
          contact_email: email,
          socials_url: socials,
          registration_doc_url: documentsUrl || 'pending_upload',
          status: 'pending'
        }
      ]);

      if (error) {
        throw error;
      }

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit application.');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <PremiumCard className="text-center p-12">
          <div className="w-16 h-16 rounded-full bg-[#0099ff]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-[#0099ff]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Application Received</h2>
          <p className="text-ms-white-60 mb-6 max-w-sm mx-auto">
            Your organization request is under review. Our admins will verify your documents and schedule an interview shortly.
          </p>
          <Link href="/home" className="text-[#0099ff] hover:text-[#33adff] font-medium transition-colors">
            Return to Dashboard
          </Link>
        </PremiumCard>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="mb-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
          <Building2 size={32} className="text-[#10b981]" />
        </div>
        <h1 className="text-4xl font-bold font-orbitron text-white tracking-widest uppercase mb-4">Apply as Organizer</h1>
        <p className="text-ms-white-60 max-w-2xl mx-auto">Host premium tournaments and grow your community on Magadh Striker. Choose a tier that fits your needs after your application is approved.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Tier 1 */}
        <PremiumCard className="p-8 border-white/5 hover:border-[#10b981]/50 transition-colors">
          <h3 className="text-xl font-orbitron font-bold text-white mb-2 uppercase tracking-widest">Basic Tier</h3>
          <div className="h-px w-full bg-white/10 my-4" />
          <ul className="space-y-3 text-sm text-ms-white-60 font-inter">
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#10b981] mt-0.5 shrink-0" /> 1–2 tournament listings / month</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#10b981] mt-0.5 shrink-0" /> 1 active listing at a time</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#10b981] mt-0.5 shrink-0" /> Public organizer profile</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#10b981] mt-0.5 shrink-0" /> Basic analytics (click count)</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#10b981] mt-0.5 shrink-0" /> External registration link</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-ms-white-30 mt-0.5 shrink-0" /> Ads shown on tournament pages</li>
          </ul>
        </PremiumCard>

        {/* Tier 2 */}
        <PremiumCard className="p-8 border-[#3b82f6]/50 bg-[#3b82f6]/5 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Recommended
          </div>
          <h3 className="text-xl font-orbitron font-bold text-white mb-2 uppercase tracking-widest flex items-center gap-2">
            Pro Tier <CheckCircle2 size={18} className="text-[#3b82f6]" fill="currentColor" />
          </h3>
          <div className="h-px w-full bg-white/10 my-4" />
          <ul className="space-y-3 text-sm text-ms-white-60 font-inter">
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> Up to 10 listings / month</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> Up to 3 active listings</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> Blue Verified Checkmark</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> Ad-free tournament pages</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> Organizer dashboard</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> Analytics (clicks + sources)</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> 5 promotion credits / month</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> Career / recruitment posts</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#3b82f6] mt-0.5 shrink-0" /> Brand assets usage</li>
          </ul>
        </PremiumCard>

        {/* Tier 3 */}
        <PremiumCard className="p-8 border-[#f59e0b]/50 bg-[#f59e0b]/5">
          <h3 className="text-xl font-orbitron font-bold text-white mb-2 uppercase tracking-widest flex items-center gap-2">
            Elite Tier <CheckCircle2 size={18} className="text-[#f59e0b]" fill="currentColor" />
          </h3>
          <div className="h-px w-full bg-white/10 my-4" />
          <ul className="space-y-3 text-sm text-ms-white-60 font-inter">
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" /> Unlimited listings & active</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" /> Golden verified checkmark</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" /> Completely ad-free</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" /> Advanced analytics & ROI view</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" /> 20 promotion credits / month</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" /> Priority listing & approvals</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" /> Blog & Instagram collabs</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" /> Dedicated support</li>
          </ul>
        </PremiumCard>
      </div>

      <PremiumCard>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {status === 'error' && (
            <div className="bg-st-red/10 border border-st-red/20 text-st-red p-4 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ms-white-90 mb-1.5">Organization Name</label>
              <input 
                type="text"
                required
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                placeholder="e.g. GodLike Esports"
                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0099ff] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ms-white-90 mb-1.5">Contact Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="org@example.com"
                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0099ff] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ms-white-90 mb-1.5">Social Links (Instagram/YouTube/Website)</label>
              <input 
                type="text"
                required
                value={socials}
                onChange={e => setSocials(e.target.value)}
                placeholder="https://instagram.com/your-org"
                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0099ff] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ms-white-90 mb-1.5">Verification Documents</label>
              <p className="text-xs text-ms-white-60 mb-2">Please provide a Google Drive link containing your Org Registration and ID Proofs.</p>
              <div className="relative">
                <input 
                  type="text"
                  required
                  value={documentsUrl}
                  onChange={e => setDocumentsUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-[#09090b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[#0099ff] transition-colors"
                />
                <UploadCloud size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ms-white-60" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full btn-primary-glow flex justify-center items-center h-12"
            >
              {status === 'submitting' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Submit Application'
              )}
            </button>
          </div>

        </form>
      </PremiumCard>
    </div>
  );
}
