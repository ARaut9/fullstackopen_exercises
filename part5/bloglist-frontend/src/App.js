import React, { useEffect, useState } from 'react'
import { useField } from './hooks'
import blogServices from './services/blogs'
import loginServices from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App() {

  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  // using the destructuring and spread syntax to assign the reset functions to another variable
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const { reset: resetBlogTitle, ...blogTitle } = useField('text')
  const { reset: resetBlogAuthor, ...blogAuthor } = useField('text')
  const { reset: resetBlogUrl, ...blogUrl } = useField('text')

  useEffect(() => {
    blogServices
      .getAll()
      .then(response => {
        setBlogs(response.sort((a, b) => b.likes - a.likes))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginServices.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogServices.setToken(user.token)
      setUser(user)
      resetUsername()
      resetPassword()

      setMessage({
        text: 'Login Successful',
        status: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({
        text: 'Wrong Username or Password',
        status: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setMessage({
      text: 'Logout Successful',
      status: 'success'
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value
    }

    const response = await blogServices.create(newBlog)

    // had to do the refetching of all blogs because response only contains the users id and not other information like name
    const allBlogs = await blogServices.getAll()
    setBlogs(allBlogs.sort((a, b) => b.likes - a.likes))
    resetBlogTitle()
    resetBlogAuthor()
    resetBlogUrl()

    setMessage({
      text: `A new Blog ${response.title} added`,
      status: 'success'
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateLikes = async (id) => {
    let allBlogs = await blogServices.getAll()
    const blogToUpdate = allBlogs.find((blog) => blog.id === id)
    const updatedBlog = {
      ...blogToUpdate,
      likes: ++blogToUpdate.likes
    }
    await blogServices.update(id, updatedBlog)
    allBlogs = allBlogs.filter((blog) => blog.id !== id).concat(updatedBlog)
    setBlogs(allBlogs.sort((a, b) => b.likes - a.likes))
    setMessage({
      text: `Liked ${updatedBlog.title}`,
      status: 'success'
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deleteBlog = async (id) => {
    let allBlogs = await blogServices.getAll()
    const blogToDelete = allBlogs.find((blog) => blog.id === id)
    const deleteConfirmed = window.confirm(`delete blog ${blogToDelete.title}`)

    if (deleteConfirmed) {
      await blogServices.remove(id)
      allBlogs = allBlogs.filter(blog => blog.id !== id)
      setBlogs(allBlogs.sort((a, b) => b.likes - a.likes))
      setMessage({
        text: `deleted ${blogToDelete.title}`,
        status: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm
        blogTitle={blogTitle}
        blogAuthor={blogAuthor}
        blogUrl={blogUrl}
        addBlog={addBlog}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input {...username} />
          </div>
          <div>
            Password
            <input {...password} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="App">
      <Notification message={message} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>

      <h2>Create New</h2>
      {blogForm()}
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App
