import { resolve } from 'path'

export const getFilePath = (dir: string, filename: string): string => {
  const PUBLIC_DIR = process.env.PUBLIC_DIR ?? ''
  return resolve(process.cwd(), `${PUBLIC_DIR}/${dir}/${filename}`)
}
