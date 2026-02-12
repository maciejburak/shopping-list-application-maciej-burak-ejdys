import type { Request, Response, NextFunction } from 'express'
import type { ViteDevServer } from 'vite'
import { getItemById } from '../services/api.service.js'
import { renderSSR } from './ssr-base.controller.js'
import { shouldSkipRoute, handleSSRError } from '../helpers/route.helper.js'

export function createItemDetailsSSRHandler(vite: ViteDevServer) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const url = req.url.split('?')[0]

    const match = url.match(/^\/items\/(\d+)$/)
    if (!match || shouldSkipRoute(url)) return next()

    try {
      const id = parseInt(match[1], 10)
      const item = await getItemById(id)

      if (!item) return res.status(404).send('Item not found')

      await renderSSR(vite, req, res, url, ['item', id], item)
    } catch (error) {
      handleSSRError(error as Error, req, res, next)
    }
  }
}
