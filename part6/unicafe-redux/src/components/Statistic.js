import React from 'react'

const Statistic = ({ text, value }) => {
  return (
    <td>
      <div>{text} {value}</div>
    </td>
  )
}

export default Statistic