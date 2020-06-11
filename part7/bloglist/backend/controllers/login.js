const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    // prettier-ignore
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(
          body.password.toString(),
          user.password.toString()
        )
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password',
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: '24h',
    })

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
