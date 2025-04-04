import pinoHttp from 'pino-http'
import { logger } from '@/utils/logger'
import { Request, Response } from 'express'

export const logRequest = pinoHttp({
  logger,
  customLogLevel: (req: Request, res: Response, err) => {
    if (res.statusCode >= 500 || err) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'info'
  },
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        body: req.body,
      }
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      }
    },
  },
})
