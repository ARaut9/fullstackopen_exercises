const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

    return response.json(users.map(u => u.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.username === undefined || body.password === undefined) {
    return response.status(400).send({ error: 'username or password missing' })
  }

  if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).send({ error: 'username and password must be atleast 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    return response.json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter