"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  address: string;
  city: string;
  initialCoords?: { lat: number; lng: number } | null;
  onConfirm: (coords: { lat: number; lng: number }) => void;
  onClose: () => void;
}

const COLOMBIA: [number, number] = [4.570868, -74.297333];
const ZOOM = 15;

async function geocode(query: string): Promise<[number, number] | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=co`,
      { headers: { "Accept-Language": "es-CO,es" } }
    );
    const data = await res.json();
    if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch { /* ignore */ }
  return null;
}

function goldIcon() {
  return L.divIcon({
    html: `<div style="position:relative;width:32px;height:44px;filter:drop-shadow(0 4px 8px rgba(201,168,76,0.5))">
      <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 28 16 28S32 28 32 16C32 7.16 24.84 0 16 0z" fill="#C9A84C"/>
        <circle cx="16" cy="16" r="8" fill="#080808"/>
        <circle cx="16" cy="16" r="4" fill="#C9A84C"/>
      </svg>
    </div>`,
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    className: "",
  });
}

export default function MapPickerModal({ address, city, initialCoords, onConfirm, onClose }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<[number, number]>(
    initialCoords ? [initialCoords.lat, initialCoords.lng] : COLOMBIA
  );
  const [loading, setLoading] = useState(!initialCoords);
  const [geocodeWarn, setGeocodeWarn] = useState(false);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const startCenter: [number, number] = initialCoords
      ? [initialCoords.lat, initialCoords.lng]
      : COLOMBIA;
    const startZoom = initialCoords ? ZOOM : 6;

    const map = L.map(containerRef.current, {
      center: startCenter,
      zoom: startZoom,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker(startCenter, { draggable: true, icon: goldIcon() }).addTo(map);

    marker.on("dragend", () => {
      const { lat, lng } = marker.getLatLng();
      setCoords([lat, lng]);
    });

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setCoords([lat, lng]);
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Geocode address on first open (only when no initial coords)
  useEffect(() => {
    if (initialCoords) return;
    const query = [address, city, "Colombia"].filter(Boolean).join(", ");
    if (!query.trim()) { setLoading(false); return; }

    geocode(query).then((result) => {
      setLoading(false);
      if (result) {
        setCoords(result);
        mapRef.current?.setView(result, ZOOM);
        markerRef.current?.setLatLng(result);
      } else {
        setGeocodeWarn(true);
        mapRef.current?.setZoom(ZOOM);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "88vh", background: "#111111", border: "1px solid rgba(201,168,76,0.2)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #1E1E1E" }}>
          <div>
            <h3 className="text-[#F5F0E8] font-semibold text-base" style={{ fontFamily: "var(--font-playfair)" }}>
              Confirmar ubicación de entrega
            </h3>
            <p className="text-[#9A8C7A] text-xs mt-0.5">
              Arrastra el pin dorado o haz clic en el mapa para ajustar el punto exacto
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{ color: "#9A8C7A" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1E1E1E"; (e.currentTarget as HTMLElement).style.color = "#F5F0E8"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#9A8C7A"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Address bar */}
        {(address || city) && (
          <div className="px-5 py-2.5 flex items-center gap-2" style={{ background: "#0D0D0D", borderBottom: "1px solid #1E1E1E" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[#9A8C7A] text-xs truncate">
              {[address, city].filter(Boolean).join(", ")}
            </span>
          </div>
        )}

        {/* Map area */}
        <div className="relative flex-1" style={{ minHeight: 380 }}>
          {loading && (
            <div
              className="absolute inset-0 flex items-center justify-center flex-col gap-3"
              style={{ background: "rgba(8,8,8,0.9)", zIndex: 1001 }}
            >
              <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <p className="text-[#9A8C7A] text-xs">Buscando tu dirección en el mapa...</p>
            </div>
          )}
          <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: 380 }} />
        </div>

        {/* Geocode warning */}
        {geocodeWarn && (
          <div className="px-5 py-2.5" style={{ background: "rgba(146,64,14,0.2)", borderTop: "1px solid rgba(251,191,36,0.2)" }}>
            <p className="text-amber-400 text-xs">
              No se encontró la dirección exacta — puedes arrastrar el pin a tu ubicación.
            </p>
          </div>
        )}

        {/* Coords footer */}
        <div className="px-5 py-2.5 flex items-center justify-between" style={{ background: "#0D0D0D", borderTop: "1px solid #1E1E1E" }}>
          <span className="text-[#9A8C7A] text-[11px] font-mono">
            {coords[0].toFixed(6)}, {coords[1].toFixed(6)}
          </span>
          <span className="text-[#9A8C7A] text-[10px]">Haz clic en el mapa para mover el pin</span>
        </div>

        {/* Action buttons */}
        <div className="px-5 py-4 flex gap-3" style={{ borderTop: "1px solid #1E1E1E" }}>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
            style={{ color: "#9A8C7A", background: "#0D0D0D", border: "1px solid #1E1E1E" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F5F0E8"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9A8C7A"; }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm({ lat: coords[0], lng: coords[1] })}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
            style={{ background: "#C9A84C", color: "#080808" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#B8973D"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#C9A84C"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Confirmar ubicación
          </button>
        </div>
      </div>
    </div>
  );
}
