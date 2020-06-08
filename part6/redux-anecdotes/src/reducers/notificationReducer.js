const notificationReducer = (state = { message: '', id: null }, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.message }
    case 'SET_ID':
      clearTimeout(action.timeoutId)
      return { ...state, id: action.id }
    case 'RESET':
      return { message: '', id: null }
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'SET_MESSAGE', message })
    const timeoutId = getState().notification.id
    const id = setTimeout(() => dispatch({ type: 'RESET' }), seconds * 1000)
    dispatch({ type: 'SET_ID', id, timeoutId })
  }
}

// export const resetNotification = () => ({
//   type: 'RESET',
// })

export default notificationReducer
