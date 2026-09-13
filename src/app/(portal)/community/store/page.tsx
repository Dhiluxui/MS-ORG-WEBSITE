"use client";

import React from 'react';

export default function MerchStorePage() {
  const storeItems = [
    {
      id: "MS-TSHIRT-01",
      name: "OFFICIAL PRO JERSEY 2026",
      price: "₹1,299",
      status: "IN_STOCK",
      category: "APPAREL",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: "MS-HOODIE-02",
      name: "TERMINAL DOMINATION HOODIE",
      price: "₹2,499",
      status: "LOW_STOCK",
      category: "APPAREL",
      sizes: ["M", "L"]
    },
    {
      id: "MS-SLEEVE-01",
      name: "TACTICAL GAMING SLEEVE",
      price: "₹499",
      status: "OUT_OF_STOCK",
      category: "ACCESSORIES",
      sizes: ["ONE_SIZE"]
    }
  ];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#111] pb-6">
        <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
          // MERCHANDISE_HUB
        </div>
        <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
          MERCH <span className="text-ms-blue">STORE</span>
        </h1>
        <p className="text-ms-white-60 font-inter text-xs mt-2 max-w-lg">
          Official Magadh Striker jerseys, apparel, and tactical gaming accessories.
        </p>
      </div>

      {/* ASCII Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storeItems.map((item) => (
          <div key={item.id} className="border border-[#1C1C1C] bg-[#0A0A0A] hover:border-ms-blue hover:shadow-[0_0_16px_rgba(36,99,255,0.1)] transition-all flex flex-col group relative overflow-hidden">
            
            {/* Scanline overlay for product image area */}
            <div className="absolute inset-0 h-48 pointer-events-none opacity-20 z-10" 
                 style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #111 2px, #111 4px)' }} />

            {/* Product Image Placeholder */}
            <div className="h-48 bg-[#050505] flex items-center justify-center border-b border-[#1C1C1C] relative">
              <span className="font-orbitron font-bold text-3xl text-[#111] rotate-12 tracking-widest uppercase">
                MS_MERCH
              </span>
              <div className="absolute top-3 left-3 bg-[#111] border border-[#222] px-2 py-1 font-courier text-[10px] text-ms-white-60 uppercase z-20">
                {item.category}
              </div>
            </div>

            {/* Details */}
            <div className="p-5 flex-1 flex flex-col relative z-20 bg-[#0A0A0A]">
              <div className="font-jetbrains text-[10px] tracking-widest mb-3 flex justify-between">
                <span className="text-ms-white-30">ID: {item.id}</span>
                {item.status === 'IN_STOCK' && <span className="text-[#10b981]">[IN_STOCK]</span>}
                {item.status === 'LOW_STOCK' && <span className="text-[#f59e0b] animate-pulse">[LOW_STOCK]</span>}
                {item.status === 'OUT_OF_STOCK' && <span className="text-red-500">[SOLD_OUT]</span>}
              </div>

              <h3 className="text-lg font-orbitron font-bold text-ms-white mb-4 line-clamp-2 uppercase">
                {item.name}
              </h3>
              
              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-end">
                  <div className="font-courier text-xs text-ms-white-60">PRICE ::</div>
                  <div className="font-jetbrains text-xl font-bold text-ms-white">{item.price}</div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {item.sizes.map(size => (
                    <div key={size} className="font-courier text-[10px] text-ms-white-60 border border-[#333] px-2 py-1 hover:border-ms-white hover:text-ms-white transition-colors cursor-pointer">
                      [{size}]
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-[#1C1C1C] bg-[#050505]">
              <button 
                className={`w-full py-2 font-rajdhani font-bold tracking-widest transition-colors ${
                  item.status === 'OUT_OF_STOCK' 
                    ? 'text-[#333] cursor-not-allowed border border-[#111]' 
                    : 'bg-ms-blue text-white hover:bg-white hover:text-black border border-ms-blue'
                }`}
                disabled={item.status === 'OUT_OF_STOCK'}
              >
                {item.status === 'OUT_OF_STOCK' ? '[ UNAVAILABLE ]' : '[ ADD_TO_CARGO ]'}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
