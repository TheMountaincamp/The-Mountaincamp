interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  light?: boolean
}

export default function SectionTitle({ title, subtitle, align = "left", light = false }: SectionTitleProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div className={`mb-12 ${alignClass[align]}`}>
      <h2
        className={`mb-3 text-3xl font-bold uppercase tracking-tight md:text-4xl ${light ? "text-gray-900" : "text-white"}`}
      >
        {title}
      </h2>
      {subtitle && <p className={`text-balance ${light ? "text-gray-600" : "text-white/70"}`}>{subtitle}</p>}
    </div>
  )
}
