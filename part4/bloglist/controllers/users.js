const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users.map((user) => user.toJSON()))
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const passwordHash =
    request.body.password && (await bcrypt.hash(request.body.password, 12))
  const user = new User({
    name: request.body.name,
    username: request.body.username,
    password: passwordHash,
  })
  try {
    const savedUser = await user.save()
    response.json(savedUser.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
