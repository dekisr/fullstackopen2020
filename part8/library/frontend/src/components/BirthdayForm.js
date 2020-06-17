import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthdayForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [updateAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born: Number(born) } })
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found')
    }
  }, [result.data])

  return (
    <>
      <h2>Set birthday</h2>
      <form onSubmit={submit}>
        <div>
          {'name '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          {'born '}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </>
  )
}

export default BirthdayForm
