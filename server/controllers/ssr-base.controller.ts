import type { Request, Response } from 'express'
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
  queryKey: unknown[],
  data: any
): Promise<void> {
  try {
    const template = readFileSync(
      resolve(__dirname, '../../index.html'),
      'utf-8'
    )

    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
    const { html: reactHtml, styleTags, dehydratedState } = await render({ url, queryKey, data })

    const stateScript = `<script>window.__PRELOADED_STATE__=${JSON.stringify(dehydratedState).replace(/</g, '\\u003c')}</script>`

    const htmlWithReact = template
      .replace('</head>', `${styleTags}</head>`)
      .replace('<!--app-html-->', reactHtml)
      .replace('</body>', `${stateScript}</body>`)

    const finalHtml = await vite.transformIndexHtml(req.url, htmlWithReact)

    res.status(200).set({ 'Content-Type': 'text/html' }).send(finalHtml)
  } catch (error) {
    vite.ssrFixStacktrace(error as Error)
    console.error('❌ SSR Error:', error)
    throw error
  }
}
