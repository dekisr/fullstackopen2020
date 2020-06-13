import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { name: action.name, username: action.username, id: action.id }
    case 'LOG_OUT':
      window.localStorage.removeItem('bloglistUser')
      return null
    default:
      return state
  }
}

export const setUser = () => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('bloglistUser'))
    loggedUser && blogService.setToken(loggedUser.token)
    loggedUser &&
      dispatch({
        type: 'LOG_IN',
        name: loggedUser.name,
        username: loggedUser.username,
        id: loggedUser.id,
      })
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem('bloglistUser', JSON.stringify(loggedUser))
      dispatch({
        type: 'LOG_IN',
        name: loggedUser.name,
        username: loggedUser.username,
        id: loggedUser.id,
      })
    } catch (error) {
      dispatch(setNotification('error', 'Wrong credentials.'))
      console.log(error)
    }
  }
}

export const logout = () => {
  return async (dispatch) => dispatch({ type: 'LOG_OUT' })
}

export default userReducer
