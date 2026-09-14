const values = [
  { title: "3 Formate", subtitle: "Für jedes Level und jedes Ziel" },
  { title: "1 Community", subtitle: "Läufer:innen, die sich auf dem Trail verbinden" },
  { title: "Hochkrimml", subtitle: "Mitten in den Österreichischen Alpen" },
]

export function HubValueStrip() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid grid-cols-1 divide-y divide-mc-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col gap-2 px-0 py-6 text-center md:px-8 md:py-0">
            <p className="font-oswald text-xl font-semibold uppercase text-mc-white">{value.title}</p>
            <p className="text-sm leading-relaxed text-mc-dust/80">{value.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
