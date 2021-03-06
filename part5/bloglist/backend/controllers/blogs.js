const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
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
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id,
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { ...request.body },
      { new: true }
    ).populate('user', { name: 1, username: 1 })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)
    if (!blog || !user) {
      return response.status(400).json({ error: 'invalid user or blog id' })
    }
    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: 'cannot delete blogs from other users' })
    }
    user.blogs = user.blogs.filter(
      (blogId) => blogId.toString() !== blog._id.toString()
    )
    await user.save()
    await Blog.deleteOne({ _id: blog._id })
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
