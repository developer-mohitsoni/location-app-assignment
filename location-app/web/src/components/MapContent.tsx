"use client";

import { useState } from "react";
import MapView from "@/components/MapView";

type LocationDTO = { id?: number; name: string; latitude: number; longitude: number };

type MapContentProps = {
  locations: LocationDTO[];
  onAdd: (loc: { name: string; latitude: number; longitude: number }) => Promise<void> | void;
};

export default function MapContent({ locations, onAdd }: MapContentProps) {
  const [form, setForm] = useState({ name: "", latitude: "", longitude: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(form.latitude);
    const lng = parseFloat(form.longitude);
    if (!form.name || Number.isNaN(lat) || Number.isNaN(lng)) return;

    await onAdd({ name: form.name.trim(), latitude: lat, longitude: lng });
    setForm({ name: "", latitude: "", longitude: "" });
  };

  return (
    <div className="relative h-full w-full">
      {/* the map fills all available space */}
      <div className="absolute inset-0">
        <MapView locations={locations} />
      </div>

      {/* Floating form (bottom center) */}
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg px-6 py-4 flex flex-wrap gap-4 items-end z-[1000]"
      >
        <div>
          <label className="block text-xs font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Location Name"
            className="border rounded-lg px-3 py-1.5 w-44 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600">Latitude</label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            placeholder="e.g. 3.15"
            className="border rounded-lg px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600">Longitude</label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            placeholder="e.g. 101.71"
            className="border rounded-lg px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Add
        </button>
      </form>
    </div>
  );
}
