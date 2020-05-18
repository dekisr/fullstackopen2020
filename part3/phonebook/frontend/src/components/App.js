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

    const checkPerson = persons
      .find((person) =>
        person.name.toLowerCase() === newPerson.name.toLowerCase())
    const getId = () => {
      const samePerson = persons
        .find((person) =>
          person.name.toLowerCase() === newPerson.name.toLowerCase())
      return samePerson.id
    }

    return checkPerson && checkPerson.number === newPerson.number
      ? alert(
          `${newPerson.name} (${newPerson.number}) `
          +`is already added to phonebook`
        )
      : checkPerson
      ? window.confirm(`${newPerson.name} is already added to phonebook, `
          +`replace the old number with a new one?`) &&
            personService
              .update(getId(), newPerson)
              .then((resPerson) => setPersons((persons) =>
                persons.map((person) =>
                  person.id === resPerson.id
                  ? { ...person, number: resPerson.number }
                  : person
                )))
              .then(() => {
                setNotification({
                  type: 'success',
                  message: `Updated ${newPerson.name}’s number`
                })
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
              })
              .catch((error) => {
                // alert(
                //   `Failed while updating the number.`
                //   +`\nERROR -> ${error.message}.`
                // )
                setNotification({
                  type: 'error',
                  message: `Information of ${newPerson.name} `
                    +`has already been removed from server`
                })
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
                setPersons((persons) =>
                  persons.filter((person) => person.id !== getId())
                )
              })
            // setNotification({
            //   type: 'error',
            //   message: `Updated function not working...`
            // })
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
    const personToDelete = persons.find((person) => person.id === id)
    return (
      window.confirm(`Delete ${personToDelete.name}?`) &&
      personService
        .remove(id)
        .then(() =>
          setPersons((persons) => persons.filter((person) => person.id !== id))
        )
        .catch((error) => {
          // alert(`Failed while removing the person.`
          // +`\nERROR -> ${error.message}.`)
          setNotification({
            type: 'error',
            message: `Information of ${personToDelete.name} `
              +`has already been removed from server`
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons((persons) =>
            persons.filter((person) => person.id !== id)
          )
        })
    )
  }

  const handleChange = ({ target: { value } }, type) => {
    type === 'name'
      ? setNewName(value)
      : type === 'number'
      ? setNewNumber(value)
      : setFilter(value)
  }
  // const handleNameChange = (event) => {
  //   console.log('Name Input', event.target.value)
  //   setNewName(event.target.value)
  // }

  return (
    <main>
      <Notification notification={notification} />
      <h1>Phonebook</h1>
      <Filter filter={filter} handleChange={handleChange} />
      <hr />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
      />
      <hr />
      <h3>Numbers</h3>
      <Persons persons={persons} removePerson={removePerson} filter={filter} />
    </main>
  )
}

export default App
