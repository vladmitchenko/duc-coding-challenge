import type { NextFunction, Request, Response } from 'express'
import { type AssetsService, assetsService } from './assets.service'

const SUPPORTED_MIME_TYPES = [
  'image/bmp',
  'image/jpeg',
  'image/x-png',
  'image/png',
  'image/gif'
]

export class AssetsController {
  constructor (private readonly service: AssetsService) {}

  async list (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.service.list()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async find (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.service.find(req.params.id)
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const file = req.file
      if (file == null) {
        throw new Error('DUC-1')
      }
      if (!SUPPORTED_MIME_TYPES.includes(file.mimetype)) {
        throw new Error('DUC-2')
      }

      const result = await this.service.create(file)
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.service.delete(req.params.id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}

export const assetsController = new AssetsController(assetsService)
