import type { Request, Response, NextFunction } from 'express'
import type { ViteDevServer } from 'vite'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function renderSSR(
  vite: ViteDevServer,
  req: Request,
  res: Response,
  url: string,
  initialData: any
): Promise<void> {
  try {
    const template = readFileSync(
      resolve(__dirname, '../../index.html'),
      'utf-8'
    )

    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
    const { html: reactHtml } = await render(url, initialData)

    const htmlWithReact = template.replace('<!--app-html-->', reactHtml)
    const finalHtml = await vite.transformIndexHtml(req.url, htmlWithReact)

    res.status(200).set({ 'Content-Type': 'text/html' }).send(finalHtml)
  } catch (error) {
    vite.ssrFixStacktrace(error as Error)
    console.error('❌ SSR Error:', error)
    throw error
  }
}

export function shouldSkipRoute(url: string): boolean {
  return url.includes('.')
}

export function handleSSRError(
  error: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  console.error('❌ SSR Handler Error:', error)
  next(error)
}
