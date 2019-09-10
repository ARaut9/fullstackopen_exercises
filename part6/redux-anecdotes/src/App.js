import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { intializeAnecdotes } from './reducers/anecdoteReducer'

const App = ({ intializeAnecdotes }) => {
  useEffect(() => {
    intializeAnecdotes()
  }, [intializeAnecdotes])

  return (
    <div>
      <h2>Programming Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, { intializeAnecdotes })(App)