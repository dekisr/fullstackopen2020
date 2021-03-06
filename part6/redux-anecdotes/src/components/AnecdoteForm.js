import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // dispatch(createAnecdote(content))
    // dispatch(setNotification(`You added the "${content}" anecdote.`, 5))
    props.createAnecdote(content)
    props.setNotification(`You added the "${content}" anecdote.`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input type="text" name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)
