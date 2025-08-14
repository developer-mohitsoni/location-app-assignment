// app/locations/page.tsx
"use client";

import Protected from "@/components/Protected";
import Sidebar from "@/components/Sidebar";
import MapContent from "@/components/MapContent";

export default function LocationsPage() {
  return (
    <Protected>
      <div className="flex h-screen">
        {/* Sidebar Left */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <Sidebar />
        </aside>

        {/* Map Content Right */}
        <main className="flex-1">
          <MapContent locations={[]} onAdd={() => {}} />
        </main>
      </div>
    </Protected>
  );
}
