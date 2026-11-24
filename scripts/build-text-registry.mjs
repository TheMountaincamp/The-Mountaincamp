// Sammelt alle editierbaren Texte (tx, txo, copy, t) mit ihren Standardwerten
// und schreibt sie nach app/data/text-registry.json. Der Admin-Bereich
// (/admin/texte) zeigt daraus die Felder pro Seite an.
// Läuft automatisch vor jedem Build.
import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

const ROOT = process.cwd()
const DIRS = ["app", "components"]
const OUT = "app/data/text-registry.json"

// Datei -> Seite für Texte aus app/translations.ts (t("key"))
const FILE_PAGE = [
  [/app\/home-page-client|app\/components\/(early-bird|ticket-progress|route-overview|faq|instagram|ticket-prompt|testimonial|feature-card)/, "start"],
  [/app\/tickets\//, "tickets"],
  [/app\/bus-departures\//, "anreise"],
  [/app\/house\//, "haus"],
  [/app\/trails\//, "trails"],
]

// Lesbare Abschnittsnamen
const SECTION = {
  "home-page-client": "Startseite",
  "early-bird-banner": "Preis-Banner",
  "ticket-progress-section": "Ticketphasen",
  "route-overview-section": "Routen",
  "faq-section": "FAQ",
  "instagram-reels-section": "Instagram",
  "ticket-prompt": "Ticket-Hinweis",
  "ticket-info": "Ticket-Details",
  "quick-facts": "Auf einen Blick",
  "booking-mask": "Buchungsmaske",
  "social-proof": "Wer dabei ist",
  "site-header": "Navigation",
  "notify-signup-form": "E-Mail-Formular",
  translations: "Allgemeine Texte",
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (["node_modules", ".next", "admin", "api"].includes(e.name)) continue
      walk(p, out)
    } else if (/\.(tsx|ts)$/.test(e.name)) out.push(p)
  }
  return out
}

const sources = new Map()
function source(file) {
  if (!sources.has(file)) {
    const text = fs.readFileSync(file, "utf8")
    sources.set(file, ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX))
  }
  return sources.get(file)
}

const strip = (n) => {
  while (n && (ts.isParenthesizedExpression(n) || ts.isAsExpression(n) || ts.isSatisfiesExpression?.(n))) n = n.expression
  return n
}
const isStr = (n) => n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n))

// Bezeichner auflösen: lokale Konstante oder Import aus "@/..." bzw. relativem Pfad
function resolveIdent(sf, name, depth = 0) {
  if (depth > 3) return null
  for (const st of sf.statements) {
    if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        if (ts.isIdentifier(d.name) && d.name.text === name && d.initializer) return { sf, node: strip(d.initializer) }
      }
    }
    if (ts.isImportDeclaration(st) && st.importClause?.namedBindings && ts.isNamedImports(st.importClause.namedBindings)) {
      for (const el of st.importClause.namedBindings.elements) {
        if (el.name.text !== name) continue
        const spec = st.moduleSpecifier.text
        const base = spec.startsWith("@/") ? path.join(ROOT, spec.slice(2)) : path.resolve(path.dirname(sf.fileName), spec)
        for (const ext of [".ts", ".tsx", "/index.ts"]) {
          if (fs.existsSync(base + ext)) {
            return resolveIdent(source(base + ext), (el.propertyName ?? el.name).text, depth + 1)
          }
        }
      }
    }
  }
  return null
}

function deref(sf, node) {
  node = strip(node)
  if (node && ts.isIdentifier(node)) {
    const r = resolveIdent(sf, node.text)
    return r ? deref(r.sf, r.node) : { sf, node: null }
  }
  return { sf, node }
}

