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
describe('/api/articles/:article_id', () => {
    test('GET:200 sends a single article to the client', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({body}) => {
            delete body.msg.created_at
          expect(body.msg).toMatchObject({
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              votes: 100,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
            })
        })
    })
    test('GET:404 sends an appropriate and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/999')
          .expect(404)
          .then(({body}) => {
            expect(body.msg).toBe('article does not exist');
        });
    })
    test('GET:400 sends an appropriate and error message when given an invalid id', () => {
            return request(app)
              .get('/api/articles/not-an-article')
              .expect(400)
              .then(({body}) => {
                expect(body.msg).toBe('Invalid id');
        });
    })
})