import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './counterReducer'
import './index.css'

const store = createStore(counterReducer)

const App = () => {
  const handleVote = (type) => {
    store.dispatch({ type })
  }

  return (
    <main>
      <h2>give feedback</h2>
      <VoteButton onClick={() => handleVote('GOOD')} text="good" />
      <VoteButton onClick={() => handleVote('OK')} text="neutral" />
      <VoteButton onClick={() => handleVote('BAD')} text="bad" />
      <VoteButton
        onClick={() => handleVote('ZERO')}
        text="reset stats"
        className="reset"
      />
      <hr />
      <h2>statistics</h2>
      {!store.getState().good &&
      !store.getState().ok &&
      !store.getState().bad ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={store.getState().good}
          neutral={store.getState().ok}
          bad={store.getState().bad}
          total={
            store.getState().good + store.getState().ok + store.getState().bad
          }
        />
      )}
    </main>
  )
}

const VoteButton = ({ onClick, text, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="total" value={total} />
        <Statistic
          text="average score part1 (g:1/b:-1/n:0)"
          value={((good * 1 + bad * -1) / total).toFixed(2)}
        />
        <Statistic
          text="positive"
          value={((good * 100) / total || 0).toFixed(2)}
        />
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

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
renderApp()
store.subscribe(renderApp)
