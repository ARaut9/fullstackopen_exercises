import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  const style = { marginBottom: 20 }

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)

    props.setNotification(`Succesfully created '${content}'`, 5)
  }

  return (
    <div style={style}>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" /><br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  {
    createAnecdote,
    setNotification
  }
)(AnecdoteForm)