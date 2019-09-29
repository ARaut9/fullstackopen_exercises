import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Blogs = (props) => {
  return (
    <div style={{ marginTop: 30 }}>
      <h2>Blogs</h2>
      <Table striped celled>
        <Table.Body>
          {props.blogs.map(blog =>
            <Table.Row key={blog.id} className="blog">
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(Blogs)