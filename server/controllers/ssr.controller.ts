import type { Request, Response, NextFunction } from 'express'
import type { ViteDevServer } from 'vite'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { fetchItems } from '../services/api.service.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function createSSRHandler(vite: ViteDevServer) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const url = req.url.split('?')[0]
    if (url !== '/') {
      return next()
    }

    try {
      const items = await fetchItems()

      const template = readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
      )

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
      const { html: reactHtml } = await render(items)

      const htmlWithReact = template.replace('<!--app-html-->', reactHtml)
      const finalHtml = await vite.transformIndexHtml(req.url, htmlWithReact)

      res.status(200).set({ 'Content-Type': 'text/html' }).send(finalHtml)
    } catch (error) {
      vite.ssrFixStacktrace(error as Error)
      console.error('❌ SSR Error:', error)
      next(error)
    }
  }
}
