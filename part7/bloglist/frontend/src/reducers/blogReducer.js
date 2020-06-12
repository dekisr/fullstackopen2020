import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'NEW_BLOG':
      return [...state, action.blog]
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs,
    })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(blogObject)
      dispatch({
        type: 'NEW_BLOG',
        blog,
      })
      dispatch(
        setNotification(
          'success',
          `${blog.title} by ${blog.author} added.`
        )
      )
    } catch (error) {
      dispatch(setNotification('error', 'Could not create a new blog.'))
      console.log(error)
    }
  }
}

export default blogReducer
