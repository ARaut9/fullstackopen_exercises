import React from 'react'

const Button = ({ store, type, label }) => {
  const clickHandler = (type) => {
    store.dispatch({
      type
    })
  }

  return (
    <button onClick={() => clickHandler(type)}>{label}</button>
  )
}

export default Button