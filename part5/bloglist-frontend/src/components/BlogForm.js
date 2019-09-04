import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  blogTitle,
  blogAuthor,
  blogUrl,
  addBlog
}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input {...blogTitle} />
      </div>
      <div>
        Author:
        <input {...blogAuthor} />
      </div>
      <div>
        URL:
        <input {...blogUrl} />
      </div>
      <button type="submit">Create</button>
    </form >
  )
}

BlogForm.propTypes = {
  blogTitle: PropTypes.object.isRequired,
  blogAuthor: PropTypes.object.isRequired,
  blogUrl: PropTypes.object.isRequired,
  addBlog: PropTypes.func.isRequired
}

export default BlogForm