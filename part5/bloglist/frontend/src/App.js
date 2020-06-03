import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(sortByLikes(blogs))
    })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setNotification({
        type: 'error',
        message: 'Wrong credentials.',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((newBlog) => {
        setBlogs(blogs.concat({ ...newBlog, user }))
        setNotification({
          type: 'success',
          message: `${newBlog.title} by ${newBlog.author} added.`,
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        setNotification({
          type: 'error',
          message: 'Could not create a new blog.',
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const sortByLikes = (blogsArray) => {
    const sortedBlogs = [...blogsArray].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  const updateBlogs = (blogObject) => {
    const updatedBlogs = [...blogs]
    updatedBlogs[
      updatedBlogs.findIndex((blog) => blog.id === blogObject.id)
    ] = { ...blogObject }
    setBlogs(sortByLikes(updatedBlogs))
    setNotification({
      type: 'success',
      message: `${blogObject.title} updated.`,
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const removeBlog = (id, title) => {
    blogService
      .remove(id)
      .then(() => {
        const filteredBlogs = blogs.filter((blog) => blog.id !== id)
        setBlogs(filteredBlogs)
        setNotification({
          type: 'success',
          message: `The blog ${title} was removed.`,
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        setNotification({
          type: 'error',
          message: 'Could not remove the blog.',
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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
      <Notification notification={notification} />
      <h2>Log in to application</h2>
      {loginForm()}
    </main>
  ) : (
    <main>
      <Notification notification={notification} />
      <h1>blogs</h1>
      <hr />
      <p>
        {user.name} <strong>logged</strong> in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>
      <hr />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlogs}
          remove={removeBlog}
        />
      ))}
      <hr />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} setNotification={setNotification} />
      </Togglable>
    </main>
  )
}

export default App
