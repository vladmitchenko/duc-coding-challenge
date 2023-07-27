import { type Client, type QueryResult } from 'pg'
import { type AssetDTO } from './asset.dto'
import { getDbClient } from '../helpers/getDbClient'

const client = getDbClient()
void client.connect()

export class AssetsRepository {
  constructor (private readonly client: Client) {}

  async insert (asset: Partial<AssetDTO>): Promise<QueryResult> {
    return await this.client.query('INSERT INTO assets(extension) VALUES($1) RETURNING *', [asset.extension])
  }

  async find (id: string): Promise<QueryResult> {
    return await this.client.query('SELECT * FROM assets WHERE id = $1', [id])
  }

  async get (): Promise<QueryResult> {
    return await this.client.query('SELECT * FROM assets')
  }

  async delete (id: string): Promise<QueryResult> {
    return await this.client.query('DELETE FROM assets WHERE id = $1 RETURNING *', [id])
  }
}

export const assetsRepository = new AssetsRepository(client)
