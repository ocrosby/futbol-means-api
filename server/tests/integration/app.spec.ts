import app from '../../src/app'

import request = require('supertest')

describe('Test API', () => {
  describe('Health Check', () => {
    let res: request.Response | null;

    beforeEach(async () => {
      res = await request(app).get('/healthcheck')
    })

    afterEach(() => {
      res = null;
    })

    test('should return a 500', async () => {
      expect(res?.statusCode).toEqual(500)
    })

    test('should return the expected body', async () => {
      expect(res?.body.state).toEqual("unhealthy")
      expect(res?.body.mongooseReadyState).toEqual('disconnected')
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
