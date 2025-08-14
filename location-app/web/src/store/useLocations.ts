"use client";
import { create } from 'zustand';
import { api } from '@/lib/api';

type Loc = { id: number; name: string; latitude: number; longitude: number };

interface State {
  locations: Loc[];
  setLocations: () => Promise<void>;
  addLocation: (item: { name: string; latitude: number; longitude: number }) => Promise<void>;
  addMany: (items: Loc[]) => void;
}

export const useLocations = create<State>((set) => ({
  locations: [],
  setLocations: async () => {
    // Replace this with your actual token retrieval logic
    const token = localStorage.getItem("token") || ""; // e.g., from localStorage, context, or a function
    const res = await api.get('/locations', {
      headers: {
        Authorization: `${token}`
      }
    });
    set({ locations: res.data.locations });
  },
  addLocation: async (item) => {
    const token = localStorage.getItem("token") || "";
    const res = await api.post('/locations', item, {
      headers: {
        Authorization: `${token}`
      }
    });
    set((s) => ({ locations: [...s.locations, res.data.location] }));
  },
  addMany: (items) => set((s) => ({ locations: [...s.locations, ...items] })),
}));
