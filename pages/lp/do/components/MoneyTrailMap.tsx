"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Line,
} from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface RouteConfig {
  from:      [number, number]; // [lng, lat]
  to:        [number, number];
  name:      string;           // "Linda H."
  context:   string;           // "Retired Teacher, IL"
  fromCity:  string;
  toCity:    string;
  savings:   number;           // 0 = full price
  saved:     boolean;
}

const ROUTES: RouteConfig[] = [
  {
    from: [-73.8, 40.6], to: [2.3, 48.9],
    name: "M. Wilson",   context: "Financial Advisor, NY",
    fromCity: "New York", toCity: "Paris",
    savings: 0, saved: false,
  },
  {
    from: [-73.8, 40.6], to: [-0.5, 51.5],
    name: "T. Allen",    context: "Corporate Traveler, CT",
    fromCity: "New York", toCity: "London",
    savings: 0, saved: false,
  },
  {
    from: [-118.4, 33.9], to: [2.3, 48.9],
    name: "Linda H.",    context: "Retired Teacher, IL",
    fromCity: "Los Angeles", toCity: "Paris",
    savings: 840, saved: true,
  },
  {
    from: [-80.3, 25.8], to: [-0.5, 51.5],
    name: "S. Chen",     context: "Small Business Owner, FL",
    fromCity: "Miami", toCity: "London",
    savings: 960, saved: true,
  },
  {
    from: [-118.4, 33.9], to: [140.4, 35.8],
    name: "R. Kim",      context: "Healthcare Worker, CA",
    fromCity: "Los Angeles", toCity: "Tokyo",
    savings: 780, saved: true,
  },
  {
    from: [-73.8, 40.6], to: [151.2, -33.9],
    name: "C. White",    context: "Travel Blogger, NY",
    fromCity: "New York", toCity: "Sydney",
    savings: 1120, saved: true,
  },
];

const CITIES = [
  { coords: [-73.8, 40.6]  as [number, number], label: "New York",     anchor: "end"    as const },
  { coords: [2.3, 48.9]    as [number, number], label: "Paris",        anchor: "middle" as const },
  { coords: [-0.5, 51.5]   as [number, number], label: "London",       anchor: "start"  as const },
  { coords: [140.4, 35.8]  as [number, number], label: "Tokyo",        anchor: "start"  as const },
  { coords: [151.2, -33.9] as [number, number], label: "Sydney",       anchor: "start"  as const },
  { coords: [-118.4, 33.9] as [number, number], label: "Los Angeles",  anchor: "end"    as const },
  { coords: [-80.3, 25.8]  as [number, number], label: "Miami",        anchor: "end"    as const },
];

function toRad(d: number) { return d * Math.PI / 180; }
function toDeg(r: number) { return r * 180 / Math.PI; }

function greatCirclePoints(
  from: [number, number],
  to:   [number, number],
  n = 60,
): [number, number][] {
  const lng1 = toRad(from[0]), lat1 = toRad(from[1]);
  const lng2 = toRad(to[0]),   lat2 = toRad(to[1]);
  const d = Math.acos(
    Math.max(-1, Math.min(1,
      Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1),
    )),
  );
  if (d < 0.0001) return [from, to];
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const A = Math.sin((1 - t) * d) / Math.sin(d);
    const B = Math.sin(t * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
    const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    pts.push([toDeg(Math.atan2(y, x)), toDeg(Math.atan2(z, Math.sqrt(x * x + y * y)))]);
  }
  return pts;
}

function arcMid(from: [number, number], to: [number, number]): [number, number] {
  return greatCirclePoints(from, to, 2)[1];
}

