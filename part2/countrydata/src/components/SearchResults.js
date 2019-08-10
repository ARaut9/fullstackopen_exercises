import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResult = ({ filterCountries, handleClick }) => {
  const [weatherData, setWeatherData] = useState(null)
  useEffect(() => {
    if (filterCountries.length === 1) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${filterCountries[0].capital}&appid=b36fabe9f0208e456a3447a3c6a7ccfd`)
        .then(response => {
          setWeatherData(response.data)
        })
    }
  }, [filterCountries])

  if (filterCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter </div>
    )
  } else if (filterCountries.length < 10 && filterCountries.length > 1) {
    return (
      filterCountries.map(country =>
        <p key={country.name} data-country={country.name}>
          {country.name}
          <button onClick={handleClick}>Show</button>
        </p>)
    )
  } else if (filterCountries.length === 1) {
    if (weatherData) {
      return (
        <div>
          <h1>{filterCountries[0].name}</h1>
          <p>Capital - {filterCountries[0].capital}</p>
          <p>Population - {filterCountries[0].population}</p>
          <h2>Languages</h2>
          <ul>
            {filterCountries[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={filterCountries[0].flag} alt={`${filterCountries[0].name} flag`} width='200' />
          <h2>Weather in {filterCountries[0].capital}</h2>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Condition: {weatherData.weather[0].main}</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Wind: {weatherData.wind.speed}kph</p>
          <p>Direction: {weatherData.wind.deg}deg</p>
        </div>
      )
    }
    return ('loading...')
  }
  return (
    <div>Enter a country name above</div>
  )
}

export default SearchResult;