import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, removePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person key={person.name} person={person} removePerson={removePerson} />
        ))}
    </ul>
  )
}

export default Persons
