import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import blogServices from './services/blogs'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import { newMessage, removeMessage } from './reducers/messageReducer'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { Container, Menu, Button } from 'semantic-ui-react'

const App = (props) => {
  const [activeItem, setActiveItem] = useState('home')

  // destructured to get rid of the useEffect missing dependency warning
  const { initializeBlogs, initializeUsers, loginUser } = props

  useEffect(() => {
    initializeBlogs()
    initializeUsers()
  }, [initializeBlogs, initializeUsers])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      loginUser(user)
      blogServices.setToken(user.token)
    }
  }, [loginUser])

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm hideBlogForm={() => blogFormRef.current.toggleVisibility()} />
    </Togglable>
  )

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const handleLogout = () => {
    props.logoutUser()
    props.newMessage({
      text: 'Logout Successful',
      status: 'success'
    })

    setTimeout(() => {
      props.removeMessage(null)
    }, 5000)
  }

  const home = () => {
    return (
      <div>
        {blogForm()}
        <Blogs />
      </div>
    )
  }

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === id)

  const userById = (id) =>
    props.users.find(user => {
      return user.id === id
    })

  if (props.user === null) {
    return (
      <Container style={{ paddingTop: 50 }}>
        <Notification message={props.message} />
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container style={{ paddingTop: 50 }}>
      <Notification message={props.message} />
      <header style={
        {
          display: 'flex',
          justifyContent: 'space-between'
        }
      }>
        <h1>Blog App</h1>

        <p>
          {props.user.name} logged in
          <Button
            style={{ marginLeft: '1rem' }}
            onClick={handleLogout}
          >Logout</Button>
        </p>
      </header>

      <Router>
        <div>
          <div>
            <Menu secondary>
              <Menu.Item
                as={Link}
                to='/'
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
              >
                Home
              </Menu.Item>
              <Menu.Item
                as={Link}
                to='/blogs'
                name='blogs'
                active={activeItem === 'blogs'}
                onClick={handleItemClick}
              >
                Blogs
              </Menu.Item>
              <Menu.Item
                as={Link}
                to='/users'
                name='users'
                active={activeItem === 'users'}
                onClick={handleItemClick}
              >
                Users
              </Menu.Item>
            </Menu>
          </div>
          <Route exact path='/' render={() => home()} />
          <Route exact path='/blogs' render={() => <Blogs />} />
          <Route exact path='/users' render={() => <Users />} />

          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />

          <Route exact path='/users/:id' render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
        </div>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    message: state.message,
    blogs: state.blogs,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  {
    initializeBlogs,
    initializeUsers,
    loginUser,
    logoutUser,
    newMessage,
    removeMessage
  }
)(App)
