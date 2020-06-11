const initialState = { message: '', kind: '', id: null }
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.message, kind: action.kind }
    case 'SET_ID':
      clearTimeout(action.timeoutId)
      return { ...state, id: action.id }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const setNotification = (kind, message) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'SET_MESSAGE', message, kind })
    const timeoutId = getState().notification.id
    const id = setTimeout(() => dispatch({ type: 'RESET' }), 5000)
    dispatch({ type: 'SET_ID', id, timeoutId })
  }
}

export default notificationReducer
