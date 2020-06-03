import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: '0.5rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <h3>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className="toggle">{visible ? 'hide' : 'view'}</button>
      </h3>
      {visible && (
        <ul>
          <li>{blog.url}</li>
          <li>likes {blog.likes} <button className="toggle">like</button></li>
          <li>{blog.user.name}</li>
        </ul>
      )}
    </div>
  )
}

export default Blog
