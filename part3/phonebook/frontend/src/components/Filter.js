import React from 'react'

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      filter shown with{' '}
      <input value={filter} onChange={(e) => handleChange(e, 'filter')} />
    </div>
  )
}

export default Filter
