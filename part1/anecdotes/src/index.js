import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([...props.anecdotes].map(() => 0))
  const [mostVoted, setMostVoted] = useState(null)

  const handleRandomAnecdote = () => {
    // prevent to get the same anecdote
    const random = () => Math.floor(Math.random() * anecdotes.length)
    let newAnecdote = random()
    while (newAnecdote === selected) newAnecdote = random()
    setSelected(newAnecdote)
  }
  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    handleMostVoted()
  }
  const handleMostVoted = () => {
    const newArray = points.map((item, index) => {
      return { index, points: item }
    })
    newArray.sort((a, b) => b.points - a.points)
    setMostVoted(newArray[0].index)
  }
  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {!mostVoted ? (
        <p>There are no votes yet</p>
      ) : (
        <>
          <p>{props.anecdotes[mostVoted]}</p>
          <p>has {points[mostVoted]}</p>
        </>
      )}
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
