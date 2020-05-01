import React from 'react'

const PersonForm = ({ addPerson, newName, newNumber, handleChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{' '}
        <input value={newName} onChange={(e) => handleChange(e, 'name')} />
      </div>
      <div>
        number:{' '}
        <input value={newNumber} onChange={(e) => handleChange(e, 'number')} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
