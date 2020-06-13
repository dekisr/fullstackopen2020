import usersService from '../services/users'
import setNotification from './notificationReducer'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return [...action.data]
    default:
      return state
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll()
      dispatch({ type: 'SET_USERS', data: users })
    } catch (error) {
      dispatch(setNotification('error', 'Could not fetch the users.'))
      console.log(error)
    }
  }
}

export default usersReducer
