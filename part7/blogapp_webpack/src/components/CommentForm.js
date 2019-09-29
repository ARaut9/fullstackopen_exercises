import React from 'react'
import { connect } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { newMessage, removeMessage } from '../reducers/messageReducer'
import { Form, Button } from 'semantic-ui-react'

const CommentForm = (props) => {
  const addComment = async (event) => {
    event.preventDefault()

    const comment = event.target.comment.value
    event.target.comment.value = ''
    props.createComment(props.id, { comment })

    props.newMessage({
      text: `A new comment ${comment} added`,
      status: 'success'
    })

    setTimeout(() => {
      props.removeMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Form onSubmit={addComment}>
        <input style={{ marginBottom: '0.5rem' }} name='comment' /><br />
        <Button type="submit">Add Comment</Button>
      </Form>
    </div>
  )
}

export default connect(
  null,
  {
    createComment,
    newMessage,
    removeMessage
  }
)(CommentForm)