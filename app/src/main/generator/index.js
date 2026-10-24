// Static site generator: content/ (md + json + css) -> docs/ (plain HTML).
//
// Every URL in the output is relative, so the same build works when served
// from https://<user>.github.io/<repo>/, from a custom domain, or from disk
// (the in-app preview opens it via file://).

import fs from 'node:fs/promises'
import path from 'node:path'
import { readContent } from './content.js'
import { renderMarkdown } from './markdown.js'
import { renderLayout } from './layout.js'

/** Path prefix that leads from a page at `depth` directories back to the site root. */
function rootPrefix (depth) {
  return depth === 0 ? './' : '../'.repeat(depth)
}

/** Output directory of a page relative to the site root ('' for the home page). */
export function pageDir (slug, homePage) {
  return slug === homePage ? '' : slug
}

/**
 * Builds the site from `contentDir` into `outDir`. `outDir` is emptied first.
 * Returns the list of written files relative to `outDir`.
 */
export async function buildSite ({ contentDir, outDir }) {
  const content = await readContent(contentDir)
  const { site, menu, pages } = content
  const written = []

  if (!pages.some(p => p.slug === site.homePage)) {
    throw new Error(`Home page "${site.homePage}" does not exist in content/pages`)
  }

  // GitHub writes CNAME into the published folder when a custom domain is set
  // in the repository settings; keep it unless site.json names a domain.
  const existingCname = await fs.readFile(path.join(outDir, 'CNAME'), 'utf8').catch(() => '')

  await fs.rm(outDir, { recursive: true, force: true })
  await fs.mkdir(outDir, { recursive: true })

  async function write (rel, data) {
    const file = path.join(outDir, rel)
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, data)
    written.push(rel)
  }

  for (const page of pages) {
    const dir = pageDir(page.slug, site.homePage)
    const prefix = rootPrefix(dir ? 1 : 0)
    const html = renderLayout({
      site,
      menu,
      page,
      prefix,
      body: renderMarkdown(page.body, { prefix, homePage: site.homePage })
    })
    await write(dir ? `${dir}/index.html` : 'index.html', html)
  }

  // GitHub Pages serves 404.html for any unknown path, at any depth, so it
  // cannot rely on relative URLs. Point it at the site root when we know it.
  const notFoundPrefix = site.customDomain
    ? '/'
    : (site.siteUrl ? new URL(site.siteUrl).pathname.replace(/\/?$/, '/') : './')
  await write('404.html', renderLayout({
    site,
    menu,
    page: { slug: '404', title: 'Page not found' },
    prefix: notFoundPrefix,
    body: renderMarkdown('# Page not found\n\nThe page you were looking for has moved, or never existed.', {
      prefix: notFoundPrefix,
      homePage: site.homePage
    })
  }))

  await write('style.css', content.style)
  // Without this GitHub Pages runs the output through Jekyll.
  await write('.nojekyll', '')
  if (site.customDomain) {
    await write('CNAME', site.customDomain.trim() + '\n')
  } else if (existingCname.trim()) {
    await write('CNAME', existingCname)
  }

  const siteUrl = site.customDomain
    ? `https://${site.customDomain.trim()}/`
    : (site.siteUrl || '').replace(/\/?$/, '/')
  if (siteUrl !== '/') {
    const urls = pages.map(p => {
      const dir = pageDir(p.slug, site.homePage)
      return `  <url><loc>${siteUrl}${dir ? dir + '/' : ''}</loc></url>`
    })
    await write('sitemap.xml',
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.join('\n') + '\n</urlset>\n')
    await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`)
  } else {
    await write('robots.txt', 'User-agent: *\nAllow: /\n')
  }

  const assetsDir = path.join(contentDir, 'assets')
  for (const name of await listFiles(assetsDir)) {
    await write(`assets/${name}`, await fs.readFile(path.join(assetsDir, name)))
  }

  return written
}

async function listFiles (dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    return entries.filter(e => e.isFile() && !e.name.startsWith('.')).map(e => e.name).sort()
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []
    }
    throw err
  }
}
