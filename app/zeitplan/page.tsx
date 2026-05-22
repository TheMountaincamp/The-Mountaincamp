'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/language-context'
import SiteHeader from '@/app/components/site-header'

export default function ZeitplanPage() {
  const [lang, setLang] = useState('de')
  const containerRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    setLang(language === 'en' ? 'en' : 'de')
  }, [language])

  const T = {
    de: {
      eyebrow: 'The Mountaincamp 2026',
      title: 'Programm &amp; Schedule',
      subtitle: '5.–9. August 2026 &nbsp;·&nbsp; Hochkrimml, Österreich &nbsp;·&nbsp; 1.700 m',
      footnote: 'Preise in € pro Person &nbsp;·&nbsp; Alle Zeiten in Ortszeit &nbsp;·&nbsp; Stand Mai 2026',
      legend: [
        ['trail-a1', 'Anfänger'],
        ['trail-a2', 'Anfänger (2. Gruppe)'],
        ['trail-b', 'Fortgeschritten'],
        ['trail-c', 'Profi'],
        ['workshop', 'Workshop / Aktivität'],
        ['kanu-gr1', 'Kanu Gr. 1'],
        ['kanu-gr2', 'Kanu Gr. 2'],
        ['kanu-weg', 'An- / Rückweg'],
        ['sunrise-bl', 'Sunrise Hike'],
        ['dinner-bl', 'Dinner'],
        ['evening-bl', 'Abendprogramm'],
      ],
    },
    en: {
      eyebrow: 'The Mountaincamp 2026',
      title: 'Programme &amp; Schedule',
      subtitle: '5–9 August 2026 &nbsp;·&nbsp; Hochkrimml, Austria &nbsp;·&nbsp; 1,700 m',
      footnote: 'Prices in € per person &nbsp;·&nbsp; All times local &nbsp;·&nbsp; As of May 2026',
      legend: [
        ['trail-a1', 'Beginner'],
        ['trail-a2', 'Beginner (2nd group)'],
        ['trail-b', 'Intermediate'],
        ['trail-c', 'Pro'],
        ['workshop', 'Workshop / Activity'],
        ['kanu-gr1', 'Kayak Group 1'],
        ['kanu-gr2', 'Kayak Group 2'],
        ['kanu-weg', 'Transfer'],
        ['sunrise-bl', 'Sunrise Hike'],
        ['dinner-bl', 'Dinner'],
        ['evening-bl', 'Evening Program'],
      ],
    },
  }

  const DAYS = [
    {
      key: 'mi',
      date: '5. Aug',
      label: { de: 'Mi', en: 'Wed' },
      sublabel: { de: 'Anreise', en: 'Arrival' },
      timeStart: 6,
      timeEnd: 19.5,
      cols: null,
      blocks: [
        { from: 6, to: 12.5, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Zug Berlin → München', s: 'ab 6:36 · Ankunft 10:45', p: '' }, en: { n: 'Train Berlin → Munich', s: 'dep. 6:36 · arr. 10:45', p: '' } },
        { from: 12.5, to: 16.5, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Bus München → Hochkrimml (Zwischenstopp Jenbach 14:30 Uhr)', s: 'ab 12:30 · Ankunft 16:30', p: '' }, en: { n: 'Bus Munich → Hochkrimml (stopover Jenbach 14:30)', s: 'dep. 12:30 · arr. 16:30', p: '' } },
        { from: 16.5, to: 18, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Check-in', s: '', p: '' }, en: { n: 'Check-in', s: '', p: '' } },
        { from: 18, to: 18.5, col: 0, cls: 'shared-bl', span: 1, de: { n: 'Welcome & Ablauf', s: '18:00–18:30', p: '' }, en: { n: 'Welcome & Overview', s: '6:00–6:30 pm', p: '' } },
        { from: 18.5, to: 19.5, col: 0, cls: 'dinner-bl', span: 1, de: { n: 'Dinner', s: '18:30–19:15', p: '' }, en: { n: 'Dinner', s: '6:30–7:15 pm', p: '' } },
      ],
    },
    {
      key: 'do',
      date: '6. Aug',
      label: { de: 'Do', en: 'Thu' },
      sublabel: { de: '', en: '' },
      timeStart: 6.5,
      timeEnd: 22,
      cols: { de: ['Anfänger', 'Anfänger Gr. 2', 'Fortgeschritten', 'Profi'], en: ['Beginner', 'Beginner Gr. 2', 'Intermediate', 'Pro'] },
      colCls: ['trail-a1', 'trail-a2', 'trail-b', 'trail-c'],
      blocks: [
        { from: 6.5, to: 7.5, col: 0, cls: 'yoga-bl', span: 4, de: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' }, en: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' } },
        { from: 7.5, to: 8.25, col: 0, cls: 'shared-bl', span: 4, de: { n: 'Frühstück', s: '7:30–8:15', p: '' }, en: { n: 'Breakfast', s: '7:30–8:15', p: '' } },
        { from: 8.25, to: 8.5, col: 0, cls: 'shared-bl', span: 4, de: { n: 'Treffpunkt & Briefing', s: '8:15–8:30', p: '' }, en: { n: 'Meeting Point & Briefing', s: '8:15–8:30', p: '' } },
        { from: 8.5, to: 10.5, col: 0, cls: 'trail-a1', span: 1, de: { n: 'Trailrunning Technik Kurs', s: '8:30–10:30', p: '28€' }, en: { n: 'Trailrunning Technique', s: '8:30–10:30', p: '28€' } },
        { from: 8.5, to: 10.5, col: 1, cls: 'trail-a2', span: 1, de: { n: 'Krafttraining für Läufer*innen', s: '8:30–10:30', p: 'Free' }, en: { n: 'Strength Training for Runners', s: '8:30–10:30', p: 'Free' } },
        { from: 8.5, to: 12.5, col: 2, cls: 'trail-b', span: 1, de: { n: 'Trail Run Fortgeschritten', s: '11–17 km', p: '' }, en: { n: 'Trail Run Intermediate', s: '11–17 km', p: '' } },
        { from: 8.5, to: 14, col: 3, cls: 'trail-c', span: 1, de: { n: 'Trail Run Profi', s: '17+ km · 800+ hm', p: '' }, en: { n: 'Trail Run Pro', s: '17+ km · 800+ hm', p: '' } },
        { from: 10.5, to: 12.5, col: 0, cls: 'trail-a1', span: 1, de: { n: 'Krafttraining für Läufer*innen', s: '10:30–12:30', p: 'Free' }, en: { n: 'Strength Training for Runners', s: '10:30–12:30', p: 'Free' } },
        { from: 10.5, to: 12.5, col: 1, cls: 'trail-a2', span: 1, de: { n: 'Trailrunning Technik Kurs', s: '10:30–12:30', p: '28€' }, en: { n: 'Trailrunning Technique', s: '10:30–12:30', p: '28€' } },
        { from: 12.5, to: 13.25, col: 0, cls: 'shared-bl', span: 4, de: { n: 'Mittagessen', s: '12:30–13:15', p: '' }, en: { n: 'Lunch', s: '12:30–13:15', p: '' } },
        { from: 13.5, to: 14, col: 0, cls: 'kanu-weg', span: 1, de: { n: 'Anfahrt See', s: '30 Min', p: '' }, en: { n: 'Transfer to Lake', s: '30 min', p: '' } },
        { from: 14, to: 15.5, col: 0, cls: 'kanu-gr1', span: 1, de: { n: 'Kanu Gr. 1', s: '14:00–15:30', p: '23€' }, en: { n: 'Kayaking Group 1', s: '2:00–3:30 pm', p: '23€' } },
        { from: 15.5, to: 16.25, col: 0, cls: 'kanu-weg', span: 1, de: { n: 'Rückweg', s: '45 Min', p: '' }, en: { n: 'Return', s: '45 min', p: '' } },
        { from: 15, to: 15.5, col: 1, cls: 'kanu-weg', span: 1, de: { n: 'Anfahrt See', s: '30 Min', p: '' }, en: { n: 'Transfer to Lake', s: '30 min', p: '' } },
        { from: 15.5, to: 17, col: 1, cls: 'kanu-gr2', span: 1, de: { n: 'Kanu Gr. 2', s: '15:30–17:00', p: '23€' }, en: { n: 'Kayaking Group 2', s: '3:30–5:00 pm', p: '23€' } },
        { from: 17, to: 17.75, col: 1, cls: 'kanu-weg', span: 1, de: { n: 'Rückweg', s: '45 Min', p: '' }, en: { n: 'Return', s: '45 min', p: '' } },
        { from: 13.5, to: 17, col: 2, cls: 'workshop', span: 1, de: { n: 'Linoleum-Druck', s: '13:30–17:00', p: '15€' }, en: { n: 'Linocut Printing', s: '1:30–5:00 pm', p: '15€' } },
        { from: 16.5, to: 18.5, col: 3, cls: 'workshop', span: 1, de: { n: 'Ernährungsworkshop', s: '16:30–18:30', p: '28€' }, en: { n: 'Nutrition Workshop', s: '4:30–6:30 pm', p: '28€' } },
        { from: 19.5, to: 21.5, col: 0, cls: 'evening-bl', span: 4, de: { n: 'Outdoormovie Night + Speakers Event', s: '', p: '' }, en: { n: 'Outdoor Movie Night + Speakers Event', s: '', p: '' } },
      ],
    },
    {
      key: 'fr',
      date: '7. Aug',
      label: { de: 'Fr', en: 'Fri' },
      sublabel: { de: '', en: '' },
      timeStart: 5,
      timeEnd: 22,
      cols: { de: ['Anfänger', 'Fortgeschritten', 'Profi'], en: ['Beginner', 'Intermediate', 'Pro'] },
      colCls: ['trail-a1', 'trail-b', 'trail-c'],
      blocks: [
        { from: 5, to: 6.5, col: 0, cls: 'sunrise-bl', span: 3, de: { n: 'Sunrise Hike', s: '5:00–6:30', p: '' }, en: { n: 'Sunrise Hike', s: '5:00–6:30', p: '' } },
        { from: 6.5, to: 7.5, col: 0, cls: 'yoga-bl', span: 3, de: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' }, en: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' } },
        { from: 7.5, to: 8.25, col: 0, cls: 'shared-bl', span: 3, de: { n: 'Frühstück', s: '7:30–8:15', p: '' }, en: { n: 'Breakfast', s: '7:30–8:15', p: '' } },
        { from: 8.25, to: 8.5, col: 0, cls: 'shared-bl', span: 3, de: { n: 'Treffpunkt & Briefing', s: '8:15–8:30', p: '' }, en: { n: 'Meeting Point & Briefing', s: '8:15–8:30', p: '' } },
        { from: 8.5, to: 12.5, col: 0, cls: 'trail-a1', span: 1, de: { n: 'Trail Run Anfänger', s: '8–13 km', p: '' }, en: { n: 'Trail Run Beginner', s: '8–13 km', p: '' } },
        { from: 8.5, to: 12.5, col: 1, cls: 'trail-b', span: 1, de: { n: 'Trail Run Fortgeschritten', s: '11–17 km', p: '' }, en: { n: 'Trail Run Intermediate', s: '11–17 km', p: '' } },
        { from: 8.5, to: 14, col: 2, cls: 'trail-c', span: 1, de: { n: 'Trail Run Profi', s: '17+ km', p: '' }, en: { n: 'Trail Run Pro', s: '17+ km', p: '' } },
        { from: 12.5, to: 13.25, col: 0, cls: 'shared-bl', span: 3, de: { n: 'Mittagessen', s: '12:30–13:15', p: '' }, en: { n: 'Lunch', s: '12:30–13:15', p: '' } },
        { from: 13.5, to: 15.5, col: 0, cls: 'workshop', span: 1, de: { n: 'Kletterkurs 1', s: '13:30–15:30', p: '38€' }, en: { n: 'Climbing Course 1', s: '1:30–3:30 pm', p: '38€' } },
        { from: 15.75, to: 17.75, col: 0, cls: 'workshop', span: 1, de: { n: 'Kletterkurs 2', s: '15:45–17:45', p: '38€' }, en: { n: 'Climbing Course 2', s: '3:45–5:45 pm', p: '38€' } },
        { from: 13.5, to: 15.5, col: 1, cls: 'workshop', span: 1, de: { n: 'Bogenschießen', s: '13:30–15:30', p: '21€' }, en: { n: 'Archery', s: '1:30–3:30 pm', p: '21€' } },
        { from: 17, to: 18.5, col: 1, cls: 'workshop', span: 1, de: { n: 'Krafttraining Workshop', s: '17:00–18:30', p: '28€' }, en: { n: 'Strength Training Workshop', s: '5:00–6:30 pm', p: '28€' } },
        { from: 13.5, to: 15.5, col: 2, cls: 'workshop', span: 1, de: { n: 'Upcycling 1', s: '13:30–15:30', p: '15€' }, en: { n: 'Upcycling 1', s: '1:30–3:30 pm', p: '15€' } },
        { from: 15.5, to: 17.5, col: 2, cls: 'workshop', span: 1, de: { n: 'Upcycling 2', s: '15:30–17:30', p: '15€' }, en: { n: 'Upcycling 2', s: '3:30–5:30 pm', p: '15€' } },
        { from: 19.5, to: 21.5, col: 0, cls: 'evening-bl', span: 3, de: { n: 'Lagerfeuerabend', s: '', p: '' }, en: { n: 'Campfire Evening', s: '', p: '' } },
      ],
    },
    {
      key: 'sa',
      date: '8. Aug',
      label: { de: 'Sa', en: 'Sat' },
      sublabel: { de: '', en: '' },
      timeStart: 6.5,
      timeEnd: 22,
      cols: { de: ['Anfänger', 'Fortgeschritten', 'Profi'], en: ['Beginner', 'Intermediate', 'Pro'] },
      colCls: ['trail-a1', 'trail-b', 'trail-c'],
      blocks: [
        { from: 6.5, to: 7.5, col: 0, cls: 'yoga-bl', span: 3, de: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' }, en: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' } },
        { from: 7.5, to: 8.25, col: 0, cls: 'shared-bl', span: 3, de: { n: 'Frühstück', s: '7:30–8:15', p: '' }, en: { n: 'Breakfast', s: '7:30–8:15', p: '' } },
        { from: 8.25, to: 8.5, col: 0, cls: 'shared-bl', span: 3, de: { n: 'Treffpunkt & Briefing', s: '8:15–8:30', p: '' }, en: { n: 'Meeting Point & Briefing', s: '8:15–8:30', p: '' } },
        { from: 8.5, to: 12.5, col: 0, cls: 'trail-a1', span: 1, de: { n: 'Trail Run Anfänger', s: '8–13 km', p: '' }, en: { n: 'Trail Run Beginner', s: '8–13 km', p: '' } },
        { from: 8.5, to: 12.5, col: 1, cls: 'trail-b', span: 1, de: { n: 'Trail Run Fortgeschritten', s: '11–17 km', p: '' }, en: { n: 'Trail Run Intermediate', s: '11–17 km', p: '' } },
        { from: 8.5, to: 14, col: 2, cls: 'trail-c', span: 1, de: { n: 'Trail Run Profi', s: '17+ km', p: '' }, en: { n: 'Trail Run Pro', s: '17+ km', p: '' } },
        { from: 12.5, to: 13.25, col: 0, cls: 'shared-bl', span: 3, de: { n: 'Mittagessen', s: '12:30–13:15', p: '' }, en: { n: 'Lunch', s: '12:30–13:15', p: '' } },
        { from: 13.5, to: 14, col: 0, cls: 'kanu-weg', span: 1, de: { n: 'Anfahrt', s: '30 Min', p: '' }, en: { n: 'Transfer', s: '30 min', p: '' } },
        { from: 14, to: 16.25, col: 0, cls: 'workshop', span: 1, de: { n: 'MTB-Tour', s: '14:00–16:15', p: '25€' }, en: { n: 'MTB Tour', s: '2:00–4:15 pm', p: '25€' } },
        { from: 16.25, to: 16.75, col: 0, cls: 'kanu-weg', span: 1, de: { n: 'Rückfahrt', s: '30 Min', p: '' }, en: { n: 'Return', s: '30 min', p: '' } },
        { from: 13.5, to: 15, col: 2, cls: 'workshop', span: 1, de: { n: 'Töpfern', s: '13:30–15:00', p: '15€' }, en: { n: 'Pottery', s: '1:30–3:00 pm', p: '15€' } },
        { from: 15.25, to: 16.75, col: 2, cls: 'workshop', span: 1, de: { n: 'Töpfern', s: '15:15–16:45', p: '15€' }, en: { n: 'Pottery', s: '3:15–4:45 pm', p: '15€' } },
        { from: 19.5, to: 21.5, col: 0, cls: 'evening-bl', span: 3, de: { n: 'Abschlussabend', s: '', p: '' }, en: { n: 'Closing Evening', s: '', p: '' } },
      ],
    },
    {
      key: 'so',
      date: '9. Aug',
      label: { de: 'So', en: 'Sun' },
      sublabel: { de: 'Abreise', en: 'Departure' },
      timeStart: 5,
      timeEnd: 22,
      cols: null,
      blocks: [
        { from: 5, to: 6.5, col: 0, cls: 'sunrise-bl', span: 1, de: { n: 'Sunrise Hike', s: '5:00–6:30', p: '' }, en: { n: 'Sunrise Hike', s: '5:00–6:30', p: '' } },
        { from: 6.5, to: 7.5, col: 0, cls: 'yoga-bl', span: 1, de: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' }, en: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' } },
        { from: 7.5, to: 8.25, col: 0, cls: 'shared-bl', span: 1, de: { n: 'Frühstück', s: '7:30–8:15', p: '' }, en: { n: 'Breakfast', s: '7:30–8:15', p: '' } },
        { from: 8.25, to: 11, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Bus Hochkrimml → Jenbach', s: 'ab 8:30', p: '' }, en: { n: 'Bus Hochkrimml → Jenbach', s: 'dep. 8:30', p: '' } },
        { from: 11, to: 12.75, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Bus Jenbach → München', s: 'Ankunft Jenbach ~11:00', p: '' }, en: { n: 'Bus Jenbach → Munich', s: 'arr. Jenbach ~11:00', p: '' } },
        { from: 12.75, to: 14.35, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Wartezeit München', s: 'Ankunft München 12:30–13:00', p: '' }, en: { n: 'Waiting time Munich', s: 'arr. Munich 12:30–13:00', p: '' } },
        { from: 14.35, to: 22, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Zug München → Berlin', s: 'Abfahrt 14:21', p: '' }, en: { n: 'Train Munich → Berlin', s: 'dep. 14:21', p: '' } },
      ],
    },
  ]

  const PPM = 1.8
  const TIME_W = 46
  const COL_GAP = 3
  const MIN_COL_W = 88

  function fmtTime(h: number) {
    const hrs = Math.floor(h)
    const mins = Math.round((h - hrs) * 60)
    return hrs + ':' + String(mins).padStart(2, '0')
  }

  const [activeDay, setActiveDay] = useState('mi')
  const t = T[lang as keyof typeof T]
  const day = DAYS.find((d) => d.key === activeDay) || DAYS[0]

  useEffect(() => {
    if (!containerRef.current) return

    const multiCol = day.cols && day.cols.de.length > 1
    const numCols = multiCol ? day.cols.de.length : 1
    const containerW = containerRef.current.clientWidth || 760
    const colAreaW = containerW - TIME_W
    const rawColW = multiCol ? Math.floor((colAreaW - (numCols - 1) * COL_GAP) / numCols) : colAreaW
    const colW = Math.max(MIN_COL_W, rawColW)
    const totalW = TIME_W + numCols * colW + (numCols - 1) * COL_GAP
    const totalMin = Math.round((day.timeEnd - day.timeStart) * 60)
    const gridH = totalMin * PPM

    const renderDay = () => {
      if (!containerRef.current) return
      containerRef.current.innerHTML = ''

      // Column header row
      if (multiCol) {
        const hdr = document.createElement('div')
        hdr.style.cssText = `display:flex;align-items:center;margin-bottom:10px;padding-bottom:10px;border-bottom:1.5px solid var(--border);`
        const spacer = document.createElement('div')
        spacer.style.cssText = `width:${TIME_W}px;flex-shrink:0;`
        hdr.appendChild(spacer)

        ;(day.cols as any)[lang].forEach((label: string, i: number) => {
          const cell = document.createElement('div')
          cell.style.cssText = `flex-shrink:0;font-size:11px;font-weight:600;text-align:center;padding:4px 8px;border-radius:5px;width:${colW}px;${i > 0 ? 'margin-left:' + COL_GAP + 'px;' : ''}`
          if ((day.colCls as any)?.[i]) {
            cell.className = (day.colCls as any)[i]
          }
          cell.textContent = label
          hdr.appendChild(cell)
        })
        containerRef.current.appendChild(hdr)
      }

      // Scroll wrapper
      const scrollEl = document.createElement('div')
      scrollEl.style.cssText = `overflow-x:auto;-webkit-overflow-scrolling:touch;`
      containerRef.current.appendChild(scrollEl)

      // Canvas
      const canvas = document.createElement('div')
      canvas.style.cssText = `position:relative;width:${totalW}px;height:${gridH}px;`
      scrollEl.appendChild(canvas)

      // Grid lines + time labels
      for (let m = 0; m <= totalMin; m += 30) {
        const y = m * PPM
        const h = day.timeStart + m / 60
        const isHour = m % 60 === 0

        const line = document.createElement('div')
        line.style.cssText = `position:absolute;top:${y}px;left:${TIME_W}px;right:0;height:1px;background:${isHour ? '#E5E2DC' : '#F0EDE8'};`
        canvas.appendChild(line)

        const lbl = document.createElement('div')
        lbl.style.cssText = `position:absolute;top:${y}px;left:0;width:${TIME_W - 6}px;font-size:10px;color:#A09890;text-align:right;transform:translateY(-50%);line-height:1;white-space:nowrap;font-family:var(--font);`
        lbl.textContent = fmtTime(h)
        canvas.appendChild(lbl)
      }

      // Activity blocks
      day.blocks.forEach((bl) => {
        const txt = (bl as any)[lang] || bl.de
        const top = (bl.from - day.timeStart) * 60 * PPM
        const height = (bl.to - bl.from) * 60 * PPM
        const left = TIME_W + bl.col * (colW + COL_GAP)
        const width = bl.span * colW + (bl.span - 1) * COL_GAP

        const div = document.createElement('div')
        div.style.cssText = `position:absolute;top:${top + 1}px;left:${left + 1}px;width:${width - 2}px;height:${height - 2}px;border-radius:7px;padding:5px 7px;overflow:hidden;`

        const colorMap: Record<string, string> = {
          'trail-a1': 'background:#E1F5EE;color:#085041;',
          'trail-a2': 'background:#9FE1CB;color:#04342C;',
          'trail-b': 'background:#FAEEDA;color:#633806;',
          'trail-c': 'background:#EEEDFE;color:#3C3489;',
          'workshop': 'background:#F1EFE8;color:#2C2C2A;',
          'kanu-gr1': 'background:#378ADD;color:#E6F1FB;',
          'kanu-gr2': 'background:#85B7EB;color:#042C53;',
          'kanu-weg': 'background:#B5D4F4;color:#0C447C;',
          'shared-bl': 'background:#EDECEA;color:#4A4A47;',
          'travel-bl': 'background:#F1EFE8;color:#5F5E5A;',
          'yoga-bl': 'background:#9FE1CB;color:#04342C;',
          'sunrise-bl': 'background:#FAD36B;color:#5C3A00;',
          'dinner-bl': 'background:#534AB7;color:#CECBF6;',
          'evening-bl': 'background:#3C3489;color:#CECBF6;',
        }

        div.style.cssText += colorMap[bl.cls] || ''

        let html = txt.n ? `<div style="font-size:11px;font-weight:600;line-height:1.25;">${txt.n}</div>` : ''
        if (txt.s) html += `<div style="font-size:10px;opacity:0.72;margin-top:2px;line-height:1.2;">${txt.s}</div>`
        if (txt.p) html += `<div style="font-size:10px;font-weight:700;opacity:0.88;margin-top:2px;">${txt.p}</div>`
        div.innerHTML = html
        if (txt.s) div.title = txt.n + ' · ' + txt.s

        canvas.appendChild(div)
      })
    }

    renderDay()
  }, [activeDay, lang, day])

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', background: '#FFFFFF', color: '#181816' }}>
      <SiteHeader />
      <style>{`
        :root {
          --bg: #FFFFFF;
          --bg-2: #F7F6F3;
          --text-1: #181816;
          --text-2: #6B6961;
          --text-3: #A09890;
          --border: #E5E2DC;
          --border-lt: #F0EDE8;
          --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>

      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '56px 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '10px' }} dangerouslySetInnerHTML={{ __html: t.eyebrow }} />
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--text-1)', marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: t.title }} />
            <p style={{ fontSize: '14px', color: 'var(--text-2)' }} dangerouslySetInnerHTML={{ __html: t.subtitle }} />
          </div>
          <div style={{ display: 'flex', gap: '4px', padding: '3px', borderRadius: '10px', background: 'var(--bg-2)', border: '1px solid var(--border)', flexShrink: 0, marginTop: '4px' }}>
            <button
              style={{
                fontFamily: 'var(--font)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '6px 14px',
                borderRadius: '7px',
                border: 'none',
                background: lang === 'de' ? 'var(--text-1)' : 'transparent',
                color: lang === 'de' ? '#fff' : 'var(--text-3)',
                cursor: 'pointer',
                transition: 'background 0.12s, color 0.12s',
              }}
              onClick={() => setLang('de')}
            >
              DE
            </button>
            <button
              style={{
                fontFamily: 'var(--font)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '6px 14px',
                borderRadius: '7px',
                border: 'none',
                background: lang === 'en' ? 'var(--text-1)' : 'transparent',
                color: lang === 'en' ? '#fff' : 'var(--text-3)',
                cursor: 'pointer',
                transition: 'background 0.12s, color 0.12s',
              }}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {DAYS.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px 20px',
                borderRadius: '12px',
                border: `1.5px solid ${d.key === activeDay ? 'var(--text-1)' : 'var(--border)'}`,
                background: d.key === activeDay ? 'var(--text-1)' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'var(--font)',
                transition: 'background 0.12s, border-color 0.12s',
                minWidth: '76px',
                userSelect: 'none',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1, marginBottom: '3px', color: d.key === activeDay ? '#fff' : 'var(--text-1)' }}>{d.label[lang as keyof typeof d.label]}</span>
              <span style={{ fontSize: '11px', color: d.key === activeDay ? '#fff' : 'var(--text-3)', lineHeight: 1 }}>{d.date}</span>
            </button>
          ))}
        </div>

        <div ref={containerRef} style={{ marginBottom: '32px' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          {t.legend.map(([cls, label]) => (
            <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'var(--text-2)' }}>
              <div
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '3px',
                  flexShrink: 0,
                  ...(
                    {
                      'trail-a1': { background: '#E1F5EE' },
                      'trail-a2': { background: '#9FE1CB' },
                      'trail-b': { background: '#FAEEDA' },
                      'trail-c': { background: '#EEEDFE' },
                      'workshop': { background: '#F1EFE8' },
                      'kanu-gr1': { background: '#378ADD' },
                      'kanu-gr2': { background: '#85B7EB' },
                      'kanu-weg': { background: '#B5D4F4' },
                      'sunrise-bl': { background: '#FAD36B' },
                      'dinner-bl': { background: '#534AB7' },
                      'evening-bl': { background: '#3C3489' },
                    } as Record<string, any>
                  )[cls]
                }}
              />
              {label}
            </div>
          ))}
        </div>
        <p style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-3)' }} dangerouslySetInnerHTML={{ __html: t.footnote }} />
      </div>
    </div>
  )
}
