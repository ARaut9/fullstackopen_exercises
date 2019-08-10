import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.code === 1) {
    return (
      <div className='successful'>
        {message.msg}
      </div>
    )
  } else {
    return (
      <div className='error'>
        {message.msg}
      </div>
    )
  }
}

export default Notification;