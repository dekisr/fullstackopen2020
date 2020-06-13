import usersReducer from '../reducers/usersReducer'

import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(({ users }) => users).find((user) => user.id === id)
  return !user ? null : (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.length && (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default User
