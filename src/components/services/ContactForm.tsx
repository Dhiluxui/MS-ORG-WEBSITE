import React from 'react';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  return (
    <section className="py-20 bg-ms-true-black border-t border-ms-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: Contact Info Terminal */}
          <div className="flex flex-col justify-center">
            <h2 className="font-orbitron font-bold text-3xl text-ms-white mb-8 uppercase">
              INITIATE CONTACT
            </h2>
            
            <div className="bg-ms-panel-black border border-ms-border-dark p-6 md:p-8 font-ascii text-sm text-ms-white-60 space-y-4">
              <div className="text-ms-white mb-4">&gt; SECURE_COMMS_LINK_ESTABLISHED</div>
              
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-ms-border-dark/50">
                <span className="w-32">&gt; EMAIL</span>
                <span className="text-ms-white">:: contact@ms.gg</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-ms-border-dark/50">
                <span className="w-32">&gt; WHATSAPP</span>
                <span className="text-ms-white">:: +91-XXXXXXXXXX</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-ms-border-dark/50">
                <span className="w-32">&gt; CITY</span>
                <span className="text-ms-white">:: Bihar, India</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center py-2">
                <span className="w-32">&gt; DISCORD</span>
                <span className="text-ms-blue hover:underline cursor-pointer">:: discord.gg/ms</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="bg-ms-panel-black border border-ms-border-dark p-8">
            <form className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-ascii text-xs text-ms-white-60 mb-2">NAME:</label>
                  <input 
                    type="text" 
                    className="w-full bg-ms-true-black border border-ms-border-dark p-3 text-ms-white font-inter focus:border-ms-blue outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-ascii text-xs text-ms-white-60 mb-2">EMAIL:</label>
                  <input 
                    type="email" 
                    className="w-full bg-ms-true-black border border-ms-border-dark p-3 text-ms-white font-inter focus:border-ms-blue outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-ascii text-xs text-ms-white-60 mb-2">PHONE (OPTIONAL):</label>
                  <input 
                    type="text" 
                    className="w-full bg-ms-true-black border border-ms-border-dark p-3 text-ms-white font-inter focus:border-ms-blue outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-ascii text-xs text-ms-white-60 mb-2">ORGANIZATION:</label>
                  <input 
                    type="text" 
                    className="w-full bg-ms-true-black border border-ms-border-dark p-3 text-ms-white font-inter focus:border-ms-blue outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-ascii text-xs text-ms-white-60 mb-2">I AM A:</label>
                <select className="w-full bg-ms-true-black border border-ms-border-dark p-3 text-ms-white font-inter focus:border-ms-blue outline-none appearance-none">
                  <option>Sponsor</option>
                  <option>Player / Team</option>
                  <option>Tournament Organizer</option>
                  <option>Media / Press</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block font-ascii text-xs text-ms-white-60 mb-2">MESSAGE:</label>
                <textarea 
                  rows={4}
                  className="w-full bg-ms-true-black border border-ms-border-dark p-3 text-ms-white font-inter focus:border-ms-blue outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <Button type="button" variant="primary" className="w-full">
                [SEND MESSAGE →]
              </Button>
              
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
