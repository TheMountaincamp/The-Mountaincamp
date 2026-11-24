// Einmaliges Umbau-Skript: macht feste Texte in Komponenten über den Admin editierbar.
//   language === "de" ? "A" : "B"     ->  tx(language, "seite.schluessel", "A", "B")
//   { de: "A", en: "B" } (in Funktion) ->  txo("seite.schluessel", "A", "B")
//   COPY[lang]                          ->  copy(lang, "seite.datei", COPY)
// Aufruf: node scripts/texts-codemod.mjs <seite>=<datei> ...
import fs from "node:fs"
import ts from "typescript"

const args = process.argv.slice(2)
const usedKeys = new Map() // key -> "de|en"

function slug(s) {
  return (
    s
      .toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .slice(0, 6)
      .join("-")
      .slice(0, 48)
      .replace(/-+$/, "") || "text"
  )
}

// Kein Fließtext: Sprachcodes, CSS-Klassen, Optionswerte
function notProse(de, en) {
  for (const v of [de, en]) {
    if (/^[a-z]{2}(-[A-Z]{2})?$/.test(v)) return true
    if (/^[a-z0-9:\-\/\[\]\. ]+$/.test(v) && /[-:]/.test(v)) return true
  }
  if (/^[a-z0-9]+$/.test(de) && /^[a-z0-9]+$/.test(en)) return true
  return false
}

function uniqueKey(base, de, en) {
  let key = base
  let i = 2
  while (usedKeys.has(key) && usedKeys.get(key) !== `${de}|${en}`) key = `${base}-${i++}`
  usedKeys.set(key, `${de}|${en}`)
  return key
}

const strip = (n) => {
  while (n && ts.isParenthesizedExpression(n)) n = n.expression
  return n
}
const isStr = (n) => n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n))
const lit = (s) => JSON.stringify(s)

function insideFunction(node) {
  for (let p = node.parent; p; p = p.parent) {
    if (ts.isFunctionLike(p)) return true
  }
  return false
}

let total = { tx: 0, txo: 0, copy: 0, skipped: 0 }

for (const arg of args) {
  const [page, file] = arg.split("=")
  const src = fs.readFileSync(file, "utf8")
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const base = file.split("/").pop().replace(/\.(tsx|ts)$/, "").replace(/^page$/, "seite")
  const edits = []
  const needs = new Set()

  // Lokale, modulweite Konstanten mit { de: ..., en: ... }
  const copyConsts = new Set()
  for (const st of sf.statements) {
    if (!ts.isVariableStatement(st)) continue
    for (const d of st.declarationList.declarations) {
      const init = d.initializer && strip(d.initializer.expression ?? d.initializer)
      const obj = d.initializer && ts.isAsExpression(d.initializer) ? strip(d.initializer.expression) : strip(d.initializer)
      if (ts.isIdentifier(d.name) && obj && ts.isObjectLiteralExpression(obj)) {
        const names = obj.properties.map((p) => p.name && p.name.getText(sf))
        if (names.includes("de") && names.includes("en")) copyConsts.add(d.name.text)
      }
      void init
    }
  }

  function visit(node) {
    // A) Ternär mit Sprachvergleich
    if (ts.isConditionalExpression(node)) {
      const c = strip(node.condition)
      if (
        ts.isBinaryExpression(c) &&
        (c.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken || c.operatorToken.kind === ts.SyntaxKind.EqualsEqualsToken) &&
        ts.isIdentifier(c.left) &&
        (c.left.text === "language" || c.left.text === "lang") &&
        ts.isStringLiteral(c.right) &&
        (c.right.text === "de" || c.right.text === "en")
      ) {
        const a = strip(node.whenTrue)
        const b = strip(node.whenFalse)
        if (isStr(a) && isStr(b)) {
          const [de, en] = c.right.text === "de" ? [a.text, b.text] : [b.text, a.text]
          if (/[a-zA-ZäöüÄÖÜ]/.test(de) && !notProse(de, en)) {
            const key = uniqueKey(`${page}.${slug(de)}`, de, en)
            edits.push([node.getStart(sf), node.getEnd(), `tx(${c.left.text}, ${lit(key)}, ${lit(de)}, ${lit(en)})`])
            needs.add("tx")
            total.tx++
            return
          }
        } else {
          total.skipped++
        }
      }
    }
    // B) { de: "A", en: "B" } innerhalb einer Funktion
    if (ts.isObjectLiteralExpression(node) && node.properties.length === 2) {
      const map = {}
      for (const p of node.properties) {
        if (ts.isPropertyAssignment(p) && p.name) map[p.name.getText(sf).replace(/["']/g, "")] = strip(p.initializer)
      }
      if (isStr(map.de) && isStr(map.en) && !notProse(map.de.text, map.en.text)) {
        if (insideFunction(node)) {
          const de = map.de.text
          const en = map.en.text
          const key = uniqueKey(`${page}.${slug(de)}`, de, en)
          edits.push([node.getStart(sf), node.getEnd(), `txo(${lit(key)}, ${lit(de)}, ${lit(en)})`])
          needs.add("txo")
          total.txo++
          return
        } else total.skipped++
      }
    }
    // C) COPY[lang]
    if (
      ts.isElementAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      copyConsts.has(node.expression.text) &&
      ts.isIdentifier(node.argumentExpression) &&
      (node.argumentExpression.text === "lang" || node.argumentExpression.text === "language") &&
      insideFunction(node)
    ) {
      const id = node.expression.text
      const ns = `${page}.${base}${id === "COPY" ? "" : "." + id.toLowerCase().replace(/_/g, "-")}`
      edits.push([node.getStart(sf), node.getEnd(), `copy(${node.argumentExpression.text}, ${lit(ns)}, ${id})`])
      needs.add("copy")
      total.copy++
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)

  if (!edits.length) {
    console.log(`${file}: nichts zu tun`)
    continue
  }
  let out = src
  for (const [s, e, r] of edits.sort((x, y) => y[0] - x[0])) out = out.slice(0, s) + r + out.slice(e)
  const imp = `import { ${[...needs].sort().join(", ")} } from "@/app/lib/texts"\n`
  out = out.replace(/^(["']use client["'];?\s*\n)/, `$1${imp}`)
  if (!out.includes(imp)) out = imp + out
  fs.writeFileSync(file, out)
  console.log(`${file}: ${edits.length} Stellen`)
}
console.log(total)
