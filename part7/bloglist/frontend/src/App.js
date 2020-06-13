import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, login, logout } from './reducers/userReducer'
import { sortByLikes } from './utils/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => sortByLikes(blogs))
  const blogFormRef = React.createRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(setUser())
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
        <button>login</button>
      </div>
    </form>
  )

  return user === null ? (
    <main>
      <Notification />
      <h2>Log in to application</h2>
      {loginForm()}
    </main>
  ) : (
    <main>
      <Notification />
      <h1>blogs</h1>
      <hr />
      <p>
        {user.name} <strong>logged</strong> in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>
      <hr />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
        // <Blog key={blog.id} blog={blog} like={likeBlog} remove={removeBlog} />
      ))}
      <hr />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm formElem={blogFormRef} />
      </Togglable>
    </main>
  )
}

export default App
