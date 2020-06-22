import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries'

const Recommended = ({ show }) => {
  const user = useQuery(USER)
  const [fav, setFav] = useState(null)
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: fav },
  })

  useEffect(() => {
    if (user.data) {
      setFav(user.data.me.favoriteGenre)
    }
  }, [user])

  if (!show) {
    return null
  } else if (user.loading) {
    return <div>loading...</div>
  } else if (!user.data) {
    return <div>Could not fetch the data.</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in yout favorite genre{' '}
        <strong>{user.data.me.favoriteGenre}</strong>
      </p>
      {books.loading ? (
        <p>loading...</p>
      ) : !books.data ? (
        <p>Could not fetch the books.</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Recommended
