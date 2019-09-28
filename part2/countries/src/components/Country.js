import React from 'react'

const Country = ({ country, handleButtonClick }) => {
  return (
    <p>{country.name}<button onClick={handleButtonClick} value={country.name}>show</button></p>
  )
}

export default Country