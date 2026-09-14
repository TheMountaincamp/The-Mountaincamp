"use client"

import Link from "next/link"
import { Lock, ArrowRight } from "lucide-react"

const REGIONS = {
  salzburg: {
    label: "Salzburg",
    points: "340,220 400,140 460,175 470,225 430,260 350,270",
    labelPos: { x: 400, y: 205 },
    color: "var(--mc-rose)",
    locked: false,
    href: "/community",
    caption: "Community — jetzt buchbar",
  },
  tirol: {
    label: "Tirol",
    points: "270,215 282,205 340,220 350,270 310,310 250,305 225,260",
    labelPos: { x: 295, y: 262 },
    color: "var(--mc-mist)",
    locked: true,
    href: "/performance",
    caption: "Performance — Coming Soon",
  },
  corsica: {
    label: "Corsica",
    points: "200,380 218,390 225,430 212,465 195,450 188,410",
    labelPos: { x: 205, y: 425 },
    color: "var(--mc-sage)",
    locked: true,
    href: "/adventure",
    caption: "Adventure — Coming Soon",
  },
} as const

const CONTEXT_SHAPES = [
  "100,40 340,25 460,55 470,110 400,140 260,135 140,105 90,75",       // Deutschland (Süd)
  "460,55 590,45 630,85 610,135 500,145 470,110",                     // Tschechien
  "90,160 190,140 260,150 270,215 210,255 140,240 95,205",            // Schweiz
  "268,205 280,200 282,218 270,222",                                  // Liechtenstein
  "460,175 500,145 610,135 645,175 625,225 545,255 470,225",          // Rest-Österreich
  "545,255 625,225 655,265 625,305 565,295",                          // Slowenien
  "310,310 430,260 545,255 520,340 480,430 440,520 400,480 420,400 370,350 300,340", // Italien
  "20,160 90,160 95,205 70,280 40,340 15,300",                        // Frankreich (Ost-Rand)
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