function propName(p, sf) {
  return p.name ? p.name.getText(sf).replace(/^["']|["']$/g, "") : null
}

// de- und en-Baum parallel ablaufen, Text-Blätter sammeln
function flatten(deRef, enRef, prefix, out) {
  const de = deref(deRef.sf, deRef.node)
  const en = enRef ? deref(enRef.sf, enRef.node) : { sf: null, node: null }
  if (!de.node) return
  if (isStr(de.node)) {
    out.push({ key: prefix, de: de.node.text, en: en.node && isStr(en.node) ? en.node.text : "" })
    return
  }
  if (ts.isArrayLiteralExpression(de.node)) {
    de.node.elements.forEach((el, i) => {
      const enEl = en.node && ts.isArrayLiteralExpression(en.node) ? en.node.elements[i] : null
      flatten({ sf: de.sf, node: el }, enEl ? { sf: en.sf, node: enEl } : null, `${prefix}.${i}`, out)
    })
    return
  }
  if (ts.isObjectLiteralExpression(de.node)) {
    for (const p of de.node.properties) {
      if (!ts.isPropertyAssignment(p)) continue
      const name = propName(p, de.sf)
      let enVal = null
      if (en.node && ts.isObjectLiteralExpression(en.node)) {
        const q = en.node.properties.find((x) => ts.isPropertyAssignment(x) && propName(x, en.sf) === name)
        if (q) enVal = { sf: en.sf, node: q.initializer }
      }
      flatten({ sf: de.sf, node: p.initializer }, enVal, `${prefix}.${name}`, out)
    }
  }
}

function section(file) {
  const base = path.basename(file).replace(/\.(tsx|ts)$/, "")
  if (base === "page") return null
  return SECTION[base] ?? base
}

// Blöcke so, wie man sie auf der Website sieht: Marker "@block 05 Name" im Code.
// Alles nach einem Marker (in derselben Datei) gehört zu diesem Block.
const markerCache = new Map()
function markers(sf) {
  if (!markerCache.has(sf.fileName)) {
    const list = []
    const re = /@block\s+(\d+|skip)\s*([^*\n]*?)\s*(?:\*\/|\n|$)/g
    let m
    while ((m = re.exec(sf.text))) list.push({ pos: m.index, order: m[1], name: m[2].trim() })
    markerCache.set(sf.fileName, list)
  }
  return markerCache.get(sf.fileName)
}
function blockAt(sf, pos) {
  let b = null
  for (const m of markers(sf)) if (m.pos <= pos) b = m
  return b
}

// Unterblöcke für große COPY-Objekte, nach Schlüssel
const KEY_BLOCKS = [
  [/^tickets\.ticket-info\.(included)/, "05", "Im Ticket enthalten"],
  [/^tickets\.ticket-info\.(prices|phase)/, "06", "Preise 2027"],
  [/^tickets\.ticket-info\.(rooms|travel)/, "07", "Zimmer und Anreise"],
  [/^tickets\.ticket-info\.(cancel|agb)/, "08", "Storno"],
  [/^tickets\.ticket-info\.(faq)/, "8.5", "Kurz gefragt"],
]

const entries = []
const seen = new Set()
const tUsage = new Map() // translation key -> erste Datei

function add(e) {
  if (seen.has(e.key)) return
  seen.add(e.key)
  entries.push(e)
}

for (const file of DIRS.flatMap((d) => walk(path.join(ROOT, d)))) {
  const rel = path.relative(ROOT, file)
  if (rel.startsWith("app/lib/texts")) continue
  const sf = source(file)
  const visit = (node) => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const fn = node.expression.text
      const a = node.arguments
      if (fn === "tx" && a.length === 4 && isStr(a[1]) && isStr(a[2]) && isStr(a[3])) {
        add({ key: a[1].text, de: a[2].text, en: a[3].text, file: rel, block: blockAt(sf, node.getStart(sf)), pos: node.getStart(sf) })
      } else if (fn === "txo" && a.length === 3 && isStr(a[0]) && isStr(a[1]) && isStr(a[2])) {
        add({ key: a[0].text, de: a[1].text, en: a[2].text, file: rel, block: blockAt(sf, node.getStart(sf)), pos: node.getStart(sf) })
      } else if (fn === "copy" && a.length === 3 && isStr(a[1])) {
        const dict = deref(sf, a[2])
        if (dict.node && ts.isObjectLiteralExpression(dict.node)) {
          const get = (n) => {
            const p = dict.node.properties.find((x) => ts.isPropertyAssignment(x) && propName(x, dict.sf) === n)
            return p ? { sf: dict.sf, node: p.initializer } : null
          }
          const out = []
          const de = get("de")
          if (de) flatten(de, get("en"), a[1].text, out)
          out.forEach((e, i) => add({ ...e, file: rel, block: blockAt(sf, node.getStart(sf)), pos: node.getStart(sf) + i / 1000 }))
        }
      } else if (fn === "t" && a.length === 1 && isStr(a[0])) {
        const list = tUsage.get(a[0].text) ?? []
        list.push({ file: rel, block: blockAt(sf, node.getStart(sf)), pos: node.getStart(sf) })
        tUsage.set(a[0].text, list)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
}

// Texte aus app/translations.ts, soweit sie per t("key") genutzt werden
const tr = resolveIdent(source(path.join(ROOT, "app/translations.ts")), "translations")
if (tr && ts.isObjectLiteralExpression(tr.node)) {
  const out = []
  const de = tr.node.properties.find((p) => propName(p, tr.sf) === "de")
  const en = tr.node.properties.find((p) => propName(p, tr.sf) === "en")
  flatten({ sf: tr.sf, node: de.initializer }, { sf: tr.sf, node: en.initializer }, "t", out)
  for (const e of out) {
    const key = e.key.slice(2)
    const uses = tUsage.get(key)
    if (!uses) continue
    const pageOf = (u) => FILE_PAGE.find(([re]) => re.test(u.file))?.[1] ?? "allgemein"
    const use = uses.find((u) => pageOf(u) !== "allgemein") ?? uses[0]
    const pages = new Set(uses.map(pageOf))
    add({ key, de: e.de, en: e.en, file: use.file, page: pageOf(use), block: use.block, pos: use.pos, shared: pages.size > 1 })
  }
}

const PAGES = ["start", "tickets", "anreise", "haus", "trails", "allgemein"]
const result = entries
  .filter((e) => e.block?.order !== "skip")
  .map((e) => {
    const kb = KEY_BLOCKS.find(([re]) => re.test(e.key))
    const order = kb?.[1] ?? e.block?.order ?? "99"
    const name = kb?.[2] ?? e.block?.name ?? section(e.file) ?? "Weitere Texte"
    return {
      key: e.key,
      page: e.page ?? (PAGES.includes(e.key.split(".")[0]) ? e.key.split(".")[0] : "allgemein"),
      section: name,
      order: Number(order),
      ...(e.shared ? { shared: true } : {}),
      de: e.de,
      en: e.en,
      _file: e.file,
      _pos: e.pos ?? 0,
    }
  })
  .filter((e) => /[A-Za-zÄÖÜäöü]/.test(e.de))
  .sort((a, b) => a.page.localeCompare(b.page) || a.order - b.order || a.section.localeCompare(b.section) || a._file.localeCompare(b._file) || a._pos - b._pos)
  .map(({ _file, _pos, ...e }) => e)

fs.writeFileSync(path.join(ROOT, OUT), JSON.stringify(result, null, 1) + "\n")
const byPage = {}
for (const e of result) byPage[e.page] = (byPage[e.page] ?? 0) + 1
console.log(`Text-Registry: ${result.length} Texte`, byPage)
