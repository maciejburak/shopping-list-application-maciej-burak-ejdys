import express from 'express'
import { createServer as createViteServer } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 5173
const API_URL = 'http://localhost:3000/api'

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  // Handler dla HTML - SSR
  app.use(async (req, res, next) => {
    // Przepuść requesty do plików statycznych
    if (req.url.includes('.') && !req.url.endsWith('.html')) {
      return next()
    }

    try {
      // 1. Pobierz dane z API
      const response = await fetch(`${API_URL}/items`)
      const data = await response.json()

      console.log('📦 Fetched items from API:', data)

      // 2. Wczytaj HTML template
      let template = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf-8'
      )

      // 3. Załaduj entry-server przez Vite
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      // 4. Renderuj React do HTML z danymi
      const { html: appHtml, dehydratedState } = await render(data.items)

      // 5. Transformuj template przez Vite
      template = await vite.transformIndexHtml(req.url, template)

      // 6. Wstrzyknij zrenderowany HTML i stan
      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace(
          '</body>',
          `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};</script></body>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.error('❌ Error:', e)
      vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.use(vite.middlewares)

  app.listen(PORT, () => {
    console.log(`🚀 Frontend running at http://localhost:${PORT}`)
    console.log(`📡 API should be running at ${API_URL}`)
  })
}

startServer()
