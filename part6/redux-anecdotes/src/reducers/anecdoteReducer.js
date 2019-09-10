import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  let newState
  switch (action.type) {
    case 'VOTE':
      newState = state.filter(item => item.id !== action.data.id)
      return [...newState, action.data]

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const intializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default reducer