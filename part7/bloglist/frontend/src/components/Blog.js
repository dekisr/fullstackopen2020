import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, commentBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs).find((blog) => blog.id === id)

  const [comment, setComment] = useState('')

  const blogStyle = {
    padding: '0.5rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleComment = (id, comment) => {
    dispatch(commentBlog(id, comment))
    setComment('')
  }

  const handleRemove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) &&
      dispatch(removeBlog(blog.id, blog.title))
  }

  return !blog ? null : (
    <div style={blogStyle}>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <ul>
        <li>{blog.url}</li>
        <li>
          likes {blog.likes}{' '}
          <button
            onClick={() => dispatch(likeBlog(blog.id))}
            className="toggle"
          >
            like
          </button>
        </li>
        <li>
          added by: <strong>{blog.user.name}</strong>
        </li>
      </ul>
      <h3>Comments</h3>
      <label htmlFor="title">comment:</label>
      <input
        type="text"
        value={comment}
        id="comment"
        name="Comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={() => handleComment(blog.id, comment)}>
        add comment
      </button>
      <ul>
        {blog.comments && !blog.comments.length ? (
          <li>no comments yet.</li>
        ) : (
          blog.comments.map((comment) => <li key={uuidv4()}>{comment}</li>)
        )}
      </ul>
      <button onClick={handleRemove} className="toggle cancel">
        remove
      </button>
    </div>
  )
}

export default Blog
