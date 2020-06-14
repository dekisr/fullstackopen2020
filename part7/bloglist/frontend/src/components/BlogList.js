import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sortByLikes } from '../utils/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => sortByLikes(blogs))
  const blogFormRef = React.createRef()
  return !blogs ? null : (
    <>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>Create New</h2>
        <BlogForm formElem={blogFormRef} />
      </Togglable>
    </>
  )
}

export default BlogList
