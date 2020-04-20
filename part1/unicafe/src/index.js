import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

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
    <main>
      <h2>give feedback</h2>
      <VoteButton onClick={() => handleVote(setGood)} text="good" />
      <VoteButton onClick={() => handleVote(setNeutral)} text="neutral" />
      <VoteButton onClick={() => handleVote(setBad)} text="bad" />
      <hr />
      <h2>statistics</h2>
      {!all ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      )}
    </main>
  )
}

const VoteButton = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad, all }) => {
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={(good * 1 + bad * -1) / all} />
        <Statistic text="positive" value={(good * 100) / all || 0} />
        {/* <li>good: {good}</li>
        <li>neutral: {neutral}</li>
        <li>bad: {bad}</li>
        <li>all: {all}</li>
        <li>average: {(good * 1 + bad * -1) / all || 0}</li>
        <li>positive: {(good * 100) / all || 0}%</li> */}
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>
        <strong>{value}</strong>
        {text === 'positive' && '%'}
      </td>
    </tr>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
