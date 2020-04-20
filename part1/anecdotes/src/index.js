import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([...anecdotes].map(() => 0))
  const [mostVoted, setMostVoted] = useState(0)

  const randomAnecdote = (multiplier) => {
    return Math.floor(Math.random() * multiplier)
  }

  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }
  const handleRandomAnecdote = () => {
    // prevent to get the same anecdote
    let newAnecdote = randomAnecdote(anecdotes.length)
    while (newAnecdote === selected)
      newAnecdote = randomAnecdote(anecdotes.length)
    setSelected(newAnecdote)
  }

  useEffect(() => {
    setSelected(randomAnecdote(anecdotes.length))
  }, [anecdotes])
  useEffect(() => {
    const newArray = points.map((item, index) => {
      return { index, points: item }
    })
    newArray.sort((a, b) => b.points - a.points)
    return setMostVoted(newArray[0].index)
  }, [points])

  return (
    <main>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>
        has <strong>{points[selected]}</strong> votes
      </p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <hr />
      <h2>Anecdote(s) with most votes</h2>
      {points[mostVoted] === 0 ? (
        <p>There are no votes yet.</p>
      ) : (
        <>
          <ul>
            {anecdotes.map((item, index) => {
              return (
                points[index] === points[mostVoted] && (
                  <li key={item}>“{item}”</li>
                )
              )
            })}
          </ul>
          <p>
            has <strong>{points[mostVoted]}</strong> votes
          </p>
        </>
      )}
    </main>
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
