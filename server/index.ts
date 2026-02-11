import express from 'express'
import { createServer as createViteServer } from 'vite'
import { createSSRHandler } from './controllers/ssr.controller.js'

const app = express()
const PORT = 5173

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(createSSRHandler(vite))
  app.use(vite.middlewares)

  app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`)
    console.log(`📡 API expected at http://localhost:3000/api\n`)
  })
}

startServer()
