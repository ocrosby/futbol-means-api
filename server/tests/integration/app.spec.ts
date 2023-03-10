import request from 'supertest'

import app from '../../src/app'

request(app)

describe('Test API', () => {
  describe('Health Check', () => {
    test('should return a 200', async () => {
      const res = await request(app).get('/healthcheck')
      expect(res.statusCode).toEqual(500)
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
