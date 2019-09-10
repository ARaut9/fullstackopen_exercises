import React from 'react'
import { connect } from "react-redux";
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.voteAnecdote(id)

    props.setNotification(
      `You voted 
      '${props.anecdotesToShow
        .find(anecdote => anecdote.id === id).content}'`,
      5
    )
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  anecdotes = anecdotes
    .sort((a, b) => b.votes - a.votes)

  filter = filter.toLowerCase()

  return anecdotes.filter(
    (anecdote) => anecdote.content
      .toLowerCase()
      .includes(filter)
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)