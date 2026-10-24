// Local working copy of the website repository, driven by isomorphic-git so
// the app does not depend on git being installed on the Mac.
//
// Only content/ (edited by the app) and docs/ (generated) are ever staged;
// the rest of the repository, including the app's own source, is left alone.

import fs from 'node:fs'
import path from 'node:path'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'

const TRACKED = ['content/', 'docs/']

/**
 * Accepts https://github.com/owner/repo(.git), github.com/owner/repo or
 * git@github.com:owner/repo.git and returns { owner, name, url }.
 */
export function parseRepoUrl (input) {
  const text = String(input || '').trim()
  const match = /^(?:https?:\/\/)?(?:[^@/]+@)?github\.com[:/]([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/i.exec(text)
  if (!match) {
    throw new Error('Expected a GitHub repository URL like https://github.com/owner/repo')
  }
  const [, owner, name] = match
  return { owner, name, url: `https://github.com/${owner}/${name}.git` }
}

/** The GitHub Pages address for a repository. */
export function pagesUrl ({ owner, name }) {
  return name.toLowerCase() === `${owner.toLowerCase()}.github.io`
    ? `https://${name}/`
    : `https://${owner.toLowerCase()}.github.io/${name}/`
}

async function githubApi (token, route) {
  const res = await fetch(`https://api.github.com${route}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const err = new Error(`GitHub: ${body.message || res.statusText} (${res.status})`)
    err.status = res.status
    throw err
  }
  return res.json()
}

/** Files that differ between two commits: [{ filepath, oid }] with oid null when deleted. */
async function changedBetween (dir, fromOid, toOid) {
  const changes = []
  await git.walk({
    fs,
    dir,
    trees: [git.TREE({ ref: fromOid }), git.TREE({ ref: toOid })],
    map: async (filepath, [a, b]) => {
      if (filepath === '.') {
        return true
      }
      const [aType, bType] = await Promise.all([a?.type(), b?.type()])
      if (aType === 'tree' || bType === 'tree') {
        return true
      }
      const [aOid, bOid] = await Promise.all([
        aType === 'blob' ? a.oid() : null,
        bType === 'blob' ? b.oid() : null
      ])
      if (aOid !== bOid) {
        changes.push({ filepath, oid: bOid })
      }
      return true
    }
  })
  return changes
}

export class Repo {
  /**
   * `remoteUrl` and `api` replace the GitHub clone URL and REST client; they
   * exist for tests and local development against a git server on localhost.
   */
  constructor ({ dir, repoUrl, token, remoteUrl, api = githubApi }) {
    this.dir = dir
    this.repo = parseRepoUrl(repoUrl)
    this.remoteUrl = remoteUrl || this.repo.url
    this.token = token
    this.api = api
    this.author = null
    this.branch = null
  }

  get contentDir () {
    return path.join(this.dir, 'content')
  }

  get docsDir () {
    return path.join(this.dir, 'docs')
  }

  get pagesUrl () {
    return pagesUrl(this.repo)
  }

  options () {
    return {
      fs,
      http,
      dir: this.dir,
      onAuth: () => ({ username: 'x-access-token', password: this.token })
    }
  }

  /** Checks the token can reach the repository and remembers the commit author. */
  async verify () {
    const { owner, name } = this.repo
    let info
    try {
      info = await this.api(this.token, `/repos/${owner}/${name}`)
    } catch (err) {
      if (err.status === 404 || err.status === 401) {
        throw new Error('The token cannot access this repository. Check the URL and that the token has access to it.')
      }
      throw err
    }
    this.branch = info.default_branch
    const user = await this.api(this.token, '/user')
    this.author = {
      name: user.name || user.login,
      email: user.email || `${user.id}+${user.login}@users.noreply.github.com`
    }
  }

  /** Clones on first use; re-clones when the folder belongs to another repository. */
  async open () {
    await this.verify()
    if (fs.existsSync(path.join(this.dir, '.git'))) {
      const remote = await git.getConfig({ fs, dir: this.dir, path: 'remote.origin.url' })
      const branch = await git.currentBranch({ fs, dir: this.dir })
      if (remote === this.remoteUrl && branch === this.branch) {
        return
      }
      await fs.promises.rm(this.dir, { recursive: true, force: true })
    }
    await fs.promises.mkdir(this.dir, { recursive: true })
    await git.clone({ ...this.options(), url: this.remoteUrl, ref: this.branch, singleBranch: true })
  }

  /** Files under content/ that differ from the last commit. */
  async changes () {
    const matrix = await git.statusMatrix({
      fs,
      dir: this.dir,
      filter: f => f.startsWith('content/')
    })
    return matrix
      .filter(([, head, workdir, stage]) => head !== workdir || workdir !== stage)
      .map(([file, head, workdir]) => ({
        file,
        status: head === 0 ? 'added' : workdir === 0 ? 'deleted' : 'modified'
      }))
  }

  /**
   * Fast-forwards to the remote branch, rewriting only the files that changed
   * there. Uncommitted edits are kept; if the remote changed a file that is
   * also edited locally, nothing is touched and an error explains why.
   *
   * (isomorphic-git's own pull overwrites unrelated uncommitted edits.)
   */
  async sync () {
    const { dir } = this
    await git.fetch({ ...this.options(), ref: this.branch, singleBranch: true })
    const local = await git.resolveRef({ fs, dir, ref: 'HEAD' })
    const remote = await git.resolveRef({ fs, dir, ref: `refs/remotes/origin/${this.branch}` })
    if (local === remote) {
      return
    }
    if (!await git.isDescendent({ fs, dir, oid: remote, ancestor: local, depth: -1 })) {
      throw new Error('The local copy has commits that are not on GitHub. Use "Reset local copy" in Settings.')
    }

    const incoming = await changedBetween(dir, local, remote)
    const edited = new Set((await this.changes()).map(c => c.file))
    const conflicts = incoming.filter(c => edited.has(c.filepath)).map(c => c.filepath)
    if (conflicts.length) {
      throw new Error(`The website was changed elsewhere in files you are also editing (${conflicts.join(', ')}). Discard your edits to those files first.`)
    }

    for (const { filepath, oid } of incoming) {
      const file = path.join(dir, filepath)
      if (oid) {
        const { blob } = await git.readBlob({ fs, dir, oid })
        await fs.promises.mkdir(path.dirname(file), { recursive: true })
        await fs.promises.writeFile(file, blob)
        await git.add({ fs, dir, filepath })
      } else {
        await fs.promises.rm(file, { force: true })
        await git.remove({ fs, dir, filepath })
      }
    }
    await git.writeRef({ fs, dir, ref: `refs/heads/${this.branch}`, value: remote, force: true })
  }

  /** Stages content/ and docs/, commits and pushes. Undoes the commit if the push fails. */
  async commitAndPush (message) {
    const matrix = await git.statusMatrix({
      fs,
      dir: this.dir,
      filter: f => TRACKED.some(prefix => f.startsWith(prefix))
    })
    const changed = matrix.filter(([, head, workdir, stage]) => head !== workdir || workdir !== stage)
    if (!changed.length) {
      return null
    }
    for (const [filepath, , workdir] of changed) {
      if (workdir === 0) {
        await git.remove({ fs, dir: this.dir, filepath })
      } else {
        await git.add({ fs, dir: this.dir, filepath })
      }
    }

    const previous = await git.resolveRef({ fs, dir: this.dir, ref: 'HEAD' })
    const oid = await git.commit({ fs, dir: this.dir, message, author: this.author })
    try {
      await git.push({ ...this.options(), ref: this.branch, remote: 'origin' })
    } catch (err) {
      // Soft reset: move the branch back, keep the files and the index.
      await git.writeRef({ fs, dir: this.dir, ref: `refs/heads/${this.branch}`, value: previous, force: true })
      if (err.code === 'PushRejectedError') {
        throw new Error('GitHub has newer changes. Press "Sync" and commit again.')
      }
      throw err
    }
    return { oid, files: changed.length }
  }

  /** Throws away all local edits under content/ (restores the last commit). */
  async discard () {
    const changes = await this.changes()
    for (const { file, status } of changes.filter(c => c.status === 'added')) {
      await fs.promises.rm(path.join(this.dir, file), { force: true })
      await git.remove({ fs, dir: this.dir, filepath: file })
    }
    const restore = changes.filter(c => c.status !== 'added').map(c => c.file)
    if (restore.length) {
      await git.checkout({ fs, dir: this.dir, ref: this.branch, filepaths: restore, force: true })
    }
  }

  /** Deletes the working copy and clones it again. */
  async reset () {
    await fs.promises.rm(this.dir, { recursive: true, force: true })
    await this.open()
  }
}
