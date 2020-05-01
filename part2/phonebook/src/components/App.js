import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    setNewName('')
    setNewNumber('')
    setFilter('')
    const check = persons
      .map((person) => person.name.toLowerCase())
      .includes(newPerson.name.toLowerCase())

    return check
      ? alert(`${newPerson.name} is already added to phonebook`)
      : setPersons((persons) => persons.concat(newPerson))
  }

  const handleChange = ({ target: { value } }, type) => {
    type === 'name'
      ? setNewName(value)
      : type === 'number'
      ? setNewNumber(value)
      : setFilter(value.toLowerCase())
  }
  // const handleNameChange = (event) => {
  //   console.log('Name Input', event.target.value)
  //   setNewName(event.target.value)
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
