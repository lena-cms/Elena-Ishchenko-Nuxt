import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { buildSite } from '../src/main/generator/index.js'
import { parsePage, serializePage, slugify } from '../src/main/generator/content.js'
import { renderMarkdown, resolveHref } from '../src/main/generator/markdown.js'

async function fixture (files) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'lena-cms-test-'))
  for (const [rel, data] of Object.entries(files)) {
    await fs.mkdir(path.dirname(path.join(dir, rel)), { recursive: true })
    await fs.writeFile(path.join(dir, rel), data)
  }
  return dir
}

const basic = {
  'content/site.json': JSON.stringify({ title: 'Site', homePage: 'about', siteUrl: 'https://u.github.io/repo/' }),
  'content/menu.json': JSON.stringify([
    { id: 'a', label: 'About', type: 'page', page: 'about' },
    { id: 'b', label: 'Ext', type: 'url', url: 'https://example.com', newTab: true },
    { id: 'c', label: 'CV', type: 'page', page: 'cv' }
  ]),
  'content/style.css': 'body { color: red }',
  'content/pages/about.md': '---\ntitle: About\n---\n\nHello [cv](/cv) and [ext](https://x.org).\n',
  'content/pages/cv.md': '---\ntitle: CV\n---\n\n| | | |\n|-|-|-|\n| **A** | 2020 | x |\n\n![pic](assets/p.png)\n',
  'content/assets/p.png': 'png'
}

test('builds home at root and other pages in subdirectories', async () => {
  const dir = await fixture(basic)
  const out = path.join(dir, 'docs')
  const files = await buildSite({ contentDir: path.join(dir, 'content'), outDir: out })
  assert.ok(files.includes('index.html'))
  assert.ok(files.includes('cv/index.html'))
  assert.ok(!files.includes('about/index.html'))
  assert.ok(files.includes('assets/p.png'))
  assert.ok(files.includes('.nojekyll'))
  assert.ok(!files.includes('CNAME'))

  const home = await fs.readFile(path.join(out, 'index.html'), 'utf8')
  assert.match(home, /<title>Site<\/title>/)
  assert.match(home, /href="\.\/style\.css"/)
  assert.match(home, /<a href="\.\/cv\/">cv<\/a>/)
  assert.match(home, /<a href="https:\/\/x\.org" target="_blank" rel="noreferrer noopener">ext<\/a>/)
  assert.match(home, /<a href="\.\/" aria-current="page">About<\/a>/)
  assert.match(home, /href="https:\/\/example\.com" target="_blank"/)

  const cv = await fs.readFile(path.join(out, 'cv/index.html'), 'utf8')
  assert.match(cv, /<title>CV - Site<\/title>/)
  assert.match(cv, /href="\.\.\/style\.css"/)
  assert.match(cv, /<a href="\.\.\/">About<\/a>/)
  assert.match(cv, /src="\.\.\/assets\/p\.png"/)
  assert.doesNotMatch(cv, /<thead>/, 'empty header row is dropped')

  const notFound = await fs.readFile(path.join(out, '404.html'), 'utf8')
  assert.match(notFound, /href="\/repo\/style\.css"/)
  assert.match(await fs.readFile(path.join(out, 'sitemap.xml'), 'utf8'), /https:\/\/u\.github\.io\/repo\/cv\//)
})

test('writes CNAME and uses root paths for a custom domain', async () => {
  const dir = await fixture({
    ...basic,
    'content/site.json': JSON.stringify({ title: 'Site', homePage: 'about', customDomain: 'example.org' })
  })
  const out = path.join(dir, 'docs')
  await buildSite({ contentDir: path.join(dir, 'content'), outDir: out })
  assert.equal(await fs.readFile(path.join(out, 'CNAME'), 'utf8'), 'example.org\n')
  assert.match(await fs.readFile(path.join(out, '404.html'), 'utf8'), /href="\/style\.css"/)
})

test('keeps a CNAME written by GitHub when site.json has no domain', async () => {
  const dir = await fixture({ ...basic, 'docs/CNAME': 'example.net\n' })
  const out = path.join(dir, 'docs')
  await buildSite({ contentDir: path.join(dir, 'content'), outDir: out })
  assert.equal(await fs.readFile(path.join(out, 'CNAME'), 'utf8'), 'example.net\n')
})

test('removes stale output', async () => {
  const dir = await fixture({ ...basic, 'docs/old/index.html': 'old' })
  await buildSite({ contentDir: path.join(dir, 'content'), outDir: path.join(dir, 'docs') })
  await assert.rejects(fs.stat(path.join(dir, 'docs/old')))
})

test('fails when the home page is missing', async () => {
  const dir = await fixture({ ...basic, 'content/site.json': JSON.stringify({ homePage: 'nope' }) })
  await assert.rejects(
    buildSite({ contentDir: path.join(dir, 'content'), outDir: path.join(dir, 'docs') }),
    /Home page "nope"/
  )
})

test('resolveHref', () => {
  const ctx = { prefix: '../', homePage: 'about' }
  assert.equal(resolveHref('https://a.b/c', ctx), 'https://a.b/c')
  assert.equal(resolveHref('mailto:x@y.z', ctx), 'mailto:x@y.z')
  assert.equal(resolveHref('#top', ctx), '#top')
  assert.equal(resolveHref('/cv', ctx), '../cv/')
  assert.equal(resolveHref('cv/#x', ctx), '../cv/#x')
  assert.equal(resolveHref('/about', ctx), '../')
  assert.equal(resolveHref('/', ctx), '../')
  assert.equal(resolveHref('assets/a b.png', ctx), '../assets/a b.png')
})

test('renderMarkdown keeps mailto links in the same tab and rewrites raw img', () => {
  const html = renderMarkdown('[m](mailto:a@b.c)\n\n<img src="assets/x.png">', { prefix: '../', homePage: 'h' })
  assert.match(html, /<a href="mailto:a@b\.c">m<\/a>/)
  assert.match(html, /<img src="\.\.\/assets\/x\.png">/)
})

test('page round trip', () => {
  const source = serializePage({ title: 'A: B', body: '# Hi\n\ntext' })
  assert.deepEqual(parsePage('a', source), { slug: 'a', title: 'A: B', description: '', body: '# Hi\n\ntext\n' })
})

test('slugify', () => {
  assert.equal(slugify('Über Uns!'), 'uber-uns')
  assert.equal(slugify('Өмә'), 'page')
})
