const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)
jest.setTimeout(15000) // set a larger timeout

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogList = helper.initialBlogs.map((blog) => new Blog(blog))
  await Promise.all(blogList.map((blog) => blog.save()))
})

test(
  'should return the correct amount of ' + 'blog posts in the JSON format.',
  async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }
)

test('the unique identifier property of the blog posts is named id.', async () => {
  const { body: response } = await api.get('/api/blogs')
  for (const blog of response) {
    expect(blog.id).toBeDefined()
  }
})

test('should successfully creates a new blog post.', async () => {
  const newBlog = {
    title: 'Dummy Title',
    author: 'Dummy',
    url: 'https://fullstackopen.com/',
    likes: 0,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { body: response } = await api.get('/api/blogs')
  expect(response).toHaveLength(helper.initialBlogs.length + 1)
  const titles = response.map((blog) => blog.title)
  expect(titles).toContain('Dummy Title')
})

afterAll(() => {
  mongoose.connection.close()
})
