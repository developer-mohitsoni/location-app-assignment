"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuth';

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthed, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading && !isAuthed) {
      router.replace('/login');
    }
  }, [isAuthed, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (!isAuthed) {
    return null;
  }

  return <>{children}</>;
}
