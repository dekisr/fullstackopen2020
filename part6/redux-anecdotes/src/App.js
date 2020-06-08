import React from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <main>
      <h1>Anecdotes</h1>
      <Filter />
      <hr />
      <Notification />
      <AnecdoteList />
      <hr />
      <AnecdoteForm />
    </main>
  )
}

export default App
