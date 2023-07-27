import type { NextFunction, Request, Response } from 'express'

export const errors = {
  'DUC-1': {
    status: 400,
    message: 'File not provided'
  },
  'DUC-2': {
    status: 400,
    message: 'File type not supported'
  },
  'DUC-3': {
    status: 404,
    message: 'Asset not found'
  }
}

const isClientError = (message: string): boolean => {
  return Object.keys(errors).includes(message)
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err)
  const errorCode = err.message
  if (isClientError(errorCode)) {
    const errorInfo = errors[errorCode]
    res.status(errorInfo.status).json({ message: errorInfo.message })
  } else {
    res.status(500).json({ message: 'Something happened wrong on our side' })
  }
}
