const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.message
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch({ type: 'SET', message })
    setTimeout(() => dispatch({ type: 'RESET' }), seconds * 1000)
  }
}

// export const resetNotification = () => ({
//   type: 'RESET',
// })

export default notificationReducer
