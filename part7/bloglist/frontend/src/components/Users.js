import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(({ users }) => users)
  return !users.length ? null : (
    <>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            {` - ${user.blogs.length} blogs`}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Users
