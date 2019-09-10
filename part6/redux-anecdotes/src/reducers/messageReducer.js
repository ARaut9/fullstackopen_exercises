const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'RESET_MESSAGE':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE',
        message
      })
    }, duration * 1000)
  }
}

export default messageReducer