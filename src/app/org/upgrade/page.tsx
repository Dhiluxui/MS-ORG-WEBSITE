"use client";

import React, { useState, useTransition, useEffect } from 'react';
import { Check, X, Zap, Crown, Shield } from 'lucide-react';
import { upgradeOrgTier, getOrgTier } from '@/actions/org.actions';

export default function OrgUpgradePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currentTier, setCurrentTier] = useState<string>('ROOKIE');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getOrgTier().then(tier => setCurrentTier(tier));
  }, []);

  const handleUpgrade = (tierName: string) => {
    if (tierName === currentTier) return; // Already on this tier
    
    startTransition(async () => {
      const res = await upgradeOrgTier(tierName);
      if (res.success) {
        setCurrentTier(tierName);
      }
    });
  };

  const tiers = [
    {
      name: 'ROOKIE',
      price: billingCycle === 'monthly' ? 'FREE' : 'FREE',
      description: 'Essential tools for emerging tournament organizers.',
      icon: <Shield className="w-6 h-6 text-ms-white-60" />,
      color: 'border-[#333]',
      buttonColor: 'bg-[#111] text-ms-white hover:bg-[#222]',
      features: [
        { name: '1-2 tournament listings / month', included: true },
        { name: '1 active listing at a time', included: true },
        { name: 'Public organizer profile', included: true },
        { name: 'External registration link', included: true },
        { name: 'Basic analytics (click count)', included: true },
        { name: 'Ads shown on tournament pages', included: true },
        { name: 'Verified Checkmark', included: false },
        { name: 'Promotion credits', included: false },
      ]
    },
    {
      name: 'PRO',
      price: billingCycle === 'monthly' ? '₹999' : '₹9,990',
      description: 'Advanced features to scale your esports community.',
      icon: <Zap className="w-6 h-6 text-[#3b82f6]" />,
      color: 'border-[#3b82f6] shadow-[0_0_30px_rgba(59,130,246,0.15)]',
      badge: 'MOST POPULAR',
      buttonColor: 'bg-[#3b82f6] text-white hover:bg-[#3b82f6]/80',
      features: [
        { name: 'Up to 10 listings / month', included: true },
        { name: 'Up to 3 active listings', included: true },
        { name: 'Blue Verified Checkmark', included: true, highlight: 'text-[#3b82f6]' },
        { name: 'Ad-free tournament pages', included: true },
        { name: 'Organizer dashboard', included: true },
        { name: 'Analytics (clicks + sources)', included: true },
        { name: '5 promotion credits / month', included: true },
        { name: 'Career / recruitment posts', included: true },
        { name: 'FFC brand assets permission', included: true },
      ]
    },
    {
      name: 'ELITE',
      price: billingCycle === 'monthly' ? '₹2,499' : '₹24,990',
      description: 'Ultimate power for professional tournament hosts.',
      icon: <Crown className="w-6 h-6 text-[#f59e0b]" />,
      color: 'border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.1)]',
      buttonColor: 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white hover:opacity-90',
      features: [
        { name: 'Unlimited listings & active events', included: true },
        { name: 'Golden Verified Checkmark', included: true, highlight: 'text-[#f59e0b]' },
        { name: 'Completely ad-free', included: true },
        { name: 'Advanced analytics & ROI view', included: true },
        { name: '20 promotion credits / month', included: true },
        { name: 'Priority listing & approvals', included: true },
        { name: 'Blog post on FFC (monthly)', included: true },
        { name: 'Instagram collab (feed/story)', included: true },
        { name: 'Dedicated support', included: true },
        { name: 'Full brand asset usage', included: true },
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <div className="font-courier text-[#10b981] text-xs uppercase tracking-widest opacity-80">
          {'>'} SYSTEM :: LICENSE_UPGRADE
        </div>
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
          ELEVATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#3b82f6]">ORGANIZATION</span>
        </h1>
        <p className="font-jetbrains text-sm text-ms-white-60 max-w-2xl mx-auto leading-relaxed">
          Unlock advanced analytics, verified badges, and massive promotional reach to scale your esports community to the next level.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-[#050505] border border-[#1C1C1C] p-1 flex items-center">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 font-jetbrains text-xs uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-[#111] text-ms-white border border-[#333]' : 'text-ms-white-60 hover:text-ms-white border border-transparent'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 font-jetbrains text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-[#111] text-[#10b981] border border-[#10b981]/30' : 'text-ms-white-60 hover:text-ms-white border border-transparent'}`}
          >
            Yearly
            <span className="bg-[#10b981]/10 text-[#10b981] px-2 py-0.5 text-[8px] rounded-full">SAVE 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, idx) => {
          const isCurrentPlan = currentTier === tier.name;
          
          return (
            <div key={idx} className={`relative flex flex-col bg-[#0A0A0A]/80 backdrop-blur-md border ${isCurrentPlan ? 'border-[#10b981]' : tier.color} p-8 transition-all hover:-translate-y-2 duration-300 group`}>
              
              {tier.badge && !isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white font-jetbrains text-[10px] font-bold px-4 py-1 uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  {tier.badge}
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10b981] text-black font-jetbrains text-[10px] font-bold px-4 py-1 uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  CURRENT PLAN
                </div>
              )}

              {/* Accent Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-inherit bg-[#050505]" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#111] border border-[#222]">
                  {tier.icon}
                </div>
                <h3 className="font-orbitron font-bold text-xl text-ms-white tracking-widest">{tier.name}</h3>
              </div>

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-orbitron font-bold text-ms-white">{tier.price}</span>
                  {tier.price !== 'FREE' && (
                    <span className="font-jetbrains text-xs text-ms-white-60 mb-1 uppercase tracking-widest">/ {billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  )}
                </div>
                <p className="font-jetbrains text-xs text-ms-white-60 mt-3 min-h-[40px] leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="flex-1 space-y-4 my-8">
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${feature.highlight || 'text-[#10b981]'}`} />
                    ) : (
                      <X className="w-4 h-4 shrink-0 mt-0.5 text-ms-white-30" />
                    )}
                    <span className={`font-jetbrains text-xs leading-relaxed ${feature.included ? 'text-ms-white-80' : 'text-ms-white-30'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleUpgrade(tier.name)}
                disabled={isPending || isCurrentPlan}
                className={`w-full py-4 font-jetbrains text-xs font-bold uppercase tracking-widest transition-all ${isCurrentPlan ? 'bg-[#1C1C1C] text-ms-white-30 border border-[#333] cursor-not-allowed' : tier.buttonColor}`}
              >
                {isPending ? '[ PROCESSING... ]' : isCurrentPlan ? '[ ACTIVE PLAN ]' : '[ UPGRADE_NOW ]'}
              </button>

            </div>
          )
        })}
      </div>

    </div>
  );
}
