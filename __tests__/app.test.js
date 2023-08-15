const app = require('../app.js');
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js')
const topicData = require('../db/data/test-data/index.js');
const fs = require('fs').promises
const path = require('path')

beforeEach(() => seed(topicData));
afterAll(() => db.end());

describe('api/topics', () => {
    test('GET: 200, an array of topic objects with properties "slug" and "description"', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            expect(response.body.topics.length).toBe(3)
            response.body.topics.forEach(topic => {
                expect(topic).toHaveProperty('slug')
                expect(topic).toHaveProperty('description')
            })
        })
    })
}) 
describe('api/', () => {
    test('GET:200, An object describing all the available endpoints on your API', () => {
        let endpointsObj
        return fs.readFile(path.join(__dirname, '../endpoints.json'), 'utf-8')
        .then(contents => {
            endpointsObj = JSON.parse(contents)
            return request(app)
            .get('/api')
            .expect(200)
        })
        .then((response) => {
            expect(response.body).toEqual(endpointsObj)
        })
    })
})