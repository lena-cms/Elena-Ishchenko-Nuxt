import { Marked } from 'marked'

const EXTERNAL = /^[a-z][a-z0-9+.-]*:|^\/\//i
const NEW_TAB = /^https?:|^\/\//i

export function escapeHtml (text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Rewrites a link written in content to one usable from the current page.
 *   https://…, mailto:…  unchanged
 *   /cv, /cv/, cv        -> <prefix>cv/  (home page slug -> <prefix>)
 *   assets/x.png         -> <prefix>assets/x.png
 *   #anchor              unchanged
 */
export function resolveHref (href, { prefix, homePage }) {
  if (!href || EXTERNAL.test(href) || href.startsWith('#')) {
    return href
  }
  const [, pathPart, rest] = /^([^?#]*)(.*)$/.exec(href)
  const clean = pathPart.replace(/^\.?\/+/, '').replace(/\/+$/, '')
  if (clean.startsWith('assets/')) {
    return prefix + clean + rest
  }
  if (clean === '' || clean === homePage) {
    return prefix + rest
  }
  return prefix + clean + '/' + rest
}

export function renderMarkdown (source, options) {
  const marked = new Marked({ gfm: true, breaks: false })
  marked.use({
    renderer: {
      link ({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens)
        const attrs = [`href="${escapeHtml(resolveHref(href, options))}"`]
        if (title) {
          attrs.push(`title="${escapeHtml(title)}"`)
        }
        if (NEW_TAB.test(href)) {
          attrs.push('target="_blank"', 'rel="noreferrer noopener"')
        }
        return `<a ${attrs.join(' ')}>${text}</a>`
      },
      image ({ href, title, text }) {
        const attrs = [
          `src="${escapeHtml(resolveHref(href, options))}"`,
          `alt="${escapeHtml(text)}"`,
          'loading="lazy"'
        ]
        if (title) {
          attrs.push(`title="${escapeHtml(title)}"`)
        }
        return `<img ${attrs.join(' ')}>`
      }
    }
  })
  let html = marked.parse(source)
  // Images inserted by the editor inside complex tables are serialised as raw HTML.
  html = html.replace(/(<img\b[^>]*\bsrc=")(assets\/[^"]*)"/g,
    (m, start, src) => `${start}${resolveHref(src, options)}"`)
  // Markdown tables require a header row; an all-empty one means "no header".
  html = html.replace(/<thead>\s*<tr>(?:\s*<th[^>]*>\s*<\/th>)+\s*<\/tr>\s*<\/thead>\s*/g, '')
  return html
}
