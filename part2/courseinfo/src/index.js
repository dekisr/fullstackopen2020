import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <main>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
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
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
)
const Part = ({ name, exercises }) => (
  <p>
    {name}: <strong>{exercises}</strong>
  </p>
)
const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises:{' '}
        <strong>
          {parts.reduce((acc, cur) => {
            return acc + cur.exercises
          }, 0)}
        </strong>
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
