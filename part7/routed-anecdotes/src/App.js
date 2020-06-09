import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import About from './components/About'
import Footer from './components/Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])

  const [notification, setNotification] = useState('')

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const history = useHistory()

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  let timeoutID
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    clearTimeout(timeoutID)
    setNotification(`A new anecdote ${anecdote.content} created!`)
    timeoutID = setTimeout(() => setNotification(''), 10000)
    history.push('/')
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <>
      <Menu />
      <Notification message={notification} />
      <Switch>
        <Route exact path="/">
          <div>
            <h1>Software anecdotes</h1>
            <AnecdoteList anecdotes={anecdotes} />
          </div>
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route>
          <h2>not found...</h2>
        </Route>
      </Switch>
      <Footer />
    </>
  )
}

export default App
