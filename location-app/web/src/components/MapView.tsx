"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Leaflet = dynamic(() => import("./MapViewInner"), { ssr: false });

type LocationDTO = { name: string; latitude: number; longitude: number };

export default function MapView({ locations }: { locations: LocationDTO[] }) {
  return <Leaflet locations={locations} />;
}
