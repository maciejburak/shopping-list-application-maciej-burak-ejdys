import type { Request, Response, NextFunction } from 'express'

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
