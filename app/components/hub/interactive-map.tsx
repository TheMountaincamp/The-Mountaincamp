"use client"

import Link from "next/link"
import { Lock, ArrowRight } from "lucide-react"

const REGIONS = {
  salzburg: {
    label: "Salzburg",
    points: "320,210 380,150 430,190 440,240 400,270 330,260",
    labelPos: { x: 375, y: 215 },
    color: "var(--mc-rose)",
    locked: false,
    href: "/community",
    caption: "Community — jetzt buchbar",
  },
  tirol: {
    label: "Tirol",
    points: "200,240 260,200 320,210 330,260 300,300 240,300 210,270",
    labelPos: { x: 255, y: 255 },
    color: "var(--mc-mist)",
    locked: true,
    href: "/performance",
    caption: "Performance — Coming Soon",
  },
  corsica: {
    label: "Corsica",
    points: "150,430 168,440 175,480 165,520 148,500 140,460",
    labelPos: { x: 158, y: 475 },
    color: "var(--mc-sage)",
    locked: true,
    href: "/adventure",
    caption: "Adventure — Coming Soon",
  },
} as const

const CONTEXT_SHAPES = [
  "100,40 320,30 420,60 430,120 380,150 250,140 130,110 90,80",       // Deutschland (Süd)
  "420,60 560,50 600,90 580,140 480,150 430,120",                     // Tschechien
  "90,150 180,130 250,140 260,200 200,240 130,220 90,190",            // Schweiz
  "430,190 480,150 580,140 620,180 600,230 520,260 440,240",          // Rest-Österreich
  "520,260 600,230 630,270 600,310 540,300",                          // Slowenien
  "260,300 300,300 400,270 440,240 460,290 380,340 300,340",          // Italien (Nord)
  "20,150 90,150 90,190 60,260 20,260",                               // Frankreich (Ost-Rand)
]

export function InteractiveMap() {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col items-center">
      <p className="font-oswald uppercase tracking-[0.2em] text-mc-orange text-xs md:text-sm mb-8">
        Wähle deinen Trail
      </p>
      <div className="w-full max-w-3xl px-6">
        <svg viewBox="0 0 900 620" className="w-full h-auto" role="img" aria-label="Karte der Mountaincamp-Regionen">
          {/* Kontext-Länder: neutral, nicht interaktiv */}
          {CONTEXT_SHAPES.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="var(--mc-black)"
              stroke="var(--mc-dust)"
              strokeOpacity={0.18}
              strokeWidth={1}
            />
          ))}

          {/* Hervorgehobene Regionen */}
          {Object.entries(REGIONS).map(([key, region]) => (
            <a key={key} href={region.href} aria-label={`${region.label} — ${region.caption}`}>
              <polygon
                points={region.points}
                fill={region.color}
                fillOpacity={0.18}
                stroke={region.color}
                strokeWidth={2.5}
                className="transition-all duration-300 hover:fill-opacity-35 focus:outline focus:outline-2 focus:outline-mc-orange focus:outline-offset-2"
                style={{ cursor: "pointer" }}
              />
              <text
                x={region.labelPos.x}
                y={region.labelPos.y}
                textAnchor="middle"
                className="font-oswald uppercase pointer-events-none select-none"
                style={{ fill: "var(--mc-white)", fontSize: 15, letterSpacing: "0.05em", fontWeight: 600 }}
              >
                {region.label}
              </text>
              {region.locked ? (
                <foreignObject x={region.labelPos.x - 8} y={region.labelPos.y + 6} width={16} height={16}>
                  <Lock className="w-4 h-4" style={{ color: "var(--mc-dust)" }} />
                </foreignObject>
              ) : (
                <foreignObject x={region.labelPos.x - 8} y={region.labelPos.y + 6} width={16} height={16}>
                  <ArrowRight className="w-4 h-4" style={{ color: "var(--mc-rose)" }} />
                </foreignObject>
              )}
            </a>
          ))}
        </svg>
      </div>

      {/* Legende unter der Karte */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {Object.entries(REGIONS).map(([key, region]) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: region.color }}
            />
            <span className="text-mc-dust">{region.label}</span>
            <span className="text-mc-dust/50">— {region.caption}</span>
          </div>
        ))}
      </div>
    </section>
  )
}