import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { newMessage, removeMessage } from '../reducers/messageReducer'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {
  const addBlog = async (event) => {
    event.preventDefault()
    props.hideBlogForm()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.createBlog({ title, author, url })

    props.newMessage({
      text: `A new blog ${title} added`,
      status: 'success'
    })

    setTimeout(() => {
      props.removeMessage(null)
    }, 5000)
  }

  return (
    <div style={{ marginTop: 15 }}>
      <h2>Create New</h2>
      <Form onSubmit={addBlog}>
        <Form.Field>
          <label>Title:</label>
          <input name='title' />
        </Form.Field>

        <Form.Field>
          <label>Author:</label>
          <input name='author' />
        </Form.Field>

        <Form.Field>
          <label>URL:</label>
          <input name='url' />
        </Form.Field>
        <Button type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default connect(
  null,
  {
    createBlog,
    newMessage,
    removeMessage
  }
)(BlogForm)