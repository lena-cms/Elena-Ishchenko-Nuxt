// Repository URL and GitHub token live in the macOS login Keychain, managed
// through the system `security` tool so the app ships no native modules.
// Secrets are written via `security -i` on stdin, never as process arguments
// (which any local process could read from the process list).

import { execFile, spawn } from 'node:child_process'

// Overridable so automated tests do not touch the real entry.
const SERVICE = process.env.LENA_CMS_KEYCHAIN_SERVICE || 'Lena CMS'
const ITEM_NOT_FOUND = 44

function run (args) {
  return new Promise((resolve, reject) => {
    execFile('/usr/bin/security', args, (err, stdout, stderr) => {
      if (err) {
        err.stderr = stderr
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })
}

async function getSecret (account) {
  try {
    return (await run(['find-generic-password', '-s', SERVICE, '-a', account, '-w'])).replace(/\n$/, '')
  } catch (err) {
    if (err.code === ITEM_NOT_FOUND) {
      return null
    }
    throw err
  }
}

function setSecret (account, value) {
  // `security -i` parses its input like a shell line; refuse anything that
  // would need escaping rather than trying to escape it.
  if (/["\\\n\r]/.test(value)) {
    return Promise.reject(new Error('Value contains unsupported characters (quotes, backslashes or newlines)'))
  }
  return new Promise((resolve, reject) => {
    const child = spawn('/usr/bin/security', ['-i'])
    let stderr = ''
    child.stderr.on('data', d => { stderr += d })
    child.on('error', reject)
    child.on('close', code => {
      if (code === 0 && !stderr.trim()) {
        resolve()
      } else {
        reject(new Error(`Could not save to Keychain: ${stderr.trim() || 'exit code ' + code}`))
      }
    })
    child.stdin.end(`add-generic-password -U -s "${SERVICE}" -a "${account}" -w "${value}"\n`)
  })
}

async function deleteSecret (account) {
  try {
    await run(['delete-generic-password', '-s', SERVICE, '-a', account])
  } catch (err) {
    if (err.code !== ITEM_NOT_FOUND) {
      throw err
    }
  }
}

/** Returns { repoUrl, token } or null when the app has not been set up. */
export async function loadCredentials () {
  const [repoUrl, token] = await Promise.all([getSecret('repoUrl'), getSecret('githubToken')])
  return repoUrl && token ? { repoUrl, token } : null
}

export async function saveCredentials ({ repoUrl, token }) {
  await setSecret('repoUrl', repoUrl)
  await setSecret('githubToken', token)
}

export async function clearCredentials () {
  await deleteSecret('repoUrl')
  await deleteSecret('githubToken')
}
