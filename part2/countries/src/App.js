import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleButtonClick = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Countries search</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} newFilter={newFilter} handleButtonClick={handleButtonClick} />
    </div>
  )
}

export default App