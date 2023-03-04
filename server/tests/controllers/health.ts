import request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createServer } from "../../src/app";

let server: Express

beforeAll(async () => {
  server = await createServer().app
})

describe('GET /health-check', () => {
  it('should return 200', () => {

  })
})
