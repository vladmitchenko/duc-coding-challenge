import express from 'express'
import cors from 'cors'
import { assetsRouter } from './assets'
import { errorHandler } from './helpers/errors'

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use('/api/assets', assetsRouter)
app.use('*', (req, res) => res.status(404))
app.use(errorHandler)

export default app
