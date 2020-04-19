import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleVote = (fbf) => {
    // functional updates
    // https://reactjs.org/docs/hooks-reference.html#functional-updates
    fbf((c) => c + 1)
    setAll((a) => a + 1)
  }
  // const average = () => (good*1+bad*-1)/all
  // const positive = () => (good*100)/all

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => handleVote(setGood)}>good</button>
      <button onClick={() => handleVote(setNeutral)}>neutral</button>
      <button onClick={() => handleVote(setBad)}>bad</button>
      <h2>statistics</h2>
      {!all ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      )}
    </div>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  return (
    <ul>
      <li>good: {good}</li>
      <li>neutral: {neutral}</li>
      <li>bad: {bad}</li>
      <li>all: {all}</li>
      <li>average: {(good * 1 + bad * -1) / all || 0}</li>
      <li>positive: {(good * 100) / all || 0}%</li>
    </ul>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
