import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id) => {
  const blogsRequest = await axios.get(baseUrl)
  const blogsResponse = blogsRequest.data
  const blogToUpdate = blogsResponse.find(blog => blog.id === id)
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = id => {
  const config = {
    headers: { Authorization: token },
  }

  axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  addComment,
  setToken
}