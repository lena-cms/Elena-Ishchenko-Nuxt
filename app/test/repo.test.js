import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { Repo, pagesUrl, parseRepoUrl } from '../src/main/repo.js'
import { gitAvailable, startGitServer } from './git-server.js'

const skip = !gitAvailable() && 'git is not installed'
let root, server

const fakeApi = async (token, route) => route === '/user'
  ? { login: 'tester', id: 1, name: 'Tester', email: null }
  : { default_branch: 'main' }

function git (cwd, ...args) {
  return execFileSync('git', args, { cwd, env: { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@t', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@t' } }).toString().trim()
}

before(async () => {
  if (skip) return
  root = await fs.mkdtemp(path.join(os.tmpdir(), 'lena-cms-repo-'))
  const seed = path.join(root, 'seed')
  await fs.mkdir(path.join(seed, 'content/pages'), { recursive: true })
  await fs.writeFile(path.join(seed, 'content/pages/home.md'), '---\ntitle: Home\n---\n\nHello\n')
  await fs.writeFile(path.join(seed, 'content/site.json'), '{"homePage":"home"}\n')
  await fs.writeFile(path.join(seed, 'README.md'), 'readme\n')
  git(seed, 'init', '-q', '-b', 'main')
  git(seed, 'add', '.')
  git(seed, 'commit', '-q', '-m', 'seed')
  git(root, 'clone', '-q', '--bare', 'seed', 'site.git')
  git(path.join(root, 'site.git'), 'config', 'http.receivepack', 'true')
  server = await startGitServer(root)
})

after(() => server?.close())

function open (name) {
  return new Repo({
    dir: path.join(root, name),
    repoUrl: 'https://github.com/owner/site',
    token: 'x',
    remoteUrl: `${server.url}/site.git`,
    api: fakeApi
  })
}

test('parseRepoUrl and pagesUrl', () => {
  assert.equal(parseRepoUrl('https://github.com/a/b').url, 'https://github.com/a/b.git')
  assert.equal(parseRepoUrl('git@github.com:a/b.git').name, 'b')
  assert.equal(parseRepoUrl('github.com/a/b/').owner, 'a')
  assert.throws(() => parseRepoUrl('https://gitlab.com/a/b'))
  assert.equal(pagesUrl({ owner: 'Lena-CMS', name: 'Site' }), 'https://lena-cms.github.io/Site/')
  assert.equal(pagesUrl({ owner: 'me', name: 'me.github.io' }), 'https://me.github.io/')
})

test('clone, edit, commit and push only content/ and docs/', { skip }, async () => {
  const repo = open('a')
  await repo.open()
  assert.deepEqual(await repo.changes(), [])

  await fs.writeFile(path.join(repo.contentDir, 'pages/home.md'), '---\ntitle: Home\n---\n\nChanged\n')
  await fs.writeFile(path.join(repo.contentDir, 'pages/new.md'), '---\ntitle: New\n---\n')
  await fs.mkdir(repo.docsDir)
  await fs.writeFile(path.join(repo.docsDir, 'index.html'), '<p>Changed</p>')
  await fs.writeFile(path.join(repo.dir, 'README.md'), 'not staged\n')
  assert.deepEqual((await repo.changes()).map(c => c.status).sort(), ['added', 'modified'])

  const result = await repo.commitAndPush('Edit')
  assert.equal(result.files, 3)
  const bare = path.join(root, 'site.git')
  assert.equal(git(bare, 'log', '-1', '--format=%s %an'), 'Edit Tester')
  assert.equal(git(bare, 'show', 'main:content/pages/home.md').includes('Changed'), true)
  assert.equal(git(bare, 'show', 'main:docs/index.html'), '<p>Changed</p>')
  assert.equal(git(bare, 'show', 'main:README.md'), 'readme')
  assert.equal(await repo.commitAndPush('Nothing'), null)
})

test('sync fast-forwards and a rejected push keeps the edits uncommitted', { skip }, async () => {
  const a = open('b1')
  const b = open('b2')
  await a.open()
  await b.open()

  await fs.writeFile(path.join(a.contentDir, 'site.json'), '{"homePage":"home","title":"A"}\n')
  await a.commitAndPush('From A')

  await fs.writeFile(path.join(b.contentDir, 'pages/home.md'), '---\ntitle: Home\n---\n\nFrom B\n')
  const before = git(b.dir, 'rev-parse', 'HEAD')
  await assert.rejects(b.commitAndPush('From B'), /newer changes/)
  assert.equal(git(b.dir, 'rev-parse', 'HEAD'), before, 'local commit undone')
  assert.equal((await b.changes()).length, 1, 'edit still pending')

  await b.sync()
  assert.match(await fs.readFile(path.join(b.contentDir, 'pages/home.md'), 'utf8'), /From B/, 'local edit kept')
  assert.match(await fs.readFile(path.join(b.contentDir, 'site.json'), 'utf8'), /"A"/)
  await b.commitAndPush('From B')
  assert.equal(git(path.join(root, 'site.git'), 'log', '-1', '--format=%s'), 'From B')
})

test('sync refuses when the remote changed a locally edited file', { skip }, async () => {
  const a = open('d1')
  const b = open('d2')
  await a.open()
  await b.open()
  await fs.writeFile(path.join(a.contentDir, 'pages/home.md'), '---\ntitle: Home\n---\n\nA2\n')
  await fs.writeFile(path.join(a.contentDir, 'pages/added.md'), '---\ntitle: Added\n---\n')
  await a.commitAndPush('A2')

  const home = path.join(b.contentDir, 'pages/home.md')
  await fs.writeFile(home, 'local')
  await assert.rejects(b.sync(), /content\/pages\/home\.md/)
  assert.equal(await fs.readFile(home, 'utf8'), 'local')

  await b.discard()
  await b.sync()
  assert.match(await fs.readFile(home, 'utf8'), /A2/)
  await fs.stat(path.join(b.contentDir, 'pages/added.md'))
  assert.deepEqual(await b.changes(), [])
})

test('discard restores modified files and removes new ones', { skip }, async () => {
  const repo = open('c')
  await repo.open()
  const home = path.join(repo.contentDir, 'pages/home.md')
  const original = await fs.readFile(home, 'utf8')
  await fs.writeFile(home, 'changed')
  await fs.writeFile(path.join(repo.contentDir, 'pages/extra.md'), 'x')
  await repo.discard()
  assert.equal(await fs.readFile(home, 'utf8'), original)
  await assert.rejects(fs.stat(path.join(repo.contentDir, 'pages/extra.md')))
  assert.deepEqual(await repo.changes(), [])
})
