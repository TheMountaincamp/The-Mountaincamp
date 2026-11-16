// FAQ-Inhalte: werden im FAQ-Bereich angezeigt und für die strukturierten Daten (FAQPage) genutzt.

export interface FAQItem {
  question: string
  answer: string
}

export const faqsDE: FAQItem[] = [
  {
    question: "Für wen ist das Mountaincamp geeignet?",
    answer:
      "Für alle Level, vom ersten Trail bis zu erfahrenen Läufer:innen. Wir laufen täglich in mehreren Gruppen nach Tempo und Erfahrung. Du brauchst eine Grundfitness und Lust auf Laufen in den Bergen.",
  },
  {
    question: "Kann ich als Anfänger:in teilnehmen?",
    answer:
      "Ja. Es gibt Einsteigergruppen mit kürzeren Distanzen und ein Techniktraining für die ersten Schritte im Gelände. Viele Teilnehmende kommen vom Straßenlauf und laufen im Camp zum ersten Mal auf Trails.",
  },
  {
    question: "Kann ich allein anreisen?",
    answer:
      "Ja, die meisten reisen allein oder zu zweit an. Durch die gemeinsame Anreise, die Laufgruppen und die Abende lernst du schnell Leute kennen.",
  },
  {
    question: "Wann und wo findet das Mountaincamp statt?",
    answer:
      "Vom 18. bis 22. August 2027 in Hochkrimml im Salzburger Land, Österreich, auf 1.700 m am Rand des Nationalparks Hohe Tauern.",
  },
  {
    question: "Was ist im Ticket enthalten?",
    answer:
      "4 Nächte im Berghaus, Vollpension, tägliche Trailruns in Gruppen nach Tempo sowie die gemeinsamen Abende mit Lagerfeuer und Summit Rave. Den aktuellen Preis findest du im Ticketbereich.",
  },
  {
    question: "Sind die Workshops im Ticket enthalten?",
    answer:
      "Einige Workshops sind kostenlos, andere kannst du dazubuchen, zum Beispiel Yoga, Töpfern oder den Nutrition Workshop. Das Programm mit allen Workshops bekommst du vor dem Camp.",
  },
  {
    question: "Wie schwierig sind die Trails?",
    answer:
      "Jeden Tag gibt es mehrere Gruppen mit unterschiedlichen Distanzen und Höhenmetern, von entspannten 10 km bis zur Gipfeltour mit 1.500 Höhenmetern. Du wählst jeden Tag neu, was zu dir passt.",
  },
  {
    question: "Wie komme ich zum Mountaincamp?",
    answer:
      "Am einfachsten mit unserem Shuttle: ab Berlin mit Zug und Bus, ab München und Jenbach mit dem Bus. Du kannst auch mit dem Auto anreisen, die gemeinsame Anreise verursacht aber deutlich weniger CO2. Alle Details stehen auf der Seite zur Anreise.",
  },
  {
    question: "Kann ich mein Ticket stornieren?",
    answer:
      "Ja. Innerhalb von 7 Tagen nach der Buchung ist die Stornierung kostenlos, wenn du mindestens 30 Tage vor dem Camp gebucht hast. Danach gelten die Stornobedingungen in unseren AGB.",
  },
  {
    question: "Gibt es vegetarisches und veganes Essen?",
    answer:
      "Ja, bei jeder Mahlzeit. Gib deine Ernährungsweise und Unverträglichkeiten bei der Buchung an, dann plant die Küche damit.",
  },
  {
    question: "Welche Ausrüstung brauche ich?",
    answer:
      "Trailrunning-Schuhe mit Profil, Laufkleidung, eine Laufweste oder einen kleinen Rucksack, Trinkflaschen, Sonnenschutz und eine Regenjacke. Eine Packliste bekommst du nach der Buchung.",
  },
  {
    question: "Was gibt es neben dem Laufen?",
    answer:
      "Nachmittags Recovery und Workshops, abends Programm: Lagerfeuer, Outdoor Movie Night, Karaoke und an einem Abend der Summit Rave. Gegessen wird gemeinsam.",
  },
  {
    question: "Was ist Trailrunning?",
    answer:
      "Trailrunning ist Laufen abseits befestigter Straßen, auf Wegen durch Wald, Wiesen und Berge. Der Untergrund wechselt, es geht bergauf und bergab. Das Tempo ist niedriger als auf der Straße, und bergauf zu gehen gehört dazu.",
  },
  {
    question: "Wie fange ich mit Trailrunning an?",
    answer:
      "Starte mit kurzen, einfachen Wegen in deiner Umgebung und nimm dir Zeit, dich an den Untergrund zu gewöhnen. Wichtig sind Schuhe mit Profil. Im Mountaincamp lernst du in der Einsteigergruppe die Technik für bergauf und bergab.",
  },
  {
    question: "Was muss ich beim Trailrunning in den Bergen beachten?",
    answer:
      "Schuhe mit Grip, genug Wasser, Wetterschutz und ein geladenes Handy. Plane in den Alpen Höhenmeter und Wetter mit ein und schätze deine Fitness realistisch ein. Im Camp laufen wir in Gruppen, niemand ist allein unterwegs.",
  },
]

