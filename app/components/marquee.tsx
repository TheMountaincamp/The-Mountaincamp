"use client"

/** Endlos durchlaufende Zeile mit Programmpunkten (wie bei Love Trails). */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={`${it}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
          <span className="text-sm font-bold uppercase tracking-widest md:text-base">{it}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="overflow-hidden border-y border-[#E3D7C5] bg-white py-3 text-[#B8A07E]">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
