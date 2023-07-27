import { extname } from 'path'
import { rename, rm } from 'fs/promises'
import { type AssetDTO } from './asset.dto'
import { type AssetsRepository, assetsRepository } from './assets.repository'
import { getFilePath } from '../helpers/getFilePath'
import { buildUrl } from '../helpers/buildUrl'

const DIR = 'assets'

export class AssetsService {
  constructor (private readonly repository: AssetsRepository) {}

  async create (file: Express.Multer.File): Promise<AssetDTO> {
    const extension = extname(file.originalname).slice(1)
    const result = await this.repository.insert({ extension })
    const asset: AssetDTO = result.rows[0]
    const filePath = getFilePath(DIR, `${asset.id}.${asset.extension}`)
    await rename(file.path, filePath)
    return { ...asset, url: buildUrl(filePath) }
  }

  async find (id: string): Promise<AssetDTO> {
    const result = await this.repository.find(id)
    if (result.rowCount < 1) {
      throw new Error('DUC-3')
    }
    const asset: AssetDTO = result.rows[0]
    return { ...asset, url: buildUrl(getFilePath(DIR, `${asset.id}.${asset.extension}`)) }
  }

  async list (): Promise<AssetDTO[]> {
    const result = await this.repository.get()
    return result.rows.map((asset: AssetDTO) => ({
      ...asset,
      url: buildUrl(getFilePath(DIR, `${asset.id}.${asset.extension}`))
    }))
  }

  async delete (id: string): Promise<void> {
    const result = await this.repository.delete(id)
    if (result.rowCount < 1) {
      throw new Error('DUC-3')
    }
    const asset: AssetDTO = result.rows[0]
    await rm(getFilePath(DIR, `${asset.id}.${asset.extension}`))
  }
}

export const assetsService = new AssetsService(assetsRepository)
