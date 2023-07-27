import { getDbClient } from '../src/helpers/getDbClient'

const client = getDbClient()

async function createSchema (): Promise<void> {
  try {
    await client.connect()

    // Define your schema creation queries here
    const schemaQueries = [
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
      'CREATE TABLE IF NOT EXISTS assets (id uuid DEFAULT uuid_generate_v4 (), extension VARCHAR(220))'
    ]

    for (const query of schemaQueries) {
      await client.query(query)
      console.log('Executed query:', query)
    }

    console.log('Schema creation completed successfully!')
  } catch (error) {
    console.error('Error creating schema:', error)
  } finally {
    await client.end()
  }
}

void createSchema()
