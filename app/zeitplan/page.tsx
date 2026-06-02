'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/language-context'
import SiteHeader from '@/app/components/site-header'

const PPM = 1.8
const TIME_W = 46
const COL_GAP = 3
const MIN_COL_W = 88

const COLOR_MAP: Record<string, { bg: string; color: string }> = {
  'trail-a1': { bg: '#E1F5EE', color: '#085041' },
  'trail-a2': { bg: '#9FE1CB', color: '#04342C' },
  'trail-b':  { bg: '#FAEEDA', color: '#633806' },
  'trail-c':  { bg: '#EEEDFE', color: '#3C3489' },
  'workshop': { bg: '#F1EFE8', color: '#2C2C2A' },
  'kanu-gr1': { bg: '#378ADD', color: '#E6F1FB' },
  'kanu-gr2': { bg: '#85B7EB', color: '#042C53' },
  'kanu-weg': { bg: '#B5D4F4', color: '#0C447C' },
  'shared-bl':{ bg: '#EDECEA', color: '#4A4A47' },
  'travel-bl':{ bg: '#F1EFE8', color: '#5F5E5A' },
  'yoga-bl':  { bg: '#9FE1CB', color: '#04342C' },
  'sunrise-bl':{ bg: '#FAD36B', color: '#5C3A00' },
  'dinner-bl':{ bg: '#534AB7', color: '#CECBF6' },
  'evening-bl':{ bg: '#3C3489', color: '#CECBF6' },
}

type Block = {
  from: number
  to: number
  col: number
  cls: string
  span: number
  de: { n: string; s: string; p: string }
  en: { n: string; s: string; p: string }
}

type Day = {
  key: string
  date: string
  label: { de: string; en: string }
  sublabel: { de: string; en: string }
  timeStart: number
  timeEnd: number
  cols: { de: string[]; en: string[] } | null
  colCls?: string[]
  blocks: Block[]
}

