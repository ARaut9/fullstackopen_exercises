const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.headers.token, process.env.SECRET)
    if (!request.headers.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).send({ error: 'title or body missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    const savedBlog = await Blog.findById(newBlog._id).populate('user', { username: 1, name: 1 })
    return response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.headers.token, process.env.SECRET)
    if (!request.headers.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blogToDelete = await Blog.findById(request.params.id)

    if (blogToDelete.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)

      return response.status(204).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).send({ error: 'title or body missing' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    return response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('comments', { comment: 1 })

  response.json(blog.toJSON().comments)
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  if (body.comment === undefined) {
    return response.status(400).send({ error: 'comment missing' })
  }

  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    comment: body.comment,
    blog: blog._id
  })

  try {
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    return response.json(savedComment.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter