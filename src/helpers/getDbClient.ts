import { Client } from 'pg'
import { configEnv } from './configEnv'

configEnv()

export const getDbClient = (): Client => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? ''),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  })

  return client
}
