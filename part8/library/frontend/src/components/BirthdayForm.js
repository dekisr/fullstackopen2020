import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthdayForm = ({ setError }) => {
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('placeholder')
  const [born, setBorn] = useState('')
  const [updateAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born: Number(born) } })
    setName('placeholder')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found')
    }
  }, [result.data]) // eslint-disable-line

  return (
    <>
      <h2>Set birthday</h2>
      <form onSubmit={submit}>
        <select
          value={name}
          onChange={({ target }) => setName(target.value)}
        >
          <option value="placeholder" disabled>
            Select an Author
          </option>
          {!authors.loading &&
            !!authors.data &&
            authors.data.allAuthors.map((author) => (
              <option value={author.name} key={author.id}>{author.name}</option>
            ))}
        </select>
        {/* <div>
          {'name '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <div>
          {'born '}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default BirthdayForm
