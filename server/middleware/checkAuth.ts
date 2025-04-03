import { NextFunction, Request, Response } from 'express'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.auth

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  next()
}
