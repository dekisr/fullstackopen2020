import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
      />
      <Total exercisesTotal={part1.exercises + part2.exercises + part3.exercises} />
      {/* <h1>{course}</h1>
      <p>{part1} {exercises1}</p>
      <p>{part2} {exercises2}</p>
      <p>{part3} {exercises3}</p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>
const Content = ({ parts }) => (
  // parts.map((part) => <Part name={part.name} exercises={part.exercises} />)
  <div>
    <Part name={parts[0].name} exercises={parts[0].exercises} />
    <Part name={parts[1].name} exercises={parts[1].exercises} />
    <Part name={parts[2].name} exercises={parts[2].exercises} />
  </div>
)
const Part = ({name, exercises}) => <p>{name} {exercises}</p>
const Total = ({ exercisesTotal }) => {
  return <p>Number of exercises {exercisesTotal}</p>
}

ReactDOM.render(<App />, document.getElementById('root'))
