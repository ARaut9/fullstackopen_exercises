import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = ({ target }) => {
    props.filterChange(target.value)
  }

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { filterChange }
)(Filter)