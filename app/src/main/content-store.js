// Edits to the content folder requested by the renderer.

import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { DEFAULT_SITE, SLUG_PATTERN, parsePage, readContent, readPages, serializePage, slugify } from './generator/content.js'

const IMAGE_TYPES = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif'])

export class ContentStore {
  constructor (contentDir) {
    this.dir = contentDir
  }

  file (...parts) {
    return path.join(this.dir, ...parts)
  }

  pageFile (slug) {
    if (!SLUG_PATTERN.test(slug)) {
      throw new Error(`Invalid page address "${slug}": use lowercase letters, digits and dashes`)
    }
    return this.file('pages', `${slug}.md`)
  }

  async writeJson (name, value) {
    await fs.mkdir(this.dir, { recursive: true })
    await fs.writeFile(this.file(name), JSON.stringify(value, null, 2) + '\n')
  }

  async load () {
    return readContent(this.dir)
  }

  async listPages () {
    return (await readPages(this.dir)).map(({ slug, title }) => ({ slug, title }))
  }

  async getPage (slug) {
    return parsePage(slug, await fs.readFile(this.pageFile(slug), 'utf8'))
  }

  async savePage ({ slug, title, description, body }) {
    await fs.mkdir(this.file('pages'), { recursive: true })
    await fs.writeFile(this.pageFile(slug), serializePage({ title, description, body }))
  }

  async createPage (title) {
    const existing = new Set((await this.listPages()).map(p => p.slug))
    const base = slugify(title)
    let slug = base
    for (let i = 2; existing.has(slug); i++) {
      slug = `${base}-${i}`
    }
    await this.savePage({ slug, title, body: '' })
    return slug
  }

  /** Renames a page file and updates the menu and home page that point at it. */
  async renamePage (from, to) {
    if (from === to) {
      return
    }
    const target = this.pageFile(to)
    if (await exists(target)) {
      throw new Error(`A page with the address "${to}" already exists`)
    }
    await fs.rename(this.pageFile(from), target)
    const { site, menu } = await this.load()
    if (site.homePage === from) {
      await this.saveSite({ ...site, homePage: to })
    }
    if (menu.some(item => item.type === 'page' && item.page === from)) {
      await this.saveMenu(menu.map(item => item.type === 'page' && item.page === from ? { ...item, page: to } : item))
    }
  }

  async deletePage (slug) {
    const { site, menu } = await this.load()
    if (site.homePage === slug) {
      throw new Error('The home page cannot be deleted. Choose another home page in Settings first.')
    }
    await fs.rm(this.pageFile(slug))
    const remaining = menu.filter(item => !(item.type === 'page' && item.page === slug))
    if (remaining.length !== menu.length) {
      await this.saveMenu(remaining)
    }
  }

  async getMenu () {
    return (await this.load()).menu
  }

  async saveMenu (menu) {
    const clean = menu.map(item => item.type === 'page'
      ? { id: item.id, label: String(item.label), type: 'page', page: item.page }
      : { id: item.id, label: String(item.label), type: 'url', url: String(item.url), newTab: Boolean(item.newTab) })
    await this.writeJson('menu.json', clean)
  }

  async getSite () {
    return (await this.load()).site
  }

  async saveSite (site) {
    const clean = {}
    for (const key of Object.keys(DEFAULT_SITE)) {
      clean[key] = site[key] ?? DEFAULT_SITE[key]
    }
    await this.writeJson('site.json', clean)
  }

  async getStyle () {
    return (await this.load()).style
  }

  async saveStyle (css) {
    await fs.writeFile(this.file('style.css'), css)
  }

  /** Copies an image into content/assets and returns its content-relative path. */
  async saveAsset ({ name, data }) {
    const ext = path.extname(name).toLowerCase()
    if (!IMAGE_TYPES.has(ext)) {
      throw new Error(`Unsupported image type "${ext || name}"`)
    }
    const bytes = Buffer.from(data)
    const hash = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 8)
    const fileName = `${slugify(path.basename(name, ext))}-${hash}${ext === '.jpeg' ? '.jpg' : ext}`
    await fs.mkdir(this.file('assets'), { recursive: true })
    await fs.writeFile(this.file('assets', fileName), bytes)
    return `assets/${fileName}`
  }
}

async function exists (file) {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}
