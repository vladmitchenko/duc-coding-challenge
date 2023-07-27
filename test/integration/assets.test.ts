/* eslint-disable no-labels */
import request from 'supertest'
import app from '../../src/app'
import { configEnv } from '../../src/helpers/configEnv'

configEnv()

jest.mock('../../src/helpers/getDbClient', () => ({
  getDbClient: () => ({
    connect: jest.fn(),
    query: () => ({
      rows: [{
        id: 'file',
        extension: 'jpg'
      }]
    })
  })
}))

describe('Assets Controller', () => {
  describe('create asset', () => {
    const buffer = Buffer.from('some data')

    it('should return 201', async () => {
      const response = await request(app)
        .post('/api/assets')
        .attach('file', buffer, 'file.jpg')

      expect(response.statusCode).toBe(201)
      expect(response.body.id).toBeDefined()
      expect(response.body.extension).toBe('jpg')
      expect(response.body.url).toBeDefined()
    })

    it('should return 400 if file not provided', async () => {
      const response = await request(app)
        .post('/api/assets')

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('File not provided')
    })

    it('should return 400 if file type not supported', async () => {
      const response = await request(app)
        .post('/api/assets')
        .attach('file', buffer, 'file.pdf')

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('File type not supported')
    })
  })

  describe('find asset', () => {
    it('should return 200', async () => {
      const response = await request(app)
        .get('/api/assets/file')

      expect(response.statusCode).toBe(200)
      expect(response.body.id).toBeDefined()
      expect(response.body.extension).toBe('jpg')
      expect(response.body.url).toBeDefined()
    })
  })

  describe('list assets', () => {
    it('should return 200', async () => {
      const response = await request(app)
        .get('/api/assets')

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(1)
      expect(response.body[0].id).toBeDefined()
      expect(response.body[0].extension).toBe('jpg')
      expect(response.body[0].url).toBeDefined()
    })
  })

  describe('delete asset', () => {
    it('should return 200', async () => {
      const response = await request(app)
        .delete('/api/assets/file')

      expect(response.statusCode).toBe(204)
    })
  })
})
