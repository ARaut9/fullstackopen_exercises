import React from 'react'
import { connect } from 'react-redux'
import { addLikeTo, deleteBlog } from '../reducers/blogReducer'
import { newMessage, removeMessage } from '../reducers/messageReducer'
import Comments from './Comments'
import { Button } from 'semantic-ui-react'

const Blog = (props) => {
  const updateLikes = (blog) => {
    props.addLikeTo(blog.id)

    props.newMessage({
      text: `Liked ${blog.title}`,
      status: 'success'
    })

    setTimeout(() => {
      props.removeMessage(null)
    }, 5000)
  }

  const deleteBlog = (blog) => {
    props.deleteBlog(blog.id)

    props.newMessage({
      text: `deleted ${blog.title}`,
      status: 'success'
    })

    setTimeout(() => {
      props.removeMessage(null)
    }, 5000)
  }

  if (props.blog === undefined) {
    return null
  }

  return (
    <li className="blog" style={{ listStyle: 'none', marginTop: '1rem' }}>
      <h1>
        {props.blog.title}
        <span style={
          {
            fontSize: '1.2rem',
            marginLeft: 10
          }
        }> by {props.blog.author}</span>
      </h1>

      <div>
        <a href={props.blog.url}>{props.blog.url}</a>
        <p style={{ marginTop: '1rem' }}>
          {props.blog.likes} likes
          <Button
            style={{ marginLeft: '1rem' }}
            onClick={() => updateLikes(props.blog)}
          >
            Like
          </Button>
        </p>
        {/* if user is avaible then display this */}
        {(props.blog.user) && <p>added by {props.blog.user.name}</p>}
        {(props.blog.user) &&
          (props.blog.user.name === props.user.name) &&
          <Button onClick={() => deleteBlog(props.blog)}>Delete</Button>
        }
        <Comments
          comments={props.blog.comments}
          blogId={props.blog.id}
        />
      </div>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    user: state.user
  }
}

const mapDispatchToProps = {
  addLikeTo,
  deleteBlog,
  newMessage,
  removeMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)