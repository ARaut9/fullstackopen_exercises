import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { newMessage, removeMessage } from '../reducers/messageReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const handleLogin = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    event.target.username.value = ''
    event.target.password.value = ''

    try {
      const loggedInUser = await loginService.login({ username, password })

      props.loginUser(loggedInUser)

      props.newMessage({
        text: 'Login Successful',
        status: 'success'
      })

      setTimeout(() => {
        props.removeMessage(null)
      }, 5000)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)
    } catch (error) {
      props.newMessage({
        text: 'Wrong Username or Password',
        status: 'error'
      })

      setTimeout(() => {
        props.removeMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login to the application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username</label>
          <input name='username' data-cy='username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' name='password' data-cy='password' />
        </Form.Field>
        <Button type="submit" data-cy='login'>Log In</Button>
      </Form>
    </div>
  )
}

export default connect(
  null,
  {
    loginUser,
    newMessage,
    removeMessage
  }
)(LoginForm)