export const faqsEN: FAQItem[] = [
  {
    question: "Who is the Mountaincamp for?",
    answer:
      "For all levels, from your first trail to experienced runners. We run in several groups every day, sorted by pace and experience. You need a basic level of fitness and the wish to run in the mountains.",
  },
  {
    question: "Can I join as a beginner?",
    answer:
      "Yes. There are beginner groups with shorter distances and a technique session for your first steps on trails. Many participants come from road running and run their first trails at camp.",
  },
  {
    question: "Can I come on my own?",
    answer:
      "Yes, most people come alone or with one friend. The shared journey, the running groups and the evenings make it easy to meet people.",
  },
  {
    question: "When and where does the Mountaincamp take place?",
    answer:
      "From 18 to 22 August 2027 in Hochkrimml, Salzburger Land, Austria, at 1,700 m on the edge of the Hohe Tauern National Park.",
  },
  {
    question: "What is included in the ticket?",
    answer:
      "4 nights in the mountain house, full board, daily trail runs in groups by pace and the evenings together with campfire and summit rave. You find the current price in the ticket section.",
  },
  {
    question: "Are workshops included in the ticket?",
    answer:
      "Some workshops are free, others are bookable add-ons, for example yoga, the clay class or the nutrition workshop. You get the full program before the camp.",
  },
  {
    question: "How difficult are the trails?",
    answer:
      "Every day there are several groups with different distances and elevation, from a relaxed 10 km to a summit tour with 1,500 m of climbing. You choose each day what suits you.",
  },
  {
    question: "How do I get to the Mountaincamp?",
    answer:
      "The easiest way is our shuttle: from Berlin by train and bus, from Munich and Jenbach by bus. You can also come by car, but the shared journey causes far less CO2. All details are on the travel page.",
  },
  {
    question: "Can I cancel my ticket?",
    answer:
      "Yes. Cancellation is free within 7 days of booking if you booked at least 30 days before the camp. After that, the cancellation terms in our terms and conditions apply.",
  },
  {
    question: "Is there vegetarian and vegan food?",
    answer:
      "Yes, at every meal. Tell us your diet and intolerances when you book and the kitchen plans for it.",
  },
  {
    question: "What gear do I need?",
    answer:
      "Trail running shoes with grip, running clothes, a running vest or small backpack, water bottles, sun protection and a rain jacket. You get a packing list after booking.",
  },
  {
    question: "What is there besides running?",
    answer:
      "Recovery and workshops in the afternoon, a program every evening: campfire, outdoor movie night, karaoke and one night the summit rave. We eat together.",
  },
  {
    question: "What is trail running?",
    answer:
      "Trail running is running off paved roads, on paths through forests, meadows and mountains. The ground changes and it goes up and down. The pace is slower than on the road, and walking uphill is part of it.",
  },
  {
    question: "How do I start trail running?",
    answer:
      "Start with short, easy paths near you and take time to get used to the ground. Shoes with grip matter most. At the Mountaincamp you learn uphill and downhill technique in the beginner group.",
  },
  {
    question: "What should I keep in mind when trail running in the mountains?",
    answer:
      "Shoes with grip, enough water, weather protection and a charged phone. In the Alps, plan for elevation and weather and be realistic about your fitness. At camp we run in groups, nobody is out alone.",
  },
]
