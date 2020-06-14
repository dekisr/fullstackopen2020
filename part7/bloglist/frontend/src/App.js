import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { setUser, login, logout } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import StyledApp from './styles/AppStyles'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(setUser())
    dispatch(getUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogIn = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }
  const handleLogout = () => {
    dispatch(logout())
  }

  const loginForm = () => (
    <form onSubmit={handleLogIn}>
      <div>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          value={username}
          id="username"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <input
          type="password"
          value={password}
          id="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <StyledApp.Button>login</StyledApp.Button>
      </div>
    </form>
  )

  return user === null ? (
    <StyledApp>
      <Notification />
      <h2>Log in to application</h2>
      {loginForm()}
    </StyledApp>
  ) : (
    <StyledApp>
      <Notification />
      <h1>Bloglist for Full Stack Open 2020</h1>
      <Menu />
      <hr />
      <p>
        {user.name} <strong>logged</strong> in{' '}
        <StyledApp.Button onClick={handleLogout}>logout</StyledApp.Button>
      </p>
      <hr />
      <Switch>
        <Route exact path="/">
          <BlogList />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route>
          <h2>not found...</h2>
        </Route>
      </Switch>
    </StyledApp>
  )
}

export default App
