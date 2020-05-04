import React, { useState, useEffect } from 'react'
import personService from '../services/persons'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // fetch('http://localhost:3001/persons')
    //   .then((response) => response.json())
    //   .then((data) => setPersons(data))
    personService
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) =>
        alert(
          `Failed while fetching data from the server.`
          +`\nERROR -> ${error.message}.`
        )
      )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    }

    setNewName('')
    setNewNumber('')
    setFilter('')

    const checkName = persons
      .map((person) => person.name.toLowerCase())
      .includes(newPerson.name.toLowerCase())
    const checkNumber = persons
      .map((person) => person.number)
      .includes(newPerson.number)
    const getId = () => {
      const samePerson = persons
        .find((person) => person.name === newPerson.name)
      return samePerson.id
    }

    return checkName && checkNumber
      ? alert(
          `${newPerson.name} (${newPerson.number}) `
          +`is already added to phonebook`
        )
      : checkName
      ? window.confirm(`${newPerson.name} is already added to phonebook, `
          +`replace the old number with a new one?`) &&
            personService
              .update(getId(), newPerson)
              .then((resPerson) => setPersons((persons) =>
                persons.map((person) =>
                  person.id === resPerson.id ? resPerson : person)))
              .then(() => {
                setNotification({
                  type: 'success',
                  message: `Updated ${newPerson.name}’s number`
                })
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
              })
              .catch((error) =>
                alert(
                  `Failed while updating the number.`
                  +`\nERROR -> ${error.message}.`
                )
              )
      : personService
          .add(newPerson)
          .then((person) => setPersons((persons) => persons.concat(person)))
          .then(() => {
            setNotification({
              type: 'success',
              message: `Added ${newPerson.name}`
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch((error) =>
            alert(
              `Failed while adding new person to the server.`
              +`\nERROR -> ${error.message}.`
            )
          )
  }

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id)
    return (
      window.confirm(`Delete ${person.name}?`) &&
      personService
        .remove(id)
        .then(() =>
          setPersons((persons) => persons.filter((person) => person.id !== id))
        )
        .catch((error) =>
          alert(`Failed while removing the person.`
          +`\nERROR -> ${error.message}.`)
        )
    )
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
      <Notification notification={notification} />
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
      <Persons persons={persons} removePerson={removePerson} filter={filter} />
    </div>
  )
}

export default App
