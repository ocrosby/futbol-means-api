import app from '../../src/app'

// Note: I need to look into this in more detail as I think this is responsible for the strange
//       "error: Unable to parse undefined:undefined with URL" output message I'm seeing in the tests.
//       It seems to work, but I don't like that error message.
//
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
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

    test('GET /healthcheck should have a 500 statusCode', async () => {
      expect(res?.statusCode).toEqual(500)
    })

    test('GET /healthcheck should have a disconnected mongooseReadyState', async () => {
      expect(res?.body.state).toEqual("unhealthy")
      expect(res?.body.mongooseReadyState).toEqual('disconnected')
    })
  })

  describe('Teams', () => {
    test.skip('GET /api/teams should return a list of teams', async () => {
      const res = await request(app).get('/api/teams')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({msg: "Hello World!"})
    })
  })
})
