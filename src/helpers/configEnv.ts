import dotenv from 'dotenv'
import type { DotenvConfigOutput } from 'dotenv'

export const configEnv = (): DotenvConfigOutput => {
  const NODE_ENV = process.env.NODE_ENV
  const path = NODE_ENV === 'test' ? '.env.test' : '.env'
  return dotenv.config({ path })
}
