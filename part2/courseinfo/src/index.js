import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of component',
        exercises: 14,
      },
    ],
  }

  return (
    <main>
      <Course course={course} />
    </main>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({ course }) => <h1>{course}</h1>
const Content = ({ parts }) => (
  <div>
    <Part name={parts[0].name} exercises={parts[0].exercises} />
    <Part name={parts[1].name} exercises={parts[1].exercises} />
    <Part name={parts[2].name} exercises={parts[2].exercises} />
  </div>
)
const Part = ({ name, exercises }) => (
  <p>
    {name}: <strong>{exercises}</strong>
  </p>
)
const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises:{' '}
      <strong>
        {parts.reduce((acc, cur) => {
          return acc + cur.exercises
        }, 0)}
      </strong>
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))