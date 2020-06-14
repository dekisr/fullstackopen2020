import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import StyledBlogForm from '../styles/BlogFormStyles'

const BlogForm = ({ formElem }) => {
  const dispatch = useDispatch()
  const message = useSelector(({ notification: { message } }) => message)

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
    dispatch(createBlog(blogObject))
  }
  useEffect(() => {
    if (message === `${title} by ${author} added.`) {
      setTitle('')
      setAuthor('')
      setUrl('')
      formElem.current.toggleVisibility()
    }
  }, [message, title, author, formElem])

  return (
    <>
      <StyledBlogForm>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          value={title}
          id="title"
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor="author">author:</label>
        <input
          type="text"
          value={author}
          id="author"
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label htmlFor="url">url:</label>
        <input
          type="text"
          value={url}
          id="url"
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </StyledBlogForm>
      <StyledBlogForm.Button onClick={addBlog}>create</StyledBlogForm.Button>
    </>
  )
}

export default BlogForm
