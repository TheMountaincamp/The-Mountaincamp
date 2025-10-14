"use client"

import { motion } from "framer-motion"
import { Mountain, TrendingUp, Clock, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function RouteOverviewSection() {
  const { language } = useLanguage()

  const routes = [
    {
      name: language === "de" ? "Einsteiger Trail" : "Beginner Trail",
      distance: "8-12 km",
      elevation: "400-600 m",
      duration: "2-3h",
      description:
        language === "de"
          ? "Perfekt für Trailrunning-Einsteiger. Sanfte Anstiege durch alpine Wälder mit spektakulären Ausblicken auf die österreichischen Alpen."
          : "Perfect for trailrunning beginners. Gentle ascents through alpine forests with spectacular views of the Austrian Alps.",
      icon: <Mountain className="h-8 w-8 text-primary" />,
    },
    {
      name: language === "de" ? "Mittelschwere Route" : "Intermediate Route",
      distance: "15-20 km",
      elevation: "800-1200 m",
      duration: "3-5h",
      description:
        language === "de"
          ? "Abwechslungsreiche Trails durch alpine Landschaften. Technische Passagen kombiniert mit flowigen Singletrails in den Bergen Österreichs."
          : "Varied trails through alpine landscapes. Technical sections combined with flowing singletrails in the Austrian mountains.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
    },
    {
      name: language === "de" ? "Anspruchsvolle Bergtour" : "Challenging Mountain Tour",
      distance: "20-30 km",
      elevation: "1500-2000 m",
      duration: "5-7h",
      description:
        language === "de"
          ? "Für erfahrene Trail Runner. Hochalpine Gipfeltouren mit technischen Trails, steilen Anstiegen und unvergesslichen Panoramen der Alpen."
          : "For experienced trail runners. High alpine summit tours with technical trails, steep ascents and unforgettable Alpine panoramas.",
      icon: <Mountain className="h-8 w-8 text-primary" />,
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            {language === "de" ? "Unsere Alpine Trails" : "Our Alpine Trails"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "de"
              ? "Entdecke die schönsten Trailrunning-Strecken in den österreichischen Alpen. Jeden Tag neue Routen, angepasst an dein Level."
              : "Discover the most beautiful trailrunning routes in the Austrian Alps. New routes every day, adapted to your level."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="mb-6">{route.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{route.name}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold">{route.distance}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold">{route.elevation}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold">{route.duration}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{route.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
            {language === "de" ? "Das alpine Terrain" : "The Alpine Terrain"}
          </h3>
          <p className="text-gray-600 leading-relaxed text-center mb-6">
            {language === "de"
              ? "Hochkrimml liegt auf 1.600m Höhe in den Kitzbüheler Alpen und bietet direkten Zugang zu einem Netzwerk spektakulärer Trailrunning-Strecken. Von sanften Almwegen bis zu technischen Gipfeltrails – die Vielfalt der österreichischen Alpen macht jedes Trailrunning-Erlebnis einzigartig."
              : "Hochkrimml is located at 1,600m altitude in the Kitzbühel Alps and offers direct access to a network of spectacular trailrunning routes. From gentle alpine paths to technical summit trails – the diversity of the Austrian Alps makes every trailrunning experience unique."}
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,600m</div>
              <div className="text-gray-600">{language === "de" ? "Ausgangshöhe" : "Starting Altitude"}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2,500m+</div>
              <div className="text-gray-600">{language === "de" ? "Höchste Gipfel" : "Highest Peaks"}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-gray-600">{language === "de" ? "km Trails" : "km of Trails"}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
