import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const books = useQuery(ALL_BOOKS)
  const [filterBooks, result] = useLazyQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [genre, setGenre] = useState('all genres')
  const [genresList, setGenresList] = useState([])

  useEffect(() => {
    genre === 'all genres'
      ? books.data && setFilteredBooks(books.data.allBooks)
      : filterBooks({ variables: { genre } })
  }, [genre, filterBooks, books.data])

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (books.data) {
      const list = [
        ...new Set(books.data.allBooks.map((book) => book.genres).flat()),
      ]
      setGenresList(list)
      setFilteredBooks(books.data.allBooks)
    }
  }, [books])

  if (!show) {
    return null
  } else if (books.loading) {
    return <div>loading...</div>
  } else if (!books.data) {
    return <div>Could not fetch the data.</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre: <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresList.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('all genres')}>all genres</button>
    </div>
  )
}

export default Books
