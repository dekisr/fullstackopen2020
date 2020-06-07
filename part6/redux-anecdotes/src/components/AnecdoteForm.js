import React from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { createNew } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const dispatch = useDispatch()

  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createNew(newAnecdote))
    dispatch(setNotification(`You added the "${content}" anecdote.`))
    setTimeout(() => dispatch(resetNotification()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
