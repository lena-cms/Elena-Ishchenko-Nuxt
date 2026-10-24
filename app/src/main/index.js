import { app, BrowserWindow, ipcMain, net, protocol, shell } from 'electron'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { clearCredentials, loadCredentials, saveCredentials } from './credentials.js'
import { Repo, parseRepoUrl } from './repo.js'
import { ContentStore } from './content-store.js'
import { buildSite } from './generator/index.js'

const here = path.dirname(fileURLToPath(import.meta.url))

// Development only: LENA_CMS_DEV_REMOTE=http://localhost:…/repo.git works
// against a local git server with a stubbed GitHub API.
const devRemote = !app.isPackaged && process.env.LENA_CMS_DEV_REMOTE
if (!app.isPackaged && process.env.LENA_CMS_USER_DATA) {
  app.setPath('userData', process.env.LENA_CMS_USER_DATA)
}
const devApi = async (token, route) => route === '/user'
  ? { login: 'dev', id: 0, name: 'Developer', email: 'dev@localhost' }
  : { default_branch: 'main' }
const repoDir = () => path.join(app.getPath('userData'), 'repo')
const previewDir = () => path.join(app.getPath('userData'), 'preview')

// cms://asset/<file>   -> content/assets/<file> of the working copy (editor images)
// cms://preview/<path> -> last preview build (CSS editor and preview window)
protocol.registerSchemesAsPrivileged([
  { scheme: 'cms', privileges: { standard: true, secure: true, supportFetchAPI: true } }
])

let mainWindow = null
let repo = null
let store = null

function requireRepo () {
  if (!repo) {
    throw new Error('The repository is not open yet')
  }
  return repo
}

function progress (message) {
  mainWindow?.webContents.send('cms:progress', message)
}

async function openRepo (credentials) {
  const next = new Repo({
    dir: repoDir(),
    ...credentials,
    ...(devRemote ? { remoteUrl: devRemote, api: devApi } : {})
  })
  progress('Downloading the website…')
  await next.open()
  repo = next
  store = new ContentStore(next.contentDir)
  return state()
}

async function state () {
  const r = requireRepo()
  return {
    repo: `${r.repo.owner}/${r.repo.name}`,
    branch: r.branch,
    pagesUrl: r.pagesUrl,
    changes: await r.changes()
  }
}

async function buildPreview () {
  await buildSite({ contentDir: requireRepo().contentDir, outDir: previewDir() })
}

// Every handler is exposed to the renderer as window.cms.<name>(...args).
const handlers = {
  async init () {
    const credentials = await loadCredentials()
    if (!credentials) {
      return { configured: false }
    }
    return { configured: true, ...await openRepo(credentials) }
  },
  async setup ({ repoUrl, token }) {
    const normalized = parseRepoUrl(repoUrl).url
    const result = await openRepo({ repoUrl: normalized, token: token.trim() })
    await saveCredentials({ repoUrl: normalized, token: token.trim() })
    return { configured: true, ...result }
  },
  async signOut () {
    await clearCredentials()
    await fs.rm(repoDir(), { recursive: true, force: true })
    repo = null
    store = null
  },
  state,
  async sync () {
    progress('Fetching changes from GitHub…')
    await requireRepo().sync()
    return state()
  },
  async discard () {
    await requireRepo().discard()
    return state()
  },
  async resetLocalCopy () {
    progress('Downloading the website again…')
    await requireRepo().reset()
    return state()
  },
  async commit (message) {
    const r = requireRepo()
    progress('Fetching changes from GitHub…')
    await r.sync()
    progress('Building the website…')
    await buildSite({ contentDir: r.contentDir, outDir: r.docsDir })
    progress('Uploading to GitHub…')
    const result = await r.commitAndPush(message || 'Update website')
    return { result, ...await state() }
  },
  async preview () {
    await buildPreview()
    const win = new BrowserWindow({ width: 1280, height: 900, title: 'Preview' })
    win.webContents.setWindowOpenHandler(openInBrowser)
    win.loadURL('cms://preview/index.html')
  },
  async previewUrl (slug) {
    await buildPreview()
    const { site } = await store.load()
    return `cms://preview/${slug === site.homePage ? '' : slug + '/'}index.html?t=${Date.now()}`
  },
  openExternal (url) {
    if (/^(https?|mailto):/.test(url)) {
      shell.openExternal(url)
    }
  },
  listPages: () => store.listPages(),
  getPage: slug => store.getPage(slug),
  savePage: page => store.savePage(page),
  createPage: title => store.createPage(title),
  renamePage: (from, to) => store.renamePage(from, to),
  deletePage: slug => store.deletePage(slug),
  getMenu: () => store.getMenu(),
  saveMenu: menu => store.saveMenu(menu),
  getSite: () => store.getSite(),
  saveSite: site => store.saveSite(site),
  getStyle: () => store.getStyle(),
  saveStyle: css => store.saveStyle(css),
  saveAsset: file => store.saveAsset(file)
}

for (const [name, fn] of Object.entries(handlers)) {
  ipcMain.handle(`cms:${name}`, (event, ...args) => fn(...args))
}

async function serveCms (request) {
  const url = new URL(request.url)
  const root = url.host === 'asset'
    ? (repo && path.join(repo.contentDir, 'assets'))
    : url.host === 'preview' ? previewDir() : null
  if (!root) {
    return new Response('Not found', { status: 404 })
  }
  let rel = decodeURIComponent(url.pathname)
  if (rel.endsWith('/')) {
    rel += 'index.html'
  }
  const file = path.join(root, rel)
  if (!file.startsWith(root + path.sep)) {
    return new Response('Forbidden', { status: 403 })
  }
  return net.fetch(pathToFileURL(file).toString())
}

// Links with target=_blank open in the browser, not in another app window.
function openInBrowser ({ url }) {
  handlers.openExternal(url)
  return { action: 'deny' }
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(here, '../preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })
  mainWindow.webContents.setWindowOpenHandler(openInBrowser)
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(path.join(here, '../renderer/index.html'))
  }
  mainWindow.on('closed', () => { mainWindow = null })
}

app.whenReady().then(() => {
  protocol.handle('cms', serveCms)
  createWindow()
  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
