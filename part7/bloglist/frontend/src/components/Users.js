import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  const users = useSelector(({ users }) => users)
  return (
    users.length && (
      <>
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id}>
            {user.name} {user.blogs.length}
          </div>
        ))}
      </>
    )
  )
}

export default Users
