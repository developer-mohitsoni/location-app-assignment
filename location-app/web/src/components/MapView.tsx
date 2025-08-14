"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Leaflet = dynamic(() => import("./MapViewInner"), { ssr: false }); // or inline if you already handle SSR

type LocationDTO = { name: string; latitude: number; longitude: number };

export default function MapView({ locations }: { locations: LocationDTO[] }) {
  // just forward; inner component renders MapContainer
  return <Leaflet locations={locations} />;
}
