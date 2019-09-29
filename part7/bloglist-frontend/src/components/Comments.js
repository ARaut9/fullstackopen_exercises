import React from 'react'
import CommentForm from './CommentForm'
import { Icon, List } from 'semantic-ui-react'

const Comments = ({ comments, blogId }) => {
  return (
    <div>
      <h2>Comments</h2>
      <CommentForm id={blogId} />
      <List style={{ marginTop: 30 }}>
        {comments.map(comment =>
          <List.Item key={comment.id} style={{ marginBottom: '.5rem', fontSize: '1.2rem' }}>
            <Icon name='right triangle' />
            {comment.comment}
          </List.Item>
        )}
      </List>
    </div>
  )
}

export default Comments