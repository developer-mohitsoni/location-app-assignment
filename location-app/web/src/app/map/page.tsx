"use client";

import { useEffect, useState, useCallback } from "react";
import Protected from "@/components/Protected";
import Sidebar from "@/components/Sidebar";
import MapContent from "@/components/MapContent";
import { useLocations } from "@/store/useLocations";

type LocationDTO = { id?: number; name: string; latitude: number; longitude: number };

export default function MapPage() {
  const [locations, setLocations] = useState<LocationDTO[]>([]);
  const API = process.env.NEXT_PUBLIC_API_BASE;

  const fetchLocations = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/locations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        },
      });
      const data = await res.json();
      const list: LocationDTO[] = Array.isArray(data)
        ? data
        : Array.isArray(data.locations)
        ? data.locations
        : Array.isArray(data.data)
        ? data.data
        : [];
      setLocations(
        list.map((l) => ({
          name: l.name,
          latitude: Number(l.latitude),
          longitude: Number(l.longitude),
          id: l.id,
        }))
      );
    } catch (e) {
      console.error("Failed to fetch locations", e);
      setLocations([]);
    }
  }, [API]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleAdd = async (payload: { name: string; latitude: number; longitude: number }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token?.startsWith("Bearer ") ? token : `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Create failed");

      const result = await res.json();
      const loc = result.location || result;
      const formatted: LocationDTO = {
        name: loc.name,
        latitude: Number(loc.latitude),
        longitude: Number(loc.longitude),
        id: loc.id,
      };
      setLocations((prev) => [...prev, formatted]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Protected>
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 shrink-0 border-r bg-white">
          <Sidebar />
        </aside>

        <main className="relative flex-1">
          <MapContent locations={locations} onAdd={handleAdd} />
        </main>
        <UploadForm />
        <div className="absolute bottom-4 right-4 z-[1000]">
        </div>
      </div>
    </Protected>
  );
}

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const { addMany } = useLocations();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setOk(false);
    setErr("");
    if (!file) {
      setErr("Please select a ZIP file");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/locations/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
          body: fd,
        }
      );
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setOk(true);
      addMany(data.locations);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Upload failed");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm p-6 bg-white border rounded space-y-3"
    >
      <div className="text-xl font-bold">Upload Locations (.zip)</div>
      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button className="w-full bg-black text-white py-2 rounded">
        Upload
      </button>
      <div className="text-sm text-gray-600">
        The ZIP must contain exactly one <code>.txt</code> file in the format:
        <br />
        <code>Name, Latitude, Longitude</code>
      </div>
    </form>
  );
}
