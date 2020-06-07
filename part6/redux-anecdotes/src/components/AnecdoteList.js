import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { voteUp, initializeAnecdotes } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  const anecdotes = useSelector(({ anecdotes, filter }) =>
    [...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
  )
  const vote = (id, content) => {
    dispatch(voteUp(id))
    dispatch(setNotification(`You voted for "${content}" anecdote.`))
    setTimeout(() => dispatch(resetNotification()), 5000)
  }
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
