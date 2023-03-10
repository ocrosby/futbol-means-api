const dotenv = require('dotenv')

dotenv.config();

const assert = require('assert')
const MongoClient = require('mongodb').MongoClient
const MongoServer = require('mongodb').Server
const mongoutil = require('../../dist/utils/mongoose')
const { Given, When, Then } = require('@cucumber/cucumber')

const Team = require('../../dist/models/team.model')

Given('a MongoClient connected to {string} on port {int}', (hostname, port) => {
  this.mongoclient = new MongoClient(new MongoServer(hostname, port), { native_parser: true })
})

Given('my MongoClient has connected to the {string} database', (dbName) => {
  this.db = this.mongoclient.db(dbName)
})

Given('there are no teams in the database', async () => {
  await Team.deleteMany({})
})

When('I execute an HTTP GET operation on {string}', (apiEndpoint) => {
  throw new Error('Todo: Implement "When I execute an HTTP GET operation on {string}"')
})

Then('there should be no errors', () => {
  throw new Error('Todo: Implement "Then there should be no errors"')
})

Then('the HTTP status code should be {int}', (expectedStatusCode) => {
  throw new Error('Todo: Implement "Then the HTTP status code should be {int}"')
})

Then('I should see an empty array of teams', () => {
  throw new Error('Todo: Implement "Then I should see an empty array of teams"')
})
