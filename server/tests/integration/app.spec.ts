import request from 'supertest'

import app from '../../src/app'

describe('Test API', () => {
  describe('Health Check', () => {
    test.skip('should behave as expected', async () => {
      const res = await request(app).get('/api/health-check')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({msg: "Hello"})
    })
  })

  describe('healthcheck', () => {
    test('should return a 200', async () => {
      const res = await request(app).get('/healthcheck')
      expect(res.statusCode).toEqual(200)
    })

    test('should return the expected body', async () => {
      const res = await request(app).get('/healthcheck')
      expect(res.body.state).toEqual("unhealthy")
      expect(res.body.mongooseReadyState).toEqual('disconnected')
    })
  })

  describe('Teams', () => {
    test.skip('it should return a list of teams', async () => {
      const res = await request(app).get('/api/teams')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({msg: "Hello World!"})
    })
  })
})
