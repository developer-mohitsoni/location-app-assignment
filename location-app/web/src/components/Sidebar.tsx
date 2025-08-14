"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";
import { useEffect } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthed, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const link = (href: string, label: string) => (
    <Link href={href} className={`block px-4 py-2 rounded hover:bg-gray-200 ${pathname===href? 'bg-gray-200 font-semibold':''}`}>{label}</Link>
  );

  return (
    <div className="w-60 p-4 border-r h-screen sticky top-0 flex flex-col gap-2 bg-white">
      <div className="text-xl font-bold mb-2">Locations</div>
      {link("/map", "Map")}
      <div className="flex-1" />
      {!isAuthed && <div className="text-sm text-gray-500">Not logged in</div>}
    </div>
  );
}
