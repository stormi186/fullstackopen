import React from 'react'

const Person = ({ person, toggleDelete }) => {
  
  return (
    <p>{person.name} {person.number} <button onClick={toggleDelete}>Delete</button></p>
  )
}

export default Person