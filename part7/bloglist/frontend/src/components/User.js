import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

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
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default User
