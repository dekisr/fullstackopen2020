import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {
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
    blogService.like(id, blogObj).then((updatedBlog) => {
      updateBlog(updatedBlog)
    })
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
      )}
    </div>
  )
}

export default Blog
