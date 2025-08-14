// MapViewInner.tsx (or your existing file if you don't split)
"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Map } from "leaflet";

// Fix for default icon issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type LocationDTO = { name: string; latitude: number; longitude: number };

export default function MapViewInner({ locations }: { locations: LocationDTO[] }) {
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 400); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, [locations]);

  return (
    <MapContainer
      center={[3.15, 101.71]}
      zoom={13}
      className="h-full w-full"
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations
        .filter(
          (l) =>
            typeof l.latitude === "number" &&
            !Number.isNaN(l.latitude) &&
            typeof l.longitude === "number" &&
            !Number.isNaN(l.longitude)
        )
        .map((loc, i) => (
          <Marker key={loc.name + i} position={[loc.latitude, loc.longitude]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
