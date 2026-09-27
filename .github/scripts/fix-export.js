#!/usr/bin/env node
/**
 * Repairs prop references in the TeleportHQ export before the site is built.
 *
 * The generator sometimes emits snake_case identifiers in a template while
 * declaring the matching prop in camelCase, e.g. components/footer-container.vue:
 *
 *   <nuxt-link :to="link_text">   ...but props declare   linkText: { type: Object }
 *
 * `this.link_text` is undefined, so the value never reaches the component. This
 * rewrites such references back to the declared prop name, which is the only way
 * to recover the real value — no component override can retrieve something that
 * was never passed.
 *
 * Runs against the working tree before `nuxt generate`, so it survives the next
 * export (which overwrites components/, pages/, layouts/ and package.json).
 */

const fs = require('fs')
const path = require('path')

const DIRS = ['components', 'pages', 'layouts']

const camelToSnake = name =>
  name.replace(/[A-Z]/g, c => '_' + c.toLowerCase())

/** Top-level keys of the object literal that starts at `props: {`. */
function declaredProps (script) {
  const start = script.search(/\bprops\s*:\s*\{/)
  if (start === -1) {
    return []
  }

  const open = script.indexOf('{', start)
  const names = []
  let depth = 0

  for (let i = open; i < script.length; i++) {
    const ch = script[i]

    if (ch === '{' || ch === '[' || ch === '(') {
      depth++
      continue
    }
    if (ch === '}' || ch === ']' || ch === ')') {
      depth--
      if (depth === 0) {
        break
      }
      continue
    }

    // Only collect identifiers sitting directly inside the props object.
    if (depth === 1) {
      const rest = script.slice(i)
      const key = /^([A-Za-z_$][\w$]*)\s*:/.exec(rest)
      if (key) {
        names.push(key[1])
        i += key[0].length - 1
      }
    }
  }

  return names
}

function collectFiles () {
  const files = []
  for (const dir of DIRS) {
    const abs = path.join(process.cwd(), dir)
    if (!fs.existsSync(abs)) {
      continue
    }
    for (const entry of fs.readdirSync(abs)) {
      if (entry.endsWith('.vue')) {
        files.push(path.join(dir, entry))
      }
    }
  }
  return files
}

let changedFiles = 0
let totalRewrites = 0

for (const file of collectFiles()) {
  const source = fs.readFileSync(file, 'utf8')

  // The generator emits a single <template> block ahead of <script>.
  const scriptAt = source.indexOf('<script')
  if (scriptAt === -1) {
    continue
  }

  let template = source.slice(0, scriptAt)
  const script = source.slice(scriptAt)
  const props = declaredProps(script)
  if (!props.length) {
    continue
  }

  // Longest first, so `link_text` cannot shadow `link_text1`.
  const renames = props
    .map(prop => ({ prop, snake: camelToSnake(prop) }))
    .filter(({ prop, snake }) => snake !== prop && !props.includes(snake))
    .sort((a, b) => b.snake.length - a.snake.length)

  const applied = []

  for (const { prop, snake } of renames) {
    const pattern = new RegExp(`(?<![\\w$.-])${snake}(?![\\w$-])`, 'g')
    const hits = template.match(pattern)
    if (!hits) {
      continue
    }
    template = template.replace(pattern, prop)
    applied.push(`${snake} -> ${prop} (${hits.length})`)
    totalRewrites += hits.length
  }

  if (applied.length) {
    fs.writeFileSync(file, template + script)
    changedFiles++
    console.log(`fix-export: ${file}`)
    for (const line of applied) {
      console.log(`  ${line}`)
    }
  }
}

console.log(
  `fix-export: ${totalRewrites} reference(s) rewritten across ${changedFiles} file(s)`
)
