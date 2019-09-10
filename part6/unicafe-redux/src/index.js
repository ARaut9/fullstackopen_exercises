import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import Statistics from './components/Statistics'
import Button from './components/Button'

const store = createStore(reducer)

const App = () => {
  return (
    <div>
      <h1>Give Feedback</h1>

      <Button store={store} type={'GOOD'} label={'good'} />
      <Button store={store} type={'OK'} label={'ok'} />
      <Button store={store} type={'BAD'} label={'bad'} />
      <Button store={store} type={'ZERO'} label={'reset stats'} />
      <Statistics store={store} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)