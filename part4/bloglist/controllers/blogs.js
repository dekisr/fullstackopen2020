const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.status(200).json(blogs.map((blog) => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
  // Blog.find({})
  //   .then((blogs) => {
  //     response.status(200).json(blogs.map((blog) => blog.toJSON()))
  //   })
  //   .catch((error) => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  })
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
