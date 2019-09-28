import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ errorType, setErrorType ] = useState('fail')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const person = persons.find(o => o.name === newName)

    if(typeof person === 'undefined') {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        setErrorType('success')
        setErrorMessage(
          `Added '${newName}'`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    else {
      let result = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one ?`)
      if (result) {
        const changedPerson = { ...person, number: newNumber }
        const id = person.id
        personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setErrorType('success')
          setErrorMessage(
            `Updated phone for '${newName}'`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorType('fail')
          setErrorMessage(
            `The person: '${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
      }
    }
  
    setNewName('')
    setNewNumber('')
  }

  const toggleDeleteOf = id => {
    const person = persons.find(n => n.id === id)
    let result = window.confirm(`Delete ${person.name} ?`)
 
    if (result) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(n => n.id !== id))
          setErrorType('success')
          setErrorMessage(
            `Deleted '${person.name}'`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          })
        .catch(error => {
          setErrorType('fail')
          setErrorMessage(
            `The person: '${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={errorType} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} toggleDeleteOf={toggleDeleteOf} />
    </div>
  )
}

export default App