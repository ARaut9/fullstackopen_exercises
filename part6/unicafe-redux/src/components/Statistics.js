import React from "react"
import Statistic from './Statistic'

const Statistics = ({ store }) => {
  const totalFeedback =
    store.getState().good
    + store.getState().ok
    + store.getState().bad

  const averageFeedback =
    (store.getState().good - store.getState().bad) /
    totalFeedback || 0

  // if no feedback is given then total will be zero therefore stats won't be rendered
  if (totalFeedback) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <tr>
              <Statistic
                text='good'
                value={store.getState().good}
              />
            </tr>

            <tr>
              <Statistic
                text='ok'
                value={store.getState().ok}
              />
            </tr>

            <tr>
              <Statistic
                text='bad'
                value={store.getState().bad}
              />
            </tr>

            <tr>
              <Statistic
                text='all'
                value={totalFeedback}
              />
            </tr>

            <tr>
              <Statistic
                text='average'
                value={averageFeedback}
              />
            </tr>

            <tr>
              <Statistic
                text='positive'
                value={`${store.getState().good / totalFeedback * 100} %`}
              />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      No Feedback Given
    </div>
  )
}

export default Statistics