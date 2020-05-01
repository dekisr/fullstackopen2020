import React from 'react'

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

export default Course
