import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: '0.5rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) &&
      dispatch(removeBlog(blog.id, blog.title))
  }

  return (
    <div style={blogStyle}>
      <h3>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className="toggle">
          {visible ? 'hide' : 'view'}
        </button>
      </h3>
      {visible && (
        <>
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
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Blog