export default function MoneyTrailMap() {
  const [zoom, setZoom]     = useState(1);
  const [center, setCenter] = useState<[number, number]>([10, 25]);

  return (
    <section className="w-full bg-cream py-20 border-t border-dashed border-[#D4CEC6]">
      <div className="max-w-[1200px] mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-text-muted opacity-70 mb-3">
            Real routes. Real savings.
          </p>
          <h2 className="text-[42px] sm:text-[48px] font-bold text-text-primary leading-tight mb-3">
            Same flights. Different prices.
          </h2>
          <p className="text-[17px] text-text-muted leading-relaxed max-w-[480px] mx-auto">
            See how everyday people save on international flights — traced city to city.
          </p>
        </div>

        {/* Map */}
        <div className="w-full rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm relative">

          {/* Zoom buttons */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
            <button
              onClick={() => setZoom((z) => Math.min(z * 1.5, 10))}
              className="w-8 h-8 bg-white border border-[#E8E2D9] rounded-lg text-gray-600 hover:bg-gray-50 text-[18px] font-medium flex items-center justify-center shadow-sm"
            >+</button>
            <button
              onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}
              className="w-8 h-8 bg-white border border-[#E8E2D9] rounded-lg text-gray-600 hover:bg-gray-50 text-[18px] font-medium flex items-center justify-center shadow-sm"
            >−</button>
            {zoom > 1 && (
              <button
                onClick={() => { setZoom(1); setCenter([10, 25]); }}
                className="w-8 h-8 bg-white border border-[#E8E2D9] rounded-lg text-gray-400 hover:text-gray-600 text-[10px] font-medium flex items-center justify-center shadow-sm"
                title="Reset"
              >↺</button>
            )}
          </div>

          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 155, center: [10, 10] }}
            height={420}
            style={{ width: "100%", height: "auto", background: "#D6E8F5" }}
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              onMoveEnd={({ coordinates, zoom: z }) => {
                setCenter(coordinates as [number, number]);
                setZoom(z);
              }}
            >
              {/* Land */}
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#EDE8E0"
                      stroke="#D4CEC6"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover:   { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Flight arcs */}
              {ROUTES.map((r) => (
                <Line
                  key={`arc-${r.name}`}
                  coordinates={greatCirclePoints(r.from, r.to)}
                  stroke={r.saved ? "#1B2A4A" : "#C8BFB0"}
                  strokeWidth={r.saved ? 1.5 / zoom : 1 / zoom}
                  strokeDasharray={r.saved ? undefined : `${4 / zoom} ${3 / zoom}`}
                  opacity={r.saved ? 0.9 : 0.6}
                  strokeLinecap="round"
                />
              ))}

              {/* Mid-arc labels */}
              {ROUTES.map((r) => {
                const mid = arcMid(r.from, r.to);
                const s   = 1 / zoom;
                const W   = 86;   // card half-width
                const H   = 38;   // card height
                const borderColor = r.saved ? "#1B2A4A" : "#D4CEC6";

                return (
                  <Marker key={`lbl-${r.name}`} coordinates={mid}>
                    <g transform={`scale(${s})`}>

                      {/* Card shadow */}
                      <rect
                        x={-W / 2 + 1} y={-(H + 6)}
                        width={W} height={H} rx={4}
                        fill="rgba(0,0,0,0.08)"
                      />
                      {/* Card background */}
                      <rect
                        x={-W / 2} y={-(H + 8)}
                        width={W} height={H} rx={4}
                        fill="white" opacity={0.97}
                        stroke={borderColor} strokeWidth={0.8}
                      />

                      {/* Line 1 — name + lifestyle */}
                      <text
                        textAnchor="middle"
                        y={-(H + 8) + 10}
                        fontSize={4.5}
                        fill="#9A8F82"
                        fontFamily="sans-serif"
                      >
                        {r.name} · {r.context}
                      </text>

                      {/* Line 2 — route */}
                      <text
                        textAnchor="middle"
                        y={-(H + 8) + 22}
                        fontSize={5.5}
                        fontWeight="600"
                        fill={r.saved ? "#1B2A4A" : "#9A8F82"}
                        fontFamily="sans-serif"
                      >
                        {r.fromCity} → {r.toCity}
                      </text>

                      {/* Line 3 — savings or full price */}
                      <text
                        textAnchor="middle"
                        y={-(H + 8) + 33}
                        fontSize={6}
                        fontWeight="700"
                        fill={r.saved ? "#16A34A" : "#C8BFB0"}
                        fontFamily="monospace"
                      >
                        {r.saved
                          ? `Saved $${r.savings.toLocaleString()}`
                          : "Paid full price"}
                      </text>

                      {/* Pointer tick down to arc */}
                      <line x1={0} y1={-8} x2={0} y2={0}
                        stroke={borderColor} strokeWidth={0.8} />
                      <circle r={1.5} fill={borderColor} />

                    </g>
                  </Marker>
                );
              })}

              {/* City dots + labels */}
              {CITIES.map((c) => {
                const s  = 1 / zoom;
                const dx = c.anchor === "end" ? -8 : c.anchor === "start" ? 8 : 0;
                return (
                  <Marker key={c.label} coordinates={c.coords}>
                    <g transform={`scale(${s})`}>
                      <circle r={4} fill="white" stroke="#1B2A4A" strokeWidth={1.5} />
                      <text
                        x={dx}
                        y={13}
                        textAnchor={c.anchor}
                        fontSize={7.5}
                        fill="#6B6259"
                        fontFamily="sans-serif"
                        fontWeight={500}
                      >
                        {c.label}
                      </text>
                    </g>
                  </Marker>
                );
              })}

            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Hint + Legend */}
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-[11px] text-text-muted opacity-50">Drag to pan · scroll or +/− to zoom</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="24" height="8">
                <line x1="0" y1="4" x2="24" y2="4" stroke="#C8BFB0" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
              <span className="text-[11px] text-text-muted">Paid full price</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="24" height="8">
                <line x1="0" y1="4" x2="24" y2="4" stroke="#1B2A4A" strokeWidth="1.5" />
              </svg>
              <span className="text-[11px] text-text-muted">Saved with Capital One Shopping</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
