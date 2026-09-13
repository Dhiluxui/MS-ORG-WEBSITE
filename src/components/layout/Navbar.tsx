"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { loginWithDiscord } from '@/lib/auth/discord';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const portalRoutes = ['/admin', '/home', '/tournaments', '/team', '/profile', '/apply-org', '/org', '/compete', '/leaderboards', '/community'];
  if (user || portalRoutes.some(route => pathname.startsWith(route))) return null;

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-ms-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LEFT: Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Magadh Striker" className="h-10 w-auto group-hover:scale-105 transition-transform" />
              <span className="font-orbitron font-bold text-xl tracking-wider text-ms-white hidden sm:block">
                MAGADH STRIKER
              </span>
            </Link>
          </div>

          {/* CENTER: Links (Desktop) */}
          <div className="hidden md:flex space-x-8">
            {user ? (
              <>
                <NavLink href="/home">Dashboard</NavLink>
                <NavLink href="/team">My Team</NavLink>
                <NavLink href="/profile">Profile</NavLink>
              </>
            ) : (
              <>
                <NavLink href="/home">Home</NavLink>
                <NavLink href="/services">Services</NavLink>
                <NavLink href="/blog">Blog</NavLink>
                <NavLink href="/our-story">Our Story</NavLink>
              </>
            )}
          </div>

          {/* RIGHT: Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button onClick={() => signOut()} className="text-sm font-orbitron font-bold uppercase tracking-wider border border-ms-white px-4 py-2 hover:border-st-red hover:text-st-red transition-colors">
                LOGOUT
              </button>
            ) : (
              <button onClick={() => loginWithDiscord()} className="text-sm font-orbitron font-bold uppercase tracking-wider border border-ms-white px-4 py-2 hover:border-ms-blue hover:text-ms-blue transition-colors">
                Login with Discord
              </button>
            )}
            <Link href="/compete/browse" className="text-sm font-orbitron font-bold uppercase tracking-wider bg-ms-blue text-ms-white px-4 py-2 hover:bg-opacity-90 shadow-[0_0_12px_rgba(36,99,255,0.3)] transition-all">
              Register Team
            </Link>
          </div>

          {/* Mobile menu button could go here */}

        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-ms-white-90 hover:text-ms-white hover:text-ms-blue transition-colors font-rajdhani uppercase tracking-[2px] font-medium"
    >
      {children}
    </Link>
  );
}
