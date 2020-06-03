import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, remove }) => {
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

  const like = ({ id, user, likes, author, title, url }) => {
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
        updateBlog(updatedBlog)
      })
      .catch((error) => console.log(error))
  }

  const handleRemove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) &&
      remove(blog.id, blog.title)
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
              <button onClick={() => like(blog)} className="toggle">
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
  updateBlog: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Blog
