/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/return-await */
import os from 'os'
import { Router } from 'express'
import multer from 'multer'
import { assetsController } from './assets.controller'

const upload = multer({ dest: os.tmpdir() })

const assetsRouter: Router = Router()

assetsRouter.get('/', async (req, res, next) => assetsController.list(req, res, next))
assetsRouter.get('/:id', async (req, res, next) => assetsController.find(req, res, next))
assetsRouter.post('/', upload.single('file'), async (req, res, next) => assetsController.create(req, res, next))
assetsRouter.delete('/:id', async (req, res, next) => assetsController.delete(req, res, next))

export { assetsRouter }
