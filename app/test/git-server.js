// Minimal smart-HTTP git server (git http-backend) for testing push/pull on localhost.
import { execFileSync, spawn } from 'node:child_process'
import http from 'node:http'

export function gitAvailable () {
  try {
    execFileSync('git', ['--version'])
    return true
  } catch {
    return false
  }
}

export async function startGitServer (projectRoot) {
  const backend = execFileSync('git', ['--exec-path']).toString().trim() + '/git-http-backend'
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    const child = spawn(backend, [], {
      env: {
        GIT_PROJECT_ROOT: projectRoot,
        GIT_HTTP_EXPORT_ALL: '1',
        REMOTE_USER: 'test',
        REQUEST_METHOD: req.method,
        PATH_INFO: url.pathname,
        QUERY_STRING: url.search.slice(1),
        CONTENT_TYPE: req.headers['content-type'] || '',
        HTTP_CONTENT_ENCODING: req.headers['content-encoding'] || '',
        GIT_PROTOCOL: req.headers['git-protocol'] || ''
      }
    })
    req.pipe(child.stdin)
    let head = Buffer.alloc(0)
    let headerDone = false
    child.stdout.on('data', chunk => {
      if (headerDone) {
        res.write(chunk)
        return
      }
      head = Buffer.concat([head, chunk])
      const end = head.indexOf('\r\n\r\n')
      if (end === -1) {
        return
      }
      headerDone = true
      let status = 200
      for (const line of head.slice(0, end).toString().split('\r\n')) {
        const [key, ...rest] = line.split(':')
        const value = rest.join(':').trim()
        if (key.toLowerCase() === 'status') {
          status = parseInt(value, 10)
        } else {
          res.setHeader(key, value)
        }
      }
      res.writeHead(status)
      res.write(head.slice(end + 4))
    })
    child.on('close', () => res.end())
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() }
}
