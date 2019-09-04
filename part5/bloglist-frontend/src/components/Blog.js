import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyles = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!expanded) {
    return (
      <div style={blogStyles} className="blog">
        <div onClick={() => setExpanded(true)} className="blogTitle">
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyles} className="blog">
      <div onClick={() => setExpanded(false)} className="blogTitle">
        {blog.title} {blog.author}
      </div>
      <div className="moreInfo">
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={() => updateLikes(blog.id)}>Like</button></div>
        {/* if user is avaible then display this */}
        {(blog.user) && <div>added by {blog.user.name}</div>}
        {(blog.user) && (blog.user.name === user.name) && <div><button onClick={() => deleteBlog(blog.id)}>Delete</button></div>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  updateLikes: PropTypes.func,
  deleteBlog: PropTypes.func
}

export default Blog