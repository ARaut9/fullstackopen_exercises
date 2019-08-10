import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchQuery from './components/SearchQuery';
import SearchResult from './components/SearchResults';

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => setQuery(event.target.value)

  const handleClick = (event) => setQuery(event.target.parentElement.dataset.country)

  const filterCountries = countries.filter((country) => country.name.match(
    `${query.slice(0, 1).toUpperCase()}${query.slice(1).toLowerCase()}`) && query)

  return (
    <div className="App">
      <SearchQuery handleChange={handleChange} />
      <SearchResult filterCountries={filterCountries} handleClick={handleClick} />
    </div>
  )
}

export default App;
