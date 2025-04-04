import { Request, Response, NextFunction } from 'express'
import { logger } from '@/utils/logger'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(
    {
      err,
      method: req.method,
      url: req.originalUrl,
      body: req.body,
    },
    'Unhandled error occurred'
  )

  res.status(500).json({
    message: 'Something went wrong.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
}
