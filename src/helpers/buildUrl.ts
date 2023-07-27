import { configEnv } from './configEnv'

configEnv()
const HOST = process.env.HOST ?? ''
const PORT = parseInt(process.env.PORT ?? '')

export const buildUrl = (path: string): string => {
  return `http://${HOST}:${PORT}/` + path.split('public/')[1]
}
