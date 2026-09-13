"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';

import { Step1BasicInfo } from '@/components/admin/tournaments/wizard/Step1BasicInfo';
import { Step2Schedule } from '@/components/admin/tournaments/wizard/Step2Schedule';
import { Step3Slots } from '@/components/admin/tournaments/wizard/Step3Slots';
import { Step4Prize } from '@/components/admin/tournaments/wizard/Step4Prize';
import { Step5Scoring } from '@/components/admin/tournaments/wizard/Step5Scoring';
import { Step6Review } from '@/components/admin/tournaments/wizard/Step6Review';

const STEPS = [
  "BASIC_INFO",
  "SCHEDULE",
  "SLOTS_&_REG",
  "PRIZE_&_ENTRY",
  "SCORING_FORMULA",
  "REVIEW_&_PUBLISH"
];

export default function TournamentWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); // Will hold all data

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* Cyberpunk Header */}
      <div className="border-b border-[#1C1C1C] pb-6 sticky top-0 bg-[#050505]/90 backdrop-blur-md z-30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <Link href="/admin/tournaments" className="flex items-center gap-2 text-ms-white-40 hover:text-[#2463FF] text-[10px] font-jetbrains uppercase tracking-widest mb-4 transition-colors">
              <ArrowLeft size={12} /> ABORT // RETURN_TO_LIST
            </Link>
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
              CREATE <span className="text-[#2463FF] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">TOURNAMENT</span>
            </h1>
          </div>
          
          <div className="text-right text-xs text-[#2463FF] font-jetbrains font-bold tracking-widest bg-[#2463FF]/10 border border-[#2463FF]/30 px-4 py-2">
            STEP [{currentStep}/6]
          </div>
        </div>
      </div>

      {/* Cyber Progress Tracker */}
      <div className="flex justify-between relative px-2">
        <div className="absolute top-1/2 left-4 right-4 h-px bg-[#1C1C1C] -z-10 transform -translate-y-1/2"></div>
        {STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isPast = currentStep > stepNum;
          
          return (
            <div key={step} className="flex flex-col items-center gap-2 bg-[#050505] px-2 relative group">
              <div className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold font-jetbrains border transition-all ${
                isActive ? 'border-[#2463FF] bg-[#2463FF]/20 text-ms-white shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                isPast ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 
                'border-[#1C1C1C] bg-[#0A0A0A] text-ms-white-40'
              }`}>
                {isPast ? '✓' : stepNum}
              </div>
              <span className={`text-[9px] font-jetbrains tracking-widest uppercase hidden md:block absolute top-10 whitespace-nowrap ${isActive ? 'text-[#2463FF]' : isPast ? 'text-blue-500' : 'text-ms-white-40'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <div className="h-6 md:h-12" /> {/* Spacer for absolute text */}

      {/* Form Container */}
      <div className="bg-[#0A0A0A] border border-[#1C1C1C] relative animate-in fade-in zoom-in-95 duration-300">
        <div className="p-4 border-b border-[#1C1C1C] bg-[#050505] flex items-center justify-between">
           <h2 className="text-ms-white font-bold tracking-widest uppercase font-jetbrains text-xs flex items-center gap-2">
             <span className="text-[#2463FF]">{'>'}</span> STEP_{currentStep} :: {STEPS[currentStep - 1]}
           </h2>
        </div>
        
        <div className="p-6 md:p-8 min-h-[400px]">
          {currentStep === 1 && <Step1BasicInfo />}
          {currentStep === 2 && <Step2Schedule />}
          {currentStep === 3 && <Step3Slots />}
          {currentStep === 4 && <Step4Prize />}
          {currentStep === 5 && <Step5Scoring />}
          {currentStep === 6 && <Step6Review />}
        </div>
      </div>

      {/* Cyber Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-[#1C1C1C]">
        <button 
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="px-6 py-3 border border-[#333] text-ms-white-60 hover:text-ms-white hover:bg-[#111] hover:border-[#1C1C1C] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[10px] font-jetbrains font-bold uppercase tracking-widest"
        >
          [← PREVIOUS]
        </button>
        
        {currentStep < 6 ? (
          <button 
            onClick={handleNext}
            className="px-6 py-3 border border-[#2463FF] bg-[#2463FF]/10 text-[#2463FF] font-bold hover:bg-[#2463FF] hover:text-black transition-all text-[10px] font-jetbrains uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          >
            [NEXT_STEP →]
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 border border-yellow-500 bg-yellow-500/10 text-yellow-500 font-bold hover:bg-yellow-500 hover:text-black transition-all text-[10px] font-jetbrains uppercase tracking-widest">
              [SAVE_DRAFT]
            </button>
            <button 
              onClick={async () => {
                const { createTournament } = await import('@/actions/tournament.actions');
                await createTournament({
                  name: `MS CHAMPIONSHIP ${Math.floor(Math.random() * 1000)}`,
                  game: 'BGMI',
                  format: 'SQUAD TPP',
                  entryFee: 100,
                  prizePool: 50000,
                  startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                });
                window.location.href = '/admin/tournaments';
              }}
              className="px-6 py-3 border border-[#2463FF] bg-[#2463FF] text-black font-bold hover:bg-[#2463FF]/90 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all text-[10px] font-jetbrains uppercase tracking-widest"
            >
              [PUBLISH_NOW]
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
