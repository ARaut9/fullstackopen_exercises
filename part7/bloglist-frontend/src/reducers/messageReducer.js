const messageReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }
}

export const newMessage = message => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}

export const removeMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default messageReducer