      key: 'so',
      date: '9. Aug',
      label: { de: 'So', en: 'Sun' },
      sublabel: { de: 'Abreise', en: 'Departure' },
      timeStart: 5,
      timeEnd: 22,
      blocks: [
        { from: 5, to: 6.5, col: 0, span: 1, cls: 'sunrise-bl', de: { n: 'Sunrise Hike', s: '5:00–6:30', p: '' }, en: { n: 'Sunrise Hike', s: '5:00–6:30', p: '' } },
        { from: 6.5, to: 7.5, col: 0, span: 1, cls: 'yoga-bl', de: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' }, en: { n: 'Morning Yoga', s: '6:30–7:30', p: 'Free' } },
        { from: 7.5, to: 8.25, col: 0, span: 1, cls: 'shared-bl', de: { n: 'Frühstück', s: '7:30–8:15', p: '' }, en: { n: 'Breakfast', s: '7:30–8:15', p: '' } },
        { from: 8.25, to: 11, col: 0, span: 1, cls: 'travel-bl', de: { n: 'Bus Hochkrimml → Jenbach', s: 'ab 8:30', p: '' }, en: { n: 'Bus Hochkrimml → Jenbach', s: 'dep. 8:30', p: '' } },
        { from: 11, to: 12.75, col: 0, span: 1, cls: 'travel-bl', de: { n: 'Bus Jenbach → München', s: 'Ankunft Jenbach ~11:00', p: '' }, en: { n: 'Bus Jenbach → Munich', s: 'arr. Jenbach ~11:00', p: '' } },
        { from: 12.75, to: 14.35, col: 0, span: 1, cls: 'travel-bl', de: { n: 'Wartezeit München', s: 'Ankunft München 12:30–13:00', p: '' }, en: { n: 'Waiting time Munich', s: 'arr. Munich 12:30–13:00', p: '' } },
        { from: 14.35, to: 22, col: 0, span: 1, cls: 'travel-bl', de: { n: 'Zug München → Berlin', s: 'Abfahrt 14:21', p: '' }, en: { n: 'Train Munich → Berlin', s: 'dep. 14:21', p: '' } },
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

    const numCols = Math.max(1, ...day.blocks.map((b) => b.col + b.span))
    const containerW = containerRef.current.clientWidth || 760
    const colAreaW = containerW - TIME_W
    const rawColW = numCols > 1 ? Math.floor((colAreaW - (numCols - 1) * COL_GAP) / numCols) : colAreaW
    const colW = Math.max(MIN_COL_W, rawColW)
    const totalW = TIME_W + numCols * colW + (numCols - 1) * COL_GAP
    const totalMin = Math.round((day.timeEnd - day.timeStart) * 60)
    const gridH = totalMin * PPM

    const renderDay = () => {
      if (!containerRef.current) return
      containerRef.current.innerHTML = ''

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
        const txt = bl[lang as keyof Pick<Block, 'de' | 'en'>]
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