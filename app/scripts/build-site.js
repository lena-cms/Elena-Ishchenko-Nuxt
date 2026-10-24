#!/usr/bin/env node
// Builds the website without the app: node scripts/build-site.js <contentDir> <outDir>
import path from 'node:path'
import { buildSite } from '../src/main/generator/index.js'

const [contentDir = '../content', outDir = '../docs'] = process.argv.slice(2)
const files = await buildSite({
  contentDir: path.resolve(contentDir),
  outDir: path.resolve(outDir)
})
console.log(`Built ${files.length} files into ${path.resolve(outDir)}`)
