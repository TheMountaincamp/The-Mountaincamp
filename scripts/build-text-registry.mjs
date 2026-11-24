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
        add({ key: a[1].text, de: a[2].text, en: a[3].text, file: rel })
      } else if (fn === "txo" && a.length === 3 && isStr(a[0]) && isStr(a[1]) && isStr(a[2])) {
        add({ key: a[0].text, de: a[1].text, en: a[2].text, file: rel })
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
          for (const e of out) add({ ...e, file: rel })
        }
      } else if (fn === "t" && a.length === 1 && isStr(a[0]) && !tUsage.has(a[0].text)) {
        tUsage.set(a[0].text, rel)
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
    const file = tUsage.get(key)
    if (!file) continue
    const page = FILE_PAGE.find(([re]) => re.test(file))?.[1] ?? "allgemein"
    add({ key, de: e.de, en: e.en, file, page, section: SECTION.translations })
  }
}

const PAGES = ["start", "tickets", "anreise", "haus", "trails", "allgemein"]
const result = entries
  .map((e) => ({
    key: e.key,
    page: e.page ?? (PAGES.includes(e.key.split(".")[0]) ? e.key.split(".")[0] : "allgemein"),
    section: e.section ?? section(e.file) ?? "Seite",
    de: e.de,
    en: e.en,
  }))
  .filter((e) => /[A-Za-zÄÖÜäöü]/.test(e.de))

fs.writeFileSync(path.join(ROOT, OUT), JSON.stringify(result, null, 1) + "\n")
const byPage = {}
for (const e of result) byPage[e.page] = (byPage[e.page] ?? 0) + 1
console.log(`Text-Registry: ${result.length} Texte`, byPage)
