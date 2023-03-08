import request from 'supertest'

import app from '../../src/app'

describe('Test API', () => {
  describe('Health Check', () => {
    it('should behave as expected', async () => {
      const res = await request(app).get('/api/health-check')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({msg: "Hello"})
    })
  })

  describe('Logger', () => {
    it('should behave as expected', async () => {
      const res = await request(app).get('/api/logger')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({msg: "Hello World!"})
    })
  })

  describe('Teams', () => {
    it('it should return a list of teams', async () => {
      const res = await request(app).get('/api/teams')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({msg: "Hello World!"})
    })
  })
})
