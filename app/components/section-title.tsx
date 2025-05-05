interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
}

export default function SectionTitle({ title, subtitle, align = "left" }: SectionTitleProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div className={`mb-12 ${alignClass[align]}`}>
      <h2 className="mb-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="text-balance text-white/70">{subtitle}</p>}
    </div>
  )
}
