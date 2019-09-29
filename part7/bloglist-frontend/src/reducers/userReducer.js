const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const loginUser = (loggedInUser) => {
  return {
    type: 'LOGIN_USER',
    data: loggedInUser
  }
}

export const logoutUser = () => {
  window.localStorage.clear()
  return {
    type: 'LOGOUT_USER'
  }
}

export default userReducer