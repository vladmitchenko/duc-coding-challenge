'use strict'
import app from './app'
import { configEnv } from './helpers/configEnv'

configEnv()
const HOST = process.env.HOST ?? ''
const PORT = parseInt(process.env.PORT ?? '')

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
})
