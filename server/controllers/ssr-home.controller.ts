import type { Request, Response, NextFunction } from 'express'
import type { ViteDevServer } from 'vite'
import { getItems } from '../services/api.service.js'
import { renderSSR } from './ssr-base.controller.js'
import { shouldSkipRoute, handleSSRError } from '../helpers/route.helper.js'

export function createHomeSSRHandler(vite: ViteDevServer) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const url = req.url.split('?')[0]

    if (url !== '/') return next()
    if (shouldSkipRoute(url)) return next()

    try {
      const items = await getItems()
      await renderSSR(vite, req, res, url, ['items'], items)
    } catch (error) {
      handleSSRError(error as Error, req, res, next)
    }
  }
}
