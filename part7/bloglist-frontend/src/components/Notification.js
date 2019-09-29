import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ message }) => {
  if (message) {
    if (message.status === 'error') {
      return (
        <Message negative>
          {message.text}
        </Message>
      )
    } else if (message.status === 'success') {
      return (
        <Message positive>
          {message.text}
        </Message>
      )
    }
  }

  return null
}

export default Notification
