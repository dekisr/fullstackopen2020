import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
      dispatch(setNotification('error', 'Wrong credentials.'))
      console.log(error)
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
        dispatch(setNotification('success', `${newBlog.title} by ${newBlog.author} added.`))
      })
      .catch((error) => {
        dispatch(setNotification('error', 'Could not create a new blog.'))
        console.log(error)
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
    dispatch(setNotification('success', `${blogObject.title} updated.`))
  }

  const likeBlog = ({ id, user, likes, author, title, url }) => {
    const blogObj = {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url,
    }
    blogService
      .like(id, blogObj)
      .then((updatedBlog) => {
        updateBlogs(updatedBlog)
      })
      .catch((error) => console.log(error))
  }

  const removeBlog = (id, title) => {
    blogService
      .remove(id)
      .then(() => {
        const filteredBlogs = blogs.filter((blog) => blog.id !== id)
        setBlogs(filteredBlogs)
        dispatch(setNotification('success', `The blog ${title} was removed.`))
      })
      .catch((error) => {
        dispatch(setNotification('error', 'Could not remove the blog.'))
        console.log(error)
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
        <Blog key={blog.id} blog={blog} like={likeBlog} remove={removeBlog} />
      ))}
      <hr />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </main>
  )
}

export default App
