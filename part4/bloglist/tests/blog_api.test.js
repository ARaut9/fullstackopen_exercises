const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  // added this because I was getting the Async callback was not invoked within the 5000ms timeout error
  jest.setTimeout(30000)

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  // for (let blog of helper.initialBlogs) {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  // }
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('that unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  });

})

describe('addition of a new blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'hellas', name: 'Arto Hellas', password: 'sekret' })
    await user.save()
  })

  test('succeeds with valid data', async () => {
    // I mocked the login process by generating a token
    const users = await User.find({})

    const userForToken = {
      username: users[0].username,
      id: users[0]._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'Some Title',
      author: 'John Doe',
      url: 'https://someurl.com/some-blog',
      likes: 15
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('Some Title')
  })

  test('if likes property is missing, it will default to the value 0', async () => {
    const users = await User.find({})

    const userForToken = {
      username: users[0].username,
      id: users[0]._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'Some Title',
      author: 'John Doe',
      url: 'https://someurl.com/some-blog',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(0)
  })

  test('fails with status code 400 if data invaild', async () => {
    const users = await User.find({})

    const userForToken = {
      username: users[0].username,
      id: users[0]._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      author: 'John Doe',
      likes: 15
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const users = await User.find({})

    const userForToken = {
      username: users[0].username,
      id: users[0]._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    // create a new blog to delete
    const newBlog = {
      title: 'title',
      author: 'author name',
      url: 'https://url.com/blog',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)

    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    // expecting intialBlogs lenght to be same because I add a new blog and delete it so the length doesn't change
    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('upadtes likes of a blog post', () => {
  test('succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const likesBeforeUpdate = blogsAtStart.map(blog => blog.likes)[0]

    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 17
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)

    const blogsAtEnd = await helper.blogsInDb()

    const likesAftereUpdate = blogsAtEnd.map(blog => blog.likes)[0]

    expect(likesAftereUpdate).not.toBe(likesBeforeUpdate)
  })
})

// Users Api Tests

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'hellas', name: 'Arto Hellas', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper status code and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'John Doe',
      password: 'fdgsjak',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper status code and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'johndoe',
      name: 'John Doe'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper status code and message if username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jd',
      name: 'John Doe',
      password: 'fdgsjak',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password must be atleast 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper status code and message if password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'fd',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password must be atleast 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})