const DAYS: Day[] = [
  {
    key: 'mi', date: '5. Aug',
    label: { de: 'Mi', en: 'Wed' }, sublabel: { de: 'Anreise', en: 'Arrival' },
    timeStart: 6, timeEnd: 19.5, cols: null,
    blocks: [
      { from: 6, to: 12.5, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Zug Berlin → München', s: 'ab 6:36 · Ankunft 10:45', p: '' }, en: { n: 'Train Berlin → Munich', s: 'dep. 6:36 · arr. 10:45', p: '' } },
      { from: 12.5, to: 16.5, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Bus München → Hochkrimml (Zwischenstopp Jenbach 14:30 Uhr)', s: 'ab 12:30 · Ankunft 16:30', p: '' }, en: { n: 'Bus Munich → Hochkrimml (stopover Jenbach 14:30)', s: 'dep. 12:30 · arr. 16:30', p: '' } },
      { from: 16.5, to: 18, col: 0, cls: 'travel-bl', span: 1, de: { n: 'Check-in', s: '', p: '' }, en: { n: 'Check-in', s: '', p: '' } },
      { from: 18, to: 18.5, col: 0, cls: 'shared-bl', span: 1, de: { n: 'Welcome & Ablauf', s: '18:00–18:30', p: '' }, en: { n: 'Welcome & Overview', s: '6:00–6:30 pm', p: '' } },
      { from: 18.5, to: 19.5, col: 0, cls: 'dinner-bl', span: 1, de: { n: 'Dinner', s: '18:30–19:15', p: '' }, en: { n: 'Dinner', s: '6:30–7:15 pm', p: '' } },
    ],
  },
  {
    key: 'do', date: '6. Aug',
    label: { de: 'Do', en: 'Thu' }, sublabel: { de: '', en: '' },
    timeStart: 6.5, timeEnd: 22,
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
    key: 'fr', date: '7. Aug',
    label: { de: 'Fr', en: 'Fri' }, sublabel: { de: '', en: '' },
    timeStart: 5, timeEnd: 22,
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
    key: 'sa', date: '8. Aug',
    label: { de: 'Sa', en: 'Sat' }, sublabel: { de: '', en: '' },
    timeStart: 6.5, timeEnd: 22,
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
    key: 'so', date: '9. Aug',
    label: { de: 'So', en: 'Sun' }, sublabel: { de: 'Abreise', en: 'Departure' },
    timeStart: 5, timeEnd: 22, cols: null,
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

function fmtTime(h: number) {
  const hrs = Math.floor(h)
  const mins = Math.round((h - hrs) * 60)
  return hrs + ':' + String(mins).padStart(2, '0')
}

function ScheduleGrid({ day, lang, containerWidth }: { day: Day; lang: string; containerWidth: number }) {
  const multiCol = day.cols && day.cols.de.length > 1
  const numCols = multiCol ? day.cols!.de.length : 1
  const colAreaW = containerWidth - TIME_W
  const rawColW = multiCol ? Math.floor((colAreaW - (numCols - 1) * COL_GAP) / numCols) : colAreaW
  const colW = Math.max(MIN_COL_W, rawColW)
  const totalW = TIME_W + numCols * colW + (numCols - 1) * COL_GAP
  const totalMin = Math.round((day.timeEnd - day.timeStart) * 60)
  const gridH = totalMin * PPM

  const timeMarks: number[] = []
  for (let m = 0; m <= totalMin; m += 30) timeMarks.push(m)

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as any }}>
      {/* Column headers */}
      {multiCol && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottom: '1.5px solid #E5E2DC', width: totalW }}>
          <div style={{ width: TIME_W, flexShrink: 0 }} />
          {(day.cols as any)[lang].map((label: string, i: number) => {
            const cls = day.colCls?.[i] || ''
            const colors = COLOR_MAP[cls]
            return (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  fontSize: 11,
                  fontWeight: 600,
                  textAlign: 'center',
                  padding: '4px 8px',
                  borderRadius: 5,
                  width: colW,
                  marginLeft: i > 0 ? COL_GAP : 0,
                  background: colors?.bg || '#F1EFE8',
                  color: colors?.color || '#2C2C2A',
                }}
              >
                {label}
              </div>
            )
          })}
        </div>
      )}

      {/* Canvas */}
      <div style={{ position: 'relative', width: totalW, height: gridH }}>
        {/* Grid lines + time labels */}
        {timeMarks.map((m) => {
          const y = m * PPM
          const h = day.timeStart + m / 60
          const isHour = m % 60 === 0
          return (
            <div key={m}>
              <div style={{ position: 'absolute', top: y, left: TIME_W, right: 0, height: 1, background: isHour ? '#E5E2DC' : '#F0EDE8' }} />
              <div style={{ position: 'absolute', top: y, left: 0, width: TIME_W - 6, fontSize: 10, color: '#A09890', textAlign: 'right', transform: 'translateY(-50%)', lineHeight: 1, whiteSpace: 'nowrap' }}>
                {fmtTime(h)}
              </div>
            </div>
          )
        })}

        {/* Activity blocks */}
        {day.blocks.map((bl, idx) => {
          const txt = (bl as any)[lang] || bl.de
          const top = (bl.from - day.timeStart) * 60 * PPM
          const height = (bl.to - bl.from) * 60 * PPM
          const left = TIME_W + bl.col * (colW + COL_GAP)
          const width = bl.span * colW + (bl.span - 1) * COL_GAP
          const colors = COLOR_MAP[bl.cls] || { bg: '#F1EFE8', color: '#2C2C2A' }
          return (
            <div
              key={idx}
              title={txt.s ? txt.n + ' · ' + txt.s : txt.n}
              style={{
                position: 'absolute',
                top: top + 1,
                left: left + 1,
                width: width - 2,
                height: height - 2,
                borderRadius: 7,
                padding: '5px 7px',
                overflow: 'hidden',
                background: colors.bg,
                color: colors.color,
              }}
            >
              {txt.n && <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.25 }}>{txt.n}</div>}
              {txt.s && <div style={{ fontSize: 10, opacity: 0.72, marginTop: 2, lineHeight: 1.2 }}>{txt.s}</div>}
              {txt.p && <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.88, marginTop: 2 }}>{txt.p}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const LEGEND = {
  de: [
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
  en: [
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
}

export default function ZeitplanPage() {
  const { language } = useLanguage()
  const [lang, setLang] = useState<'de' | 'en'>('de')
  const [activeDay, setActiveDay] = useState('mi')
  const [containerWidth, setContainerWidth] = useState(760)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Sync with global language
  useEffect(() => {
    setLang(language === 'en' ? 'en' : 'de')
  }, [language])

  // Measure container width
  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) {
        const w = wrapperRef.current.getBoundingClientRect().width
        if (w > 0) setContainerWidth(w)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  const currentDay = DAYS.find((d) => d.key === activeDay) || DAYS[0]
  const legend = LEGEND[lang]

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', background: '#FFFFFF', color: '#181816' }}>
      <SiteHeader />

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '56px 24px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A09890', marginBottom: 10 }}>
              The Mountaincamp 2026
            </p>
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.08, color: '#181816', marginBottom: 8 }}>
              {lang === 'de' ? 'Programm & Schedule' : 'Programme & Schedule'}
            </h1>
            <p style={{ fontSize: 14, color: '#6B6961' }}>
              {lang === 'de' ? '5.–9. August 2026 · Hochkrimml, Österreich · 1.700 m' : '5–9 August 2026 · Hochkrimml, Austria · 1,700 m'}
            </p>
          </div>
          {/* Language toggle */}
          <div style={{ display: 'flex', gap: 4, padding: 3, borderRadius: 10, background: '#F7F6F3', border: '1px solid #E5E2DC', flexShrink: 0, marginTop: 4 }}>
            {(['de', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontFamily: 'inherit',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  padding: '6px 14px',
                  borderRadius: 7,
                  border: 'none',
                  background: lang === l ? '#181816' : 'transparent',
                  color: lang === l ? '#fff' : '#A09890',
                  cursor: 'pointer',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Day tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
          {DAYS.map((d) => {
            const active = d.key === activeDay
            return (
              <button
                key={d.key}
                onClick={() => setActiveDay(d.key)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px 20px',
                  borderRadius: 12,
                  border: `1.5px solid ${active ? '#181816' : '#E5E2DC'}`,
                  background: active ? '#181816' : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  minWidth: 76,
                  userSelect: 'none',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1, marginBottom: 3, color: active ? '#fff' : '#181816' }}>
                  {d.label[lang]}
                </span>
                <span style={{ fontSize: 11, color: active ? '#fff' : '#A09890', lineHeight: 1 }}>
                  {d.date}
                </span>
              </button>
            )
          })}
        </div>

        {/* Grid wrapper — measured for responsive column widths */}
        <div ref={wrapperRef} style={{ marginBottom: 32 }}>
          {containerWidth > 0 && (
            <ScheduleGrid day={currentDay} lang={lang} containerWidth={containerWidth} />
          )}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginTop: 32, paddingTop: 24, borderTop: '1px solid #E5E2DC' }}>
          {legend.map(([cls, label]) => {
            const colors = COLOR_MAP[cls]
            return (
              <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#6B6961' }}>
                <div style={{ width: 11, height: 11, borderRadius: 3, flexShrink: 0, background: colors?.bg || '#ccc' }} />
                {label}
              </div>
            )
          })}
        </div>
        <p style={{ marginTop: 10, fontSize: 11, color: '#A09890' }}>
          {lang === 'de'
            ? 'Preise in € pro Person · Alle Zeiten in Ortszeit · Stand Mai 2026'
            : 'Prices in € per person · All times local · As of May 2026'}
        </p>
      </div>
    </div>
  )
}
