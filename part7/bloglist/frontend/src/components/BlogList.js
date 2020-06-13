import React from 'react'
import { useSelector } from 'react-redux'
import { sortByLikes } from '../utils/blogs'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => sortByLikes(blogs))
  const blogFormRef = React.createRef()
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <hr />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm formElem={blogFormRef} />
      </Togglable>
    </>
  )
}

export default BlogList
