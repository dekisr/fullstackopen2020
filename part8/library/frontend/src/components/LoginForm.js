import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useEffect } from 'react'

const LoginForm = ({ show, setError, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    await login({ variables: { username, password } })
    setUsername('')
    setPassword('')
    setPage('books')
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('libraryfs-user-token', token)
    }
  }, [result.data, setToken])

  if (!show) {
    return null
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
