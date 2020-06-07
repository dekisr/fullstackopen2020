const notificationReducer = (state = 'notification', action) => {
  switch (action.type) {
    case 'TEST':
      return action.message
    default:
      return state
  }
}

export const setNotification = (message) => ({
  type: 'TEST',
  message
})

export default notificationReducer