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

export const setNotification = (message) => ({
  type: 'SET',
  message,
})

export const resetNotification = () => ({
  type: 'RESET',
})

export default notificationReducer
