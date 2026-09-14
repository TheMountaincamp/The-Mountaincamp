export function HubHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-mc-orange opacity-10 blur-3xl"
      />
      <div className="container relative flex flex-col gap-6 py-20 md:py-32">
        <p className="font-oswald text-sm font-medium uppercase tracking-[0.2em] text-mc-orange">
          Connected by the Trail.
        </p>
        <h1 className="font-oswald max-w-4xl text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold uppercase leading-[1.15] pt-1 text-mc-white">
          Drei Wege, den Berg zu laufen.
        </h1>
        <p className="max-w-[620px] text-lg leading-relaxed text-mc-dust">
          Mountaincamp ist keine einzelne Veranstaltung mehr — sondern drei Erlebnisse für drei Arten, in den Alpen
          zu laufen. Wähle deins.
        </p>
      </div>
    </section>
  )
}
