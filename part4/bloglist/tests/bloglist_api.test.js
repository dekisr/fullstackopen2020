const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogList = helper.initialBlogs.map((blog) => new Blog(blog))
  await Promise.all(blogList.map((blog) => blog.save()))
})

test('part4', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 15000) // set a larger timeout

afterAll(() => {
  mongoose.connection.close()
})
