import express from 'express'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

async function createServer() {
  let vite: ViteDevServer

  if (process.env.NODE_ENV !== 'production') {
    // Development: Use Vite dev server
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    // Production: Serve static files
    app.use(express.static(path.resolve(__dirname, '../dist/client')))
  }

  // SSR handler
  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: () => Promise<{ html: string; dehydratedState: any }>

      if (process.env.NODE_ENV !== 'production') {
        // Development: Load template and render function via Vite
        template = await vite.transformIndexHtml(
          url,
          `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shopping List</title>
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/entry-client.tsx"></script>
  </body>
</html>
          `.trim()
        )

        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        // Production: Use built files
        const fs = await import('fs/promises')
        template = await fs.readFile(
          path.resolve(__dirname, '../dist/client/index.html'),
          'utf-8'
        )
        // @ts-ignore - dist folder only exists after build
        render = (await import('../dist/server/entry-server.js')).render
      }

      // Render app
      const { html: appHtml, dehydratedState } = await render()

      // Inject rendered HTML and state
      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace(
          '</body>',
          `
          <script>
            window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};
          </script>
          </body>
          `
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // Handle errors
      if (process.env.NODE_ENV !== 'production' && vite) {
        vite.ssrFixStacktrace(e as Error)
      }
      console.error((e as Error).stack)
      res.status(500).end((e as Error).stack)
    }
  })

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
    console.log(`📦 Mode: ${process.env.NODE_ENV || 'development'}`)
  })
}

createServer()
