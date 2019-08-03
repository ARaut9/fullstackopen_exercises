import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const FeedbackButton = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <th>{text} </th>
      <td> {value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad)
  const positive = `${good / (good + neutral + bad) * 100}%`

  if (!good && !bad && !neutral) {
    return (
      <div>
        <h1>Give Feedback</h1>

        <FeedbackButton onClick={() => setGood(good + 1)} text='good' />
        <FeedbackButton onClick={() => setNeutral(neutral + 1)} text='neutral' />
        <FeedbackButton onClick={() => setBad(bad + 1)} text='bad' />

        <h2>Statistics</h2>

        <p>No Feedback Given</p>

      </div>
    )
  }

  return (
    <div>
      <h1>Give Feedback</h1>

      <FeedbackButton onClick={() => setGood(good + 1)} text='good' />
      <FeedbackButton onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <FeedbackButton onClick={() => setBad(bad + 1)} text='bad' />

      <h2>Statistics</h2>

      <table>
        <tbody>
          <Statistic text='Good' value={good} />
          <Statistic text='Neutral' value={neutral} />
          <Statistic text='Bad' value={bad} />
          <Statistic text='All' value={all} />
          <Statistic text='Average' value={average} />
          <Statistic text='Positive' value={positive} />
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
