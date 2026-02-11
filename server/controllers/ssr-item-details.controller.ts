import type { Request, Response, NextFunction } from 'express'
import type { ViteDevServer } from 'vite'
import { getItemById } from '../services/api.service.js'
import { renderSSR, shouldSkipRoute, handleSSRError } from './ssr-base.controller.js'

export function createItemDetailsSSRHandler(vite: ViteDevServer) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const url = req.url.split('?')[0]

    if (!url.match(/^\/items\/\d+$/)) {
      return next()
    }

    if (shouldSkipRoute(url)) {
      return next()
    }

    try {
      const id = parseInt(url.split('/')[2], 10)
      const item = await getItemById(id)

      if (!item) {
        return res.status(404).send('Item not found')
      }

      await renderSSR(vite, req, res, url, item)
    } catch (error) {
      handleSSRError(error as Error, req, res, next)
    }
  }
}
