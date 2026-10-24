const { contextBridge, ipcRenderer } = require('electron')

// Must match the handler names in src/main/index.js.
const METHODS = [
  'init', 'setup', 'signOut', 'state', 'sync', 'discard', 'resetLocalCopy', 'commit',
  'preview', 'previewUrl', 'openExternal',
  'listPages', 'getPage', 'savePage', 'createPage', 'renamePage', 'deletePage',
  'getMenu', 'saveMenu', 'getSite', 'saveSite', 'getStyle', 'saveStyle', 'saveAsset'
]

const api = {}
for (const name of METHODS) {
  api[name] = async (...args) => {
    try {
      return await ipcRenderer.invoke(`cms:${name}`, ...args)
    } catch (err) {
      // Electron wraps errors as "Error invoking remote method 'x': Error: message".
      throw new Error(String(err.message).replace(/^Error invoking remote method '[^']+': (\w*Error: )?/, ''))
    }
  }
}
api.onProgress = callback => {
  const listener = (event, message) => callback(message)
  ipcRenderer.on('cms:progress', listener)
  return () => ipcRenderer.removeListener('cms:progress', listener)
}

contextBridge.exposeInMainWorld('cms', api)
