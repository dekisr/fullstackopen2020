import React, { useState } from 'react'
import { useApolloClient, useSubscription, useQuery } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommended from './components/Recommended'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const client = useApolloClient()
  const { refetch: refetchAuthors } = useQuery(ALL_AUTHORS)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
      // client.reFetchObservableQueries()
      refetchAuthors()
      for (const genre of addedBook.genres) {
        try {
          const dataInStore = client.readQuery({
            query: ALL_BOOKS,
            variables: { genre },
          })
          client.writeQuery({
            query: ALL_BOOKS,
            variables: { genre },
            data: {
              ...dataInStore,
              allBooks: [...dataInStore.allBooks, addedBook],
            },
          })
        } catch (error) {
          console.log('no genre query to updated yet.')
        }
      }
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`New book "${addedBook.title}" was added.`)
      updateCacheWith(addedBook)
      console.log(subscriptionData)
    },
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!!token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} token={token} />
      <Books show={page === 'books'} />
      {!!token && (
        <>
          <Recommended show={page === 'recommended'} />
          <NewBook
            show={page === 'add'}
            setError={notify}
            token={token}
            setPage={setPage}
            updateCacheWith={updateCacheWith}
          />
        </>
      )}
      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default App
