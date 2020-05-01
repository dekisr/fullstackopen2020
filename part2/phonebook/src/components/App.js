import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    setNewName('')
    setNewNumber('')
    const check = persons
      .map((person) => person.name.toLowerCase())
      .includes(newPerson.name.toLowerCase())

    return check
      ? alert(`${newPerson.name} is already added to phonebook`)
      : setPersons((persons) => persons.concat(newPerson))
  }

  const handleChange = (event, type) => {
    type === 'name'
      ? setNewName(event.target.value)
      : setNewNumber(event.target.value)
  }
  // const handleNameChange = (event) => {
  //   console.log('Name Input', event.target.value)
  //   setNewName(event.target.value)
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(e) => handleChange(e, 'name')}
          />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(e) => handleChange(e, 'number')}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
