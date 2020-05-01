import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    setNewName('')
    const check = persons
      .map((person) => person.name.toLowerCase())
      .includes(newPerson.name.toLowerCase())

    return newPerson.name &&
      (check
        ? alert(`${newPerson.name} is already added to phonebook`)
        : setPersons((persons) => persons.concat(newPerson))
      )
  }

  const handleNameChange = (event) => {
    console.log('Name Input', event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
