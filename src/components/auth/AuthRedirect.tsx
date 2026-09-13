"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function AuthRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // User is logged in, but on the public landing page.
      // Redirect them to their portal dashboard.
      router.push('/home');
    }
  }, [user, isLoading, router]);

  return null;
}
