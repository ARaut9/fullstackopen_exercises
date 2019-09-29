import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const blogToLike = state.find(blog => blog.id === action.data.id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(blog =>
        blog.id !== action.data.id ? blog : likedBlog
      )
    case 'DELETE_BLOG':
      return state.filter(blog =>
        blog.id !== action.data.id
      )
    case 'NEW_COMMENT':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data.commentedBlog
      )
    default:
      return state
  }
}

export const createBlog = (newObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

// export const addLikeTo = (id) => {
//   return async dispatch => {
//     const blogs = await blogService.getAll()
//     const blogToLike = blogs.find(blog => blog.id === id)
//     const likedBlog = {
//       ...blogToLike,
//       likes: blogToLike.likes + 1
//     }

//     await blogService.update(id, likedBlog)

//     dispatch({
//       type: 'LIKE_BLOG',
//       data: {
//         id,
//         likedBlog
//       }
//     })
//   }
// }

export const addLikeTo = (id) => {
  return async dispatch => {
    await blogService.update(id)

    dispatch({
      type: 'LIKE_BLOG',
      data: {
        id
      }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)

    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export const createComment = (id, comment) => {
  return async dispatch => {
    await blogService.addComment(id, comment)
    const blogs = await blogService.getAll()
    const commentedBlog = blogs.find(blog => blog.id === id)

    dispatch({
      type: 'NEW_COMMENT',
      data: {
        id,
        commentedBlog
      }
    })
  }
}

export default blogReducer