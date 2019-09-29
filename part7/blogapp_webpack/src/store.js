import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store