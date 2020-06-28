import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS } from '../queries'

const NewBook = ({ show, setError, token, setPage, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    // update: (store, response) => {
    //   const dataInStore = store.readQuery({ query: ALL_BOOKS })
    //   store.writeQuery({
    //     query: ALL_BOOKS,
    //     data: {
    //       ...dataInStore,
    //       allBooks: [...dataInStore.allBooks, response.data.addBook],
    //     },
    //   })
    //   for (const genre of genres) {
    //     const dataInStore = store.readQuery({
    //       query: ALL_BOOKS,
    //       variables: { genre },
    //     })
    //     store.writeQuery({
    //       query: ALL_BOOKS,
    //       variables: { genre },
    //       data: {
    //         ...dataInStore,
    //         allBooks: [...dataInStore.allBooks, response.data.addBook],
    //       },
    //     })
    //   }
    // },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
    onCompleted: (data) => {
      setTitle('')
      setPublished('')
      setAuhtor('')
      setGenres([])
      setGenre('')
      setPage('books')
    },
    onError: (error) => {
      error.graphQLErrors[0] && setError(error.graphQLErrors[0].message)
    },
  })

  if (!show) {
    return null
  } else if (!token) {
    setPage('books')
  }

  const submit = async (event) => {
    event.preventDefault()
    await addBook({
      variables: { title, author, published: Number(published), genres },
    })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
