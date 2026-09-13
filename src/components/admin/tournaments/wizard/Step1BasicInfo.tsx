import React from 'react';

export function Step1BasicInfo() {
  return (
    <div className="space-y-8 font-jetbrains text-xs">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-3">
          <label className="text-ms-white-30 text-[10px] tracking-widest uppercase block font-bold">POST_TITLE // EVENT_NAME</label>
          <input 
            type="text" 
            className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white font-orbitron text-xl font-bold focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all"
            placeholder="e.g. MS WINTER CLASH 2026"
          />
        </div>

        {/* Game */}
        <div className="space-y-3">
          <label className="text-ms-white-30 text-[10px] tracking-widest uppercase block font-bold">GAME_TITLE</label>
          <select className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] transition-all appearance-none cursor-pointer">
            <option>FREE FIRE MAX</option>
            <option>BGMI</option>
            <option>CALL OF DUTY MOBILE</option>
            <option>VALORANT</option>
          </select>
        </div>

        {/* Type */}
        <div className="space-y-3">
          <label className="text-ms-white-30 text-[10px] tracking-widest uppercase block font-bold">MATCH_TYPE</label>
          <select className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] transition-all appearance-none cursor-pointer">
            <option>SQUAD (4v4)</option>
            <option>DUO (2v2)</option>
            <option>SOLO (1v1)</option>
            <option>5v5</option>
          </select>
        </div>

        {/* Format */}
        <div className="space-y-3">
          <label className="text-ms-white-30 text-[10px] tracking-widest uppercase block font-bold">TOURNAMENT_FORMAT</label>
          <select className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] transition-all appearance-none cursor-pointer">
            <option>BATTLE ROYALE (CUSTOM ROOMS)</option>
            <option>SINGLE ELIMINATION BRACKET</option>
            <option>DOUBLE ELIMINATION BRACKET</option>
            <option>ROUND ROBIN</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="text-ms-white-30 text-[10px] tracking-widest uppercase block font-bold">DESCRIPTION // PUBLIC_FACING</label>
        <textarea 
          rows={4}
          className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all custom-scrollbar"
          placeholder="> ENTER TOURNAMENT DESCRIPTION..."
        />
      </div>

      {/* Rules */}
      <div className="space-y-3">
        <label className="text-ms-white-30 text-[10px] tracking-widest uppercase block font-bold">RULESET // PUBLIC_FACING</label>
        <textarea 
          rows={4}
          className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all custom-scrollbar"
          placeholder="> 1. NO EMULATORS ALLOWED.&#10;> 2. MUST RECORD POV..."
        />
      </div>

      {/* Cover Image Upload */}
      <div className="space-y-3">
        <label className="text-ms-white-30 text-[10px] tracking-widest uppercase block font-bold">COVER_IMAGE_UPLOAD</label>
        <div className="border-2 border-dashed border-[#1C1C1C] p-12 text-center bg-[#050505] hover:border-[#10b981] transition-colors cursor-pointer group">
          <p className="text-ms-white-60 font-bold mb-2 group-hover:text-[#10b981] transition-colors">[CLICK OR DRAG IMAGE HERE]</p>
          <p className="text-[10px] text-ms-white-40">1920x1080px (16:9) | MAX 5MB | SUPABASE STORAGE</p>
        </div>
      </div>

    </div>
  );
}
