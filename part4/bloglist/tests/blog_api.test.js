const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id property named id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  const idArray = response.body.map(blog => blog.id)
  idArray.forEach(id => expect(id).toBeDefined())
})

afterAll(() => {
  mongoose.connection.close()
})