import React from 'react'
import Person from './Person'

const Persons = ({ personsToShow, toggleDeleteOf } ) => {

  const rows = () => personsToShow.map(person =>
    <Person key={person.name} person={person} toggleDelete={() => toggleDeleteOf(person.id)} />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

export default Persons