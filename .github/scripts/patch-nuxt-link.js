#!/usr/bin/env node
/**
 * Makes Nuxt's <nuxt-link> tolerant of link values the TeleportHQ generator emits.
 *
 * vue-router's RouterLink requires `to` and dereferences it unguarded in
 * normalizeLocation(), so `:to="undefined"` throws
 * "Cannot read properties of undefined (reading '_normalized')" and kills the
 * whole page during `nuxt generate`. Every vue-router 2.x/3.x release behaves
 * this way, so this is not something a version bump can fix.
 *
 * The generator also describes external links as objects ({ url, newTab })
 * rather than router targets, which RouterLink would resolve as a local path.
 *
 * This patches Nuxt's nuxt-link templates in node_modules, so it must run after
 * `npm install` and before `nuxt generate`. It is idempotent.
 */

const fs = require('fs')
const path = require('path')

const MARKER = '__thqOriginalNuxtLink'

const TEMPLATE_DIR = path.join(
  process.cwd(),
  'node_modules/@nuxt/vue-app/template/components'
)
const TARGETS = ['nuxt-link.server.js', 'nuxt-link.client.js']

// Appended verbatim. `Vue` is already imported by both templates.
const WRAPPER = `
// --- injected by .github/scripts/patch-nuxt-link.js ---
// Returns anchor attributes when \`to\` is not a usable router target, else null.
function __thqAnchorAttrs (to) {
  if (to === undefined || to === null || to === '') {
    // A prop the generator never passed (e.g. template reads \`link_text\`
    // while the prop is declared \`linkText\`). Render a link with no href
    // rather than throwing and losing the entire page.
    return {}
  }
  if (typeof to === 'object') {
    if (typeof to.url === 'string') {
      return {
        href: to.url,
        target: to.newTab ? '_blank' : null,
        rel: to.newTab ? 'noreferrer noopener' : null
      }
    }
    return null
  }
  if (typeof to === 'string' && /^(?:[a-z][a-z0-9+.-]*:|\\/\\/)/i.test(to)) {
    // Absolute URL, mailto:, tel: — never a local route.
    return { href: to, rel: 'noreferrer noopener' }
  }
  return null
}

export default {
  name: 'NuxtLink',
  extends: __thqOriginalNuxtLink,
  props: {
    // RouterLink declares this \`required: true\`; relax it so a missing value
    // is a dead link instead of a build failure.
    to: {
      type: [String, Object],
      required: false,
      default: ''
    }
  },
  methods: {
    shouldPrefetch () {
      // Never hand a non-route target to $router.resolve().
      if (__thqAnchorAttrs(this.to)) {
        return false
      }
      const inherited = __thqOriginalNuxtLink.methods &&
        __thqOriginalNuxtLink.methods.shouldPrefetch
      return inherited ? inherited.call(this) : false
    }
  },
  render (h) {
    const attrs = __thqAnchorAttrs(this.to)
    if (attrs) {
      // Vue merges the parent's class/style/attrs onto the root element.
      return h('a', { attrs }, this.$slots.default)
    }
    return Vue.component('RouterLink').options.render.call(this, h)
  }
}
`

let patched = 0
let skipped = 0

for (const name of TARGETS) {
  const file = path.join(TEMPLATE_DIR, name)

  if (!fs.existsSync(file)) {
    console.error(`patch-nuxt-link: expected template not found: ${file}`)
    process.exit(1)
  }

  const source = fs.readFileSync(file, 'utf8')

  if (source.includes(MARKER)) {
    console.log(`patch-nuxt-link: ${name} already patched`)
    skipped++
    continue
  }

  if (!source.includes('export default {')) {
    console.error(
      `patch-nuxt-link: ${name} does not match the expected shape ` +
      '("export default {" not found) — Nuxt internals may have changed.'
    )
    process.exit(1)
  }

  const rewritten = source.replace(
    'export default {',
    `const ${MARKER} = {`
  ) + WRAPPER

  fs.writeFileSync(file, rewritten)
  console.log(`patch-nuxt-link: patched ${name}`)
  patched++
}

console.log(`patch-nuxt-link: ${patched} patched, ${skipped} already up to date`)
