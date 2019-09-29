import React from 'react'
import { connect } from 'react-redux'
import { Icon, List } from 'semantic-ui-react'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }

  return (
    <div style={{ marginTop: 15 }}>
      <h2>{props.user.name}</h2>

      <h3>Added blogs</h3>

      <List>
        {props.user.blogs.map(blog =>
          <List.Item key={blog.id} style={{ fontSize: '1.2rem' }}>
            <Icon name='right triangle' />
            {blog.title}
          </List.Item>
        )}
      </List>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user
})

export default connect(mapStateToProps)(User)