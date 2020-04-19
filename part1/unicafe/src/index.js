import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood((g) => g + 1)}>good</button>
      <button onClick={() => setNeutral((n) => n + 1)}>neutral</button>
      <button onClick={() => setBad((b) => b + 1)}>bad</button>
      <h2>statistics</h2>
      <ul>
        <li>good - {good}</li>
        <li>neutral - {neutral}</li>
        <li>bad - {bad}</li>
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
