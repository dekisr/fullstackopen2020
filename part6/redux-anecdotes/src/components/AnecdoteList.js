import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { initializeAnecdotes, voteUp } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const dispatch = useDispatch()
  const { initializeAnecdotes, anecdotes } = props

  // useEffect(() => {
  //   dispatch(initializeAnecdotes())
  // }, [dispatch])
  useEffect(() => {
    initializeAnecdotes()
  }, [initializeAnecdotes])

  // const anecdotes = useSelector(({ anecdotes, filter }) =>
  //   [...anecdotes]
  //     .sort((a, b) => b.votes - a.votes)
  //     .filter((anecdote) =>
  //       anecdote.content.toLowerCase().includes(filter.toLowerCase())
  //     )
  // )

  // const anecdotes = [...props.anecdotes]
  //   .sort((a, b) => b.votes - a.votes)
  //   .filter((anecdote) =>
  //     anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
  //   )

  const vote = (id, content) => {
    props.voteUp(id)
    props.setNotification(`You voted for "${content}" anecdote.`, 5)
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

// export default AnecdoteList
const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      ),
    filter: state.filter,
  }
}
const mapDispatchToProps = {
  initializeAnecdotes,
  voteUp,
  setNotification,
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
