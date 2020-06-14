import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, commentBlog, removeBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import StyledBlog from '../styles/BlogStyles'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs).find((blog) => blog.id === id)

  const [comment, setComment] = useState('')

  const handleComment = (event, id, comment) => {
    event.preventDefault()
    dispatch(commentBlog(id, comment))
    setComment('')
  }

  const handleRemove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) &&
      dispatch(removeBlog(blog.id, blog.title)).then(() => history.push('/'))
  }

  return !blog ? null : (
    <StyledBlog>
      <h2>
        {blog.title} - {blog.author}{' '}
        <StyledBlog.Remove onClick={handleRemove} className="toggle cancel">
          remove
        </StyledBlog.Remove>
      </h2>
      <ul>
        <li>{blog.url}</li>
        <li>
          <strong>{blog.likes}</strong>
          {' likes. '}
          <StyledBlog.Like onClick={() => dispatch(likeBlog(blog.id))}>
            like
          </StyledBlog.Like>
        </li>
        <li>
          added by: <strong>{blog.user.name}</strong>
        </li>
      </ul>
      <hr />
      <h3>Comments</h3>
      <StyledBlog.Comments>
        {blog.comments && !blog.comments.length ? (
          <li>no comments yet.</li>
        ) : (
          blog.comments.map((comment) => <li key={uuidv4()}>{comment}</li>)
        )}
      </StyledBlog.Comments>
      <form onSubmit={(event) => handleComment(event, blog.id, comment)}>
        <input
          type="text"
          value={comment}
          id="comment"
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <StyledBlog.AddComment type="submit">add comment</StyledBlog.AddComment>
      </form>
    </StyledBlog>
  )
}

export default Blog
