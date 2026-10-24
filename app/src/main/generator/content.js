// Reading and writing the content folder. Shared by the generator and the app.
//
// content/
//   site.json        global settings
//   menu.json        ordered menu items
//   style.css        global CSS
//   pages/<slug>.md  frontmatter (title) + markdown body
//   assets/          images referenced as assets/<name>

import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const DEFAULT_SITE = {
  title: 'Website',
  description: '',
  siteUrl: '',
  customDomain: '',
  homePage: 'index',
  lang: 'en',
  footer: ''
}

export function slugify (text) {
  return String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'page'
}

export function parsePage (slug, source) {
  const { data, content } = matter(source)
  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    description: typeof data.description === 'string' ? data.description : '',
    body: content.replace(/^\n+/, '')
  }
}

export function serializePage ({ title, description, body }) {
  const data = { title }
  if (description) {
    data.description = description
  }
  return matter.stringify('\n' + body.replace(/^\s*\n/, '').replace(/\s*$/, '\n'), data)
}

async function readJson (file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'))
  } catch (err) {
    if (err.code === 'ENOENT') {
      return fallback
    }
    throw new Error(`${path.basename(file)}: ${err.message}`)
  }
}

export async function readPages (contentDir) {
  const dir = path.join(contentDir, 'pages')
  let names = []
  try {
    names = await fs.readdir(dir)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }
  const pages = []
  for (const name of names.filter(n => n.endsWith('.md')).sort()) {
    const slug = name.slice(0, -3)
    pages.push(parsePage(slug, await fs.readFile(path.join(dir, name), 'utf8')))
  }
  return pages
}

export async function readContent (contentDir) {
  const site = { ...DEFAULT_SITE, ...await readJson(path.join(contentDir, 'site.json'), {}) }
  const menu = await readJson(path.join(contentDir, 'menu.json'), [])
  let style = ''
  try {
    style = await fs.readFile(path.join(contentDir, 'style.css'), 'utf8')
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }
  return { site, menu, style, pages: await readPages(contentDir) }
}
