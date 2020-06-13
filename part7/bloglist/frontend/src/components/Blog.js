import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs).find((blog) => blog.id === id)

  const blogStyle = {
    padding: '0.5rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) &&
      dispatch(removeBlog(blog.id, blog.title))
  }

  return !blog ? null : (
    <div style={blogStyle}>
      <h3>
        {blog.title} {blog.author}
      </h3>
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
        <li>{blog.user.name}</li>
      </ul>
      <button onClick={handleRemove} className="toggle cancel">
        remove
      </button>
    </div>
  )
}

export default Blog
