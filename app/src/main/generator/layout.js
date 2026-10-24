import { escapeHtml, renderMarkdown, resolveHref } from './markdown.js'

const FONTS = 'https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap'

function menuHref (item, ctx) {
  if (item.type === 'page') {
    return resolveHref(item.page, ctx)
  }
  return item.url || '#'
}

function renderMenu (menu, page, ctx) {
  return menu.map(item => {
    const attrs = [`href="${escapeHtml(menuHref(item, ctx))}"`]
    if (item.type === 'page' && item.page === page.slug) {
      attrs.push('aria-current="page"')
    }
    if (item.type === 'url' && item.newTab) {
      attrs.push('target="_blank"', 'rel="noreferrer noopener"')
    }
    return `        <li><a ${attrs.join(' ')}>${escapeHtml(item.label)}</a></li>`
  }).join('\n')
}

export function renderLayout ({ site, menu, page, prefix, body }) {
  const ctx = { prefix, homePage: site.homePage }
  const isHome = page.slug === site.homePage
  const title = isHome ? site.title : `${page.title} - ${site.title}`
  const description = page.description || site.description
  const footer = site.footer ? renderMarkdown(site.footer, ctx).trim() : ''

  return `<!DOCTYPE html>
<html lang="${escapeHtml(site.lang || 'en')}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
${description ? `  <meta name="description" content="${escapeHtml(description)}">\n` : ''}  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="${FONTS}">
  <link rel="stylesheet" href="${prefix}style.css">
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="site-title" href="${prefix}">${escapeHtml(site.title)}</a>
      <input type="checkbox" id="menu-toggle" class="menu-checkbox">
      <label for="menu-toggle" class="menu-toggle">Menu</label>
      <ul class="site-menu">
${renderMenu(menu, page, ctx)}
      </ul>
    </div>
  </header>
  <main class="page page-${escapeHtml(page.slug)}">
${body}
  </main>
${footer ? `  <footer class="site-footer">\n    <div class="site-footer-inner">\n${footer}\n    </div>\n  </footer>\n` : ''}</body>
</html>
`
}
