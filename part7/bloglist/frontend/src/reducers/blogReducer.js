import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'NEW_BLOG':
      return [...state, action.blog]
    case 'UPDATE_BLOG':
      const newState = [...state]
      newState[newState.findIndex((blog) => blog.id === action.blog.id)] =
        action.blog
      return newState
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.id)
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
        setNotification('success', `${blog.title} by ${blog.author} added.`)
      )
    } catch (error) {
      dispatch(setNotification('error', 'Could not create a new blog.'))
      console.log(error)
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find((blog) => blog.id === id)
    const blogObj = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.like(id, blogObj)
      dispatch({
        type: 'UPDATE_BLOG',
        blog: updatedBlog,
      })
      dispatch(setNotification('success', `${updatedBlog.title} updated.`))
    } catch (error) {
      dispatch(setNotification('error', `Could not update the blog.`))
      console.log(error)
    }
  }
}

export const removeBlog = (id, title) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({ type: 'DELETE_BLOG', id })
      dispatch(setNotification('success', `The blog ${title} was removed.`))
    } catch (error) {
      dispatch(setNotification('error', 'Could not remove the blog.'))
      console.log(error)
    }
  }
}

export default blogReducer
