import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = ({ show }) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  } else if (authors.loading) {
    return <div>loading...</div>
  } else if (!authors.data) {
    return <div>Could not fetch the data.</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
