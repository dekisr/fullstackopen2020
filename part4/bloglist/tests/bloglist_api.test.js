const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)
jest.setTimeout(20000) // set a larger timeout

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogList = helper.initialBlogs.map((blog) => new Blog(blog))
  await Promise.all(blogList.map((blog) => blog.save()))
})

test('should return the correct amount of blog posts in the JSON format.', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

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

test(
  'if the likes property is missing from the request, ' +
    'it will default to the value 0.',
  async () => {
    const newBlog = {
      title: 'Dummy Title (No Likes Property)',
      author: 'Dummy',
      url: 'https://fullstackopen.com/',
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  }
)

test('missing title and url from request.', async () => {
  // handled by mongoose and error middleware
  const newBlog = {
    author: 'Dummy',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('deleting a single blog post.', async () => {
  const { body: blogs } = await api.get('/api/blogs')
  await api.delete(`/api/blogs/${blogs[0].id}`).expect(204)
  const { body: updatedBlogs } = await api.get('/api/blogs')
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length - 1)
})

test('updating the information of an individual blog post.', async () => {
  const { body: blogs } = await api.get('/api/blogs')
  const likes = Math.floor(Math.random() * 1000) + 1000
  const changes = { likes }
  await api.put(`/api/blogs/${blogs[0].id}`).send(changes)
  const { body: updatedBlogs } = await api.get('/api/blogs')
  expect(updatedBlogs[0].likes).toBe(likes)
})

afterAll(() => {
  mongoose.connection.close()
})
