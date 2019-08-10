import React from 'react';

const SearchQuery = ({ handleChange }) => {
  return (
    <div>
      Find Countries
      <input onChange={handleChange} />
    </div>
  )
}

export default SearchQuery;