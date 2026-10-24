// Markdown references images as assets/<file>; inside the app they are served
// from the working copy through the cms://asset/ protocol.
export const toEditor = md => md.replace(/(\]\(|src=")assets\//g, '$1cms://asset/')
export const fromEditor = md => md.replace(/cms:\/\/asset\//g, 'assets/')

/** Copies an image file into content/assets and returns a src usable in the editor. */
export async function uploadImage (file) {
  const data = new Uint8Array(await file.arrayBuffer())
  const rel = await window.cms.saveAsset({ name: file.name, data })
  return rel.replace(/^assets\//, 'cms://asset/')
}
