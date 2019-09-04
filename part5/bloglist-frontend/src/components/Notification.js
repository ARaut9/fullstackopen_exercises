import React from 'react'

const Notification = ({ message }) => {
  if (message) {
    if (message.status === 'error') {
      return (
        <div className="error">
          {message.text}
        </div>
      )
    } else if (message.status === 'success') {
      return (
        <div className="success">
          {message.text}
        </div>
      )
    }
  }

  return null
}

export default Notification
