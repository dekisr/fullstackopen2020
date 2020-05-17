import React from 'react'

const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => removePerson(person.id)} className="delete">
        ✘ delete
      </button>
    </li>
  )
}

export default Person
