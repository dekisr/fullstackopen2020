const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
    })
    response.json(users.map((user) => user.toJSON()))
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { name, username, password } = request.body
  // Since we decided to use Mongoose to validate,
  // I think we should let it handle the validation.
  // But the solution requested by the exercise 4.16* it's commented bellow
  // if (password && password.length < 3) {
  //   return response
  //     .status(400)
  //     .json({ error: 'password must be at least 3 characters long' })
  // }
  const passwordHash =
    password && password.length > 2 ? await bcrypt.hash(password, 12) : password
  const user = new User({
    name,
    username,
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
