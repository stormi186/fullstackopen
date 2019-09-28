import React, { useState, useEffect } from 'react'
import Country from './Country'
import Language from './Language'
import axios from 'axios'

const Countries = ( {countriesToShow, newFilter, handleButtonClick} ) => {
  const [ weather, setWeather ] = useState([])
  let url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=885b5ce4a4ab3068437d2e8b163b7af5"
  const rows = () => countriesToShow.map(country =>
    <Country key={country.name} country={country} handleButtonClick={handleButtonClick} />
  )

  useEffect(() => {
    axios.get(url)
    .then(response => {
    setWeather(response.data)
      })
  })

  if (newFilter === "") {
    return (
      <div>
        Please enter a name of the country
      </div>
    )
  }

  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (countriesToShow.length === 1) {
    url = "https://api.openweathermap.org/data/2.5/weather?q="+countriesToShow[0].capital+"&appid=885b5ce4a4ab3068437d2e8b163b7af5"
    const languagesToShow = countriesToShow[0].languages
    const rowsLanguages = () => languagesToShow.map(language =>
      <Language key={language.iso639_1} name={language.name} />
    )
    
    return (
      <div>
        <h1>{countriesToShow[0].name}</h1>
        <p>capital {countriesToShow[0].capital}</p>
        <p>population {countriesToShow[0].population}</p>
        <h3>languages</h3>
        <ul>
        {rowsLanguages()}
        </ul>
        <img width="200px" src={countriesToShow[0].flag} alt={countriesToShow[0].name}/>
        <h3>Weather in {countriesToShow[0].capital}</h3>
        <p><strong>temperature: </strong>{Math.round(weather.main.temp - 273.15)} Celsius</p>
        <p><strong>wind: </strong>{weather.wind.speed} kph direction {weather.wind.deg} </p>
      </div>
    )
  }
  
  return (
    <div>
      {rows()}
    </div>
  )
}

export default Countries