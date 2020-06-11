import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    if (!title || !author || !url) {
      return dispatch(setNotification('error', 'Fill the form correctly.'))
    }
    const blogObject = {
      title,
      author,
      url,
    }
    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          value={title}
          id="title"
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          value={author}
          id="author"
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          type="text"
          value={url}
          id="url"
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
