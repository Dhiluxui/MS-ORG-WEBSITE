"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  const portalRoutes = ['/admin', '/home', '/tournaments', '/team', '/profile', '/apply-org', '/org'];
  if (portalRoutes.some(route => pathname.startsWith(route))) return null;

  return (
    <footer className="bg-ms-true-black border-t border-ms-border-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Col 1 */}
          <div className="space-y-4">
            <img src="/logo.png" alt="Magadh Striker" className="w-16 h-auto" />
            <div className="font-ascii text-ms-white-60 text-sm tracking-widest leading-relaxed">
              &gt; REPRESENTING INDIA<br />
              &gt; DOMINATING ESPORTS
            </div>
            <div className="flex gap-4 pt-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 border border-ms-white-30 flex items-center justify-center hover:border-ms-blue cursor-pointer transition-colors">IG</div>
              <div className="w-8 h-8 border border-ms-white-30 flex items-center justify-center hover:border-ms-blue cursor-pointer transition-colors">YT</div>
              <div className="w-8 h-8 border border-ms-white-30 flex items-center justify-center hover:border-ms-blue cursor-pointer transition-colors">DC</div>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-4">
              ┌─ QUICK LINKS ─┐
            </div>
            <ul className="space-y-3 font-inter text-ms-white-90 text-sm">
              <li><Link href="/" className="hover:text-ms-blue transition-colors">Home</Link></li>
              <li><Link href="/compete/browse" className="hover:text-ms-blue transition-colors">Tournaments</Link></li>
              <li><Link href="/services" className="hover:text-ms-blue transition-colors">Services</Link></li>
              <li><Link href="/blog" className="hover:text-ms-blue transition-colors">News Feed</Link></li>
              <li><Link href="/admin" className="hover:text-ms-blue transition-colors">Admin Terminal</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-4">
              ┌─ DIVISIONS ─┐
            </div>
            <ul className="space-y-3 font-rajdhani uppercase tracking-wider text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-ms-blue rounded-full"></span> Free Fire MAX</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-ms-blue rounded-full"></span> BGMI</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-ms-blue rounded-full"></span> CODM</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 border border-ms-white-30 rounded-full"></span> MOBA (Soon)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-4">
              ┌─ COMMUNITY ─┐
            </div>
            <div className="space-y-4">
              <button className="w-full bg-ms-blue text-ms-white font-orbitron font-bold uppercase text-sm py-3 hover:bg-opacity-90 transition-all">
                Join Discord
              </button>
              <div className="border border-ms-border-dark p-1 flex">
                <input type="email" placeholder="Email Newsletter" className="bg-transparent border-none text-sm text-ms-white p-2 flex-grow focus:outline-none" />
                <button className="font-ascii text-ms-white-60 hover:text-ms-white px-2">&gt;</button>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 text-center border-t border-ms-border-dark">
          <div className="font-ascii text-ms-white-30 text-xs tracking-[4px] mb-6">
            ─────────────── ◆ ───────────────
          </div>
          <p className="font-inter text-ms-white-60 text-sm">
            © 2026 MAGADH STRIKER ESPORTS | BIHAR, INDIA
          </p>
        </div>
      </div>
    </footer>
  );
}
