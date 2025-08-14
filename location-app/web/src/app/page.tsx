"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";

export default function HomePage() {
  const router = useRouter();
  const { isAuthed, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthed) {
      router.replace("/map");
    } else {
      router.replace("/login");
    }
  }, [isAuthed, router]);

  return null;
}
